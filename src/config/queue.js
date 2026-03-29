const { Queue, Worker } = require('bullmq');
const { DateTime } = require('luxon');
const { getRedisClient } = require('./redis');
const DoseLog = require('../models/DoseLog');
const Medicine = require('../models/Medicine');
const User = require('../models/User');
const logger = require('../utils/logger');

const QUEUE_NAME = 'medication-reminders';
const DLQ_NAME = 'medication-reminders-dead';

let queue;
let deadLetterQueue;

const getQueueConnection = () => {
  const client = getRedisClient();
  return {
    connection: client
  };
};

const getMedicationQueue = () => {
  if (!queue) {
    queue = new Queue(QUEUE_NAME, getQueueConnection());
  }
  return queue;
};

const getDeadLetterQueue = () => {
  if (!deadLetterQueue) {
    deadLetterQueue = new Queue(DLQ_NAME, getQueueConnection());
  }
  return deadLetterQueue;
};

const GRACE_PERIOD_MINUTES = 20;

const scheduleReminderJob = async (userId, medicineId, scheduleTimeISO, timeString) => {
  const q = getMedicationQueue();
  const delay = new Date(scheduleTimeISO).getTime() - Date.now();

  if (delay <= 0) {
    return;
  }

  const jobId = `${userId}:${medicineId}:${scheduleTimeISO}`;

  await q.add(
    'reminder',
    { userId, medicineId, scheduleTimeISO, timeString },
    {
      jobId,
      delay,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  );
};

const scheduleNextDailyReminder = async (user, medicine, timeString) => {
  const zone = user.timezone || 'UTC';
  const now = DateTime.utc();

  let dt = DateTime.fromFormat(timeString, 'HH:mm', { zone });
  dt = dt.set({
    year: now.year,
    month: now.month,
    day: now.day
  });

  if (dt <= now.setZone(zone)) {
    dt = dt.plus({ days: 1 });
  }

  const scheduleTimeISO = dt.toUTC().toISO();
  await scheduleReminderJob(user._id.toString(), medicine._id.toString(), scheduleTimeISO, timeString);
};

const generateDailyReminders = async () => {
  const users = await User.find({});

  const nowUtc = DateTime.utc();

  for (const user of users) {
    const zone = user.timezone || 'UTC';
    const today = nowUtc.setZone(zone).startOf('day');
    const todayEnd = today.plus({ days: 1 });

    const medicines = await Medicine.find({
      userId: user._id,
      $or: [
        { startDate: { $lte: todayEnd.toJSDate() } },
        { startDate: { $exists: false } }
      ],
      $or: [
        { endDate: null },
        { endDate: { $gte: today.toJSDate() } },
        { endDate: { $exists: false } }
      ],
      scheduleTimes: { $exists: true, $ne: [] }
    });

    for (const medicine of medicines) {
      for (const timeString of medicine.scheduleTimes) {
        let dt = DateTime.fromFormat(timeString, 'HH:mm', { zone });
        dt = dt.set({
          year: today.year,
          month: today.month,
          day: today.day
        });

        if (dt <= nowUtc) {
          continue;
        }

        const scheduleTimeISO = dt.toUTC().toISO();
        // This is idempotent thanks to jobId uniqueness and DoseLog unique index
        // when the job eventually runs.
        // eslint-disable-next-line no-await-in-loop
        await scheduleReminderJob(user._id.toString(), medicine._id.toString(), scheduleTimeISO, timeString);
      }
    }
  }
};

const processGraceCheck = async (doseLogId) => {
  const log = await DoseLog.findById(doseLogId);
  if (!log) {
    return;
  }
  if (log.status === 'pending') {
    log.status = 'missed';
    await log.save();
  }
};

const startMedicationWorker = () => {
  const worker = new Worker(
    QUEUE_NAME,
    async (job) => {
      if (job.name === 'reminder') {
        const { userId, medicineId, scheduleTimeISO, timeString } = job.data;
        const scheduledTime = new Date(scheduleTimeISO);

        const [user, medicine] = await Promise.all([
          User.findById(userId),
          Medicine.findById(medicineId)
        ]);

        if (!user || !medicine) {
          return;
        }

        let doseLog = await DoseLog.findOne({
          userId,
          medicineId,
          scheduledTime
        });

        if (!doseLog) {
          doseLog = await DoseLog.create({
            userId,
            medicineId,
            scheduledTime,
            status: 'pending'
          });
        }

        const { sendMedicationReminder } = require('../services/notificationService');
        await sendMedicationReminder({ userId, medicine, doseLog, scheduledTime });

        const graceJobDelay = GRACE_PERIOD_MINUTES * 60 * 1000;

        const q = getMedicationQueue();
        await q.add(
          'grace-check',
          { doseLogId: doseLog._id.toString() },
          {
            delay: graceJobDelay,
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000
            },
            removeOnComplete: true,
            removeOnFail: false
          }
        );

        if (medicine.scheduleTimes && medicine.scheduleTimes.length > 0 && timeString) {
          await scheduleNextDailyReminder(user, medicine, timeString);
        }
      } else if (job.name === 'grace-check') {
        const { doseLogId } = job.data;
        await processGraceCheck(doseLogId);
      } else if (job.name === 'daily-generation') {
        await generateDailyReminders();
      }
    },
    getQueueConnection()
  );

  worker.on('failed', async (job, err) => {
    logger.error('Medication worker job failed', {
      jobId: job.id,
      name: job.name,
      error: err.message
    });

    const dlq = getDeadLetterQueue();
    await dlq.add('failed-job', {
      originalJobId: job.id,
      name: job.name,
      data: job.data,
      failedReason: err.message
    });
  });

  const q = getMedicationQueue();
  q.add(
    'daily-generation',
    {},
    {
      repeat: { cron: '0 0 * * *' },
      removeOnComplete: true,
      removeOnFail: false
    }
  );
};

module.exports = {
  getMedicationQueue,
  getDeadLetterQueue,
  scheduleReminderJob,
  startMedicationWorker,
  scheduleNextDailyReminder
};


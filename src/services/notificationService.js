const User = require('../models/User');
const DoseLog = require('../models/DoseLog');
const { getMessaging } = require('../config/fcm');
const logger = require('../utils/logger');

const sendMedicationReminder = async ({ userId, medicine, doseLog, scheduledTime }) => {
  const user = await User.findById(userId).select('deviceTokens name');

  if (!user || !user.deviceTokens || user.deviceTokens.length === 0) {
    return;
  }

  const messaging = getMessaging();

  if (!messaging) {
    return;
  }

  const tokens = user.deviceTokens;

  try {
    const response = await messaging.sendEachForMulticast({
      notification: {
        title: 'Medication Reminder',
        body: `${medicine.name} (${medicine.dosage}) is due now`
      },
      data: {
        medicineId: medicine._id.toString(),
        doseLogId: doseLog._id.toString(),
        scheduledTime: scheduledTime.toISOString()
      },
      tokens
    });

    const invalidTokens = [];

    response.responses.forEach((r, idx) => {
      if (!r.success) {
        const code = r.error && r.error.code;
        if (code && (code.includes('invalid-argument') || code.includes('registration-token-not-registered'))) {
          invalidTokens.push(tokens[idx]);
        }
      }
    });

    if (invalidTokens.length > 0) {
      await User.updateOne(
        { _id: userId },
        { $pull: { deviceTokens: { $in: invalidTokens } } }
      );
      logger.warn('Removed invalid device tokens', { userId, invalidTokensCount: invalidTokens.length });
    }

    await DoseLog.updateOne(
      { _id: doseLog._id },
      {
        $set: {
          notificationSent: true,
          notificationSentAt: new Date(),
          notificationStatus: 'success'
        }
      }
    );
  } catch (error) {
    logger.error('Notification send failed', {
      userId,
      doseLogId: doseLog._id.toString(),
      error: error.message
    });

    await DoseLog.updateOne(
      { _id: doseLog._id },
      {
        $set: {
          notificationSent: true,
          notificationSentAt: new Date(),
          notificationStatus: 'failed'
        }
      }
    );

    throw error;
  }
};

module.exports = {
  sendMedicationReminder
};


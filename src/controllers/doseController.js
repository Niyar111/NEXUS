const { validationResult } = require('express-validator');
const DoseLog = require('../models/DoseLog');
const Medicine = require('../models/Medicine');

// This must stay in sync with GRACE_PERIOD_MINUTES in alertService
const GRACE_PERIOD_MINUTES = 20;

const createDoseLog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  const { medicineId, scheduledTime, takenTime } = req.body;

  try {
    const medicine = await Medicine.findOne({
      _id: medicineId,
      userId: req.user._id
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found for this user' });
    }

    const scheduledDate = new Date(scheduledTime);
    const takenDate = takenTime ? new Date(takenTime) : new Date();

    const graceDeadline = new Date(
      scheduledDate.getTime() + GRACE_PERIOD_MINUTES * 60 * 1000
    );

    const computedStatus = takenDate <= graceDeadline ? 'taken' : 'late';

    const existingLog = await DoseLog.findOne({
      userId: req.user._id,
      medicineId,
      scheduledTime: scheduledDate
    });

    let doseLog;

    if (existingLog) {
      existingLog.takenTime = takenDate;
      existingLog.status = computedStatus;
      doseLog = await existingLog.save();
    } else {
      doseLog = await DoseLog.create({
        userId: req.user._id,
        medicineId,
        scheduledTime: scheduledDate,
        takenTime: takenDate,
        status: computedStatus
      });
    }

    return res.status(201).json(doseLog);
  } catch (error) {
    console.error('Create dose log error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createDoseLog
};


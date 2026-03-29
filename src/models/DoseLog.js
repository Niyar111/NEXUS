const mongoose = require('mongoose');

const doseLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    medicineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
      index: true
    },
    scheduledTime: {
      type: Date,
      required: true
    },
    takenTime: {
      type: Date
    },
    status: {
      type: String,
      enum: ['pending', 'taken', 'late', 'missed'],
      required: true,
      default: 'pending'
    },
    snoozeCount: {
      type: Number,
      default: 0
    },
    nextReminderTime: {
      type: Date
    },
    notificationSent: {
      type: Boolean,
      default: false
    },
    notificationSentAt: {
      type: Date
    },
    notificationStatus: {
      type: String,
      enum: ['success', 'failed'],
      default: undefined
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

doseLogSchema.index(
  {
    userId: 1,
    medicineId: 1,
    scheduledTime: 1
  },
  { unique: true }
);

const DoseLog = mongoose.model('DoseLog', doseLogSchema);

module.exports = DoseLog;


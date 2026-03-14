const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    dosage: {
      type: String,
      required: true,
      trim: true
    },
    scheduleTimeUTC: {
      type: String
    },
    scheduleTimes: [
      {
        type: String
      }
    ],
    frequency: {
      type: String,
      required: true,
      enum: ['once', 'daily', 'weekly', 'monthly', 'custom'],
      default: 'daily'
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date
    },
    instructions: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false }
  }
);

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;


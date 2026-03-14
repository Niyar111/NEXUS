const { validationResult } = require('express-validator');
const Medicine = require('../models/Medicine');
const User = require('../models/User');
const { scheduleNextDailyReminder } = require('../config/queue');

const createMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  const { name, dosage, scheduleTimeUTC, scheduleTimes, frequency, startDate, endDate, instructions } = req.body;

  try {
    const medicine = await Medicine.create({
      userId: req.user._id,
      name,
      dosage,
      scheduleTimeUTC,
      scheduleTimes: scheduleTimes && scheduleTimes.length ? scheduleTimes : (scheduleTimeUTC ? [scheduleTimeUTC] : []),
      frequency,
      startDate,
      endDate,
      instructions
    });

    const user = await User.findById(req.user._id);
    if (user && medicine.scheduleTimes && medicine.scheduleTimes.length > 0) {
      // For now, schedule for the first time entry only.
      const timeString = medicine.scheduleTimes[0];
      await scheduleNextDailyReminder(user, medicine, timeString);
    }

    return res.status(201).json(medicine);
  } catch (error) {
    console.error('Create medicine error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.user._id }).sort({ createdAt: -1 });
    return res.json(medicines);
  } catch (error) {
    console.error('Get medicines error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    return res.json(medicine);
  } catch (error) {
    console.error('Get medicine by id error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateMedicine = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  try {
    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { $set: req.body },
      { new: true }
    );

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    return res.json(medicine);
  } catch (error) {
    console.error('Update medicine error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    return res.json({ message: 'Medicine deleted' });
  } catch (error) {
    console.error('Delete medicine error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
};


const DoseLog = require('../models/DoseLog');

const SNOOZE_MINUTES = 5;

const snoozeDose = async (req, res) => {
  const { id } = req.params;

  try {
    const doseLog = await DoseLog.findOne({
      _id: id,
      userId: req.user._id
    });

    if (!doseLog) {
      return res.status(404).json({ message: 'DoseLog not found' });
    }

    if (doseLog.status !== 'pending') {
      return res.status(400).json({ message: 'Only pending doses can be snoozed' });
    }

    const now = new Date();
    doseLog.snoozeCount += 1;
    doseLog.nextReminderTime = new Date(now.getTime() + SNOOZE_MINUTES * 60 * 1000);
    await doseLog.save();

    return res.json(doseLog);
  } catch (error) {
    console.error('Snooze dose error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  snoozeDose
};


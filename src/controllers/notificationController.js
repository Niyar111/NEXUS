const { validationResult } = require('express-validator');
const User = require('../models/User');

const registerDeviceToken = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  const { deviceToken } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.deviceTokens.includes(deviceToken)) {
      user.deviceTokens.push(deviceToken);
      await user.save();
    }

    return res.status(200).json({ message: 'Device token registered' });
  } catch (error) {
    console.error('Register device token error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerDeviceToken
};


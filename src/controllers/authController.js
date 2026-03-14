const { validationResult } = require('express-validator');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  const { name, email, password, timezone } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      timezone
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      timezone: user.timezone,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Register error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error', errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      timezone: user.timezone,
      token: generateToken(user._id)
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser
};


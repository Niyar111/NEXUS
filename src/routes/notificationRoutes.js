const express = require('express');
const { body } = require('express-validator');
const { registerDeviceToken } = require('../controllers/notificationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.post(
  '/devices',
  [body('deviceToken').notEmpty().withMessage('deviceToken is required')],
  registerDeviceToken
);

module.exports = router;


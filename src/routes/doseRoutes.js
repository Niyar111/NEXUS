const express = require('express');
const { body } = require('express-validator');
const { createDoseLog } = require('../controllers/doseController');
const { snoozeDose } = require('../controllers/snoozeController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const doseValidators = [
  body('medicineId').notEmpty().withMessage('medicineId is required'),
  body('scheduledTime').notEmpty().withMessage('scheduledTime is required')
];

router.use(protect);

router.post('/', doseValidators, createDoseLog);
router.post('/:id/snooze', snoozeDose);

module.exports = router;



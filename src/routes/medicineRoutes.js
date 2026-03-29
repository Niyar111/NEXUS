const express = require('express');
const { body } = require('express-validator');
const {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine
} = require('../controllers/medicineController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

const medicineValidators = [
  body('name').notEmpty().withMessage('Name is required'),
  body('dosage').notEmpty().withMessage('Dosage is required'),
  body('scheduleTimeUTC').notEmpty().withMessage('scheduleTimeUTC is required'),
  body('frequency').notEmpty().withMessage('Frequency is required'),
  body('startDate').notEmpty().withMessage('Start date is required')
];

router.use(protect);

router.post('/', medicineValidators, createMedicine);
router.get('/', getMedicines);
router.get('/:id', getMedicineById);
router.put('/:id', medicineValidators, updateMedicine);
router.delete('/:id', deleteMedicine);

module.exports = router;


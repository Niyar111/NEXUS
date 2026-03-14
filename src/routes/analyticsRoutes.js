const express = require('express');
const { getAdherenceAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/adherence', getAdherenceAnalytics);

module.exports = router;


const { getRedisClient } = require('../config/redis');
const { calculateAdherence } = require('../services/adherenceService');

const getAdherenceAnalytics = async (req, res) => {
  const userId = req.user._id.toString();
  const cacheKey = `user:${userId}:adherence`;

  try {
    const redisClient = getRedisClient();

    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const data = JSON.parse(cached);
      return res.json({ ...data, cached: true });
    }

    const analytics = await calculateAdherence(userId);

    await redisClient.setEx(cacheKey, 60 * 5, JSON.stringify(analytics));

    return res.json({ ...analytics, cached: false });
  } catch (error) {
    console.error('Analytics error:', error.message);
    // Fallback: calculate without cache
    try {
      const analytics = await calculateAdherence(userId);
      return res.json({ ...analytics, cached: false, cacheError: true });
    } catch (innerError) {
      console.error('Analytics fallback error:', innerError.message);
      return res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = {
  getAdherenceAnalytics
};


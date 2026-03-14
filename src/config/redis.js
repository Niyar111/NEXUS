const { createClient } = require('redis');

let redisClient;

const connectRedis = async () => {
  const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

  redisClient = createClient({
    url: redisUrl
  });

  redisClient.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }

  console.log('Redis connected');

  return redisClient;
};

const getRedisClient = () => {
  if (!redisClient || !redisClient.isOpen) {
    throw new Error('Redis client is not connected');
  }
  return redisClient;
};

module.exports = {
  connectRedis,
  getRedisClient
};


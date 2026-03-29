const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const medicineRoutes = require('./routes/medicineRoutes');
const doseRoutes = require('./routes/doseRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const requestIdMiddleware = require('./middleware/requestIdMiddleware');
const logger = require('./utils/logger');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

app.use(requestIdMiddleware);

app.use(helmet());

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim())
      }
    })
  );
}

app.use('/api/auth', authRoutes);
app.use('/api/medicines', medicineRoutes);
app.use('/api/dose-log', doseRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/health', async (req, res) => {
  const mongoose = require('mongoose');
  const { getRedisClient } = require('./config/redis');

  let dbStatus = 'disconnected';
  if (mongoose.connection.readyState === 1) {
    dbStatus = 'connected';
  } else if (mongoose.connection.readyState === 2) {
    dbStatus = 'connecting';
  }

  let redisStatus = 'disconnected';
  try {
    const redis = getRedisClient();
    redisStatus = redis.isOpen ? 'connected' : 'disconnected';
  } catch (e) {
    redisStatus = 'disconnected';
  }

  res.json({
    status: dbStatus === 'connected' && redisStatus === 'connected' ? 'ok' : 'degraded',
    database: dbStatus,
    redis: redisStatus,
    uptime: process.uptime()
  });
});

app.use(notFound);
app.use(errorHandler);

module.exports = app;


require('dotenv').config();

const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { connectRedis } = require('./config/redis');
const { startAlertScheduler } = require('./services/alertService');
const { startMedicationWorker } = require('./config/queue');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await connectRedis();
    startMedicationWorker();

    const server = http.createServer(app);

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startAlertScheduler();
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();


// Intentionally left minimal. Alert scheduling has been moved to
// BullMQ-based queues in config/queue.js. This module is kept only
// as a thin facade if needed in the future.

const startAlertScheduler = () => {};

module.exports = {
  startAlertScheduler
};


const { randomUUID } = require('crypto');

const requestIdMiddleware = (req, res, next) => {
  const incomingId = req.headers['x-request-id'];
  const requestId = incomingId || randomUUID();

  req.requestId = requestId;
  res.setHeader('X-Request-ID', requestId);

  next();
};

module.exports = requestIdMiddleware;


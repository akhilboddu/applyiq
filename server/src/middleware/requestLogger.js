const logger = require("../lib/logger");

const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    logger.info("request", {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      ms,
    });
  });
  next();              // hand off to the next middleware
};

module.exports = requestLogger;

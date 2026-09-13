// middleware/errorHandler.js
const logger = require("../lib/logger");

// The 4th param (next) is what marks this as an error handler — Express
// counts the arguments. Drop it and this silently becomes normal middleware.
const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    userId: req.user?.id || "anonymous",
  });

  // our own errors carry .statusCode; Express's built-ins (bad JSON,
  // payload too large) carry .status — check both before assuming 500
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Internal Server Error" // never leak stack traces to users
        : err.message, // client errors are safe to show
  });
};

module.exports = errorHandler;

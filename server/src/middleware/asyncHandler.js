// middleware/asyncHandler.js
// Wraps an async action so a rejected promise is forwarded to next(),
// which sends it straight to the global error handler.
// Express 5 does this automatically — we keep it explicit and portable.
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;

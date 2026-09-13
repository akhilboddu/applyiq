// errors/NotFoundError.js
// An expected failure: it knows its own status code, so the global
// error handler can trust it and show the message to the user.
class NotFoundError extends Error {
  constructor(message = "Not found") {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;

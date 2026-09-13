// middleware/auditAction.js — runs BEFORE the action and AFTER the response
const crypto = require("crypto");
const logger = require("../lib/logger");

const auditAction = (req, res, next) => {
  // ── BEFORE the action ──
  const start = Date.now();
  req.requestId = crypto.randomUUID();

  // ── AFTER the response is sent ──
  res.on("finish", () => {
    const ms = Date.now() - start;
    logger.info("action complete", {
      id: req.requestId, route: req.path,
      status: res.statusCode, ms,
    });
  });

  next(); // run the action in between
};

module.exports = auditAction;
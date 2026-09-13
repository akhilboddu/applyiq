const { rateLimit, ipKeyGenerator } = require("express-rate-limit");

// 20 requests per hour per IP — AI calls are expensive, unlike loginLimiter's
// hand-rolled Map this rides express-rate-limit's own store/window handling.
// ipKeyGenerator normalizes IPv6 addresses to their subnet first, so rotating
// the host part of an IPv6 address can't be used to dodge the limit.
const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  keyGenerator: (req) => ipKeyGenerator(req.ip),
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({ error: "Too many requests, try again later" });
  },
});

module.exports = aiLimiter;

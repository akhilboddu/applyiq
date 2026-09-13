const loginLimiter = (() => {
  const hits = new Map();
  return (req, res, next) => {
    const ip = req.ip;
    const count = (hits.get(ip) || 0) + 1;
    hits.set(ip, count);
    setTimeout(() => hits.set(ip, (hits.get(ip) || 1) - 1), 60_000);
    if (count > 5) return res.status(429).json({ error: 'Too many attempts' });
    next();
  };
})();
module.exports = loginLimiter;
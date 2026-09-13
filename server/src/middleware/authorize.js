// middleware/authorize.js — the three authorisation patterns (PA1005)
//
// authenticateToken answers "who are you". These answer "are you allowed".
// ApplyIQ ships pattern 2 (ownership). The other two are here because you
// will need them the moment this app grows an admin or a partner integration.

// 1. ROLE-BASED (RBAC)
// A middleware factory: requireRole("admin") RETURNS a middleware.
// Same higher-order trick as validate(schema) from Video 11.
// NOTE: ApplyIQ's User model has no `role` column yet — adding one is a
// schema migration. This is the shape you'd use the day you add it.
const requireRole = (role) => (req, res, next) => {
  if (req.user?.role !== role) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};

// 2. RESOURCE-BASED (ownership) — the one we already ship.
// We do it inside the query, not after it: applicationRepository.findOwned
// calls findFirst({ where: { id, userId } }). A record you don't own is
// simply not found, so we return 404 rather than 403 — the caller never
// learns that someone else's record exists.

// 3. API KEY — for machine-to-machine callers with no human to log in.
const apiKeyAuth = (req, res, next) => {
  const validKeys = (process.env.API_KEYS || "").split(",").filter(Boolean);
  if (!validKeys.includes(req.headers["x-api-key"])) {
    return res.status(401).json({ error: "Invalid API key" });
  }
  next();
};

module.exports = { requireRole, apiKeyAuth };

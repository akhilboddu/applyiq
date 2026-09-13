// An action filter = route-scoped middleware that runs around the action
const requireAuth = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: "Login required" });
  next(); // pass control to the action
};

module.exports = requireAuth;
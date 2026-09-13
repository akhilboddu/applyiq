// middleware/authenticateToken.js — the guard (PA1004)
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

const authenticateToken = async (req, res, next) => {
  // header format is "Bearer <token>" — we want the second half
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    // verify, not decode — decode reads the payload, verify checks the signature
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // the token may be valid but the account deleted since it was issued
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true },
    });
    if (!user) return res.status(401).json({ error: "User not found" });

    // this is the line that replaces the demo-user stub from app.js
    req.user = user;
    next();
  } catch {
    // bad signature, tampered payload, or expired
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = authenticateToken;

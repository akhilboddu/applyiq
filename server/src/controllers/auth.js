// controllers/auth.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// VIDEO 18 — a real hash of a random string nobody will ever type (PA1006).
// It exists purely so the "no such user" path burns the same CPU as the
// "wrong password" path. Without it, login answers unknown emails ~100x
// faster, and that timing difference is itself an email-enumeration oracle.
const DUMMY_HASH = "$2b$12$3U8aUVRIsKhi2JuCaqNTxe3G672qsvU3NXmxFp2AoQbP8euC/VZcC";

const createAuthController = (prisma) => ({
  // VIDEO 15 — hashing (PA1001)
  register: async (req, res) => {
    const { password, name } = req.body;
    // normalise: Demo@X.com and demo@x.com are the same person
    const email = req.body.email.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // 12 rounds: slow on purpose. Slow is the security feature.
    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, password: passwordHash, name },
      // never send the hash back — not even our own hash
      select: { id: true, email: true, name: true },
    });

    res.status(201).json(user);
  },

  // VIDEO 16 — login + JWT (PA1002, PA1003)
  login: async (req, res) => {
    const { password } = req.body;
    // same normalisation as register, or the lookup misses
    const email = req.body.email.toLowerCase();

    const user = await prisma.user.findUnique({ where: { email } });

    // compare() against a hash we never decrypt — hashing is one-way.
    // Note we ALWAYS run compare, even when there is no user: falling back
    // to DUMMY_HASH keeps the response time constant across both failures.
    const ok = await bcrypt.compare(password, user?.password ?? DUMMY_HASH);

    // same message for "no such user" and "wrong password", so an
    // attacker can't use the response to discover which emails exist
    if (!user || !ok) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // userId is the claim Video 17's guard reads back out
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      token,
      user: { id: user.id, email: user.email, name: user.name },
    });
  },
});

module.exports = { createAuthController };

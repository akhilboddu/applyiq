// routes/auth.js
const express = require("express");
const { createAuthController } = require("../controllers/auth");
const { registerSchema, loginSchema } = require("../schemas/auth.schema");
const validate = require("../middleware/validate");
const asyncHandler = require("../middleware/asyncHandler");
const loginLimiter = require("../middleware/loginLimiter");
const prisma = require("../lib/prisma");

const router = express.Router();
const controller = createAuthController(prisma);

router.post(
  "/register",
  validate(registerSchema),
  asyncHandler(controller.register),
);

// loginLimiter lives HERE, not in app.js — it only belongs on the one
// route that's actually worth brute-forcing
router.post(
  "/login",
  loginLimiter,
  validate(loginSchema),
  asyncHandler(controller.login),
);

module.exports = router;

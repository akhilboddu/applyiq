const express = require("express");
const { createApplicationController } = require("../controllers/applications");
const authenticateToken = require("../middleware/authenticateToken");
const asyncHandler = require("../middleware/asyncHandler");
const auditAction = require("../middleware/auditAction");
const prisma = require("../lib/prisma");
const {
  applicationRepository,
} = require("../repositories/applicationRepository");

const router = express.Router();
const repo = applicationRepository(prisma);
const controller = createApplicationController(repo);

// Every application route needs a real user — mount the guard once, here,
// instead of repeating it on five lines. Nothing below runs without a token.
router.use(authenticateToken);

// asyncHandler forwards any rejected promise to the global error handler.
// Express 5 does this on its own, but we keep it explicit and portable.
router.get("/", asyncHandler(controller.list));
router.post("/", auditAction, asyncHandler(controller.create));
router.get("/:id", asyncHandler(controller.getOne));
router.patch("/:id", asyncHandler(controller.update));
router.delete("/:id", asyncHandler(controller.remove));

module.exports = router;

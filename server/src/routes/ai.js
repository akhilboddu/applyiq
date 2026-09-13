const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const requireAuth = require("../middleware/requireAuth");
const aiLimiter = require("../middleware/aiLimiter");
const asyncHandler = require("../middleware/asyncHandler");
const validate = require("../middleware/validate");
const { coverLetterSchema } = require("../schemas/ai.schema");
const {
  generateCoverLetter,
  streamCoverLetter,
} = require("../services/coverLetter");
const NotFoundError = require("../errors/NotFoundError");
const prisma = require("../lib/prisma");
const {
  applicationRepository,
} = require("../repositories/applicationRepository");

const router = express.Router();
const repo = applicationRepository(prisma);

// Guard order: who are you -> are you logged in -> are you rate-limited
router.use(authenticateToken);
router.use(requireAuth);
router.use(aiLimiter);

router.post(
  "/cover-letter",
  validate(coverLetterSchema),
  asyncHandler(async (req, res) => {
    // YOU write this: never write to a record you don't own

    const coverLetter = await generateCoverLetter(req.body);
    const saved = await repo.saveCoverLetter(req.body.applicationId, coverLetter);

    res.json({ coverLetter, coverLetterId: saved.id });
  }),
);

router.post(
  "/cover-letter/stream",
  validate(coverLetterSchema),
  asyncHandler(async (req, res) => {
    const owned = await repo.findOwned(req.body.applicationId, req.user.id);
    if (!owned) throw new NotFoundError("Application not found");

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // Accumulate as we stream — a streamed letter still has to be saved.
    let fullText = "";
    const stream = await streamCoverLetter(req.body);

    for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta?.content ?? "";
      if (!delta) continue;
      fullText += delta;
      res.write(delta);
    }

    await repo.saveCoverLetter(owned.id, fullText);
    res.end();
  }),
);

module.exports = router;

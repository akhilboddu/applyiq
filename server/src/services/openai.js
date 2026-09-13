// One OpenAI client for the whole process — same shape as lib/prisma.js.
// Fail loudly at boot if the key is missing, rather than mysteriously on
// the first request (same pattern as the CLIENT_URL guard in app.js).
require("dotenv/config");

const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not set — check your .env");
}

module.exports = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

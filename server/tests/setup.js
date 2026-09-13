// tests/setup.js — runs before any test file is evaluated, which means
// before a test file's require("../src/app") ever runs. That ordering is
// the whole point: app.js throws at import time when CLIENT_URL is unset
// (src/app.js), and services/openai.js does the same for OPENAI_API_KEY.
const fs = require("fs");
const path = require("path");

const envTestPath = path.resolve(__dirname, "../.env.test");

if (fs.existsSync(envTestPath)) {
  // override: a stale value already in the shell must not win over .env.test,
  // or a test run could point at the dev database.
  require("dotenv").config({ path: envTestPath, override: true });
}

// Fail loudly here rather than letting app.js throw a vaguer error mid-suite.
const required = ["DATABASE_URL", "JWT_SECRET", "CLIENT_URL", "OPENAI_API_KEY"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length) {
  throw new Error(
    `Missing test environment variable(s): ${missing.join(", ")}. ` +
      `Fill them in server/.env.test — DATABASE_URL must point at a throwaway database.`,
  );
}

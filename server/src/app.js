// 1. Import everything
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const requestLogger = require("./middleware/requestLogger");
const authRouter = require("./routes/auth");
const applicationsRouter = require("./routes/applications");
const aiRouter = require("./routes/ai");
const validate = require("./middleware/validate");
const { registerSchema } = require("./schemas/auth.schema");
const errorHandler = require("./middleware/errorHandler");

// 2. Create the app
const app = express();

// 3. Middleware pipeline (the 4 lines from the slide)
// One allowed origin, read from the environment (PA1007). If CLIENT_URL is
// unset, cors sends NO Allow-Origin header and every browser call is blocked
// — so we fail loudly at boot rather than mysteriously at request time.
if (!process.env.CLIENT_URL) {
  throw new Error("CLIENT_URL is not set — check your .env");
}
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(requestLogger);

// 4. Routes go here (we build these in Module 2)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "development",
  });
});

app.post("/api/test-validate", validate(registerSchema), (req, res) =>
  res.json({ ok: true }),
);

// Mount the routers — base path set once, here
app.use("/api/auth", authRouter);
app.use("/api/applications", applicationsRouter);
app.use("/api/ai", aiRouter);
app.use(errorHandler);

module.exports = app;

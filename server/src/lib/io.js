// lib/io.js — one Socket.IO server for the process, same single-instance rule
// as lib/prisma.js and lib/logger.js. Built in init() rather than at module
// load, because it needs the http.Server that server.js creates.
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

let io = null;

function init(server) {
  io = new Server(server, {
    // Same single allowed origin app.js enforces for HTTP.
    cors: { origin: process.env.CLIENT_URL },
  });

  // The socket equivalent of middleware/authenticateToken.js: verify the
  // signature, not just decode the payload. A socket that fails this never
  // connects, so nothing downstream has to re-check.
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("No token provided"));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.userId;
      // One room per user — every emit is scoped to this, never broadcast.
      socket.join(`user:${payload.userId}`);
      next();
    } catch {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    logger.debug("socket connected", { userId: socket.userId, id: socket.id });
    socket.on("disconnect", (reason) => {
      logger.debug("socket disconnected", { userId: socket.userId, reason });
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error("Socket.IO not initialised — call init(server) first");
  }
  return io;
}

module.exports = { init, getIO };

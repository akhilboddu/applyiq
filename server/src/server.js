require("dotenv/config");

const http = require("http");
const app = require("./app");
const logger = require("./lib/logger");
const { init } = require("./lib/io");

const PORT = process.env.PORT || 3000;

// Socket.IO needs the underlying http.Server, which app.listen() creates
// internally and never hands back — so we build it ourselves and listen on it.
const server = http.createServer(app);
init(server);

server.listen(PORT, () => {
  logger.info("Server started", { port: PORT });
});

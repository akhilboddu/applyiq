// Prisma 7 no longer auto-loads .env for the app (prisma.config.ts covers the CLI only),
// and no longer connects on its own — it goes through a driver adapter we build here.
require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

module.exports = new PrismaClient({ adapter });

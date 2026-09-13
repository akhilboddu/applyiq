// controllers/applications.js
const NotFoundError = require("../errors/NotFoundError");
const cacheService = require("../lib/cacheService");
const { getIO } = require("../lib/io");

// cache is a second parameter with a default, so existing callers that pass
// only the repo — routes/applications.js and the Module 5 tests — keep working.
const createApplicationController = (repo, cache = cacheService) => ({
  list: async (req, res) => {
    // ACTION: list — cache-aside, keyed per user because findByUser is
    // scoped to req.user.id and a shared key would leak across accounts.
    const key = `applications:${req.user.id}`;

    const cached = cache.get(key);
    if (cached) {
      res.set("X-Cache", "HIT");
      return res.json(cached);
    }

    const apps = await repo.findByUser(req.user.id);
    cache.set(key, apps);
    res.set("X-Cache", "MISS");
    // Body stays a bare array — the client destructures it as one.
    res.json(apps);
  },

  create: async (req, res) => {
    // ACTION: create
    const app = await repo.create({ ...req.body, userId: req.user.id });
    await repo.logActivity(app.id, "APPLIED");
    // After the write, never before: a failed create must not evict a
    // still-valid list.
    cache.invalidatePattern(`applications:${req.user.id}`);
    res.status(201).json(app);
  },

  getOne: async (req, res) => {
    const app = await repo.findOwned(req.params.id, req.user.id);
    if (!app) throw new NotFoundError("Application not found");
    res.json(app);
  },

  update: async (req, res) => {
    const existing = await repo.findOwned(req.params.id, req.user.id);
    if (!existing) throw new NotFoundError("Application not found");

    const app = await repo.update(req.params.id, req.body);

    if (req.body.status && req.body.status !== existing.status) {
      await repo.logActivity(
        app.id,
        "STATUS_CHANGE",
        `${existing.status} → ${req.body.status}`,
      );

      // Scoped to this user's room — never io.emit, which would leak one
      // user's board changes to every connected client.
      getIO()
        .to(`user:${req.user.id}`)
        .emit("application:statusChanged", {
          id: app.id,
          status: app.status,
          at: Date.now(),
        });
    }

    cache.invalidatePattern(`applications:${req.user.id}`);
    res.json(app);
  },

  remove: async (req, res) => {
    const existing = await repo.findOwned(req.params.id, req.user.id);
    if (!existing) throw new NotFoundError("Application not found");
    await repo.remove(req.params.id);
    cache.invalidatePattern(`applications:${req.user.id}`);
    res.status(204).end();
  },
});

module.exports = { createApplicationController };

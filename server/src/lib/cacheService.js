// lib/cacheService.js — one NodeCache for the whole process, built at module
// load. Same rule as lib/prisma.js: never construct a client per request, or
// every request gets its own empty cache and nothing is ever a hit.
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 300, // 300s default lifetime for an entry
  checkperiod: 60, // sweep for expired keys every 60s
});

module.exports = {
  get: (key) => cache.get(key),

  // ttl is optional — omitted means stdTTL above.
  set: (key, value, ttl) =>
    ttl === undefined ? cache.set(key, value) : cache.set(key, value, ttl),

  del: (key) => cache.del(key),

  // Bulk eviction for keys sharing a prefix, e.g. invalidatePattern(
  // `applications:${userId}`) once invalidation lands. Returns the count
  // deleted, matching cache.del()'s contract.
  invalidatePattern: (prefix) => {
    const matching = cache.keys().filter((key) => key.startsWith(prefix));
    return matching.length ? cache.del(matching) : 0;
  },

  stats: () => cache.getStats(),
};

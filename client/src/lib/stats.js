// src/lib/stats.js
export function calculateStats(applications) {
  const apps = Array.isArray(applications) ? applications : [];

  return {
    total: apps.length,
    active: apps.filter((app) => app.status !== "Rejected").length,
    interviews: apps.filter((app) => app.status === "Interview").length,
    offers: apps.filter((app) => app.status === "Offer").length,
  };
}

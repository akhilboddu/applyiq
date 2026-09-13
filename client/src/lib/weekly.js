// src/lib/weekly.js
const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;

function startOfWeek(value) {
  const date = new Date(value);
  date.setHours(0, 0, 0, 0);
  const dayFromMonday = (date.getDay() + 6) % 7;
  date.setDate(date.getDate() - dayFromMonday);
  return date;
}

export function toWeeklyData(applications, weeks = 6) {
  const currentWeek = startOfWeek(new Date());

  const buckets = [];
  for (let offset = weeks - 1; offset >= 0; offset--) {
    const start = startOfWeek(currentWeek);
    start.setDate(start.getDate() - offset * 7);
    buckets.push({
      start,
      week: start.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
      count: 0,
    });
  }

  const firstStart = buckets[0].start;
  for (const app of applications) {
    if (!app.appliedDate) continue;
    const appWeek = startOfWeek(app.appliedDate);
    const index = Math.round((appWeek - firstStart) / MS_PER_WEEK);
    if (index >= 0 && index < buckets.length) buckets[index].count += 1;
  }

  return buckets.map(({ week, count }) => ({ week, count }));
}

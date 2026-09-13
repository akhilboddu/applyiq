import { calculateStats } from "../lib/stats.js";

it("handles an empty list", () => {
  expect(calculateStats([])).toEqual({
    total: 0,
    active: 0,
    interviews: 0,
    offers: 0,
  });
});

it("excludes rejected from active", () => {
  const apps = [{ status: "Applied" }, { status: "Rejected" }];
  expect(calculateStats(apps).active).toBe(1);
});

it("counts total, interviews and offers", () => {
  const apps = [
    { status: "Applied" },
    { status: "Interview" },
    { status: "Interview" },
    { status: "Offer" },
    { status: "Rejected" },
  ];
  expect(calculateStats(apps)).toEqual({
    total: 5,
    active: 4,
    interviews: 2,
    offers: 1,
  });
});

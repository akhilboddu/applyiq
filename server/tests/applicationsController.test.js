const {
  createApplicationController,
} = require("../src/controllers/applications");

// Mirrors every method the real applicationRepository exposes
// (src/repositories/applicationRepository.js) — same names, same arity.
// The controller is built around a repo it receives, so no Prisma, no DB.
const fakeRepo = {
  findByUser: (userId) =>
    Promise.resolve([
      { id: "a1", userId, companyName: "Test Corp", status: "Applied" },
    ]),
  findOwned: (id, userId) =>
    Promise.resolve({ id, userId, companyName: "Test Corp", status: "Applied" }),
  create: (data) => Promise.resolve({ id: "a99", ...data }),
  update: (id, data) => Promise.resolve({ id, ...data }),
  remove: (id) => Promise.resolve({ id }),
  // create() calls this — without the stub the action throws TypeError.
  logActivity: jest.fn(),
  saveCoverLetter: jest.fn(),
};

describe("applications controller", () => {
  const controller = createApplicationController(fakeRepo);

  it("returns the user's applications as JSON", async () => {
    const req = { user: { id: "u1" } };
    // set() is part of the real Express response — list now stamps an
    // X-Cache header on it, so the double has to carry it too.
    const res = { json: jest.fn(), set: jest.fn() };

    await controller.list(req, res);

    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({ companyName: "Test Corp" }),
    ]);
  });
});

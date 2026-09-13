const {
  createApplicationController,
} = require("../src/controllers/applications");
const cacheService = require("../src/lib/cacheService");

const APPS = [{ id: "a1", companyName: "Test Corp", status: "Applied" }];

const makeRepo = () => ({
  findByUser: jest.fn().mockResolvedValue(APPS),
  findOwned: jest.fn().mockResolvedValue(APPS[0]),
  create: jest.fn().mockResolvedValue({ id: "a99" }),
  update: jest.fn().mockResolvedValue({ id: "a1" }),
  remove: jest.fn().mockResolvedValue({ id: "a1" }),
  logActivity: jest.fn(),
  saveCoverLetter: jest.fn(),
});

const makeRes = () => ({
  json: jest.fn(),
  set: jest.fn(),
  status: jest.fn().mockReturnThis(),
  end: jest.fn(),
});

const req = { user: { id: "u1" }, body: {} };

// The cache is process-wide, so a leftover entry from one test would make the
// next one pass for the wrong reason.
beforeEach(() => {
  cacheService.invalidatePattern("applications:");
});

describe("list caching", () => {
  it("hits the repo once across two list calls", async () => {
    const repo = makeRepo();
    const controller = createApplicationController(repo, cacheService);

    await controller.list(req, makeRes());
    await controller.list(req, makeRes());

    expect(repo.findByUser).toHaveBeenCalledTimes(1);
  });
});

describe("create invalidation", () => {
  it("forces the next list back to the repo", async () => {
    const repo = makeRepo();
    const controller = createApplicationController(repo, cacheService);

    await controller.list(req, makeRes()); // populates the cache
    expect(repo.findByUser).toHaveBeenCalledTimes(1);

    await controller.create(req, makeRes()); // evicts it
    await controller.list(req, makeRes());

    expect(repo.findByUser).toHaveBeenCalledTimes(2);
  });
});

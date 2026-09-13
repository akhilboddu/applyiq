const {
  applicationRepository,
} = require("../src/repositories/applicationRepository");

// The repository is a factory: applicationRepository(prisma) -> object.
// routes/applications.js calls it with the real client (line 12); here we
// hand it a fake, so we assert on the query the repo builds, not on a DB.
const makeFakePrisma = () => ({
  application: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  activity: { create: jest.fn() },
  coverLetter: { create: jest.fn() },
});

describe("applicationRepository", () => {
  it("findByUser queries findMany scoped to that user", () => {
    const prisma = makeFakePrisma();
    const repo = applicationRepository(prisma);

    repo.findByUser("u1");

    expect(prisma.application.findMany).toHaveBeenCalledWith({
      where: { userId: "u1" },
    });
  });
});

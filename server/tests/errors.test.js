const request = require("supertest");
const app = require("../src/app");
const prisma = require("../src/lib/prisma");
const {
  createApplicationController,
} = require("../src/controllers/applications");
const NotFoundError = require("../src/errors/NotFoundError");

const TEST_USER = {
  email: "errors-test@applyiq-test.com",
  password: "Password1",
  name: "Errors",
};

const removeTestUser = () =>
  prisma.user.deleteMany({ where: { email: TEST_USER.email } });

let token;

beforeAll(async () => {
  await removeTestUser();
  await request(app).post("/api/auth/register").send(TEST_USER);
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email: TEST_USER.email, password: TEST_USER.password });
  token = res.body.token;
});

afterAll(async () => {
  await removeTestUser();
  await prisma.$disconnect();
});

describe("not-found handling", () => {
  // The controller never touches res for this path — it throws, and
  // asyncHandler (routes/applications.js:23) hands the error to errorHandler.
  it("getOne rejects with NotFoundError when the record is not owned", async () => {
    const fakeRepo = {
      findByUser: jest.fn(),
      findOwned: () => Promise.resolve(null),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      logActivity: jest.fn(),
      saveCoverLetter: jest.fn(),
    };
    const controller = createApplicationController(fakeRepo);
    const req = { params: { id: "nope" }, user: { id: "u1" } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    await expect(controller.getOne(req, res)).rejects.toThrow(NotFoundError);
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  // End to end: NotFoundError.statusCode (404) is what errorHandler reads,
  // and a non-500 status means the real message is safe to return.
  it("GET /api/applications/:id returns 404 with the error message", async () => {
    const res = await request(app)
      .get("/api/applications/does-not-exist")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: "Application not found" });
  });
});

describe("auth guard", () => {
  it("GET /api/applications without a token returns 401", async () => {
    const res = await request(app).get("/api/applications");

    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  });
});

const request = require("supertest");
// app.js does `module.exports = app` — no braces, no named import.
// It also throws at require-time without CLIENT_URL, which tests/setup.js
// has already loaded from .env.test by the time this line runs.
const app = require("../src/app");
const prisma = require("../src/lib/prisma");

const TEST_USER = {
  // A real TLD on purpose: Joi's .email() checks the TLD against the ICANN
  // list, so a .test / .local address is rejected before it reaches the route.
  email: "integration-test@applyiq-test.com",
  password: "Password1",
  name: "Integration",
};

// Scoped to this one address so a cleanup can never touch anything else.
const removeTestUser = () =>
  prisma.user.deleteMany({ where: { email: TEST_USER.email } });

beforeAll(removeTestUser);

afterAll(async () => {
  await removeTestUser();
  await prisma.$disconnect();
});

describe("auth routes", () => {
  it("registers a user and returns 201 with the user, not a token", async () => {
    const res = await request(app).post("/api/auth/register").send(TEST_USER);

    expect(res.status).toBe(201);
    // controllers/auth.js selects { id, email, name } — the hash never leaves.
    expect(res.body).toEqual(
      expect.objectContaining({ email: TEST_USER.email, name: TEST_USER.name }),
    );
    expect(res.body.id).toBeDefined();
    expect(res.body.token).toBeUndefined();
    expect(res.body.password).toBeUndefined();
  });

  it("logs in with those credentials and returns 200 with a token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: TEST_USER.email, password: TEST_USER.password });

    expect(res.status).toBe(200);
    expect(typeof res.body.token).toBe("string");
  });

  it("returns 409 when the email is already registered", async () => {
    const res = await request(app).post("/api/auth/register").send(TEST_USER);

    expect(res.status).toBe(409);
    expect(res.body).toEqual({ error: "Email already registered" });
  });
});

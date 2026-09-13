const { registerSchema } = require("../src/schemas/auth.schema");

// Joi, not Zod: validate() returns { error, value }, and error.details is an
// array of { path, message }. abortEarly:false is what collects them all.
const validate = (value) =>
  registerSchema.validate(value, { abortEarly: false });

it("accepts a valid email and password", () => {
  const { error } = validate({ email: "a@b.com", password: "Password1" });
  expect(error).toBeUndefined();
});

it("rejects a missing email", () => {
  const { error } = validate({ password: "Password1" });
  expect(error).toBeDefined();
  expect(error.details.some((d) => d.path.includes("email"))).toBe(true);
});

it("rejects a 7-character password", () => {
  const { error } = validate({ email: "a@b.com", password: "Pass12x" });
  expect(error).toBeDefined();
  expect(error.details.some((d) => d.path.includes("password"))).toBe(true);
});

it("rejects a password with no uppercase letter", () => {
  const { error } = validate({ email: "a@b.com", password: "lowercase1" });
  expect(error).toBeDefined();
  expect(error.details[0].path).toContain("password");
});

it("reports BOTH failures at once with abortEarly:false", () => {
  const { error } = validate({ email: "not-an-email", password: "short" });
  expect(error.details.length).toBeGreaterThan(1);
  expect(error.details.some((d) => d.path.includes("email"))).toBe(true);
  expect(error.details.some((d) => d.path.includes("password"))).toBe(true);
});

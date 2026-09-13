// jest.config.js — CommonJS, like the rest of the server.
module.exports = {
  testEnvironment: "node",
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  coverageThreshold: {
    global: { lines: 70 },
  },
};

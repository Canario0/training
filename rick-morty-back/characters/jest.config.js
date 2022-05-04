/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest-ts-mock-config.ts"],
  globals: {
    "ts-jest": {
      compiler: "ttypescript",
      tsconfig: "tsconfig.test.json",
    },
  },
};

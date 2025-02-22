const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  testTimeout: 15000,
};
module.exports = {
    testEnvironment: "jsdom",  // ✅ Required for testing React components
    testMatch: [
      "**/__tests__/**/*.test.[jt]s?(x)", 
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    transform: {
      "^.+\\.tsx?$": "ts-jest" // ✅ Ensures TypeScript tests are processed correctly
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]
  };
  

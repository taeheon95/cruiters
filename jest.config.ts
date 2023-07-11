import type { Config } from "jest";

const config: Config = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "src",
  testRegex: [".*\\.test\\.ts", ".*\\.spec\\.ts"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coveragePathIgnorePatterns: [
    ".repository.ts",
    ".model.ts",
    ".module.ts",
    "src/test",
    "src/index.ts",
  ],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
};

export default config;

/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require("ts-jest");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePaths: ["./"],
    moduleNameMapper: pathsToModuleNameMapper({
        "@lib/*": ["src/lib/*"],
        "@middlewares/*": ["src/middlewares/*"],
    }),
};

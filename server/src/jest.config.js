// jest.config.js
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts'], // This assumes your test files are in the same directory as your source files and end with .spec.ts
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
    roots: ['<rootDir>/src'],
  };
  
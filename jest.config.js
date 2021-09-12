/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  roots: [
    './tests',
  ],
  testEnvironment: 'node',
  moduleFileExtensions: [
    "ts",
    "js"
],
};
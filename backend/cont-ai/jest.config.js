module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  reporters: [
    "default",
    ["jest-html-reporters", {
      publicPath: "./src/test-report",
      filename: "report.html",
      openReport: false,
    }]
  ]
};

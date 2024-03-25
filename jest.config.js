// jest.config.js

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  // rootDir: '.',
  roots: ['test.jest'],
  testEnvironment: 'node',
  transform: {'^.+\\.(t|j)s$': 'babel-jest'},
  testMatch: ['**/test.jest/**/*.test.js'],
};

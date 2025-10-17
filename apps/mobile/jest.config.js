module.exports = {
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/$1'
  },
  moduleFileExtensions: ['js', 'ts'],
  rootDir: '.',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  },
  collectCoverageFrom: ['**/*.(t|j)s', '!**/index.ts'],
  coveragePathIgnorePatterns: [
    'coverage',
    'node_modules',
    '.expo',
    'jest.config.js',
    'eslintrc.js',
    'babel.config.js'
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: 'coverage', outputName: 'junit.xml' }]
  ],
  coverageReporters: [
    'text',
    ['text', { file: 'coverage.txt' }],
    ['html'],
    ['json-summary', { file: 'coverage-summary.json' }]
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};

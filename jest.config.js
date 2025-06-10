// jest.config.js en la raíz del proyecto
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/__tests__/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/facturacion-autonomos/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testTimeout: 10000,
  // Esto es importante para resolver el problema de colisión
  modulePathIgnorePatterns: [
    '<rootDir>/facturacion-autonomos/',
    '<rootDir>/facturacion-autonomos.worktrees/',
    '<rootDir>/dist/'
  ]
};
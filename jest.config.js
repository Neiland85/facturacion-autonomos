module.exports = {
<<<<<<< Updated upstream
  // Directorio raíz para las pruebas
  roots: ['<rootDir>/src'],

  // Entorno de prueba
  testEnvironment: 'node',

  // Patrones para detectar archivos de prueba
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)'
  ],

  // Extensiones de archivo que Jest debe procesar
  moduleFileExtensions: ['js', 'json'],

  // Configuración de cobertura
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/'],

  // Transformaciones (eliminadas porque no se usa TypeScript)
  transform: {}
=======
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/__tests__/**/*.test.ts'],
>>>>>>> Stashed changes
};
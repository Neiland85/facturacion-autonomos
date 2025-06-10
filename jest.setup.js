// jest.setup.js
process.env.NODE_ENV = 'test';

// Limpiar mocks antes de cada test
beforeEach(() => {
  jest.clearAllMocks();
});

// Mock de prisma para las pruebas
jest.mock('./src/prisma/client', () => {
  return {
    prisma: {
      factura: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      }
    }
  };
});

// Mock de redis
jest.mock('./src/utils/redis', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn()
}));
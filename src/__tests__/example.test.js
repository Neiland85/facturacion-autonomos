jest.mock('../prisma/client', () => ({
  usuario: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  }
}));

// Este test verifica que la suma de 1 + 1 es igual a 2.
test('Verifica la suma básica', () => {
  expect(1 + 1).toBe(2);
});

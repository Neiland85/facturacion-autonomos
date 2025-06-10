// src/controllers/facturaController.js
const FacturaService = require('../services/FacturaService');
const facturaController = require('../controllers/facturaController');

jest.mock('../utils/redis', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn()
}));

describe('facturaController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    jest.clearAllMocks();
  });

  test('create - error de validación', async () => {
    jest.spyOn(FacturaService, 'validate').mockReturnValue({ error: { details: [{ message: 'Error' }] } });
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
  });

  test('create - error inesperado', async () => {
    jest.spyOn(FacturaService, 'validate').mockReturnValue({ error: null });
    jest.spyOn(FacturaService, 'create').mockRejectedValue(new Error('DB error'));
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear factura' });
  });

  test('create - éxito', async () => {
    jest.spyOn(FacturaService, 'validate').mockReturnValue({ error: null });
    jest.spyOn(FacturaService, 'create').mockResolvedValue({ id: 1, numero: 'F001' });
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, numero: 'F001' });
  });

  // Aplica lo mismo para el resto de métodos:
  // - getById
  // - getAll
  // - update
  // - delete
  // Usa jest.spyOn(FacturaService, 'metodo').mockResolvedValue(...) o mockRejectedValue según el caso.

  test('delete - éxito', async () => {
    req.params.id = 1;
    jest.spyOn(FacturaService, 'deleteFactura').mockResolvedValue();
    await facturaController.delete(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Factura eliminada' });
  });

  test('delete - factura no encontrada', async () => {
    req.params.id = 1;
    jest.spyOn(FacturaService, 'deleteFactura').mockRejectedValue({ code: 'P2025' });
    await facturaController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Factura no encontrada' });
  });

  test('delete - error inesperado', async () => {
    req.params.id = 1;
    jest.spyOn(FacturaService, 'deleteFactura').mockRejectedValue(new Error('DB error'));
    await facturaController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar factura' });
  });
});

// src/services/FacturaService.js
const prisma = require('../utils/prisma');

class FacturaService {
  // ...otros métodos...

  static async deleteFactura(id) {
    return prisma.factura.delete({ where: { id: Number(id) } });
  }

  // ...otros métodos...
}

module.exports = FacturaService;

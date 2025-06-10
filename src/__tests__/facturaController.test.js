// src/__tests__/facturaController.test.js
const FacturaService = require('../services/FacturaService');
const facturaController = require('../controllers/facturaController');

// Mock de redis
jest.mock('../utils/redis', () => ({
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn()
}));

// Mock del servicio de facturas
jest.mock('../services/FacturaService');

describe('facturaController', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {}, body: {}, query: {} };
    res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    jest.clearAllMocks();
  });

  test('create - error de validación', async () => {
    FacturaService.validate.mockReturnValue({ error: { details: [{ message: 'Error' }] } });
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
  });

  test('create - error inesperado', async () => {
    FacturaService.validate.mockReturnValue({ error: null });
    FacturaService.create.mockRejectedValue(new Error('DB error'));
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al crear factura' });
  });

  test('create - éxito', async () => {
    FacturaService.validate.mockReturnValue({ error: null });
    FacturaService.create.mockResolvedValue({ id: 1, numero: 'F001' });
    await facturaController.create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 1, numero: 'F001' });
  });

  test('getById - factura no encontrada', async () => {
    req.params.id = 123;
    FacturaService.getById.mockResolvedValue(null);
    await facturaController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Factura no encontrada' });
  });

  test('getById - error inesperado', async () => {
    req.params.id = 123;
    FacturaService.getById.mockRejectedValue(new Error('DB error'));
    await facturaController.getById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener factura' });
  });

  test('getAll - éxito', async () => {
    req.query = {};
    FacturaService.count.mockResolvedValue(1);
    FacturaService.getAllPaginated.mockResolvedValue([{ id: 1, numero: 'F001' }]);
    await facturaController.getAll(req, res);
    expect(res.json).toHaveBeenCalledWith({
      data: [{ id: 1, numero: 'F001' }],
      page: 1,
      pageSize: 100,
      total: 1,
      totalPages: 1
    });
  });

  test('getAll - error inesperado', async () => {
    FacturaService.getAllPaginated.mockRejectedValue(new Error('DB error'));
    await facturaController.getAll(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener facturas' });
  });

  test('update - error de validación', async () => {
    FacturaService.validate.mockReturnValue({ error: { details: [{ message: 'Error' }] } });
    await facturaController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error' });
  });

  test('update - factura no encontrada', async () => {
    FacturaService.validate.mockReturnValue({ error: null });
    const err = new Error();
    err.code = 'P2025';
    FacturaService.update.mockRejectedValue(err);
    await facturaController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Factura no encontrada' });
  });

  test('update - error inesperado', async () => {
    FacturaService.validate.mockReturnValue({ error: null });
    FacturaService.update.mockRejectedValue(new Error('DB error'));
    await facturaController.update(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al actualizar factura' });
  });

  test('delete - error inesperado', async () => {
    req.params.id = 123;
    FacturaService.deleteFactura.mockRejectedValue(new Error('DB error'));
    await facturaController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error al eliminar factura' });
  });

  test('delete - éxito', async () => {
    req.params.id = 123;
    FacturaService.deleteFactura.mockResolvedValue();
    await facturaController.delete(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Factura eliminada' });
  });

  test('delete - factura no encontrada', async () => {
    req.params.id = 123;
    const err = new Error();
    err.code = 'P2025';
    FacturaService.deleteFactura.mockRejectedValue(err);
    await facturaController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Factura no encontrada' });
  });
});
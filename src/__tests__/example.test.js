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

  test('delete - éxito', async () => {
    req.params.id = 123;
    jest.spyOn(FacturaService, 'deleteFactura').mockResolvedValue();
    await facturaController.delete(req, res);
    expect(res.json).toHaveBeenCalledWith({ message: 'Factura eliminada' });
  });

  test('delete - factura no encontrada', async () => {
    req.params.id = 123;
    const err = new Error();
    err.code = 'P2025';
    jest.spyOn(FacturaService, 'deleteFactura').mockRejectedValue(err);
    await facturaController.delete(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'Factura no encontrada' });
  });

  test('Verifica la suma básica', () => {
    expect(1 + 1).toBe(2);
  });
});

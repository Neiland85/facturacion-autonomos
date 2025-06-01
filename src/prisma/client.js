const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Esquema de validación para factura
const facturaSchema = {
  id: Number,
  numero: String,
  fecha: Date,
  total: Number
};

// Ejemplo de uso
function validateFactura(factura) {
  // Usa facturaSchema para validar la factura
  console.log('Validando factura:', factura);
}
validateFactura({ id: 1, numero: 'F001', fecha: new Date(), total: 100.0 });

exports.getAll = async (req, res) => {
  try {
    const facturas = await prisma.factura.findMany();
    res.json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
};

exports.getById = async (req, res) => {
  try {
    const factura = await prisma.factura.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    console.error('Error al obtener factura:', error);
    res.status(500).json({ error: 'Error al obtener factura' });
  }
};

// Pruebas unitarias
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    factura: {
      findMany: jest.fn(),
      findUnique: jest.fn()
    }
  }))
}));

test('Debe devolver una lista de facturas', async () => {
  prisma.factura.findMany.mockResolvedValue([{ id: 1, numero: 'F001' }]);
  const req = {};
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };

  await exports.getAll(req, res);

  expect(res.json).toHaveBeenCalledWith([{ id: 1, numero: 'F001' }]);
});

test('Debe devolver una factura por ID', async () => {
  prisma.factura.findUnique.mockResolvedValue({ id: 1, numero: 'F001' });
  const req = { params: { id: '1' } };
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis()
  };

  await exports.getById(req, res);

  expect(res.json).toHaveBeenCalledWith({ id: 1, numero: 'F001' });
});

// src/controllers/facturaController.js
const FacturaService = require('../services/FacturaService');

// Método para obtener todas las facturas
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 100;
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const [total, facturas] = await Promise.all([
      FacturaService.count(),
      FacturaService.getAllPaginated(skip, take)
    ]);

    res.json({
      data: facturas,
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    });
  } catch (error) {
    console.error('Error al obtener facturas:', error);
    res.status(500).json({ error: 'Error al obtener facturas' });
  }
};

// Método para obtener una factura por ID
exports.getById = async (req, res) => {
  try {
    const factura = await FacturaService.getById(req.params.id);
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    console.error('Error al obtener factura:', error);
    res.status(500).json({ error: 'Error al obtener factura' });
  }
};

// Método para crear una factura
exports.create = async (req, res) => {
  const { error } = FacturaService.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const factura = await FacturaService.create(req.body);
    res.status(201).json(factura);
  } catch (error) {
    console.error('Error al crear factura:', error);
    res.status(500).json({ error: 'Error al crear factura' });
  }
};

// Método para actualizar una factura
exports.update = async (req, res) => {
  const { error } = FacturaService.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const factura = await FacturaService.update(req.params.id, req.body);
    if (!factura) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json(factura);
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    console.error('Error al actualizar factura:', err);
    res.status(500).json({ error: 'Error al actualizar factura' });
  }
};

// Método para eliminar una factura
exports.delete = async (req, res) => {
  try {
    const result = await FacturaService.deleteFactura(req.params.id);
    if (!result) return res.status(404).json({ error: 'Factura no encontrada' });
    res.json({ message: 'Factura eliminada' });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Factura no encontrada' });
    }
    console.error('Error al eliminar factura:', err);
    res.status(500).json({ error: 'Error al eliminar factura' });
  }
};
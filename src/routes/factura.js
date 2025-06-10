const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');
const Joi = require('joi');

// Middleware de validación para factura
const facturaSchema = Joi.object({
  numero: Joi.string().alphanum().min(3).max(20).required(),
  fecha: Joi.date().iso().required(),
  total: Joi.number().min(0).max(1000000).required(),
  usuarioId: Joi.number().integer().positive().required(),
  clienteId: Joi.number().integer().positive().required(),
  pdfUrl: Joi.string().uri().allow(null, ''),
  concepto: Joi.string().min(3).max(200).optional(),
  estado: Joi.string().valid('pendiente', 'pagada', 'anulada').optional(),
  notas: Joi.string().max(500).optional()
});

function validateFactura(req, res, next) {
  const { error } = facturaSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}

router.get('/', facturaController.getAll);
router.get('/:id', facturaController.getById);
router.post('/', validateFactura, facturaController.create);
router.put('/:id', validateFactura, facturaController.update);
router.delete('/:id', facturaController.delete);

module.exports = router;

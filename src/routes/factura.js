const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');
const Joi = require('joi');
const validate = require('../middlewares/validate');

/**
 * @swagger
 * tags:
 *   name: Facturas
 *   description: Gestión de facturas
 */

/**
 * @swagger
 * /facturas:
 *   get:
 *     summary: Obtiene todas las facturas
 *     tags: [Facturas]
 *     responses:
 *       200:
 *         description: Lista de facturas
 *   post:
 *     summary: Crea una nueva factura
 *     tags: [Facturas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               total:
 *                 type: number
 *               concepto:
 *                 type: string
 *               pagada:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Factura creada
 */

/**
 * @swagger
 * /facturas/{id}:
 *   get:
 *     summary: Obtiene una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       200:
 *         description: Factura encontrada
 *       404:
 *         description: Factura no encontrada
 *   put:
 *     summary: Actualiza una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               total:
 *                 type: number
 *               concepto:
 *                 type: string
 *               pagada:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Factura actualizada
 *       404:
 *         description: Factura no encontrada
 *   delete:
 *     summary: Elimina una factura por ID
 *     tags: [Facturas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la factura
 *     responses:
 *       204:
 *         description: Factura eliminada
 *       404:
 *         description: Factura no encontrada
 */

// Esquema de validación para factura
const facturaSchema = Joi.object({
  clienteId: Joi.number().integer().required(),
  fecha: Joi.date().required(),
  total: Joi.number().positive().required(),
  concepto: Joi.string().min(3).max(255).required(),
  pagada: Joi.boolean().optional(),
});

// Rutas de factura
router.get('/', async (req, res, next) => {
  try {
    await facturaController.getAll(req, res);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    await facturaController.getById(req, res);
  } catch (err) {
    next(err);
  }
});

router.post('/', validate({ body: facturaSchema }), async (req, res, next) => {
  try {
    await facturaController.create(req, res);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validate({ body: facturaSchema }), async (req, res, next) => {
  try {
    await facturaController.update(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await facturaController.delete(req, res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

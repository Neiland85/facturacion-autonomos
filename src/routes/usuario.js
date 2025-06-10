const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const Joi = require('joi');

// Middleware de validación para usuario
const usuarioSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(/[A-Z]/, 'mayúscula')
    .pattern(/[a-z]/, 'minúscula')
    .pattern(/[0-9]/, 'número')
    .pattern(/[^A-Za-z0-9]/, 'carácter especial')
    .required(),
  telefono: Joi.string().pattern(/^\+?\d{9,15}$/).optional(),
  rol: Joi.string().valid('admin', 'usuario', 'cliente').optional()
});

function validateUsuario(req, res, next) {
  const { error } = usuarioSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
}

router.get('/', usuarioController.getAll);
router.get('/:id', usuarioController.getById);
router.post('/', validateUsuario, usuarioController.create);
router.put('/:id', validateUsuario, usuarioController.update);
router.delete('/:id', usuarioController.delete);

module.exports = router;

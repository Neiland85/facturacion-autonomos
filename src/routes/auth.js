// src/routes/auth.js
const express = require('express');
const { validateSchema } = require('../middlewares/validate');
const UserService = require('../services/UserService');
const Joi = require('joi');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Esquemas de validación
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
  role: Joi.string().valid('admin', 'user')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Ruta para registro
router.post('/register', validateSchema(registerSchema), async (req, res) => {
  try {
    const result = await UserService.register(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Ruta para login
router.post('/login', validateSchema(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await UserService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// Ruta protegida para obtener perfil
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await UserService.getProfile(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;

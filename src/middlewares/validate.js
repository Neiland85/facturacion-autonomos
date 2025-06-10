const Joi = require('joi');

const clienteSchema = Joi.object({
  nombre: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  direccion: Joi.string().min(5).max(200).required(),
  telefono: Joi.string().pattern(/^\+?\d{9,15}$/).optional(),
  fechaNacimiento: Joi.date().iso().less('now').optional(),
  monto: Joi.number().min(0).max(1000000).optional(),
  rfc: Joi.string().pattern(/^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/i).optional(),
  notas: Joi.string().max(500).optional(),
  codigoPostal: Joi.string().pattern(/^\d{5}$/).optional(),
  ciudad: Joi.string().min(2).max(100).optional(),
  provincia: Joi.string().min(2).max(100).optional(),
  pais: Joi.string().min(2).max(100).optional(),
  activo: Joi.boolean().optional(),
  fechaRegistro: Joi.date().iso().optional(),
  tipoCliente: Joi.string().valid('autonomo', 'empresa', 'particular').optional(),
   razonSocial: Joi.string().min(2).max(150).optional(),
  web: Joi.string().uri().optional(),
  contacto: Joi.string().min(2).max(100).optional()
});

function validateCliente(req, res, next) {
  const { error } = clienteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
}

module.exports = validateCliente;

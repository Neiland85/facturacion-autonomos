// src/config/jwt.js
const jwt = require('jsonwebtoken');

// Obtener la clave secreta desde las variables de entorno
// Si no existe, usa una predeterminada (solo para desarrollo)
const JWT_SECRET = process.env.JWT_SECRET || 'tu_clave_secreta_temporal_CAMBIAR_EN_PRODUCCION';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

/**
 * Genera un token JWT para un usuario
 * @param {Object} payload - Datos a incluir en el token
 * @returns {string} Token JWT
 */
function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica un token JWT
 * @param {string} token - Token JWT a verificar
 * @returns {Object|null} Datos del token o null si es inválido
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken,
  JWT_SECRET,
  JWT_EXPIRES_IN
};

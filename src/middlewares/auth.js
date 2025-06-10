// src/middlewares/auth.js
const { verifyToken } = require('../config/jwt');

/**
 * Middleware para proteger rutas que requieren autenticación
 */
const authenticate = (req, res, next) => {
  // Obtener el token del encabezado Authorization
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Acceso no autorizado' });
  }

  // Extraer el token
  const token = authHeader.split(' ')[1];
  
  // Verificar el token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
  
  // Añadir el usuario al objeto request para uso posterior
  req.user = decoded;
  
  next();
};

/**
 * Middleware para verificar roles
 * @param {Array<string>} roles - Roles permitidos
 */
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuario no autenticado' });
    }
    
    if (roles.length && !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'No tienes permisos para esta acción' });
    }
    
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};

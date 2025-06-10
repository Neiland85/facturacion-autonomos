function errorHandler(err, req, res, next) {
  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
}

module.exports = errorHandler;

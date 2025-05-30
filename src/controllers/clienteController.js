const prisma = require('../prisma/client');

const handleError = (error, res, next) => {
  if (error.code === 'P2025') {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  next(error);
};

exports.getAllClientes = async (req, res, next) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    handleError(error, res, next);
  }
};
const prisma = require('../prisma/client');

const handleError = (error, res) => {
  if (error.code === 'P2025') {
    return res.status(404).json({ error: 'Registro no encontrado' });
  }
  res.status(500).json({ error: 'Error interno del servidor' });
};

exports.getAll = async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany();
    res.json(clientes);
  } catch (error) {
    handleError(error, res);
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(cliente);
  } catch (error) {
    handleError(error, res);
  }
};
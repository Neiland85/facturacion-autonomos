const ClienteService = require('../services/clienteService');
const prisma = require('../prisma/client');
const clienteService = new ClienteService(prisma);

exports.getAll = async (req, res) => {
  try {
    const clientes = await clienteService.getAllClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.getById = async (req, res) => {
  try {
    const cliente = await clienteService.getClienteById(Number(req.params.id));
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cliente' });
  }
};

// ...y así para create, update, delete
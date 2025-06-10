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

exports.create = async (req, res) => {
  try {
    const cliente = await clienteService.createCliente(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};

exports.update = async (req, res) => {
  try {
    const cliente = await clienteService.updateCliente(Number(req.params.id), req.body);
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar cliente' });
  }
};

exports.delete = async (req, res) => {
  try {
    const cliente = await clienteService.deleteCliente(Number(req.params.id));
    if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });
    res.json({ mensaje: 'Cliente eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar cliente' });
  }
};
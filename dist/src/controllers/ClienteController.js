"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteController = void 0;
const ClienteService_1 = require("../services/ClienteService");
class ClienteController {
    constructor() {
        this.clienteService = new ClienteService_1.ClienteService();
    }
    crearCliente(req, res) {
        const cliente = this.clienteService.crearCliente(req.body);
        res.status(201).json(cliente);
    }
    obtenerCliente(req, res) {
        const cliente = this.clienteService.obtenerClientePorId(parseInt(req.params.id));
        if (cliente) {
            res.json(cliente);
        }
        else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    }
    listarClientes(req, res) {
        res.json(this.clienteService.listarClientes());
    }
}
exports.ClienteController = ClienteController;

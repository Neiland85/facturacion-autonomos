"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
class ClienteService {
    constructor() {
        this.clientes = [];
    }
    crearCliente(cliente) {
        cliente.id = Date.now();
        this.clientes.push(cliente);
        return cliente;
    }
    obtenerClientePorId(id) {
        return this.clientes.find(cliente => cliente.id === id);
    }
    listarClientes() {
        return this.clientes;
    }
}
exports.ClienteService = ClienteService;

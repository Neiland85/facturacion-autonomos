import { Cliente } from '../models/Cliente';

export class ClienteService {
  private clientes: Cliente[] = [];

  crearCliente(cliente: Cliente): Cliente {
    cliente.id = Date.now();
    this.clientes.push(cliente);
    return cliente;
  }

  obtenerClientePorId(id: number): Cliente | undefined {
    return this.clientes.find(cliente => cliente.id === id);
  }

  listarClientes(): Cliente[] {
    return this.clientes;
  }
}

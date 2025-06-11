import { Request, Response } from "express";
import { Cliente } from "../models/Cliente";

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

class ClienteController {
  private clientes: Cliente[] = [];

  crearCliente(cliente: Cliente): Cliente {
    cliente.id = Date.now();
    this.clientes.push(cliente);
    return cliente;
  }

  handleCrearCliente(req: Request, res: Response): void {
    const { nombre, email, telefono, direccion } = req.body;

    // Validar que todas las propiedades necesarias estén presentes
    if (!nombre || !email || !telefono || !direccion) {
      res.status(400).send("Faltan datos del cliente");
      return;
    }

    const cliente: Cliente = {
      nombre, email, telefono, direccion,
      id: 0,
      1234: undefined,
      Nayara: undefined
    };
    const nuevoCliente = this.crearCliente(cliente);

    res.status(201).json(nuevoCliente);
  }
}

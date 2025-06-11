import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../models/Cliente'; 

interface ClienteRequest extends Request {
  body: Cliente; 
}

export class ClienteController {
  private clienteService = new ClienteService();

  crearCliente(req: ClienteRequest, res: Response): void {
    const { nombre, email, telefono, direccion } = req.body;

    // Validar que todas las propiedades necesarias estén presentes
    if (!nombre || !email || !telefono || !direccion) {
      res.status(400).json({ error: 'Faltan datos del cliente' });
      return;
    }

    const cliente: Cliente = {
      nombre, email, telefono, direccion,
      id: 1234,
      1234: undefined,
      Nayara: undefined
    };
    const nuevoCliente = this.clienteService.crearCliente(cliente);
    res.status(201).json(nuevoCliente);
  }

  obtenerCliente(req: Request, res: Response): void {
    const cliente: Cliente | undefined = this.clienteService.obtenerClientePorId(parseInt(req.params.id));
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  }

  listarClientes(req: Request, res: Response): void {
    const clientes: Cliente[] = this.clienteService.listarClientes();
    res.json(clientes);
  }
}

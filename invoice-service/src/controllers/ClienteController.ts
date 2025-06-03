import { Request, Response } from 'express';
import { ClienteService } from '../services/ClienteService';

export class ClienteController {
  private clienteService = new ClienteService();

  crearCliente(req: Request, res: Response): void {
    const cliente = this.clienteService.crearCliente(req.body);
    res.status(201).json(cliente);
  }

  obtenerCliente(req: Request, res: Response): void {
    const cliente = this.clienteService.obtenerClientePorId(parseInt(req.params.id));
    if (cliente) {
      res.json(cliente);
    } else {
      res.status(404).json({ error: 'Cliente no encontrado' });
    }
  }

  listarClientes(req: Request, res: Response): void {
    res.json(this.clienteService.listarClientes());
  }
}

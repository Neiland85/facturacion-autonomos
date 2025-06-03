import { Request, Response } from 'express';
import { UsuarioService } from '../services/UsuarioService';

export class UsuarioController {
  private usuarioService = new UsuarioService();

  crearUsuario(req: Request, res: Response): void {
    const usuario = this.usuarioService.crearUsuario(req.body);
    res.status(201).json(usuario);
  }

  obtenerUsuario(req: Request, res: Response): void {
    const usuario = this.usuarioService.obtenerUsuarioPorId(parseInt(req.params.id));
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  }

  listarUsuarios(req: Request, res: Response): void {
    res.json(this.usuarioService.listarUsuarios());
  }
}

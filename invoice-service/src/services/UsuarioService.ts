import { Usuario } from '../models/Usuario';

export class UsuarioService {
  private usuarios: Usuario[] = [];

  crearUsuario(usuario: Usuario): Usuario {
    usuario.id = Date.now();
    usuario.fechaRegistro = new Date();
    this.usuarios.push(usuario);
    return usuario;
  }

  obtenerUsuarioPorId(id: number): Usuario | undefined {
    return this.usuarios.find(usuario => usuario.id === id);
  }

  listarUsuarios(): Usuario[] {
    return this.usuarios;
  }
}

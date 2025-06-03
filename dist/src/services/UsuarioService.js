"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
class UsuarioService {
    constructor() {
        this.usuarios = [];
    }
    crearUsuario(usuario) {
        usuario.id = Date.now();
        usuario.fechaRegistro = new Date();
        this.usuarios.push(usuario);
        return usuario;
    }
    obtenerUsuarioPorId(id) {
        return this.usuarios.find(usuario => usuario.id === id);
    }
    listarUsuarios() {
        return this.usuarios;
    }
}
exports.UsuarioService = UsuarioService;

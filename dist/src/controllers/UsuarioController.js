"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../services/UsuarioService");
class UsuarioController {
    constructor() {
        this.usuarioService = new UsuarioService_1.UsuarioService();
    }
    crearUsuario(req, res) {
        const usuario = this.usuarioService.crearUsuario(req.body);
        res.status(201).json(usuario);
    }
    obtenerUsuario(req, res) {
        const usuario = this.usuarioService.obtenerUsuarioPorId(parseInt(req.params.id));
        if (usuario) {
            res.json(usuario);
        }
        else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    }
    listarUsuarios(req, res) {
        res.json(this.usuarioService.listarUsuarios());
    }
}
exports.UsuarioController = UsuarioController;

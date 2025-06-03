import { Router } from 'express';
import { UsuarioController } from '../controllers/UsuarioController';

const router = Router();
const usuarioController = new UsuarioController();

router.post('/', (req, res) => usuarioController.crearUsuario(req, res));
router.get('/:id', (req, res) => usuarioController.obtenerUsuario(req, res));
router.get('/', (req, res) => usuarioController.listarUsuarios(req, res));

export default router;

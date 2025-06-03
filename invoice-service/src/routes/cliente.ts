import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();
const clienteController = new ClienteController();

router.post('/', (req, res) => clienteController.crearCliente(req, res));
router.get('/:id', (req, res) => clienteController.obtenerCliente(req, res));
router.get('/', (req, res) => clienteController.listarClientes(req, res));

export default router;

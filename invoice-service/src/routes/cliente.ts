import { Router } from 'express';
import { ClienteController } from '../controllers/ClienteController';

const router = Router();
const clienteController = new ClienteController();

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Obtiene todos los clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 */
router.get('/clientes', clienteController.listarClientes);

router.post('/', (req, res) => clienteController.crearCliente(req, res));
router.get('/:id', (req, res) => clienteController.obtenerCliente(req, res));

export default router;

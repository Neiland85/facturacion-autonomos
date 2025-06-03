import { Router } from 'express';
import { FirmaController } from '../controllers/FirmaController';

const router = Router();
const firmaController = new FirmaController();

router.post('/', (req, res) => firmaController.firmarFactura(req, res));
router.get('/:facturaId', (req, res) => firmaController.obtenerFirma(req, res));

export default router;

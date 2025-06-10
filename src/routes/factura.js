const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');
const validateFactura = require('../middlewares/validate');

router.get('/', facturaController.getAll);
router.get('/:id', facturaController.getById);
router.post('/', validateFactura, facturaController.create);
router.put('/:id', validateFactura, facturaController.update);
router.delete('/:id', facturaController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/facturaController');

router.get('/', facturaController.getAll);
router.get('/stream', facturaController.streamAll);

module.exports = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FirmaController_1 = require("../controllers/FirmaController");
const router = (0, express_1.Router)();
const firmaController = new FirmaController_1.FirmaController();
router.post('/', (req, res) => firmaController.firmarFactura(req, res));
router.get('/:facturaId', (req, res) => firmaController.obtenerFirma(req, res));
exports.default = router;

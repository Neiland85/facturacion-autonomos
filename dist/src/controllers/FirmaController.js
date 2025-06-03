"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirmaController = void 0;
const FirmaService_1 = require("../services/FirmaService");
class FirmaController {
    constructor() {
        this.firmaService = new FirmaService_1.FirmaService();
    }
    firmarFactura(req, res) {
        const { facturaId, hash } = req.body;
        const firma = this.firmaService.firmarFactura(facturaId, hash);
        res.status(201).json(firma);
    }
    obtenerFirma(req, res) {
        const firma = this.firmaService.obtenerFirmaPorFacturaId(parseInt(req.params.facturaId));
        if (firma) {
            res.json(firma);
        }
        else {
            res.status(404).json({ error: 'Firma no encontrada' });
        }
    }
}
exports.FirmaController = FirmaController;

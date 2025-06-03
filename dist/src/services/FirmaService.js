"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirmaService = void 0;
class FirmaService {
    constructor() {
        this.firmas = [];
    }
    firmarFactura(facturaId, hash) {
        const firma = {
            id: Date.now(),
            facturaId,
            fechaFirma: new Date(),
            hash,
        };
        this.firmas.push(firma);
        return firma;
    }
    obtenerFirmaPorFacturaId(facturaId) {
        return this.firmas.find(firma => firma.facturaId === facturaId);
    }
}
exports.FirmaService = FirmaService;

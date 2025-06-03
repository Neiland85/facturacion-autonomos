"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
class InvoiceController {
    async getInvoices(req, res) {
        try {
            res.json({ message: 'Obtener facturas' });
        }
        catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
}
exports.InvoiceController = InvoiceController;

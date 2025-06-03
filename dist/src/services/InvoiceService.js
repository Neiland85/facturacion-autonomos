"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: () => m[k] };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const xml2js = __importStar(require("xml2js"));
const crypto_1 = require("crypto");
class InvoiceService {
    /**
     * Genera un hash único para una factura.
     * @param invoiceData Datos de la factura en formato JSON.
     * @returns Hash generado.
     */
    generateInvoiceHash(invoiceData) {
        const hash = (0, crypto_1.createHash)('sha256');
        hash.update(invoiceData);
        return hash.digest('hex');
    }
    /**
     * Genera un XML válido para una factura.
     * @param invoiceData Datos de la factura.
     * @returns XML generado como string.
     */
    async generateXmlInvoice(invoiceData) {
        try {
            const builder = new xml2js.Builder({
                xmldec: { version: '1.0', encoding: 'UTF-8' },
                renderOpts: { pretty: true, indent: '  ', newline: '\n' },
                rootName: 'fe:Facturae', // Define el nombre raíz con el namespace
            });
            return builder.buildObject(invoiceData);
        }
        catch (error) {
            console.error('Error generating XML:', error);
            throw new Error('Failed to generate XML invoice');
        }
    }
    /**
     * Analiza un archivo XML de factura y devuelve un objeto JavaScript.
     * @param xmlData Contenido XML como string.
     * @returns Objeto JS parseado del XML.
     */
    async parseXmlInvoice(xmlData) {
        const parser = new xml2js.Parser({ explicitArray: false });
        return new Promise((resolve, reject) => {
            parser.parseString(xmlData, (err, result) => {
                if (err) {
                    reject(new Error('Failed to parse XML invoice'));
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    /**
     * Sanitiza un nombre eliminando caracteres no permitidos.
     * @param name Nombre a sanitizar.
     * @returns Nombre sanitizado.
     */
    sanitizeName(name) {
        return name
            .replace(/[^a-zA-Z0-9\s]/g, '') // Elimina caracteres no alfanuméricos excepto espacios
            .replace(/\s+/g, ' ') // Reemplaza múltiples espacios por uno solo
            .trim(); // Elimina espacios al inicio y al final
    }
    /**
     * Genera un nombre de archivo para una factura PDF.
     * @param invoiceData Datos de la factura.
     * @returns Nombre de archivo generado.
     */
    generatePdfFileName(invoiceData) {
        const hash = this.generateInvoiceHash(JSON.stringify(invoiceData));
        return `${invoiceData.numeroFactura}_${invoiceData.fechaEmision}_${hash}.pdf`;
    }
}
exports.InvoiceService = InvoiceService;

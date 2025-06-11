import { createHash } from 'crypto';
import * as xml2js from xml2js; 

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  fechaRegistro: Date;
}
export class InvoiceService {
  /**
   * Analiza un archivo XML de factura y devuelve un objeto JavaScript.
   * @param xmlData Contenido XML como string.
   * @returns Objeto JS parseado del XML.
   */
  async parseXmlInvoice(xmlData: string): Promise<any> {
    const parser = new xml2js.Parser({ explicitArray: false });
    return new Promise((resolve, reject) => {
      parser.parseString(xmlData, (err, result) => {
        if (err) {
          reject(new Error('Failed to parse XML invoice'));
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Genera un XML a partir de datos de factura.
   * @param invoiceData Datos de la factura.
   * @returns String con el XML generado.
   */
  async generateXmlInvoice(invoiceData: any): Promise<string> {
    const builder = new xml2js.Builder({
      xmldec: { version: '1.0', encoding: 'UTF-8' },
      renderOpts: { pretty: true, indent: '  ' },
    });
    return builder.buildObject(invoiceData);
  }

  /**
   * Genera un hash único para una factura.
   * @param invoiceData Datos de la factura en string.
   * @returns Hash generado.
   */
  generateInvoiceHash(invoiceData: string): string {
    const hash = createHash('sha256');
    hash.update(invoiceData);
    return hash.digest('hex');
  }

  /**
   * Sanitiza un nombre eliminando caracteres no permitidos.
   * @param name Nombre a sanitizar.
   * @returns Nombre sanitizado.
   */
  sanitizeName(name: string): string {
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
  generatePdfFileName(invoiceData: any): string {
    const hash = this.generateInvoiceHash(JSON.stringify(invoiceData));
    return `${invoiceData.numeroFactura}_${invoiceData.fechaEmision}_${hash}.pdf`;
  }
}

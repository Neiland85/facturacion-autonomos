import { InvoiceService } from '../src/models/Usuario';

describe('InvoiceService', () => {
  let invoiceService: InvoiceService;

  beforeEach(() => {
    invoiceService = new InvoiceService();
  });

  describe('Hash generation', () => {
    test('Debe generar un hash válido para una factura', () => {
      const invoiceData = JSON.stringify({ concepto: 'Servicio de consultoría', importe: 100 });
      const hash = invoiceService.generateInvoiceHash(invoiceData);

      expect(hash).toBeDefined();
      expect(hash).toHaveLength(64); // SHA-256 genera hashes de 64 caracteres
    });
  });

  describe('XML generation', () => {
    test('Debe generar un XML válido para una factura', async () => {
      const invoiceData = {
        numeroFactura: 'FAC-001',
        fechaEmision: '2025-06-03',
        conceptos: [
          { descripcion: 'Servicio de consultoría', cantidad: 1, precioUnitario: 100 },
        ],
      };

      const xml = await invoiceService.generateXmlInvoice(invoiceData);
      expect(xml).toContain('<InvoiceNumber>FAC-001</InvoiceNumber>');
      expect(xml).toContain('<IssueDate>2025-06-03</IssueDate>'); 
      expect(xml).toContain('<Description>Servicio de consultoría</Description>'); 
    });

    test('Debe lanzar un error al intentar parsear un XML inválido', async () => {
      const invalidXml = '<factura><concepto>Servicio</concepto>'; // XML inválido

      await expect(invoiceService.parseXmlInvoice(invalidXml)).rejects.toThrow(
        'Failed to parse XML invoice'
      );
    });
  });

  describe('Name sanitization', () => {
    test('Debe sanitizar el nombre correctamente', () => {
      const name = 'Factura: Servicios & Consultoría';
      const sanitized = invoiceService.sanitizeName(name);
      expect(sanitized).toBe('Factura Servicios Consultoría');
    });
  });

  describe('PDF file name generation', () => {
    test('Debe generar un nombre de archivo válido', () => {
      const invoiceData = {
        numeroFactura: 'FAC-001',
        fechaEmision: '2025-06-03',
        conceptos: [
          { descripcion: 'Servicio de consultoría', cantidad: 1, precioUnitario: 100 },
        ],
      };
      const fileName = invoiceService.generatePdfFileName(invoiceData);

      expect(fileName).toMatch(/^FAC-001_2025-06-03_[a-f0-9]{64}\.pdf$/);
    });
  });
});

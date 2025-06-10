// src/dto/facturae.dto.js
const { z } = require('zod');

const TaxIdentificationSchema = z.object({
  PersonTypeCode: z.enum(['F', 'J']), // F: Física, J: Jurídica
  ResidenceTypeCode: z.enum(['R', 'E']), // R: Residente, E: Extranjero
  TaxIdentificationNumber: z.string().min(1)
});

const LegalEntitySchema = z.object({
  CorporateName: z.string().min(1)
});

const PartySchema = z.object({
  TaxIdentification: TaxIdentificationSchema,
  LegalEntity: LegalEntitySchema
});

const InvoiceTotalsSchema = z.object({
  TotalGrossAmount: z.number(),
  TotalTaxOutputs: z.number(),
  TotalInvoiceAmount: z.number()
});

const InvoiceSchema = z.object({
  InvoiceNumber: z.string(),
  InvoiceSeriesCode: z.string().optional(),
  InvoiceDocumentType: z.enum(['FC', 'RECTIFICATIVA', 'OTRO']).default('FC'),
  InvoiceClass: z.enum(['OO', 'OC', 'CO', 'CC']).default('OO'),
  IssueDate: z.string(), // ISO date
  InvoiceTotals: InvoiceTotalsSchema
});

const FacturaeDTO = z.object({
  Facturae: z.object({
    FileHeader: z.object({
      SchemaVersion: z.literal('4.2'),
      Modality: z.enum(['I', 'S']),
      InvoiceIssuerType: z.enum(['EM', 'RE', 'TE', 'AE'])
    }),
    Parties: z.object({
      SellerParty: PartySchema,
      BuyerParty: PartySchema
    }),
    Invoices: z.object({
      Invoice: InvoiceSchema
    })
  })
});

/**
 * Genera un objeto factura para exportar a formato AEAT (Facturae 4.2)
 * @param {Object} factura - Datos de la factura
 * @returns {Object} Objeto formateado para AEAT
 */
function exportarFacturaAEAT(factura) {
  // 1. Genera el objeto con la estructura AEAT (Facturae 4.2)
  const aeatObj = {
    Facturae: {
      FileHeader: {
        SchemaVersion: '4.2',
        Modality: 'I',
        InvoiceIssuerType: 'EM'
      },
      Parties: {
        SellerParty: {
          TaxIdentification: {
            PersonTypeCode: 'J',
            ResidenceTypeCode: 'R',
            TaxIdentificationNumber: factura.issuerNIF
          },
          LegalEntity: {
            CorporateName: factura.issuerName
          }
        },
        BuyerParty: {
          TaxIdentification: {
            PersonTypeCode: 'J',
            ResidenceTypeCode: 'R',
            TaxIdentificationNumber: factura.clientNIF
          },
          LegalEntity: {
            CorporateName: factura.clientName
          }
        }
      },
      Invoices: {
        Invoice: {
          InvoiceNumber: factura.numero,
          InvoiceSeriesCode: factura.serie || '',
          InvoiceDocumentType: 'FC',
          InvoiceClass: 'OO',
          IssueDate: factura.fecha,
          InvoiceTotals: {
            TotalGrossAmount: factura.total,
            TotalTaxOutputs: factura.impuestos,
            TotalInvoiceAmount: factura.totalFinal
          }
        }
      }
    }
  };

  // 2. Valida el objeto con Zod (esto lanza si no es válido)
  FacturaeDTO.parse(aeatObj);

  // 3. Si es válido, continúa con la exportación (por ejemplo, a XML)
  return aeatObj;
}

module.exports = { 
  FacturaeDTO,
  exportarFacturaAEAT 
};
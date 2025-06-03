// models/Invoice.ts
interface Invoice {
  serie: string;
  numero: string;
  fecha: string;
  concepto: string;
  importe: number;
  hash: string;
  hashAnterior: string | null;
}

export default Invoice;

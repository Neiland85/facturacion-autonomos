import { Firma } from '../models/Firma';

export class FirmaService {
  private firmas: Firma[] = [];

  firmarFactura(facturaId: number, hash: string): Firma {
    const firma: Firma = {
      id: Date.now(),
      facturaId,
      fechaFirma: new Date(),
      hash,
    };
    this.firmas.push(firma);
    return firma;
  }

  obtenerFirmaPorFacturaId(facturaId: number): Firma | undefined {
    return this.firmas.find(firma => firma.facturaId === facturaId);
  }
}

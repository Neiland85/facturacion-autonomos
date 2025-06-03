import { Request, Response } from 'express';
import { FirmaService } from '../services/FirmaService';

export class FirmaController {
  private firmaService = new FirmaService();

  firmarFactura(req: Request, res: Response): void {
    const { facturaId, hash } = req.body;
    const firma = this.firmaService.firmarFactura(facturaId, hash);
    res.status(201).json(firma);
  }

  obtenerFirma(req: Request, res: Response): void {
    const firma = this.firmaService.obtenerFirmaPorFacturaId(parseInt(req.params.facturaId));
    if (firma) {
      res.json(firma);
    } else {
      res.status(404).json({ error: 'Firma no encontrada' });
    }
  }
}

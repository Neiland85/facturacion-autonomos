const prisma = require('../prisma/client');

class FacturaService {
  static validate(data) {
    // Simulación de validación (puedes usar Joi o Zod en producción)
    return { error: null };
  }

  static async create(data) {
    // Lógica real o simulada
    return prisma.factura.create({ data });
  }

  static async getById(id) {
    return prisma.factura.findUnique({ where: { id: Number(id) } });
  }

  static async getAll() {
    return prisma.factura.findMany();
  }

  static async count() {
    return prisma.factura.count();
  }

  static async getAllPaginated(skip, take) {
    return prisma.factura.findMany({ skip, take });
  }

  static async update(id, data) {
    return prisma.factura.update({ where: { id: Number(id) }, data });
  }

  static async deleteFactura(id) {
    return prisma.factura.delete({ where: { id: Number(id) } });
  }
}

module.exports = FacturaService;
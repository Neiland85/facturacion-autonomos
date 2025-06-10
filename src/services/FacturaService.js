// src/services/FacturaService.js
const { prisma } = require('../prisma/client');
const Joi = require('joi');

class FacturaService {
  /**
   * Valida los datos de una factura
   */
  static validate(data) {
    const schema = Joi.object({
      numero: Joi.string().required(),
      fecha: Joi.date().iso().required(),
      total: Joi.number().required(),
      usuarioId: Joi.string().required(),
      clienteId: Joi.number().required(),
      impuestos: Joi.number(),
      totalFinal: Joi.number(),
      pdfUrl: Joi.string().allow(null, '')
    });

    return schema.validate(data);
  }

  /**
   * Crea una nueva factura
   */
  static async create(data) {
    return prisma.factura.create({ data });
  }

  /**
   * Obtiene una factura por su ID
   */
  static async getById(id) {
    return prisma.factura.findUnique({ 
      where: { id: parseInt(id) },
      include: { cliente: true }
    });
  }

  /**
   * Obtiene todas las facturas
   */
  static async getAll() {
    return prisma.factura.findMany({
      include: { cliente: true }
    });
  }

  /**
   * Obtiene facturas paginadas
   */
  static async getAllPaginated(page = 1, pageSize = 100, filters = {}) {
    const where = {};
    if (filters.clienteId) {
      where.clienteId = parseInt(filters.clienteId);
    }

    return prisma.factura.findMany({
      where,
      include: { cliente: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { fecha: 'desc' }
    });
  }

  /**
   * Cuenta el número de facturas según los filtros
   */
  static async count(filters = {}) {
    const where = {};
    if (filters.clienteId) {
      where.clienteId = parseInt(filters.clienteId);
    }
    return prisma.factura.count({ where });
  }

  /**
   * Actualiza una factura por su ID
   */
  static async update(id, data) {
    return prisma.factura.update({
      where: { id: parseInt(id) },
      data
    });
  }

  /**
   * Elimina una factura por su ID
   */
  static async deleteFactura(id) {
    return prisma.factura.delete({
      where: { id: parseInt(id) }
    });
  }
}

module.exports = FacturaService;
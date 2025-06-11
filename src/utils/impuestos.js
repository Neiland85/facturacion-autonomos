// src/utils/impuestos.js

/**
 * Calcula el total de impuestos para cada factura.
 * @param {Array} facturas - [{ base: number, tipos: string[] }]
 * @param {Object} tasas - { IVA: 0.21, IRPF: 0.15, ... }
 * @returns {Array} - [{ ...factura, impuestos: number, detalle: { [tipo]: number } }]
 */
function calcularImpuestos(facturas, tasas) {
  return facturas.map(factura => {
    const detalle = Object.fromEntries(
      (factura.tipos || []).map(tipo => [
        tipo,
        factura.base * (tasas[tipo] || 0)
      ])
    );
    const impuestos = Object.values(detalle).reduce((a, b) => a + b, 0);
    return { ...factura, impuestos, detalle };
  });
}

module.exports = { calcularImpuestos };
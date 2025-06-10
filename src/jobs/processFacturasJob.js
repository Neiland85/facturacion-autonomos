// src/jobs/processFacturasJob.js
const { Queue, Worker, QueueScheduler } = require('bullmq');
const FacturaService = require('../services/FacturaService');
const redisConfig = { connection: { host: 'localhost', port: 6379 } };

const facturasQueue = new Queue('facturas-batch', redisConfig);
new QueueScheduler('facturas-batch', redisConfig);

// Worker: procesa las facturas pendientes en batch
const worker = new Worker('facturas-batch', async job => {
  // Aquí tu lógica de procesamiento batch
  const pendientes = await FacturaService.getPendientes(); // Implementa este método
  for (const factura of pendientes) {
    // Procesa cada factura (ejemplo: marcar como procesada, enviar, etc.)
    await FacturaService.procesarFactura(factura.id);
  }
  return { procesadas: pendientes.length };
}, redisConfig);

worker.on('completed', job => {
  console.log(`Job ${job.id} completado:`, job.returnvalue);
});

worker.on('failed', (job, err) => {
  console.error(`Job ${job.id} falló:`, err);
});

module.exports = facturasQueue;

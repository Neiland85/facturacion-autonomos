// src/jobs/scheduler.js
const facturasQueue = require('./processFacturasJob');
const cron = require('node-cron');

// Ejecuta cada noche a las 2:00 AM
cron.schedule('0 2 * * *', async () => {
  await facturasQueue.add('batch', {});
  console.log('Job batch de facturas añadido a la cola');
});

// src/__tests__/facturaLoad.test.js
const { test, expect } = require('@playwright/test');

const API_URL = 'http://localhost:3000/facturas'; // Cambia el puerto si es necesario

test('Carga: 1.000 usuarios creando facturas simultáneamente', async ({ request }) => {
  const usuarios = 1000;
  const promesas = [];

  for (let i = 0; i < usuarios; i++) {
    const factura = {
      numero: `F${i.toString().padStart(4, '0')}`,
      fecha: new Date().toISOString(),
      total: Math.floor(Math.random() * 1000) + 1,
      usuarioId: 1,
      clienteId: 1,
      pdfUrl: ''
    };

    promesas.push(
      request.post(API_URL, {
        data: factura
      })
    );
  }

  const respuestas = await Promise.all(promesas);

  // Verifica que todas las respuestas sean 201 (creado)
  for (const response of respuestas) {
    expect(response.status()).toBe(201);
  }
});

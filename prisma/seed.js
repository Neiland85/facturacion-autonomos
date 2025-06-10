#!/usr/bin/env node
// prisma/seed.js

const { PrismaClient } = require('@prisma/client');

// Crear instancia de PrismaClient con opción de log para debugging
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('🌱 Iniciando seed de la base de datos...');

    // Datos iniciales para pruebas
    const usuario = await prisma.user.upsert({
      where: { email: 'test@example.com' },
      update: {},
      create: {
        email: 'test@example.com',
        name: 'Usuario de Prueba',
        password: '$2a$10$K8Pg8i0R.8UheDRFu1MI9.87adhg0RyRo0Jld5.QpUY6DQrKZkIoS', // "password" hasheado
        role: 'user'
      },
    });

    console.log('✅ Usuario creado:', usuario.id);

    const cliente = await prisma.cliente.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Cliente de Prueba',
        email: 'cliente@example.com',
        direccion: 'Calle de Prueba 123',
        usuarioId: usuario.id
      },
    });

    console.log('✅ Cliente creado:', cliente.id);
    console.log('✅ Seed completado con éxito!');
  } catch (error) {
    console.error('❌ Error durante el seed:', error);
    throw error;
  }
}

// Ejecutar la función principal
main()
  .catch((e) => {
    console.error('❌ Error fatal durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('🔄 Desconectando de la base de datos...');
    await prisma.$disconnect();
  });
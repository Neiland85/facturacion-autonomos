// prisma/seed.js
#!/usr/bin/env node

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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

  console.log({ usuario, cliente });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
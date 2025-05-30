const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const plainPassword = process.env.SEED_USER_PASSWORD || 'demo123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Upsert usuario demo
  const usuario = await prisma.usuario.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      nombre: 'Usuario Demo',
      email: 'demo@example.com',
      password: hashedPassword,
    },
  });

  // Upsert cliente demo
  const cliente = await prisma.cliente.upsert({
    where: { email: 'cliente.demo@example.com' },
    update: {},
    create: {
      nombre: 'Cliente Demo',
      email: 'cliente.demo@example.com',
      direccion: 'Calle Ejemplo 123',
      usuario: { connect: { id: usuario.id } },
    },
  });

  // Upsert factura demo
  await prisma.factura.upsert({
    where: { numero: 'F-0001' },
    update: {},
    create: {
      numero: 'F-0001',
      fecha: new Date(),
      total: 100.5,
      pdfUrl: null,
      usuario: { connect: { id: usuario.id } },
      cliente: { connect: { id: cliente.id } },
    },
  });

  console.log('Datos de prueba insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

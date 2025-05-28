const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  // Usa una variable de entorno para la contraseña de seed, o un valor por defecto solo si no está definida
  const plainPassword = process.env.SEED_USER_PASSWORD || 'demo123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Elimina el usuario si ya existe (idempotencia para CI/CD)
  await prisma.usuario.deleteMany({
    where: { email: 'demo@example.com' }
  });

  // Crea usuario de prueba
  const usuario = await prisma.usuario.create({
    data: {
      nombre: "Usuario Demo",
      email: "demo@example.com",
      password: hashedPassword
    }
  });

  // Crea cliente y factura de prueba
  await prisma.cliente.create({
    data: {
      nombre: "Cliente Demo",
      email: "cliente.demo@example.com",
      direccion: "Calle Ejemplo 123",
      usuarioId: usuario.id,
      facturas: {
        create: [
          {
            numero: "F-0001",
            fecha: new Date(),
            total: 100.5,
            pdfUrl: null
          }
        ]
      }
    }
  });

  console.log('Datos de prueba insertados correctamente');
}

main()
  .catch((e) => {
    console.error('Error al insertar datos de prueba:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

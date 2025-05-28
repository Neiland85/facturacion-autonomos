const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/testdb',
    },
  },
});

async function main() {
  // Hashea la contraseña de prueba
  const hashedPassword = await bcrypt.hash('demo123', 10);

  // Usuario de prueba (email y password ficticios, password hasheada)
  const usuario = await prisma.usuario.create({
    data: {
      nombre: 'Usuario Demo',
      email: 'demo@example.com',
      password: hashedPassword, // Contraseña hasheada
      clientes: {
        create: [
          {
            nombre: 'Cliente Demo',
            email: 'cliente.demo@example.com',
            direccion: 'Calle Ejemplo 123',
            facturas: {
              create: [
                {
                  numero: 'F-0001',
                  fecha: new Date(),
                  total: 100.50,
                  pdfUrl: null
                }
              ]
            }
          }
        ]
      }
    }
  });

  console.log('Datos de prueba insertados correctamente');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

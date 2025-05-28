
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Usuario de prueba (email y password ficticios)
  const usuario = await prisma.usuario.create({
    data: {
      nombre: 'Usuario Demo',
      email: 'demo@example.com',
      password: 'demo123', // Solo para pruebas, nunca en producción
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

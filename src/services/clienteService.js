class ClienteService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAllClientes() {
    return this.prisma.cliente.findMany();
  }

  async getClienteById(id) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  // Agrega métodos para create, update, delete...
}

module.exports = ClienteService;

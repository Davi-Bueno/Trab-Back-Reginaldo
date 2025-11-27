const prisma = require('../config/database');

/**
 * CRUD CLIENTE
 */
const ClienteModel = {
  /**
   */
  async findAll() {
    return await prisma.cliente.findMany({
      include: {
        carrinhos: true
      }
    });
  },

  /**
   */
  async findById(id) {
    return await prisma.cliente.findUnique({
      where: { id: parseInt(id) },
      include: {
        carrinhos: {
          include: {
            vendedor: true,
            itens: {
              include: {
                eletrodomestico: true
              }
            }
          }
        }
      }
    });
  },

  /**
   */
  async create(data) {
    return await prisma.cliente.create({
      data: {
        nome: data.nome,
        contato: data.contato,
        email: data.email,
        CPF: data.CPF
      }
    });
  },

  /**
   */
  async update(id, data) {
    return await prisma.cliente.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome,
        contato: data.contato,
        email: data.email,
        CPF: data.CPF
      }
    });
  },

  /**
   */
  async delete(id) {
    return await prisma.cliente.delete({
      where: { id: parseInt(id) }
    });
  },

  /**
   */
  async findByCPF(cpf) {
    return await prisma.cliente.findFirst({
      where: { CPF: cpf }
    });
  }
};

module.exports = ClienteModel;

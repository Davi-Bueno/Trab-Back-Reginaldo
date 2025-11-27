const prisma = require('../config/database');

/**
 * CRUD VENDEDOR
 */
const VendedorModel = {
  /**
   */
  async findAll() {
    return await prisma.vendedor.findMany({
      include: {
        eletrodomesticos: true,
        carrinhos: true
      }
    });
  },

  /**
   */
  async findById(id) {
    return await prisma.vendedor.findUnique({
      where: { id: parseInt(id) },
      include: {
        eletrodomesticos: true,
        carrinhos: {
          include: {
            cliente: true,
            itens: true
          }
        }
      }
    });
  },

  /**
   */
  async create(data) {
    return await prisma.vendedor.create({
      data: {
        nome: data.nome
      }
    });
  },

  /**
   */
  async update(id, data) {
    return await prisma.vendedor.update({
      where: { id: parseInt(id) },
      data: {
        nome: data.nome
      }
    });
  },

  /**
   */
  async delete(id) {
    return await prisma.vendedor.delete({
      where: { id: parseInt(id) }
    });
  }
};

module.exports = VendedorModel;

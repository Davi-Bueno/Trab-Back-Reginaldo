const prisma = require('../config/database');

/**
    * CRUD ELETRODOMESTICO
*/
const EletrodomesticoModel = {
  /**
   */
  async findAll() {
    return await prisma.eletrodomestico.findMany({
      include: {
        vendedor: true
      }
    });
  },

  /**
   */
  async findById(id) {
    return await prisma.eletrodomestico.findUnique({
      where: { id: parseInt(id) },
      include: {
        vendedor: true,
        carrinhoItens: {
          include: {
            carrinho: true
          }
        }
      }
    });
  },

  /**
   */
  async create(data) {
    return await prisma.eletrodomestico.create({
      data: {
        eletrodomestico: data.eletrodomestico,
        valor: parseFloat(data.valor),
        vendedorId: parseInt(data.vendedorId)
      }
    });
  },

  /**
   */
  async update(id, data) {
    return await prisma.eletrodomestico.update({
      where: { id: parseInt(id) },
      data: {
        eletrodomestico: data.eletrodomestico,
        valor: parseFloat(data.valor),
        vendedorId: parseInt(data.vendedorId)
      }
    });
  },

  /**
   */
  async delete(id) {
    return await prisma.eletrodomestico.delete({
      where: { id: parseInt(id) }
    });
  },

  /**
   */
  async findByVendedor(vendedorId) {
    return await prisma.eletrodomestico.findMany({
      where: { vendedorId: parseInt(vendedorId) },
      include: {
        vendedor: true
      }
    });
  }
};

module.exports = EletrodomesticoModel;

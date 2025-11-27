const prisma = require('../config/database');

/**
 * CRUD CARRINHO_ELETRO
 */
const CarrinhoEletroModel = {
  /**
   * Busca todos os itens
   */
  async findAll() {
    return await prisma.carrinhoEletro.findMany({
      include: {
        carrinho: true,
        eletrodomestico: true
      }
    });
  },

  /**
   */
  async findByCarrinho(carrinhoId) {
    return await prisma.carrinhoEletro.findMany({
      where: { carrinhoId: parseInt(carrinhoId) },
      include: {
        eletrodomestico: true
      }
    });
  },

  /**
   */
  async findOne(carrinhoId, eletrodomesticoId) {
    return await prisma.carrinhoEletro.findUnique({
      where: {
        carrinhoId_eletrodomesticoId: {
          carrinhoId: parseInt(carrinhoId),
          eletrodomesticoId: parseInt(eletrodomesticoId)
        }
      },
      include: {
        carrinho: true,
        eletrodomestico: true
      }
    });
  },

  /**
   */
  async create(data) {
    return await prisma.carrinhoEletro.create({
      data: {
        carrinhoId: parseInt(data.carrinhoId),
        eletrodomesticoId: parseInt(data.eletrodomesticoId),
        quantidade: parseInt(data.quantidade)
      },
      include: {
        carrinho: true,
        eletrodomestico: true
      }
    });
  },

  /**
   */
  async update(carrinhoId, eletrodomesticoId, quantidade) {
    return await prisma.carrinhoEletro.update({
      where: {
        carrinhoId_eletrodomesticoId: {
          carrinhoId: parseInt(carrinhoId),
          eletrodomesticoId: parseInt(eletrodomesticoId)
        }
      },
      data: {
        quantidade: parseInt(quantidade)
      },
      include: {
        eletrodomestico: true
      }
    });
  },

  /**
   */
  async delete(carrinhoId, eletrodomesticoId) {
    return await prisma.carrinhoEletro.delete({
      where: {
        carrinhoId_eletrodomesticoId: {
          carrinhoId: parseInt(carrinhoId),
          eletrodomesticoId: parseInt(eletrodomesticoId)
        }
      }
    });
  },

  /**
   */
  async deleteAllByCarrinho(carrinhoId) {
    return await prisma.carrinhoEletro.deleteMany({
      where: { carrinhoId: parseInt(carrinhoId) }
    });
  }
};

module.exports = CarrinhoEletroModel;

const prisma = require('../config/database');

/**
 * CRUD CARRINHO
 */
const CarrinhoModel = {
  /**
   */
  async findAll() {
    return await prisma.carrinho.findMany({
      include: {
        cliente: true,
        vendedor: true,
        itens: {
          include: {
            eletrodomestico: true
          }
        }
      }
    });
  },

  /**
   */
  async findById(id) {
    return await prisma.carrinho.findUnique({
      where: { id: parseInt(id) },
      include: {
        cliente: true,
        vendedor: true,
        itens: {
          include: {
            eletrodomestico: true
          }
        }
      }
    });
  },

  /**
   * Cria um novo carrinho
   */
  async create(data) {
    return await prisma.carrinho.create({
      data: {
        data_criacao: new Date(),
        clienteId: parseInt(data.clienteId),
        vendedorId: parseInt(data.vendedorId)
      }
    });
  },

  /**
   */
  async update(id, data) {
    return await prisma.carrinho.update({
      where: { id: parseInt(id) },
      data: {
        clienteId: parseInt(data.clienteId),
        vendedorId: parseInt(data.vendedorId)
      }
    });
  },

  /**
   */
  async delete(id) {
    return await prisma.carrinho.delete({
      where: { id: parseInt(id) }
    });
  },

  /**
   */
  async findByCliente(clienteId) {
    return await prisma.carrinho.findMany({
      where: { clienteId: parseInt(clienteId) },
      include: {
        vendedor: true,
        itens: {
          include: {
            eletrodomestico: true
          }
        }
      }
    });
  },

  /**
   */
  async calcularTotal(id) {
    const carrinho = await prisma.carrinho.findUnique({
      where: { id: parseInt(id) },
      include: {
        itens: {
          include: {
            eletrodomestico: true
          }
        }
      }
    });

    if (!carrinho) return null;

    const total = carrinho.itens.reduce((acc, item) => {
      return acc + (item.eletrodomestico.valor * item.quantidade);
    }, 0);

    return { ...carrinho, total };
  }
};

module.exports = CarrinhoModel;

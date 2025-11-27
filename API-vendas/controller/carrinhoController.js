const CarrinhoModel = require('../models/carrinhoModel');
const ClienteModel = require('../models/clienteModel');
const VendedorModel = require('../models/vendedorModel');

/**
 * Controller para gerenciar operações de Carrinhos
 */
const CarrinhoController = {
  /**
   * GET /carrinhos - Lista todos os carrinhos
   */
  async getAll(req, res) {
    try {
      const carrinhos = await CarrinhoModel.findAll();
      res.status(200).json(carrinhos);
    } catch (error) {
      console.error('Erro ao buscar carrinhos:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar carrinhos',
        message: error.message 
      });
    }
  },

  /**
   * GET /carrinhos/:id - Busca carrinho por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const carrinho = await CarrinhoModel.findById(id);
      
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }
      
      res.status(200).json(carrinho);
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar carrinho',
        message: error.message 
      });
    }
  },

  /**
   * POST /carrinhos - Cria novo carrinho
   */
  async create(req, res) {
    try {
      const { clienteId, vendedorId } = req.body;
      
      if (!clienteId || !vendedorId) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['clienteId', 'vendedorId']
        });
      }

      // Verifica se cliente existe
      const cliente = await ClienteModel.findById(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      // Verifica se vendedor existe
      const vendedor = await VendedorModel.findById(vendedorId);
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }

      const novoCarrinho = await CarrinhoModel.create(req.body);
      res.status(201).json(novoCarrinho);
    } catch (error) {
      console.error('Erro ao criar carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao criar carrinho',
        message: error.message 
      });
    }
  },

  /**
   * PUT /carrinhos/:id - Atualiza carrinho
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { clienteId, vendedorId } = req.body;

      // Verifica se carrinho existe
      const carrinhoExistente = await CarrinhoModel.findById(id);
      if (!carrinhoExistente) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      // Valida cliente se fornecido
      if (clienteId) {
        const cliente = await ClienteModel.findById(clienteId);
        if (!cliente) {
          return res.status(404).json({ error: 'Cliente não encontrado' });
        }
      }

      // Valida vendedor se fornecido
      if (vendedorId) {
        const vendedor = await VendedorModel.findById(vendedorId);
        if (!vendedor) {
          return res.status(404).json({ error: 'Vendedor não encontrado' });
        }
      }

      const carrinhoAtualizado = await CarrinhoModel.update(id, req.body);
      res.status(200).json(carrinhoAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao atualizar carrinho',
        message: error.message 
      });
    }
  },

  /**
   * DELETE /carrinhos/:id - Deleta carrinho
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verifica se carrinho existe
      const carrinho = await CarrinhoModel.findById(id);
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      await CarrinhoModel.delete(id);
      res.status(200).json({ message: 'Carrinho deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao deletar carrinho',
        message: error.message 
      });
    }
  },

  /**
   * GET /clientes/:clienteId/carrinhos - Lista carrinhos de um cliente
   */
  async getByCliente(req, res) {
    try {
      const { clienteId } = req.params;

      // Verifica se cliente existe
      const cliente = await ClienteModel.findById(clienteId);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      const carrinhos = await CarrinhoModel.findByCliente(clienteId);
      res.status(200).json(carrinhos);
    } catch (error) {
      console.error('Erro ao buscar carrinhos do cliente:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar carrinhos do cliente',
        message: error.message 
      });
    }
  },

  /**
   * GET /carrinhos/:id/total - Calcula total do carrinho
   */
  async getTotal(req, res) {
    try {
      const { id } = req.params;
      const carrinhoComTotal = await CarrinhoModel.calcularTotal(id);
      
      if (!carrinhoComTotal) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }
      
      res.status(200).json(carrinhoComTotal);
    } catch (error) {
      console.error('Erro ao calcular total do carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao calcular total do carrinho',
        message: error.message 
      });
    }
  }
};

module.exports = CarrinhoController;

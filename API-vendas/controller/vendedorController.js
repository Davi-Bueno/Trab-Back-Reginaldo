const VendedorModel = require('../models/vendedorModel');

/**
 * Controller para gerenciar operações de Vendedores
 */
const VendedorController = {
  /**
   * GET /vendedores - Lista todos os vendedores
   */
  async getAll(req, res) {
    try {
      const vendedores = await VendedorModel.findAll();
      res.status(200).json(vendedores);
    } catch (error) {
      console.error('Erro ao buscar vendedores:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar vendedores',
        message: error.message 
      });
    }
  },

  /**
   * GET /vendedores/:id - Busca vendedor por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const vendedor = await VendedorModel.findById(id);
      
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }
      
      res.status(200).json(vendedor);
    } catch (error) {
      console.error('Erro ao buscar vendedor:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar vendedor',
        message: error.message 
      });
    }
  },

  /**
   * POST /vendedores - Cria novo vendedor
   */
  async create(req, res) {
    try {
      const { nome } = req.body;
      
      if (!nome) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['nome']
        });
      }

      const novoVendedor = await VendedorModel.create(req.body);
      res.status(201).json(novoVendedor);
    } catch (error) {
      console.error('Erro ao criar vendedor:', error);
      res.status(500).json({ 
        error: 'Erro ao criar vendedor',
        message: error.message 
      });
    }
  },

  /**
   * PUT /vendedores/:id - Atualiza vendedor
   */
  async update(req, res) {
    try {
      const { id } = req.params;

      // Verifica se vendedor existe
      const vendedorExistente = await VendedorModel.findById(id);
      if (!vendedorExistente) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }

      const vendedorAtualizado = await VendedorModel.update(id, req.body);
      res.status(200).json(vendedorAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar vendedor:', error);
      res.status(500).json({ 
        error: 'Erro ao atualizar vendedor',
        message: error.message 
      });
    }
  },

  /**
   * DELETE /vendedores/:id - Deleta vendedor
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verifica se vendedor existe
      const vendedor = await VendedorModel.findById(id);
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }

      await VendedorModel.delete(id);
      res.status(200).json({ message: 'Vendedor deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar vendedor:', error);
      res.status(500).json({ 
        error: 'Erro ao deletar vendedor',
        message: error.message 
      });
    }
  }
};

module.exports = VendedorController;

const EletrodomesticoModel = require('../models/eletrodomesticoModel');
const VendedorModel = require('../models/vendedorModel');

/**
 * Controller para gerenciar operações de Eletrodomésticos
 */
const EletrodomesticoController = {
  /**
   * GET /eletrodomesticos - Lista todos os eletrodomésticos
   */
  async getAll(req, res) {
    try {
      const eletrodomesticos = await EletrodomesticoModel.findAll();
      res.status(200).json(eletrodomesticos);
    } catch (error) {
      console.error('Erro ao buscar eletrodomésticos:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar eletrodomésticos',
        message: error.message 
      });
    }
  },

  /**
   * GET /eletrodomesticos/:id - Busca eletrodoméstico por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const eletrodomestico = await EletrodomesticoModel.findById(id);
      
      if (!eletrodomestico) {
        return res.status(404).json({ error: 'Eletrodoméstico não encontrado' });
      }
      
      res.status(200).json(eletrodomestico);
    } catch (error) {
      console.error('Erro ao buscar eletrodoméstico:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar eletrodoméstico',
        message: error.message 
      });
    }
  },

  /**
   * POST /eletrodomesticos - Cria novo eletrodoméstico
   */
  async create(req, res) {
    try {
      const { eletrodomestico, valor, vendedorId } = req.body;
      
      if (!eletrodomestico || !valor || !vendedorId) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['eletrodomestico', 'valor', 'vendedorId']
        });
      }

      // Verifica se vendedor existe
      const vendedor = await VendedorModel.findById(vendedorId);
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }

      const novoEletrodomestico = await EletrodomesticoModel.create(req.body);
      res.status(201).json(novoEletrodomestico);
    } catch (error) {
      console.error('Erro ao criar eletrodoméstico:', error);
      res.status(500).json({ 
        error: 'Erro ao criar eletrodoméstico',
        message: error.message 
      });
    }
  },

  /**
   * PUT /eletrodomesticos/:id - Atualiza eletrodoméstico
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { vendedorId } = req.body;

      // Verifica se eletrodoméstico existe
      const eletroExistente = await EletrodomesticoModel.findById(id);
      if (!eletroExistente) {
        return res.status(404).json({ error: 'Eletrodoméstico não encontrado' });
      }

      // Se vendedor foi alterado, verifica se existe
      if (vendedorId) {
        const vendedor = await VendedorModel.findById(vendedorId);
        if (!vendedor) {
          return res.status(404).json({ error: 'Vendedor não encontrado' });
        }
      }

      const eletroAtualizado = await EletrodomesticoModel.update(id, req.body);
      res.status(200).json(eletroAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar eletrodoméstico:', error);
      res.status(500).json({ 
        error: 'Erro ao atualizar eletrodoméstico',
        message: error.message 
      });
    }
  },

  /**
   * DELETE /eletrodomesticos/:id - Deleta eletrodoméstico
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verifica se eletrodoméstico existe
      const eletro = await EletrodomesticoModel.findById(id);
      if (!eletro) {
        return res.status(404).json({ error: 'Eletrodoméstico não encontrado' });
      }

      await EletrodomesticoModel.delete(id);
      res.status(200).json({ message: 'Eletrodoméstico deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar eletrodoméstico:', error);
      res.status(500).json({ 
        error: 'Erro ao deletar eletrodoméstico',
        message: error.message 
      });
    }
  },

  /**
   * GET /vendedores/:vendedorId/eletrodomesticos - Lista eletrodomésticos de um vendedor
   */
  async getByVendedor(req, res) {
    try {
      const { vendedorId } = req.params;

      // Verifica se vendedor existe
      const vendedor = await VendedorModel.findById(vendedorId);
      if (!vendedor) {
        return res.status(404).json({ error: 'Vendedor não encontrado' });
      }

      const eletrodomesticos = await EletrodomesticoModel.findByVendedor(vendedorId);
      res.status(200).json(eletrodomesticos);
    } catch (error) {
      console.error('Erro ao buscar eletrodomésticos do vendedor:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar eletrodomésticos do vendedor',
        message: error.message 
      });
    }
  }
};

module.exports = EletrodomesticoController;

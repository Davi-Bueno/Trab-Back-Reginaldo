const CarrinhoEletroModel = require('../models/carrinhoEletroModel');
const CarrinhoModel = require('../models/carrinhoModel');
const EletrodomesticoModel = require('../models/eletrodomesticoModel');

/**
 * Controller para gerenciar operações de Itens do Carrinho
 */
const CarrinhoEletroController = {
  /**
   * GET /carrinho-eletro - Lista todos os itens
   */
  async getAll(req, res) {
    try {
      const itens = await CarrinhoEletroModel.findAll();
      res.status(200).json(itens);
    } catch (error) {
      console.error('Erro ao buscar itens:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar itens',
        message: error.message 
      });
    }
  },

  /**
   * GET /carrinho-eletro/:carrinhoId/:eletrodomesticoId - Busca item específico
   */
  async getById(req, res) {
    try {
      const { carrinhoId, eletrodomesticoId } = req.params;
      const item = await CarrinhoEletroModel.findOne(carrinhoId, eletrodomesticoId);
      
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }
      
      res.status(200).json(item);
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar item',
        message: error.message 
      });
    }
  },

  /**
   * GET /carrinhos/:carrinhoId/itens - Lista itens de um carrinho
   */
  async getByCarrinho(req, res) {
    try {
      const { carrinhoId } = req.params;

      // Verifica se carrinho existe
      const carrinho = await CarrinhoModel.findById(carrinhoId);
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      const itens = await CarrinhoEletroModel.findByCarrinho(carrinhoId);
      res.status(200).json(itens);
    } catch (error) {
      console.error('Erro ao buscar itens do carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar itens do carrinho',
        message: error.message 
      });
    }
  },

  /**
   * POST /carrinho-eletro - Adiciona item ao carrinho
   */
  async create(req, res) {
    try {
      const { carrinhoId, eletrodomesticoId, quantidade } = req.body;

      if (!carrinhoId || !eletrodomesticoId || !quantidade) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['carrinhoId', 'eletrodomesticoId', 'quantidade']
        });
      }

      // Verifica se carrinho existe
      const carrinho = await CarrinhoModel.findById(carrinhoId);
      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado' });
      }

      // Verifica se eletrodoméstico existe
      const eletro = await EletrodomesticoModel.findById(eletrodomesticoId);
      if (!eletro) {
        return res.status(404).json({ error: 'Eletrodoméstico não encontrado' });
      }

      // Verifica se item já existe no carrinho
      const itemExistente = await CarrinhoEletroModel.findOne(carrinhoId, eletrodomesticoId);
      if (itemExistente) {
        return res.status(409).json({ 
          error: 'Item já existe no carrinho',
          hint: 'Use PUT para atualizar a quantidade'
        });
      }

      const novoItem = await CarrinhoEletroModel.create({
        carrinhoId,
        eletrodomesticoId,
        quantidade
      });

      res.status(201).json(novoItem);
    } catch (error) {
      console.error('Erro ao adicionar item ao carrinho:', error);
      res.status(500).json({ 
        error: 'Erro ao adicionar item ao carrinho',
        message: error.message 
      });
    }
  },

  /**
   * PUT /carrinho-eletro/:carrinhoId/:eletrodomesticoId - Atualiza quantidade do item
   */
  async update(req, res) {
    try {
      const { carrinhoId, eletrodomesticoId } = req.params;
      const { quantidade } = req.body;

      if (!quantidade || quantidade <= 0) {
        return res.status(400).json({ 
          error: 'Quantidade inválida',
          message: 'Quantidade deve ser maior que zero'
        });
      }

      // Verifica se item existe
      const item = await CarrinhoEletroModel.findOne(carrinhoId, eletrodomesticoId);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }

      const itemAtualizado = await CarrinhoEletroModel.update(
        carrinhoId, 
        eletrodomesticoId, 
        quantidade
      );

      res.status(200).json(itemAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      res.status(500).json({ 
        error: 'Erro ao atualizar item',
        message: error.message 
      });
    }
  },

  /**
   * DELETE /carrinho-eletro/:carrinhoId/:eletrodomesticoId - Remove item do carrinho
   */
  async delete(req, res) {
    try {
      const { carrinhoId, eletrodomesticoId } = req.params;

      // Verifica se item existe
      const item = await CarrinhoEletroModel.findOne(carrinhoId, eletrodomesticoId);
      if (!item) {
        return res.status(404).json({ error: 'Item não encontrado no carrinho' });
      }

      await CarrinhoEletroModel.delete(carrinhoId, eletrodomesticoId);
      res.status(200).json({ message: 'Item removido do carrinho com sucesso' });
    } catch (error) {
      console.error('Erro ao remover item:', error);
      res.status(500).json({ 
        error: 'Erro ao remover item',
        message: error.message 
      });
    }
  }
};

module.exports = CarrinhoEletroController;

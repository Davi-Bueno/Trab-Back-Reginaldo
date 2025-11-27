const ClienteModel = require('../models/clienteModel');

/**
 * Controller para gerenciar operações de Clientes
 */
const ClienteController = {
  /**
   * GET /clientes - Lista todos os clientes
   */
  async getAll(req, res) {
    try {
      const clientes = await ClienteModel.findAll();
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar clientes',
        message: error.message 
      });
    }
  },

  /**
   * GET /clientes/:id - Busca cliente por ID
   */
  async getById(req, res) {
    try {
      const { id } = req.params;
      const cliente = await ClienteModel.findById(id);
      
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }
      
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Erro ao buscar cliente:', error);
      res.status(500).json({ 
        error: 'Erro ao buscar cliente',
        message: error.message 
      });
    }
  },

  /**
   * POST /clientes - Cria novo cliente
   */
  async create(req, res) {
    try {
      const { nome, contato, email, CPF } = req.body;
      
      // Validações básicas
      if (!nome || !contato || !email || !CPF) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['nome', 'contato', 'email', 'CPF']
        });
      }

      // Verifica se CPF já existe
      const clienteExistente = await ClienteModel.findByCPF(CPF);
      if (clienteExistente) {
        return res.status(409).json({ error: 'CPF já cadastrado' });
      }

      const novoCliente = await ClienteModel.create(req.body);
      res.status(201).json(novoCliente);
    } catch (error) {
      console.error('Erro ao criar cliente:', error);
      res.status(500).json({ 
        error: 'Erro ao criar cliente',
        message: error.message 
      });
    }
  },

  /**
   * PUT /clientes/:id - Atualiza cliente
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, contato, email, CPF } = req.body;

      // Verifica se cliente existe
      const clienteExistente = await ClienteModel.findById(id);
      if (!clienteExistente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      // Se CPF foi alterado, verifica se novo CPF já existe
      if (CPF && CPF !== clienteExistente.CPF) {
        const cpfEmUso = await ClienteModel.findByCPF(CPF);
        if (cpfEmUso) {
          return res.status(409).json({ error: 'CPF já cadastrado' });
        }
      }

      const clienteAtualizado = await ClienteModel.update(id, req.body);
      res.status(200).json(clienteAtualizado);
    } catch (error) {
      console.error('Erro ao atualizar cliente:', error);
      res.status(500).json({ 
        error: 'Erro ao atualizar cliente',
        message: error.message 
      });
    }
  },

  /**
   * DELETE /clientes/:id - Deleta cliente
   */
  async delete(req, res) {
    try {
      const { id } = req.params;

      // Verifica se cliente existe
      const cliente = await ClienteModel.findById(id);
      if (!cliente) {
        return res.status(404).json({ error: 'Cliente não encontrado' });
      }

      await ClienteModel.delete(id);
      res.status(200).json({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar cliente:', error);
      res.status(500).json({ 
        error: 'Erro ao deletar cliente',
        message: error.message 
      });
    }
  }
};

module.exports = ClienteController;

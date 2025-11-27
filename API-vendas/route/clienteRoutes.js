const express = require('express');
const router = express.Router();
const ClienteController = require('../controller/clienteController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateCliente, validateClienteUpdate } = require('../middleware/validateCliente');
const { validateId } = require('../middleware/validateParams');

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Gerenciamento de clientes
 */

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Listar todos os clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/clientes', ClienteController.getAll);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Buscar cliente por ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/clientes/:id', validateId, ClienteController.getById);

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Criar novo cliente (requer autenticação)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - email
 *               - telefone
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: CPF já cadastrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/clientes', authMiddleware, validateCliente, ClienteController.create);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Atualizar cliente (requer autenticação)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               cpf:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/clientes/:id', authMiddleware, validateId, validateClienteUpdate, ClienteController.update);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Deletar cliente (requer autenticação)
 *     tags: [Clientes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cliente deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Cliente não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/clientes/:id', authMiddleware, validateId, ClienteController.delete);

module.exports = router;

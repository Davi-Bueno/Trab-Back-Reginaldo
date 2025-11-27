const express = require('express');
const router = express.Router();
const CarrinhoController = require('../controller/carrinhoController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateCarrinho, validateCarrinhoUpdate } = require('../middleware/validateCarrinho');
const { validateId } = require('../middleware/validateParams');

/**
 * @swagger
 * tags:
 *   name: Carrinhos
 *   description: Gerenciamento de carrinhos de compras
 */

/**
 * @swagger
 * /carrinhos:
 *   get:
 *     summary: Listar todos os carrinhos
 *     tags: [Carrinhos]
 *     responses:
 *       200:
 *         description: Lista de carrinhos
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinhos', CarrinhoController.getAll);

/**
 * @swagger
 * /carrinhos/{id}:
 *   get:
 *     summary: Buscar carrinho por ID
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *       404:
 *         description: Carrinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinhos/:id', validateId, CarrinhoController.getById);

/**
 * @swagger
 * /carrinhos/cliente/{clienteId}:
 *   get:
 *     summary: Buscar carrinho por cliente
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: clienteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Carrinho encontrado
 *       404:
 *         description: Carrinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinhos/cliente/:clienteId', validateId, CarrinhoController.getByCliente);

/**
 * @swagger
 * /carrinhos/{id}/total:
 *   get:
 *     summary: Calcular total do carrinho
 *     tags: [Carrinhos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Total calculado
 *       404:
 *         description: Carrinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinhos/:id/total', validateId, CarrinhoController.calcularTotal);

/**
 * @swagger
 * /carrinhos:
 *   post:
 *     summary: Criar novo carrinho (requer autenticação)
 *     tags: [Carrinhos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - clienteId
 *             properties:
 *               clienteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/carrinhos', authMiddleware, validateCarrinho, CarrinhoController.create);

/**
 * @swagger
 * /carrinhos/{id}:
 *   put:
 *     summary: Atualizar carrinho (requer autenticação)
 *     tags: [Carrinhos]
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
 *               clienteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Carrinho atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Carrinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/carrinhos/:id', authMiddleware, validateId, validateCarrinhoUpdate, CarrinhoController.update);

/**
 * @swagger
 * /carrinhos/{id}:
 *   delete:
 *     summary: Deletar carrinho (requer autenticação)
 *     tags: [Carrinhos]
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
 *         description: Carrinho deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Carrinho não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/carrinhos/:id', authMiddleware, validateId, CarrinhoController.delete);

module.exports = router;

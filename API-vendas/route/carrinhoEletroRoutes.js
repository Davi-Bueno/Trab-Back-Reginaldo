const express = require('express');
const router = express.Router();
const CarrinhoEletroController = require('../controller/carrinhoEletroController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateCarrinhoEletro, validateCarrinhoEletroUpdate } = require('../middleware/validateCarrinhoEletro');
const { validateId, validateCompositeId } = require('../middleware/validateParams');

/**
 * @swagger
 * tags:
 *   name: CarrinhoEletro
 *   description: Gerenciamento de itens do carrinho
 */

/**
 * @swagger
 * /carrinho-eletro:
 *   get:
 *     summary: Listar todos os itens de carrinho
 *     tags: [CarrinhoEletro]
 *     responses:
 *       200:
 *         description: Lista de itens
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinho-eletro', CarrinhoEletroController.getAll);

/**
 * @swagger
 * /carrinho-eletro/{carrinhoId}/{eletrodomesticoId}:
 *   get:
 *     summary: Buscar item específico do carrinho
 *     tags: [CarrinhoEletro]
 *     parameters:
 *       - in: path
 *         name: carrinhoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eletrodomesticoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item encontrado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinho-eletro/:carrinhoId/:eletrodomesticoId', validateCompositeId, CarrinhoEletroController.getById);

/**
 * @swagger
 * /carrinho-eletro/carrinho/{carrinhoId}:
 *   get:
 *     summary: Listar itens de um carrinho específico
 *     tags: [CarrinhoEletro]
 *     parameters:
 *       - in: path
 *         name: carrinhoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/carrinho-eletro/carrinho/:carrinhoId', validateId, CarrinhoEletroController.getByCarrinho);

/**
 * @swagger
 * /carrinho-eletro:
 *   post:
 *     summary: Adicionar item ao carrinho (requer autenticação)
 *     tags: [CarrinhoEletro]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - carrinhoId
 *               - eletrodomesticoId
 *               - quantidade
 *             properties:
 *               carrinhoId:
 *                 type: integer
 *               eletrodomesticoId:
 *                 type: integer
 *               quantidade:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 *       400:
 *         description: Dados inválidos ou quantidade inválida
 *       401:
 *         description: Não autorizado
 *       409:
 *         description: Item já existe no carrinho
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/carrinho-eletro', authMiddleware, validateCarrinhoEletro, CarrinhoEletroController.create);

/**
 * @swagger
 * /carrinho-eletro/{carrinhoId}/{eletrodomesticoId}:
 *   put:
 *     summary: Atualizar quantidade de item (requer autenticação)
 *     tags: [CarrinhoEletro]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carrinhoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eletrodomesticoId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantidade
 *             properties:
 *               quantidade:
 *                 type: integer
 *                 minimum: 1
 *     responses:
 *       200:
 *         description: Item atualizado com sucesso
 *       400:
 *         description: Quantidade inválida
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/carrinho-eletro/:carrinhoId/:eletrodomesticoId', authMiddleware, validateCompositeId, validateCarrinhoEletroUpdate, CarrinhoEletroController.update);

/**
 * @swagger
 * /carrinho-eletro/{carrinhoId}/{eletrodomesticoId}:
 *   delete:
 *     summary: Remover item do carrinho (requer autenticação)
 *     tags: [CarrinhoEletro]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carrinhoId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: eletrodomesticoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Item não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/carrinho-eletro/:carrinhoId/:eletrodomesticoId', authMiddleware, validateCompositeId, CarrinhoEletroController.delete);

module.exports = router;

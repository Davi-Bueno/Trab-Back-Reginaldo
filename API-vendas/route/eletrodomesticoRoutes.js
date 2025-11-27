const express = require('express');
const router = express.Router();
const EletrodomesticoController = require('../controller/eletrodomesticoController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateEletrodomestico, validateEletrodomesticoUpdate } = require('../middleware/validateEletrodomestico');
const { validateId } = require('../middleware/validateParams');

/**
 * @swagger
 * tags:
 *   name: Eletrodomésticos
 *   description: Gerenciamento de eletrodomésticos
 */

/**
 * @swagger
 * /eletrodomesticos:
 *   get:
 *     summary: Listar todos os eletrodomésticos
 *     tags: [Eletrodomésticos]
 *     responses:
 *       200:
 *         description: Lista de eletrodomésticos
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/eletrodomesticos', EletrodomesticoController.getAll);

/**
 * @swagger
 * /eletrodomesticos/{id}:
 *   get:
 *     summary: Buscar eletrodoméstico por ID
 *     tags: [Eletrodomésticos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eletrodoméstico encontrado
 *       404:
 *         description: Eletrodoméstico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/eletrodomesticos/:id', validateId, EletrodomesticoController.getById);

/**
 * @swagger
 * /eletrodomesticos/vendedor/{vendedorId}:
 *   get:
 *     summary: Listar eletrodomésticos por vendedor
 *     tags: [Eletrodomésticos]
 *     parameters:
 *       - in: path
 *         name: vendedorId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de eletrodomésticos do vendedor
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/eletrodomesticos/vendedor/:vendedorId', validateId, EletrodomesticoController.getByVendedor);

/**
 * @swagger
 * /eletrodomesticos:
 *   post:
 *     summary: Criar novo eletrodoméstico (requer autenticação)
 *     tags: [Eletrodomésticos]
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
 *               - preco
 *               - estoque
 *               - vendedorId
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: integer
 *               vendedorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Eletrodoméstico criado com sucesso
 *       400:
 *         description: Dados inválidos ou vendedor não existe
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/eletrodomesticos', authMiddleware, validateEletrodomestico, EletrodomesticoController.create);

/**
 * @swagger
 * /eletrodomesticos/{id}:
 *   put:
 *     summary: Atualizar eletrodoméstico (requer autenticação)
 *     tags: [Eletrodomésticos]
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
 *               preco:
 *                 type: number
 *               estoque:
 *                 type: integer
 *               vendedorId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Eletrodoméstico atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Eletrodoméstico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/eletrodomesticos/:id', authMiddleware, validateId, validateEletrodomesticoUpdate, EletrodomesticoController.update);

/**
 * @swagger
 * /eletrodomesticos/{id}:
 *   delete:
 *     summary: Deletar eletrodoméstico (requer autenticação)
 *     tags: [Eletrodomésticos]
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
 *         description: Eletrodoméstico deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Eletrodoméstico não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/eletrodomesticos/:id', authMiddleware, validateId, EletrodomesticoController.delete);

module.exports = router;

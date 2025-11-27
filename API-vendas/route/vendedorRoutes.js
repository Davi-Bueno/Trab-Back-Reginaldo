const express = require('express');
const router = express.Router();
const VendedorController = require('../controller/vendedorController');
const authMiddleware = require('../middleware/authMiddleware');
const { validateVendedor, validateVendedorUpdate } = require('../middleware/validateVendedor');
const { validateId } = require('../middleware/validateParams');

/**
 * @swagger
 * tags:
 *   name: Vendedores
 *   description: Gerenciamento de vendedores
 */

/**
 * @swagger
 * /vendedores:
 *   get:
 *     summary: Listar todos os vendedores
 *     tags: [Vendedores]
 *     responses:
 *       200:
 *         description: Lista de vendedores
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/vendedores', VendedorController.getAll);

/**
 * @swagger
 * /vendedores/{id}:
 *   get:
 *     summary: Buscar vendedor por ID
 *     tags: [Vendedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vendedor encontrado
 *       404:
 *         description: Vendedor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/vendedores/:id', validateId, VendedorController.getById);

/**
 * @swagger
 * /vendedores:
 *   post:
 *     summary: Criar novo vendedor (requer autenticação)
 *     tags: [Vendedores]
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
 *               - email
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Vendedor criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/vendedores', authMiddleware, validateVendedor, VendedorController.create);

/**
 * @swagger
 * /vendedores/{id}:
 *   put:
 *     summary: Atualizar vendedor (requer autenticação)
 *     tags: [Vendedores]
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
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Vendedor atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Vendedor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/vendedores/:id', authMiddleware, validateId, validateVendedorUpdate, VendedorController.update);

/**
 * @swagger
 * /vendedores/{id}:
 *   delete:
 *     summary: Deletar vendedor (requer autenticação)
 *     tags: [Vendedores]
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
 *         description: Vendedor deletado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Vendedor não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/vendedores/:id', authMiddleware, validateId, VendedorController.delete);

module.exports = router;

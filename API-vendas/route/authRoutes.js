const express = require('express');
const router = express.Router();
const AuthController = require('../controller/authController');

/**
 * @swagger
 * tags:
 *   name: Autenticação
 *   description: Gerenciamento de autenticação JWT
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Realizar login e obter token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                 expiresIn:
 *                   type: string
 *                 type:
 *                   type: string
 *       400:
 *         description: Dados incompletos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Realizar logout e invalidar token
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       401:
 *         description: Token não fornecido ou inválido
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Verificar se token é válido
 *     tags: [Autenticação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *       401:
 *         description: Token inválido, expirado ou revogado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/auth/verify', AuthController.verifyToken);

module.exports = router;

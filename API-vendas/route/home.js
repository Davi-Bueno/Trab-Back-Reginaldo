const express = require('express');
const router = express.Router();

//teste inicio swagger documentação

/**
 * @swagger
 * /:
 *   get:
 *     summary: Página inicial da API
 *     description: Retorna informações básicas sobre a API
 *     tags: [Home]
 *     responses:
 *       200:
 *         description: Informações da API retornadas com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: API Vendas Eletrodomésticos
 *                 status:
 *                   type: string
 *                   example: online
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 documentation:
 *                   type: string
 *                   example: /api-docs
 */
router.get('/', (req, res) => {
  res.json({
    message: 'API Vendas Eletrodomésticos',
    status: 'online',
    version: '1.0.0',
    documentation: '/api-docs'
  });
});

module.exports = router;

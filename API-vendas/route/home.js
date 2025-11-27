const express = require('express');
const router = express.Router();

//teste inicio swagger documentação



/**
 * @swagger
 * /:
 *   get:
 *     summary: Informações da API
 *     description: Retorna informações gerais sobre a API e links úteis
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
 *                   example: Bem-vindo à API de Vendas de Eletrodomésticos
 *                 status:
 *                   type: string
 *                   example: online
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 *                 documentation:
 *                   type: string
 *                   example: /api-docs
 *                 endpoints:
 *                   type: object
 *                   properties:
 *                     auth:
 *                       type: string
 *                       example: /login, /logout, /auth/verify
 *                     clientes:
 *                       type: string
 *                       example: /clientes
 *                     vendedores:
 *                       type: string
 *                       example: /vendedores
 *                     eletrodomesticos:
 *                       type: string
 *                       example: /eletrodomesticos
 *                     carrinhos:
 *                       type: string
 *                       example: /carrinhos
 *                     carrinhoEletro:
 *                       type: string
 *                       example: /carrinho-eletro
 */
router.get('/', (req, res) => {
  res.json({
    message: 'Bem-vindo à API de Vendas de Eletrodomésticos',
    status: 'online',
    version: '1.0.0',
    documentation: '/api-docs',
    endpoints: {
      auth: '/login, /logout, /auth/verify',
      clientes: '/clientes',
      vendedores: '/vendedores',
      eletrodomesticos: '/eletrodomesticos',
      carrinhos: '/carrinhos',
      carrinhoEletro: '/carrinho-eletro'
    },
    features: [
      'Autenticação JWT',
      'Validação de dados',
      'CRUD completo',
      'Relacionamentos entre entidades',
      'Tratamento de erros padronizado'
    ],
    instructions: 'Acesse /api-docs para ver a documentação completa e testar os endpoints'
  });
});

module.exports = router;

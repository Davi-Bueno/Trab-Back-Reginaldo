const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../utils/tokenBlacklist');

/**
 * Middleware de autenticação JWT
 * Protege rotas que requerem autenticação
 */
const authMiddleware = (req, res, next) => {
  try {
    // Obtém o header de autorização
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ 
        error: 'Acesso negado',
        message: 'Token não fornecido' 
      });
    }

    // Formato esperado: "Bearer TOKEN"
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return res.status(401).json({ 
        error: 'Token mal formatado',
        format: 'Bearer TOKEN' 
      });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ 
        error: 'Token mal formatado',
        expected: 'Bearer TOKEN' 
      });
    }

    // Verifica se token está na lista negra (logout)
    if (TokenBlacklist.has(token)) {
      return res.status(401).json({ 
        error: 'Token invalidado',
        message: 'Este token foi revogado (logout realizado)' 
      });
    }

    // Verifica e decodifica o token
    const secret = process.env.SECRET || 'dmb';
    const decoded = jwt.verify(token, secret);

    // Adiciona informações do usuário ao request
    req.user = decoded;
    req.token = token;

    // Continua para a próxima função
    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        message: 'Faça login novamente' 
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido',
        message: 'Token corrompido ou assinatura inválida' 
      });
    }

    console.error('Erro no middleware de autenticação:', error);
    return res.status(500).json({ 
      error: 'Erro na autenticação',
      message: error.message 
    });
  }
};

module.exports = authMiddleware;

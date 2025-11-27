const jwt = require('jsonwebtoken');
const TokenBlacklist = require('../utils/tokenBlacklist');

/**
 * Controller para autenticação JWT
 */
const AuthController = {
  /**
   * POST /login - Gera token JWT
   * Em produção, deve validar usuário e senha no banco
   */
  async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validação básica
      if (!username || !password) {
        return res.status(400).json({ 
          error: 'Dados incompletos',
          required: ['username', 'password']
        });
      }

      // IMPORTANTE: Em produção, validar credenciais no banco de dados
      // Por enquanto, aceita qualquer usuário para demonstração
      // TODO: Implementar validação real de usuário e senha
      
      // Payload do token
      const payload = {
        username: username,
        timestamp: Date.now()
      };

      // Gera o token JWT
      const secret = process.env.SECRET || 'dmb';
      const token = jwt.sign(payload, secret, {
        expiresIn: '24h' // Token válido por 24 horas
      });

      res.status(200).json({
        message: 'Login realizado com sucesso',
        token: token,
        expiresIn: '24h',
        type: 'Bearer'
      });

    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ 
        error: 'Erro ao realizar login',
        message: error.message 
      });
    }
  },

  /**
   * POST /logout - Invalida token JWT
   */
  async logout(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }

      const token = authHeader.split(' ')[1]; // Remove "Bearer "

      if (!token) {
        return res.status(401).json({ error: 'Token inválido' });
      }

      // Adiciona token à lista negra
      TokenBlacklist.add(token);

      res.status(200).json({ 
        message: 'Logout realizado com sucesso',
        hint: 'Token invalidado'
      });

    } catch (error) {
      console.error('Erro no logout:', error);
      res.status(500).json({ 
        error: 'Erro ao realizar logout',
        message: error.message 
      });
    }
  },

  /**
   * GET /auth/verify - Verifica se token é válido
   */
  async verifyToken(req, res) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return res.status(401).json({ 
          valid: false,
          error: 'Token não fornecido' 
        });
      }

      const token = authHeader.split(' ')[1];

      if (!token) {
        return res.status(401).json({ 
          valid: false,
          error: 'Token inválido' 
        });
      }

      // Verifica se token está na lista negra
      if (TokenBlacklist.has(token)) {
        return res.status(401).json({ 
          valid: false,
          error: 'Token foi invalidado (logout)' 
        });
      }

      // Verifica assinatura e expiração do token
      const secret = process.env.SECRET || 'dmb';
      const decoded = jwt.verify(token, secret);

      res.status(200).json({
        valid: true,
        message: 'Token válido',
        user: decoded.username,
        timestamp: decoded.timestamp
      });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          valid: false,
          error: 'Token expirado' 
        });
      }
      
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ 
          valid: false,
          error: 'Token inválido' 
        });
      }

      console.error('Erro ao verificar token:', error);
      res.status(500).json({ 
        valid: false,
        error: 'Erro ao verificar token',
        message: error.message 
      });
    }
  }
};

module.exports = AuthController;

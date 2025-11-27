/**
 * Middleware de validação para Carrinho
 */
const validateCarrinho = (req, res, next) => {
  const { clienteId } = req.body;
  const errors = [];

  // Validação de clienteId
  if (clienteId === undefined || clienteId === null) {
    errors.push('ID do cliente é obrigatório');
  } else if (!Number.isInteger(clienteId)) {
    errors.push('ID do cliente deve ser um número inteiro');
  } else if (clienteId <= 0) {
    errors.push('ID do cliente deve ser maior que zero');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors
    });
  }

  next();
};

/**
 * Middleware de validação para atualização de Carrinho
 */
const validateCarrinhoUpdate = (req, res, next) => {
  const { clienteId } = req.body;
  const errors = [];

  // Validação de clienteId (opcional na atualização)
  if (clienteId !== undefined) {
    if (!Number.isInteger(clienteId)) {
      errors.push('ID do cliente deve ser um número inteiro');
    } else if (clienteId <= 0) {
      errors.push('ID do cliente deve ser maior que zero');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors
    });
  }

  next();
};

module.exports = {
  validateCarrinho,
  validateCarrinhoUpdate
};

/**
 * Middleware de validação para CarrinhoEletro
 */
const validateCarrinhoEletro = (req, res, next) => {
  const { carrinhoId, eletrodomesticoId, quantidade } = req.body;
  const errors = [];

  // Validação de carrinhoId
  if (carrinhoId === undefined || carrinhoId === null) {
    errors.push('ID do carrinho é obrigatório');
  } else if (!Number.isInteger(carrinhoId)) {
    errors.push('ID do carrinho deve ser um número inteiro');
  } else if (carrinhoId <= 0) {
    errors.push('ID do carrinho deve ser maior que zero');
  }

  // Validação de eletrodomesticoId
  if (eletrodomesticoId === undefined || eletrodomesticoId === null) {
    errors.push('ID do eletrodoméstico é obrigatório');
  } else if (!Number.isInteger(eletrodomesticoId)) {
    errors.push('ID do eletrodoméstico deve ser um número inteiro');
  } else if (eletrodomesticoId <= 0) {
    errors.push('ID do eletrodoméstico deve ser maior que zero');
  }

  // Validação de quantidade
  if (quantidade === undefined || quantidade === null) {
    errors.push('Quantidade é obrigatória');
  } else if (!Number.isInteger(quantidade)) {
    errors.push('Quantidade deve ser um número inteiro');
  } else if (quantidade <= 0) {
    errors.push('Quantidade deve ser maior que zero');
  } else if (quantidade > 1000) {
    errors.push('Quantidade não pode exceder 1000 unidades');
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
 * Middleware de validação para atualização de CarrinhoEletro
 */
const validateCarrinhoEletroUpdate = (req, res, next) => {
  const { quantidade } = req.body;
  const errors = [];

  // Validação de quantidade
  if (quantidade === undefined || quantidade === null) {
    errors.push('Quantidade é obrigatória');
  } else if (!Number.isInteger(quantidade)) {
    errors.push('Quantidade deve ser um número inteiro');
  } else if (quantidade <= 0) {
    errors.push('Quantidade deve ser maior que zero');
  } else if (quantidade > 1000) {
    errors.push('Quantidade não pode exceder 1000 unidades');
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
  validateCarrinhoEletro,
  validateCarrinhoEletroUpdate
};

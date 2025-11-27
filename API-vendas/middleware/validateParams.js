/**
 * Middleware de validação para parâmetros de ID nas rotas
 */
const validateId = (req, res, next) => {
  const { id } = req.params;
  
  const numericId = parseInt(id);
  
  if (isNaN(numericId) || numericId <= 0 || !Number.isInteger(numericId)) {
    return res.status(400).json({
      error: 'ID inválido',
      message: 'O ID deve ser um número inteiro positivo'
    });
  }

  // Adiciona o ID validado ao request para uso posterior
  req.validatedId = numericId;
  
  next();
};

/**
 * Middleware de validação para IDs compostos (carrinhoId e eletrodomesticoId)
 */
const validateCompositeId = (req, res, next) => {
  const { carrinhoId, eletrodomesticoId } = req.params;
  const errors = [];

  const numericCarrinhoId = parseInt(carrinhoId);
  const numericEletroId = parseInt(eletrodomesticoId);

  if (isNaN(numericCarrinhoId) || numericCarrinhoId <= 0 || !Number.isInteger(numericCarrinhoId)) {
    errors.push('ID do carrinho deve ser um número inteiro positivo');
  }

  if (isNaN(numericEletroId) || numericEletroId <= 0 || !Number.isInteger(numericEletroId)) {
    errors.push('ID do eletrodoméstico deve ser um número inteiro positivo');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'IDs inválidos',
      details: errors
    });
  }

  // Adiciona os IDs validados ao request
  req.validatedCarrinhoId = numericCarrinhoId;
  req.validatedEletroId = numericEletroId;

  next();
};

module.exports = {
  validateId,
  validateCompositeId
};

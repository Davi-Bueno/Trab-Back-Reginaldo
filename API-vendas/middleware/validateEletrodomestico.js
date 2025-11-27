/**
 * Middleware de validação para Eletrodoméstico
 */
const validateEletrodomestico = (req, res, next) => {
  const { nome, preco, estoque, vendedorId } = req.body;
  const errors = [];

  // Validação de nome
  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    errors.push('Nome é obrigatório e deve ser uma string não vazia');
  } else if (nome.trim().length < 2) {
    errors.push('Nome deve ter pelo menos 2 caracteres');
  } else if (nome.trim().length > 100) {
    errors.push('Nome deve ter no máximo 100 caracteres');
  }

  // Validação de preço
  if (preco === undefined || preco === null) {
    errors.push('Preço é obrigatório');
  } else if (typeof preco !== 'number') {
    errors.push('Preço deve ser um número');
  } else if (preco <= 0) {
    errors.push('Preço deve ser maior que zero');
  } else if (preco > 999999.99) {
    errors.push('Preço não pode exceder 999999.99');
  }

  // Validação de estoque
  if (estoque === undefined || estoque === null) {
    errors.push('Estoque é obrigatório');
  } else if (!Number.isInteger(estoque)) {
    errors.push('Estoque deve ser um número inteiro');
  } else if (estoque < 0) {
    errors.push('Estoque não pode ser negativo');
  }

  // Validação de vendedorId
  if (vendedorId === undefined || vendedorId === null) {
    errors.push('ID do vendedor é obrigatório');
  } else if (!Number.isInteger(vendedorId)) {
    errors.push('ID do vendedor deve ser um número inteiro');
  } else if (vendedorId <= 0) {
    errors.push('ID do vendedor deve ser maior que zero');
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
 * Middleware de validação para atualização de Eletrodoméstico
 */
const validateEletrodomesticoUpdate = (req, res, next) => {
  const { nome, preco, estoque, vendedorId } = req.body;
  const errors = [];

  // Validação de nome (opcional na atualização)
  if (nome !== undefined) {
    if (typeof nome !== 'string' || nome.trim().length === 0) {
      errors.push('Nome deve ser uma string não vazia');
    } else if (nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    } else if (nome.trim().length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres');
    }
  }

  // Validação de preço (opcional na atualização)
  if (preco !== undefined) {
    if (typeof preco !== 'number') {
      errors.push('Preço deve ser um número');
    } else if (preco <= 0) {
      errors.push('Preço deve ser maior que zero');
    } else if (preco > 999999.99) {
      errors.push('Preço não pode exceder 999999.99');
    }
  }

  // Validação de estoque (opcional na atualização)
  if (estoque !== undefined) {
    if (!Number.isInteger(estoque)) {
      errors.push('Estoque deve ser um número inteiro');
    } else if (estoque < 0) {
      errors.push('Estoque não pode ser negativo');
    }
  }

  // Validação de vendedorId (opcional na atualização)
  if (vendedorId !== undefined) {
    if (!Number.isInteger(vendedorId)) {
      errors.push('ID do vendedor deve ser um número inteiro');
    } else if (vendedorId <= 0) {
      errors.push('ID do vendedor deve ser maior que zero');
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
  validateEletrodomestico,
  validateEletrodomesticoUpdate
};

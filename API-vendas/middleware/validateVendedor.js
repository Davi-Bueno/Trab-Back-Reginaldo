/**
 * Middleware de validação para Vendedor
 */
const validateVendedor = (req, res, next) => {
  const { nome, email } = req.body;
  const errors = [];

  // Validação de nome
  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    errors.push('Nome é obrigatório e deve ser uma string não vazia');
  } else if (nome.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres');
  } else if (nome.trim().length > 100) {
    errors.push('Nome deve ter no máximo 100 caracteres');
  }

  // Validação de email
  if (!email || typeof email !== 'string') {
    errors.push('Email é obrigatório e deve ser uma string');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Email deve ser um endereço válido');
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

/**
 * Middleware de validação para atualização de Vendedor
 */
const validateVendedorUpdate = (req, res, next) => {
  const { nome, email } = req.body;
  const errors = [];

  // Validação de nome (opcional na atualização)
  if (nome !== undefined) {
    if (typeof nome !== 'string' || nome.trim().length === 0) {
      errors.push('Nome deve ser uma string não vazia');
    } else if (nome.trim().length < 3) {
      errors.push('Nome deve ter pelo menos 3 caracteres');
    } else if (nome.trim().length > 100) {
      errors.push('Nome deve ter no máximo 100 caracteres');
    }
  }

  // Validação de email (opcional na atualização)
  if (email !== undefined) {
    if (typeof email !== 'string') {
      errors.push('Email deve ser uma string');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Email deve ser um endereço válido');
      }
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
  validateVendedor,
  validateVendedorUpdate
};

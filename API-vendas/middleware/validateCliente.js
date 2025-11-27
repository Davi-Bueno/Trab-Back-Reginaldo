/**
 * Middleware de validação para Cliente
 */
const validateCliente = (req, res, next) => {
  const { nome, cpf, email, telefone } = req.body;
  const errors = [];

  // Validação de nome
  if (!nome || typeof nome !== 'string' || nome.trim().length === 0) {
    errors.push('Nome é obrigatório e deve ser uma string não vazia');
  } else if (nome.trim().length < 3) {
    errors.push('Nome deve ter pelo menos 3 caracteres');
  } else if (nome.trim().length > 100) {
    errors.push('Nome deve ter no máximo 100 caracteres');
  }

  // Validação de CPF
  if (!cpf || typeof cpf !== 'string') {
    errors.push('CPF é obrigatório e deve ser uma string');
  } else {
    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      errors.push('CPF deve conter 11 dígitos');
    } else if (!/^\d{11}$/.test(cpfLimpo)) {
      errors.push('CPF deve conter apenas números');
    }
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

  // Validação de telefone
  if (!telefone || typeof telefone !== 'string') {
    errors.push('Telefone é obrigatório e deve ser uma string');
  } else {
    const telefoneLimpo = telefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
      errors.push('Telefone deve conter 10 ou 11 dígitos');
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
 * Middleware de validação para atualização de Cliente
 */
const validateClienteUpdate = (req, res, next) => {
  const { nome, cpf, email, telefone } = req.body;
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

  // Validação de CPF (opcional na atualização)
  if (cpf !== undefined) {
    if (typeof cpf !== 'string') {
      errors.push('CPF deve ser uma string');
    } else {
      const cpfLimpo = cpf.replace(/\D/g, '');
      if (cpfLimpo.length !== 11) {
        errors.push('CPF deve conter 11 dígitos');
      }
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

  // Validação de telefone (opcional na atualização)
  if (telefone !== undefined) {
    if (typeof telefone !== 'string') {
      errors.push('Telefone deve ser uma string');
    } else {
      const telefoneLimpo = telefone.replace(/\D/g, '');
      if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        errors.push('Telefone deve conter 10 ou 11 dígitos');
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
  validateCliente,
  validateClienteUpdate
};

/**
 * README - Documentação da API
 * 
 * Este arquivo contém informações importantes sobre schemas e exemplos
 * utilizados na documentação Swagger da API.
 */

// SCHEMAS DE EXEMPLO PARA SWAGGER

/**
 * Cliente Schema
 * {
 *   "id": 1,
 *   "nome": "João da Silva",
 *   "cpf": "12345678901",
 *   "email": "joao.silva@email.com",
 *   "telefone": "11987654321"
 * }
 */

/**
 * Vendedor Schema
 * {
 *   "id": 1,
 *   "nome": "Maria Santos",
 *   "email": "maria.santos@empresa.com"
 * }
 */

/**
 * Eletrodoméstico Schema
 * {
 *   "id": 1,
 *   "nome": "Geladeira Frost Free 400L",
 *   "preco": 2499.90,
 *   "estoque": 15,
 *   "vendedorId": 1
 * }
 */

/**
 * Carrinho Schema
 * {
 *   "id": 1,
 *   "clienteId": 1
 * }
 */

/**
 * CarrinhoEletro Schema
 * {
 *   "carrinhoId": 1,
 *   "eletrodomesticoId": 1,
 *   "quantidade": 2
 * }
 */

// EXEMPLOS DE ERROS

/**
 * Erro de Validação
 * {
 *   "error": "Dados inválidos",
 *   "details": [
 *     "Nome deve ter pelo menos 3 caracteres",
 *     "Email deve ser válido"
 *   ]
 * }
 */

/**
 * Erro de Autenticação
 * {
 *   "error": "Acesso negado",
 *   "message": "Token não fornecido"
 * }
 */

/**
 * Erro 404
 * {
 *   "error": "Não encontrado",
 *   "message": "Registro não encontrado"
 * }
 */

// REGRAS DE VALIDAÇÃO

/**
 * CLIENTE:
 * - nome: string, 3-100 caracteres
 * - cpf: string, 11 dígitos numéricos
 * - email: string, formato válido de email
 * - telefone: string, 10-11 dígitos
 * 
 * VENDEDOR:
 * - nome: string, 3-100 caracteres
 * - email: string, formato válido de email
 * 
 * ELETRODOMÉSTICO:
 * - nome: string, 2-100 caracteres
 * - preco: number, > 0, máx 999999.99
 * - estoque: integer, >= 0
 * - vendedorId: integer, > 0
 * 
 * CARRINHO:
 * - clienteId: integer, > 0
 * 
 * CARRINHO_ELETRO:
 * - carrinhoId: integer, > 0
 * - eletrodomesticoId: integer, > 0
 * - quantidade: integer, 1-1000
 */

module.exports = {
  info: 'Este arquivo serve como referência para a documentação da API'
};

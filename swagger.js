const swaggerJsdoc = require('swagger-jsdoc');//biblio para gerar a  doc
const swaggerUi = require('swagger-ui-express');//interface do uso da doc


const swaggerOptions = {//configs
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Venda Eletrodomésticos',
      version: '1.0.0',
      description: `API RESTful para gerenciamento de vendas de eletrodomésticos.
      
**Recursos:**
- Autenticação JWT (Bearer Token)
- CRUD completo de Clientes, Vendedores, Eletrodomésticos e Carrinhos
- Validações de dados em todas as rotas
- Tratamento de erros padronizado
- Relacionamentos entre entidades
      
**Como usar:**
1. Faça login em /login para obter seu token JWT
2. Use o botão "Authorize" no topo e insira: Bearer {seu-token}
3. Todas as rotas de criação, atualização e exclusão requerem autenticação
      
**Desenvolvido com:**
- Node.js + Express
- Prisma ORM
- SQL Server
- JWT para autenticação`,
      contact: {
        name: 'API Support',
        email: 'suporte@eletrodomesticos.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desenvolvimento'
      },
      {
        url: 'https://api-eletro.herokuapp.com',
        description: 'Servidor de Produção'
      }
    ],
    components: {
      securitySchemes: {//config de segurança
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT obtido no endpoint /login'
        },
      },
      schemas: {
        Cliente: {
          type: 'object',
          required: ['nome', 'cpf', 'email', 'telefone'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do cliente',
              example: 1
            },
            nome: {
              type: 'string',
              description: 'Nome completo do cliente (3-100 caracteres)',
              example: 'João da Silva'
            },
            cpf: {
              type: 'string',
              description: 'CPF do cliente (11 dígitos)',
              example: '12345678901'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email válido do cliente',
              example: 'joao.silva@email.com'
            },
            telefone: {
              type: 'string',
              description: 'Telefone do cliente (10-11 dígitos)',
              example: '11987654321'
            }
          }
        },
        Vendedor: {
          type: 'object',
          required: ['nome', 'email'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do vendedor',
              example: 1
            },
            nome: {
              type: 'string',
              description: 'Nome completo do vendedor (3-100 caracteres)',
              example: 'Maria Santos'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email válido do vendedor',
              example: 'maria.santos@empresa.com'
            }
          }
        },
        Eletrodomestico: {
          type: 'object',
          required: ['nome', 'preco', 'estoque', 'vendedorId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do eletrodoméstico',
              example: 1
            },
            nome: {
              type: 'string',
              description: 'Nome do produto (2-100 caracteres)',
              example: 'Geladeira Frost Free 400L'
            },
            preco: {
              type: 'number',
              format: 'decimal',
              description: 'Preço do produto (maior que 0, máx 999999.99)',
              example: 2499.90
            },
            estoque: {
              type: 'integer',
              description: 'Quantidade em estoque (não negativo)',
              example: 15
            },
            vendedorId: {
              type: 'integer',
              description: 'ID do vendedor responsável',
              example: 1
            }
          }
        },
        Carrinho: {
          type: 'object',
          required: ['clienteId'],
          properties: {
            id: {
              type: 'integer',
              description: 'ID único do carrinho',
              example: 1
            },
            clienteId: {
              type: 'integer',
              description: 'ID do cliente dono do carrinho',
              example: 1
            }
          }
        },
        CarrinhoEletro: {
          type: 'object',
          required: ['carrinhoId', 'eletrodomesticoId', 'quantidade'],
          properties: {
            carrinhoId: {
              type: 'integer',
              description: 'ID do carrinho',
              example: 1
            },
            eletrodomesticoId: {
              type: 'integer',
              description: 'ID do eletrodoméstico',
              example: 1
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade do produto (1-1000)',
              example: 2
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
              example: 'Dados inválidos'
            },
            message: {
              type: 'string',
              description: 'Detalhes do erro',
              example: 'O campo nome é obrigatório'
            },
            details: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: 'Lista de erros de validação',
              example: ['Nome deve ter pelo menos 3 caracteres', 'Email deve ser válido']
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Token de autenticação ausente ou inválido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Acesso negado',
                message: 'Token não fornecido'
              }
            }
          }
        },
        ValidationError: {
          description: 'Erro de validação dos dados enviados',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Dados inválidos',
                details: ['Nome deve ter pelo menos 3 caracteres', 'Email deve ser válido']
              }
            }
          }
        },
        NotFoundError: {
          description: 'Recurso não encontrado',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Não encontrado',
                message: 'Registro não encontrado'
              }
            }
          }
        },
        InternalServerError: {
          description: 'Erro interno do servidor',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Erro interno do servidor',
                message: 'Ocorreu um erro inesperado'
              }
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./API-vendas/route/*.js'], // de onde ele vai puxar as ditas docs(nos routes)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);//uso das configs

module.exports = {
  swaggerUi,
  swaggerDocs,
};

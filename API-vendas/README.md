# 🛒 API de Vendas de Eletrodomésticos

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)](https://www.prisma.io/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

API RESTful completa para gerenciamento de vendas de eletrodomésticos, desenvolvida com Node.js, Express e Prisma ORM. Implementa autenticação JWT, validações robustas, documentação Swagger e testes automatizados.

## 📋 Índice

- [Recursos](#-recursos)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Endpoints da API](#-endpoints-da-api)
- [Autenticação](#-autenticação)
- [Validações](#-validações)
- [Testes](#-testes)
- [Documentação Swagger](#-documentação-swagger)
- [Equipe](#-equipe)
- [Licença](#-licença)

## ✨ Recursos

- ✅ **CRUD Completo** para Clientes, Vendedores, Eletrodomésticos e Carrinhos
- 🔐 **Autenticação JWT** (Bearer Token)
- ✔️ **Validações Robustas** em todas as entradas de dados
- 📝 **Documentação Swagger/OpenAPI** interativa
- 🧪 **Testes Automatizados** com Jest e Supertest
- 🗄️ **Prisma ORM** para SQL Server
- 🔒 **Rotas Protegidas** com middleware de autenticação
- 🚨 **Tratamento de Erros** padronizado
- 📊 **Relacionamentos** entre entidades

## 🚀 Tecnologias

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Prisma** - ORM para banco de dados
- **SQL Server** - Banco de dados relacional

### Autenticação & Segurança
- **JWT (jsonwebtoken)** - Autenticação stateless
- **CORS** - Controle de acesso de origem cruzada
- **Express Session** - Gerenciamento de sessões

### Documentação
- **Swagger UI Express** - Interface de documentação
- **Swagger JSDoc** - Geração de documentação

### Testes
- **Jest** - Framework de testes
- **Supertest** - Testes de API HTTP

### Utilitários
- **dotenv** - Variáveis de ambiente
- **express-session** - Sessões HTTP

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [SQL Server](https://www.microsoft.com/sql-server/) (LocalDB, Express ou Server)
- [Git](https://git-scm.com/)

## 🔧 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/Davi-Bueno/Trab-Back-Reginaldo.git
cd Trab-Back-Reginaldo/API-Back-Vendas-Eletro
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Certifique-se de que o SQL Server está rodando e crie o banco de dados:

```sql
CREATE DATABASE DbEletrodomesticos;
```

### 4. Execute as migrations do Prisma

```bash
cd API-vendas
npx prisma migrate dev
```

### 5. (Opcional) Gere o Prisma Client

```bash
npx prisma generate
```

## ⚙️ Configuração

### Arquivo .env

Crie um arquivo `.env` na pasta `API-vendas` com as seguintes variáveis:

```env
# Porta do servidor
PORTA=3001

# Chave secreta para JWT
SECRET=dmb

# String de conexão do SQL Server
DATABASE_URL="sqlserver://localhost:1433;database=DbEletrodomesticos;user=seu_usuario;password=sua_senha;trustServerCertificate=true;encrypt=true"
```

**Nota:** Ajuste a `DATABASE_URL` conforme suas credenciais do SQL Server.

## 🎯 Executando o Projeto

### Modo Desenvolvimento

```bash
npm start
```

O servidor estará disponível em: `http://localhost:3001`

### Executar Testes

```bash
# Todos os testes
npm test

# Com cobertura de código
npm test -- --coverage

# Modo watch (desenvolvimento)
npm run test:watch

# Modo verbose (detalhado)
npm run test:verbose
```

## 📁 Estrutura do Projeto

```
API-vendas/
├── config/
│   └── database.js          # Configuração Prisma Client
├── controller/
│   ├── authController.js     # Lógica de autenticação
│   ├── clienteController.js  # CRUD de clientes
│   ├── vendedorController.js # CRUD de vendedores
│   ├── eletrodomesticoController.js
│   ├── carrinhoController.js
│   └── carrinhoEletroController.js
├── middleware/
│   ├── authMiddleware.js     # Proteção JWT
│   ├── validateCliente.js    # Validação de clientes
│   ├── validateVendedor.js   # Validação de vendedores
│   ├── validateEletrodomestico.js
│   ├── validateCarrinho.js
│   ├── validateCarrinhoEletro.js
│   └── validateParams.js     # Validação de IDs
├── models/
│   ├── clienteModel.js       # Modelo de dados Cliente
│   ├── vendedorModel.js
│   ├── eletrodomesticoModel.js
│   ├── carrinhoModel.js
│   └── carrinhoEletroModel.js
├── route/
│   ├── home.js               # Rota raiz
│   ├── authRoutes.js         # Rotas de autenticação
│   ├── clienteRoutes.js      # Rotas de clientes
│   ├── vendedorRoutes.js
│   ├── eletrodomesticoRoutes.js
│   ├── carrinhoRoutes.js
│   └── carrinhoEletroRoutes.js
├── tests/
│   ├── auth.test.js          # Testes de autenticação
│   ├── validation.test.js    # Testes de validação
│   ├── authMiddleware.test.js
│   ├── routes.test.js
│   └── README.md
├── utils/
│   └── tokenBlacklist.js     # Lista negra de tokens
├── docs/
│   └── swagger-schemas.js    # Schemas Swagger
├── prisma/
│   └── schema.prisma         # Schema do banco de dados
├── app.js                    # Aplicação Express
├── jest.config.js            # Configuração Jest
└── .env                      # Variáveis de ambiente
```

## 🌐 Endpoints da API

### Autenticação

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/login` | Realizar login e obter JWT | ❌ |
| POST | `/logout` | Invalidar token JWT | ✅ |
| GET | `/auth/verify` | Verificar validade do token | ✅ |

### Clientes

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/clientes` | Listar todos os clientes | ❌ |
| GET | `/clientes/:id` | Buscar cliente por ID | ❌ |
| POST | `/clientes` | Criar novo cliente | ✅ |
| PUT | `/clientes/:id` | Atualizar cliente | ✅ |
| DELETE | `/clientes/:id` | Deletar cliente | ✅ |

### Vendedores

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/vendedores` | Listar todos os vendedores | ❌ |
| GET | `/vendedores/:id` | Buscar vendedor por ID | ❌ |
| POST | `/vendedores` | Criar novo vendedor | ✅ |
| PUT | `/vendedores/:id` | Atualizar vendedor | ✅ |
| DELETE | `/vendedores/:id` | Deletar vendedor | ✅ |

### Eletrodomésticos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/eletrodomesticos` | Listar todos os produtos | ❌ |
| GET | `/eletrodomesticos/:id` | Buscar produto por ID | ❌ |
| GET | `/eletrodomesticos/vendedor/:vendedorId` | Listar por vendedor | ❌ |
| POST | `/eletrodomesticos` | Criar novo produto | ✅ |
| PUT | `/eletrodomesticos/:id` | Atualizar produto | ✅ |
| DELETE | `/eletrodomesticos/:id` | Deletar produto | ✅ |

### Carrinhos

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/carrinhos` | Listar todos os carrinhos | ❌ |
| GET | `/carrinhos/:id` | Buscar carrinho por ID | ❌ |
| GET | `/carrinhos/cliente/:clienteId` | Buscar por cliente | ❌ |
| GET | `/carrinhos/:id/total` | Calcular total | ❌ |
| POST | `/carrinhos` | Criar novo carrinho | ✅ |
| PUT | `/carrinhos/:id` | Atualizar carrinho | ✅ |
| DELETE | `/carrinhos/:id` | Deletar carrinho | ✅ |

### Itens do Carrinho

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| GET | `/carrinho-eletro` | Listar todos os itens | ❌ |
| GET | `/carrinho-eletro/:carrinhoId/:eletrodomesticoId` | Buscar item específico | ❌ |
| GET | `/carrinho-eletro/carrinho/:carrinhoId` | Listar itens do carrinho | ❌ |
| POST | `/carrinho-eletro` | Adicionar item | ✅ |
| PUT | `/carrinho-eletro/:carrinhoId/:eletrodomesticoId` | Atualizar quantidade | ✅ |
| DELETE | `/carrinho-eletro/:carrinhoId/:eletrodomesticoId` | Remover item | ✅ |

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação.

### 1. Obter Token

```bash
POST /login
Content-Type: application/json

{
  "username": "seu_usuario",
  "password": "sua_senha"
}
```

**Resposta:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "24h",
  "type": "Bearer"
}
```

### 2. Usar Token

Inclua o token no header `Authorization`:

```bash
Authorization: Bearer seu_token_jwt_aqui
```

### 3. Exemplo com cURL

```bash
curl -X POST http://localhost:3001/clientes \
  -H "Authorization: Bearer seu_token_jwt_aqui" \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "cpf": "12345678901",
    "email": "joao@email.com",
    "telefone": "11987654321"
  }'
```

## ✔️ Validações

### Cliente
- **nome**: string, 3-100 caracteres
- **cpf**: string, 11 dígitos numéricos
- **email**: formato válido de email
- **telefone**: 10-11 dígitos

### Vendedor
- **nome**: string, 3-100 caracteres
- **email**: formato válido de email

### Eletrodoméstico
- **nome**: string, 2-100 caracteres
- **preco**: número decimal, > 0, máx 999999.99
- **estoque**: inteiro, >= 0
- **vendedorId**: inteiro, > 0

### Carrinho
- **clienteId**: inteiro, > 0

### CarrinhoEletro
- **carrinhoId**: inteiro, > 0
- **eletrodomesticoId**: inteiro, > 0
- **quantidade**: inteiro, 1-1000

## 🧪 Testes

A API possui **44 testes automatizados** cobrindo:

- ✅ Autenticação JWT (login, logout, verify)
- ✅ Validações de dados
- ✅ Middleware de proteção
- ✅ Rotas da API
- ✅ Tratamento de erros

### Executar Testes

```bash
npm test
```

### Cobertura de Código

```bash
npm test -- --coverage
```

Veja mais detalhes em [tests/README.md](API-vendas/tests/README.md)

## 📚 Documentação Swagger

A documentação interativa está disponível em:

```
http://localhost:3001/api-docs
```

Recursos do Swagger:
- 📖 Documentação completa de todos os endpoints
- 🧪 Interface para testar requisições
- 🔐 Suporte a autenticação JWT
- 📋 Schemas de dados
- 📝 Exemplos de requisições e respostas

### Como Usar o Swagger

1. Acesse `http://localhost:3001/api-docs`
2. Faça login em `/login` para obter o token
3. Clique no botão **Authorize** no topo
4. Insira: `Bearer seu_token_aqui`
5. Teste os endpoints protegidos

## 👥 Equipe

### Divisão de Responsabilidades

| Membro | Responsabilidades |
|--------|------------------|
| **Davi Bueno** | Tudo |


**Desenvolvido com ❤️ por Davi Bueno **

⭐ Se este projeto foi útil, considere dar uma estrela no GitHub!

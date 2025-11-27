# Testes Unitários - API Vendas Eletrodomésticos

## 📋 Estrutura de Testes

```
tests/
├── auth.test.js              # Testes de autenticação (login, logout, verify)
├── validation.test.js        # Testes de validação de dados
├── authMiddleware.test.js    # Testes de middleware JWT
└── routes.test.js            # Testes de rotas da API
```

## 🧪 Suítes de Testes Implementadas

### 1. **auth.test.js** - Autenticação JWT
- ✅ Login com credenciais válidas
- ✅ Login sem credenciais
- ✅ Logout com token válido
- ✅ Logout sem token
- ✅ Verificação de token válido
- ✅ Verificação de token inválido

### 2. **validation.test.js** - Validações
- ✅ Validação de nome (mínimo 3 caracteres)
- ✅ Validação de CPF (11 dígitos)
- ✅ Validação de email (formato válido)
- ✅ Validação de telefone (10-11 dígitos)
- ✅ Validação de preço (positivo, máx 999999.99)
- ✅ Validação de estoque (não negativo)
- ✅ Validação de quantidade (1-1000)
- ✅ Validação de IDs (inteiros positivos)

### 3. **authMiddleware.test.js** - Proteção de Rotas
- ✅ Bloqueio de POST sem token
- ✅ Bloqueio de PUT sem token
- ✅ Bloqueio de DELETE sem token
- ✅ Rejeição de token mal formatado
- ✅ Rejeição de token inválido
- ✅ Permissão de GET sem autenticação

### 4. **routes.test.js** - Rotas da API
- ✅ Endpoint raiz (/)
- ✅ Rota não encontrada (404)
- ✅ Listagem de recursos (GET)
- ✅ Estrutura de resposta JSON

## 🚀 Como Executar os Testes

### Executar todos os testes
```bash
npm test
```

### Executar com cobertura de código
```bash
npm test -- --coverage
```

### Executar em modo watch (desenvolvimento)
```bash
npm run test:watch
```

### Executar com saída detalhada
```bash
npm run test:verbose
```

## 📊 Cobertura de Código

Os testes cobrem:
- Controllers (AuthController)
- Middlewares (authMiddleware, validações)
- Rotas (todas as rotas da API)
- Validações de entrada de dados

## 🔧 Tecnologias Utilizadas

- **Jest**: Framework de testes
- **Supertest**: Testes HTTP/API
- **@types/jest**: Tipagens TypeScript para Jest

## 📝 Convenções

- Todos os testes seguem o padrão AAA (Arrange, Act, Assert)
- Nomes descritivos usando "deve..."
- Agrupamento por funcionalidade com describe()
- Setup/Teardown com beforeAll/afterAll quando necessário

## ⚠️ Importante

Os testes assumem que:
1. A API está configurada corretamente
2. As variáveis de ambiente estão definidas (.env)
3. O banco de dados pode estar offline (testes tratam erro 500)
4. O sistema de autenticação aceita qualquer usuário (modo demonstração)

## 🎯 Resultados Esperados

- ✅ 100% dos testes de autenticação passando
- ✅ 100% dos testes de validação passando
- ✅ 100% dos testes de middleware passando
- ✅ 100% dos testes de rotas passando

Total: **~40 casos de teste** cobrindo as principais funcionalidades da API.

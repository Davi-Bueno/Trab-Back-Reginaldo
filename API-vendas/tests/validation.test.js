const request = require('supertest');
const app = require('../app');

describe('Testes de Validação de Middlewares', () => {
  let token;

  // Obtém token antes dos testes
  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpass'
      });
    token = loginResponse.body.token;
  });

  describe('Validação de Cliente', () => {
    it('deve rejeitar cliente com nome muito curto', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Ab',
          cpf: '12345678901',
          email: 'teste@email.com',
          telefone: '11987654321'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Dados inválidos');
      expect(response.body.details).toContain('Nome deve ter pelo menos 3 caracteres');
    });

    it('deve rejeitar cliente com CPF inválido', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'João Silva',
          cpf: '123',
          email: 'teste@email.com',
          telefone: '11987654321'
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('CPF deve conter 11 dígitos');
    });

    it('deve rejeitar cliente com email inválido', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'João Silva',
          cpf: '12345678901',
          email: 'emailinvalido',
          telefone: '11987654321'
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Email deve ser um endereço válido');
    });

    it('deve rejeitar cliente com telefone inválido', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'João Silva',
          cpf: '12345678901',
          email: 'teste@email.com',
          telefone: '123'
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Telefone deve conter 10 ou 11 dígitos');
    });
  });

  describe('Validação de Eletrodoméstico', () => {
    it('deve rejeitar eletrodoméstico com preço negativo', async () => {
      const response = await request(app)
        .post('/eletrodomesticos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Geladeira',
          preco: -100,
          estoque: 10,
          vendedorId: 1
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Preço deve ser maior que zero');
    });

    it('deve rejeitar eletrodoméstico com estoque negativo', async () => {
      const response = await request(app)
        .post('/eletrodomesticos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Geladeira',
          preco: 1000,
          estoque: -5,
          vendedorId: 1
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Estoque não pode ser negativo');
    });

    it('deve rejeitar eletrodoméstico sem vendedorId', async () => {
      const response = await request(app)
        .post('/eletrodomesticos')
        .set('Authorization', `Bearer ${token}`)
        .send({
          nome: 'Geladeira',
          preco: 1000,
          estoque: 10
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('ID do vendedor é obrigatório');
    });
  });

  describe('Validação de CarrinhoEletro', () => {
    it('deve rejeitar quantidade acima do limite', async () => {
      const response = await request(app)
        .post('/carrinho-eletro')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carrinhoId: 1,
          eletrodomesticoId: 1,
          quantidade: 1001
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Quantidade não pode exceder 1000 unidades');
    });

    it('deve rejeitar quantidade zero ou negativa', async () => {
      const response = await request(app)
        .post('/carrinho-eletro')
        .set('Authorization', `Bearer ${token}`)
        .send({
          carrinhoId: 1,
          eletrodomesticoId: 1,
          quantidade: 0
        });

      expect(response.status).toBe(400);
      expect(response.body.details).toContain('Quantidade deve ser maior que zero');
    });
  });

  describe('Validação de Parâmetros de ID', () => {
    it('deve rejeitar ID inválido (não numérico)', async () => {
      const response = await request(app)
        .get('/clientes/abc');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'ID inválido');
    });

    it('deve rejeitar ID negativo', async () => {
      const response = await request(app)
        .get('/clientes/-1');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'ID inválido');
    });

    it('deve rejeitar ID zero', async () => {
      const response = await request(app)
        .get('/clientes/0');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'ID inválido');
    });
  });
});

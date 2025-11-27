const request = require('supertest');
const app = require('../app');

describe('Testes de Middleware de Autenticação', () => {
  let token;

  beforeAll(async () => {
    const loginResponse = await request(app)
      .post('/login')
      .send({
        username: 'testuser',
        password: 'testpass'
      });
    token = loginResponse.body.token;
  });

  describe('Rotas Protegidas - POST', () => {
    it('deve bloquear POST /clientes sem token', async () => {
      const response = await request(app)
        .post('/clientes')
        .send({
          nome: 'Teste',
          cpf: '12345678901',
          email: 'teste@email.com',
          telefone: '11987654321'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('deve bloquear POST /vendedores sem token', async () => {
      const response = await request(app)
        .post('/vendedores')
        .send({
          nome: 'Vendedor Teste',
          email: 'vendedor@email.com'
        });

      expect(response.status).toBe(401);
    });

    it('deve bloquear POST /eletrodomesticos sem token', async () => {
      const response = await request(app)
        .post('/eletrodomesticos')
        .send({
          nome: 'Geladeira',
          preco: 1000,
          estoque: 10,
          vendedorId: 1
        });

      expect(response.status).toBe(401);
    });

    it('deve bloquear POST /carrinhos sem token', async () => {
      const response = await request(app)
        .post('/carrinhos')
        .send({
          clienteId: 1
        });

      expect(response.status).toBe(401);
    });
  });

  describe('Rotas Protegidas - PUT', () => {
    it('deve bloquear PUT /clientes/:id sem token', async () => {
      const response = await request(app)
        .put('/clientes/1')
        .send({
          nome: 'Nome Atualizado'
        });

      expect(response.status).toBe(401);
    });

    it('deve bloquear PUT /vendedores/:id sem token', async () => {
      const response = await request(app)
        .put('/vendedores/1')
        .send({
          nome: 'Nome Atualizado'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('Rotas Protegidas - DELETE', () => {
    it('deve bloquear DELETE /clientes/:id sem token', async () => {
      const response = await request(app)
        .delete('/clientes/1');

      expect(response.status).toBe(401);
    });

    it('deve bloquear DELETE /vendedores/:id sem token', async () => {
      const response = await request(app)
        .delete('/vendedores/1');

      expect(response.status).toBe(401);
    });

    it('deve bloquear DELETE /eletrodomesticos/:id sem token', async () => {
      const response = await request(app)
        .delete('/eletrodomesticos/1');

      expect(response.status).toBe(401);
    });
  });

  describe('Token Inválido ou Mal Formatado', () => {
    it('deve rejeitar token mal formatado', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', 'InvalidFormat')
        .send({
          nome: 'Teste',
          cpf: '12345678901',
          email: 'teste@email.com',
          telefone: '11987654321'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });

    it('deve rejeitar token JWT inválido', async () => {
      const response = await request(app)
        .post('/clientes')
        .set('Authorization', 'Bearer tokeninvalidoaqui')
        .send({
          nome: 'Teste',
          cpf: '12345678901',
          email: 'teste@email.com',
          telefone: '11987654321'
        });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Token inválido');
    });
  });

  describe('Rotas Públicas (GET)', () => {
    it('deve permitir GET /clientes sem autenticação', async () => {
      const response = await request(app)
        .get('/clientes');

      expect([200, 500]).toContain(response.status);
    });

    it('deve permitir GET /vendedores sem autenticação', async () => {
      const response = await request(app)
        .get('/vendedores');

      expect([200, 500]).toContain(response.status);
    });

    it('deve permitir GET /eletrodomesticos sem autenticação', async () => {
      const response = await request(app)
        .get('/eletrodomesticos');

      expect([200, 500]).toContain(response.status);
    });
  });
});

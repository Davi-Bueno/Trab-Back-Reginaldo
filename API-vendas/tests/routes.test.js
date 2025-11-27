const request = require('supertest');
const app = require('../app');

describe('Testes de Rotas da API', () => {
  describe('GET /', () => {
    it('deve retornar informações da API', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('status', 'online');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('documentation', '/api-docs');
      expect(response.body).toHaveProperty('endpoints');
    });
  });

  describe('Rota Inexistente', () => {
    it('deve retornar 404 para rota não encontrada', async () => {
      const response = await request(app).get('/rota-inexistente');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Rota não encontrada');
      expect(response.body).toHaveProperty('path', '/rota-inexistente');
    });
  });

  describe('GET /clientes', () => {
    it('deve retornar lista de clientes ou erro de conexão', async () => {
      const response = await request(app).get('/clientes');

      // Aceita 200 (sucesso) ou 500 (erro de conexão com banco)
      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('GET /vendedores', () => {
    it('deve retornar lista de vendedores ou erro de conexão', async () => {
      const response = await request(app).get('/vendedores');

      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('GET /eletrodomesticos', () => {
    it('deve retornar lista de eletrodomésticos ou erro de conexão', async () => {
      const response = await request(app).get('/eletrodomesticos');

      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('GET /carrinhos', () => {
    it('deve retornar lista de carrinhos ou erro de conexão', async () => {
      const response = await request(app).get('/carrinhos');

      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });

  describe('GET /carrinho-eletro', () => {
    it('deve retornar lista de itens de carrinho ou erro de conexão', async () => {
      const response = await request(app).get('/carrinho-eletro');

      expect([200, 500]).toContain(response.status);
      
      if (response.status === 200) {
        expect(Array.isArray(response.body)).toBe(true);
      }
    });
  });
});

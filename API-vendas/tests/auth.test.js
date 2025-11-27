const request = require('supertest');
const app = require('../app');

describe('Testes de Autenticação', () => {
  describe('POST /login', () => {
    it('deve retornar token JWT com credenciais válidas', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser',
          password: 'testpass'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('expiresIn', '24h');
      expect(response.body).toHaveProperty('type', 'Bearer');
    });

    it('deve retornar erro 400 quando faltam credenciais', async () => {
      const response = await request(app)
        .post('/login')
        .send({
          username: 'testuser'
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('deve retornar erro 400 quando dados estão vazios', async () => {
      const response = await request(app)
        .post('/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Dados incompletos');
    });
  });

  describe('POST /logout', () => {
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

    it('deve invalidar token com sucesso', async () => {
      const response = await request(app)
        .post('/logout')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logout realizado com sucesso');
    });

    it('deve retornar erro 401 sem token', async () => {
      const response = await request(app)
        .post('/logout');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /auth/verify', () => {
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

    it('deve verificar token válido', async () => {
      const response = await request(app)
        .get('/auth/verify')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('valid', true);
      expect(response.body).toHaveProperty('user', 'testuser');
    });

    it('deve retornar erro com token inválido', async () => {
      const response = await request(app)
        .get('/auth/verify')
        .set('Authorization', 'Bearer tokeninvalido');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('valid', false);
    });

    it('deve retornar erro sem token', async () => {
      const response = await request(app)
        .get('/auth/verify');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('valid', false);
    });
  });
});

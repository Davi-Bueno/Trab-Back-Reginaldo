require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { swaggerUi, swaggerDocs } = require('../swagger');

const app = express();

require('./config/database');

// Middlewares globais
app.use(cors({
  origin: '*', 
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET || 'dmb',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // true em produção com HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 24 horas
  }
}));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas
const homeRoutes = require('./route/home');
const authRoutes = require('./route/authRoutes');
const clienteRoutes = require('./route/clienteRoutes');
const vendedorRoutes = require('./route/vendedorRoutes');
const eletrodomesticoRoutes = require('./route/eletrodomesticoRoutes');
const carrinhoRoutes = require('./route/carrinhoRoutes');
const carrinhoEletroRoutes = require('./route/carrinhoEletroRoutes');

app.use('/', homeRoutes);
app.use('/', authRoutes);
app.use('/', clienteRoutes);
app.use('/', vendedorRoutes);
app.use('/', eletrodomesticoRoutes);
app.use('/', carrinhoRoutes);
app.use('/', carrinhoEletroRoutes);


// Middleware de rota não encontrada
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method
  });
});

// Middleware de tratamento de erros global
app.use((err, req, res, next) => {
  console.error('Erro capturado:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Inicialização do servidor
const PORT = process.env.PORTA || 3001;
app.listen(PORT, () => {
  
  console.log(` Servidor rodando na porta ${PORT}`);
  ;
});

module.exports = app;

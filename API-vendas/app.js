const express = require('express');
const app = express();

const PORT = process.env.PORTA || 3000;

// Middleware básico para JSON
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.json({ 
    message: 'API Vendas Eletrodomésticos',
    status: 'online',
    version: '1.0.0'
  });
});


app.listen(PORT, () => {
  console.log(` Servidor rodando na porta ${PORT}`);
});

module.exports = app;

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

// Testa a conexão com o banco
async function testConnection() {
  try {
    await prisma.$connect();
    console.log(' Conexão com banco de dados estabelecida');
  } catch (error) {
    console.error(' Erro ao conectar ao banco:', error.message);
    process.exit(1);
  }
}

testConnection();

module.exports = prisma;

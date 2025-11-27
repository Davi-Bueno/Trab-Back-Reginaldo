/**
 * Configuração Jest para testes
 */
module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'API-vendas/**/*.js',
    '!API-vendas/node_modules/**',
    '!API-vendas/coverage/**',
    '!API-vendas/tests/**'
  ],
  testMatch: [
    '**/tests/**/*.test.js'
  ],
  verbose: true,
  testTimeout: 10000
};

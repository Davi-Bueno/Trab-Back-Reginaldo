/**
 * Lista negra de tokens invalidados (logout)
 * Em produção, usar Redis ou banco de dados
 */
const blacklistedTokens = new Set();

const TokenBlacklist = {
  /**
   * Adiciona token à lista negra
   */
  add(token) {
    blacklistedTokens.add(token);
  },

  /**
   * Verifica se token está na lista negra
   */
  has(token) {
    return blacklistedTokens.has(token);
  },

  /**
   * Remove token da lista negra (opcional)
   */
  remove(token) {
    blacklistedTokens.delete(token);
  },

  /**
   * Limpa toda a lista negra (uso administrativo)
   */
  clear() {
    blacklistedTokens.clear();
  },

  /**
   * Retorna quantidade de tokens na lista negra
   */
  size() {
    return blacklistedTokens.size;
  }
};

module.exports = TokenBlacklist;

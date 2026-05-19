import * as SecureStore from 'expo-secure-store';

/** Chave usada no SecureStore para o token JWT */
const TOKEN_KEY = 'nutriq_auth_token';

/**
 * Persistência segura do token de autenticação.
 * Usado quando o backend Node.js retornar JWT no login.
 */
export const tokenStorage = {
  /** Salva o token após login bem-sucedido */
  async save(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  /** Lê o token atual (null se não logado) */
  async get(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  /** Remove o token no logout */
  async remove(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },
};

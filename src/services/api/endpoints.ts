/**
 * Caminhos relativos da API REST.
 * Mantém URLs em um só lugar para o client Axios.
 */
export const endpoints = {
  /** GET — verifica se a API está no ar */
  health: '/health',
  /** CRUD de refeições (futuro) */
  meals: '/meals',
  /** Resumo calórico do dia (futuro) */
  diary: '/diary',
  /** Autenticação (futuro) */
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
} as const;

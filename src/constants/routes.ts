/**
 * Nomes das rotas do React Navigation.
 * Centralizar evita typos e facilita refatoração.
 */
export const ROUTES = {
  /** Tela inicial / resumo do dia */
  HOME: 'Home',
  /** Lista e registro de refeições */
  MEALS: 'Meals',
  /** Perfil e metas do usuário */
  PROFILE: 'Profile',
  /** Histórico de refeições */
  HISTORICAL: 'Historical',
  /** Adicionar nova refeição */
  ADD_NEW_MEALS: 'AddNewMeals',
  /** Editar refeição */
  UPDATE_MEALS: 'UpdateMeals',
  /** Login */
  LOGIN: 'Login',
  /** Register */
  REGISTER: 'Register'
} as const;

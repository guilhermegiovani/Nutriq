import type { ROUTES } from '@/constants/routes';
import type { Meal } from '@/types/meal';

/**
 * Parâmetros de cada tela da pilha principal.
 * `undefined` = tela sem parâmetros na rota.
 */
export type RootStackParamList = {
  [ROUTES.HOME]: undefined;
  [ROUTES.MEALS]: undefined;
  [ROUTES.PROFILE]: undefined;
  [ROUTES.HISTORICAL]: undefined;
  [ROUTES.ADD_NEW_MEALS]: undefined;
  [ROUTES.UPDATE_MEALS]: { meal: Meal };
};

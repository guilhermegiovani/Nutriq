/**
 * Chaves do React Query para cache e invalidação.
 * Agrupe por domínio (meals, user, diary, etc.).
 */
export const queryKeys = {
  /** Saúde da API / conectividade */
  health: ['health'] as const,
  /** Refeições do usuário */
  meals: {
    all: ['meals'] as const,
    /** Refeições de um dia específico (YYYY-MM-DD) */
    byDate: (date: string) => ['meals', date] as const,
  },
  /** Resumo calórico diário */
  diary: {
    byDate: (date: string) => ['diary', date] as const,
  },
} as const;

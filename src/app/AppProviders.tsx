import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { MealsProvider } from '@/context/MealsContext';
import { AuthProvider } from '@/context/AuthContext';

type AppProvidersProps = {
  /** Árvore de componentes do app (navegação, telas, etc.) */
  children: ReactNode;
};

/**
 * Cliente React Query — cache e estado de requisições à API.
 * Criado fora do componente para não resetar a cada render.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Não refetch automático ao focar (ajuste conforme necessidade) */
      refetchOnWindowFocus: false,
      /** Tentativas em caso de falha de rede */
      retry: 1,
    },
  },
});

/**
 * Agrupa providers globais (React Query, tema futuro, auth, etc.).
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MealsProvider>{children}</MealsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

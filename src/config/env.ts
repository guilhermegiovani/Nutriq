/**
 * Variáveis de ambiente públicas do app.
 * No Expo, só variáveis com prefixo EXPO_PUBLIC_ ficam disponíveis no cliente.
 */
export const env = {
  /** URL base da API (ex.: http://localhost:3000/api) */
  apiUrl:
    process.env.EXPO_PUBLIC_API_URL  ?? 'http://localhost:3000/api', //  ?? 'http://localhost:3000/api'
} as const;

import { apiClient } from '@/services/api/client';
import { endpoints } from '@/services/api/endpoints';

/**
 * Resposta esperada do endpoint GET /health do backend Node.js.
 */
export type HealthResponse = {
  status: 'ok';
  timestamp: string;
};

/**
 * Verifica conectividade com a API.
 * Use com React Query: queryKeys.health
 */
export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>(endpoints.health);
  return data;
}

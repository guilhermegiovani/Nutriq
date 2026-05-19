import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { env } from '@/config/env';
import type { ApiError } from '@/types/api';
import { tokenStorage } from '@/services/storage/tokenStorage';

/**
 * Instância Axios configurada para o backend Node.js.
 * Interceptors adicionam token e padronizam erros.
 */
export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/** Anexa JWT em toda requisição autenticada */
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await tokenStorage.get();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

/** Converte erros HTTP em formato ApiError */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string; details?: unknown }>) => {
    const status = error.response?.status ?? 0;
    const message =
      error.response?.data?.message ??
      error.message ??
      'Erro de comunicação com o servidor';

    const apiError: ApiError = {
      status,
      message,
      details: error.response?.data?.details,
    };

    return Promise.reject(apiError);
  },
);

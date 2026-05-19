/**
 * Formato padrão de erro retornado pela API Node.js.
 * Ajuste quando o backend definir o contrato final.
 */
export type ApiError = {
  /** Código HTTP ou código interno da API */
  status: number;
  /** Mensagem legível para o usuário ou logs */
  message: string;
  /** Detalhes opcionais (validação Zod, campo, etc.) */
  details?: unknown;
};

/**
 * Envelope genérico de resposta da API.
 */
export type ApiResponse<T> = {
  data: T;
};

/**
 * Configuração da API Backend
 */

// URL base da API - pegando de variável de ambiente ou usando valor padrão
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/**
 * Helper para construir URLs da API
 */
export function getApiUrl(path: string): string {
  // Remove barra inicial se existir para evitar URLs duplicadas
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${API_BASE_URL}/${cleanPath}`;
}

/**
 * Helper para fazer requisições autenticadas
 */
export function getAuthHeaders(token?: string): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}


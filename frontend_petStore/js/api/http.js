import { API_BASE_URL } from '../../config.js';

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, { method = 'GET', body } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: body ? { 'Content-Type': 'application/json' } : {},
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError('No se pudo conectar con el servidor. Verifica que el backend esté disponible.', 0);
  }

  const text = await response.text();
  const data = text ? safeParse(text) : null;

  if (!response.ok) {
    const message = data && typeof data.message === 'string' ? data.message : `Error ${response.status}`;
    throw new ApiError(message, response.status);
  }

  return data;
}

function safeParse(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export const get = (path) => request(path);
export const post = (path, body) => request(path, { method: 'POST', body });
export const put = (path, body) => request(path, { method: 'PUT', body });

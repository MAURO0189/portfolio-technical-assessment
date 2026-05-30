const BASE_URL = "https://fakestoreapi.com";

// Errores personalizados
export class NetworkError extends Error {
  constructor() {
    super("Sin conexión a internet. Verifica tu red e intenta de nuevo.");
    this.name = "NetworkError";
  }
}

export class ClientError extends Error {
  constructor(status) {
    super(`Recurso no encontrado (Error ${status}).`);
    this.name = "ClientError";
    this.status = status;
  }
}

export class ServerError extends Error {
  constructor(status) {
    super(`Error en el servidor (${status}). Intenta más tarde.`);
    this.name = "ServerError";
    this.status = status;
  }
}

// Handler centralizado de respuesta
const handleResponse = async (response) => {
  if (response.ok) return response.json();
  if (response.status >= 500) throw new ServerError(response.status);
  if (response.status >= 400) throw new ClientError(response.status);
};

// Fetch con timeout
const fetchWithTimeout = (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  return fetch(url, { ...options, signal: controller.signal })
    .catch((err) => {
      if (err.name === "AbortError") throw new NetworkError();
      throw new NetworkError();
    })
    .finally(() => clearTimeout(timer));
};

export const getProducts = async () => {
  const response = await fetchWithTimeout(`${BASE_URL}/products`);
  return handleResponse(response);
};

export const getProductById = async (id) => {
  const response = await fetchWithTimeout(`${BASE_URL}/products/${id}`);
  return handleResponse(response);
};

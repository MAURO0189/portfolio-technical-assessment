import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getProducts,
  NetworkError,
  ClientError,
  ServerError,
} from "./fakeStore";

const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

describe("fakeStore - Error Handling", () => {
  it("retorna productos correctamente con respuesta 200", async () => {
    const mockProducts = [{ id: 1, title: "Producto Test", price: 9.99 }];
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockProducts,
    });

    const result = await getProducts();
    expect(result).toEqual(mockProducts);
  });

  it("lanza ServerError con respuesta 500", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    const error = await getProducts().catch((e) => e);
    expect(error).toBeInstanceOf(ServerError);
    expect(error.message).toContain("Error en el servidor (500)");
  });

  it("lanza ClientError con respuesta 404", async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 404 });

    const error = await getProducts().catch((e) => e);
    expect(error).toBeInstanceOf(ClientError);
    expect(error.message).toContain("Recurso no encontrado (Error 404)");
  });

  it("lanza NetworkError cuando no hay conexión", async () => {
    mockFetch.mockRejectedValue(new TypeError("Failed to fetch"));

    const error = await getProducts().catch((e) => e);
    expect(error).toBeInstanceOf(NetworkError);
    expect(error.message).toContain("Sin conexión a internet");
  });

  it("lanza NetworkError cuando el request supera el timeout", async () => {
    const abortError = new Error("Aborted");
    abortError.name = "AbortError";
    mockFetch.mockRejectedValue(abortError);

    const error = await getProducts().catch((e) => e);
    expect(error).toBeInstanceOf(NetworkError);
  });
});

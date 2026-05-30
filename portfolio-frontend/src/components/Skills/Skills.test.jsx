import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Skills from "./Skills";

// Mock del hook para no depender de la API real
vi.mock("../../hooks/useStrapi", () => ({
  default: () => ({
    data: [
      { id: 1, name: "React", category: "Frontend", level: 90 },
      { id: 2, name: "Node.js", category: "Backend", level: 85 },
      { id: 3, name: "Python", category: "Backend", level: 75 },
    ],
    loading: false,
    error: null,
  }),
}));

vi.mock("../../api/strapi", () => ({
  getSkills: vi.fn(),
}));

describe("Skills", () => {
  it("renderiza el título de la sección", () => {
    render(<Skills />);
    expect(screen.getByText("Skills")).toBeInTheDocument();
  });

  it("agrupa correctamente por categoría", () => {
    render(<Skills />);
    expect(screen.getByText("Frontend")).toBeInTheDocument();
    expect(screen.getByText("Backend")).toBeInTheDocument();
  });

  it("muestra el nombre y porcentaje de cada skill", () => {
    render(<Skills />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("no muestra categorías vacías", () => {
    render(<Skills />);
    // 'Tools' no tiene datos en el mock, no debe aparecer
    expect(screen.queryByText("Tools")).not.toBeInTheDocument();
  });

  it("muestra el porcentaje correcto en la barra de progreso", () => {
    const { container } = render(<Skills />);
    const fills = container.querySelectorAll(".skill-fill");
    const widths = Array.from(fills).map((el) => el.style.width);
    expect(widths).toContain("90%");
    expect(widths).toContain("85%");
    expect(widths).toContain("75%");
  });
});

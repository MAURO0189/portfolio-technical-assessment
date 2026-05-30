import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProjectCard from "./ProjectCard";

const mockProject = {
  id: 1,
  title: "Mi App React",
  description: "Una app increíble",
  tech_stack: "React, Node.js, MsQL",
  github_url: "https://github.com/test",
  live_url: null,
  featured: true,
};

describe("ProjectCard", () => {
  it("renderiza el título del proyecto", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("Mi App React")).toBeInTheDocument();
  });

  it("muestra el badge de destacado si featured es true", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText(/Destacado/i)).toBeInTheDocument();
  });

  it("renderiza las tecnologías como tags separados", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("Node.js")).toBeInTheDocument();
    expect(screen.getByText("MsQL")).toBeInTheDocument();
  });

  it("no muestra Live Demo si live_url es null", () => {
    render(<ProjectCard project={mockProject} />);
    expect(screen.queryByText(/Live Demo/i)).not.toBeInTheDocument();
  });
});

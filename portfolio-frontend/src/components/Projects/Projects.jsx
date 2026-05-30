import useStrapi from "../../hooks/useStrapi";
import { getProjects } from "../../api/strapi";
import ProjectCard from "./ProjectCard";
import "./Projects.css";

const Projects = () => {
  const { data, loading, error } = useStrapi(getProjects);

  return (
    <section id="proyectos">
      <h2 className="section-title">Proyectos</h2>
      {loading && <p className="loading">Cargando proyectos...</p>}
      {error && <p className="error">Error: {error}</p>}
      <div className="projects-grid">
        {data?.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;

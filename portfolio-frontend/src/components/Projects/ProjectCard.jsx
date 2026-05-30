const ProjectCard = ({ project }) => {
  const techs = project.tech_stack?.split(",").map((t) => t.trim()) ?? [];

  return (
    <article className="project-card">
      {project.featured && <span className="featured-badge">⭐ Destacado</span>}
      <h3 className="project-title">{project.title ?? "Sin título"}</h3>
      <p className="project-desc">{project.description ?? ""}</p>

      <div className="tech-tags">
        {techs.map((tech) => (
          <span key={tech} className="tech-tag">
            {tech}
          </span>
        ))}
      </div>

      <div className="project-links">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noreferrer">
            Live Demo ↗
          </a>
        )}
      </div>
    </article>
  );
};

export default ProjectCard;

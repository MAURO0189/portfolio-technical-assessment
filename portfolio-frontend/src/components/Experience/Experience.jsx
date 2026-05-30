import useStrapi from "../../hooks/useStrapi";
import { getExperiences } from "../../api/strapi";
import "./Experience.css";

const Experience = () => {
  const { data, loading, error } = useStrapi(getExperiences);

  return (
    <section id="experiencia">
      <h2 className="section-title">Experiencia</h2>
      {loading && <p className="loading">Cargando experiencia...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="timeline">
        {data?.map((exp) => {
          const start = exp.start_date
            ? new Date(exp.start_date).getFullYear()
            : "";
          const end = exp.current
            ? "Presente"
            : exp.end_date
              ? new Date(exp.end_date).getFullYear()
              : "";
          return (
            <div key={exp.id} className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-date">
                  {start} — {end}
                </span>
                <h3 className="timeline-role">{exp.role}</h3>
                <span className="timeline-company">{exp.company}</span>
                <p className="timeline-desc">{exp.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;

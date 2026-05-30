import useStrapi from "../../hooks/useStrapi";
import { getSkills } from "../../api/strapi";
import "./Skills.css";

const CATEGORIES = ["Frontend", "Backend", "Tools"];

const Skills = () => {
  const { data, loading, error } = useStrapi(getSkills);

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] =
      data?.filter((s) => s.category?.toLowerCase() === cat.toLowerCase()) ??
      [];
    return acc;
  }, {});

  return (
    <section id="skills">
      <h2 className="section-title">Skills</h2>
      {loading && <p className="loading">Cargando skills...</p>}
      {error && <p className="error">Error: {error}</p>}

      <div className="skills-grid">
        {CATEGORIES.map(
          (cat) =>
            grouped[cat].length > 0 && (
              <div key={cat} className="skill-category">
                <h3 className="category-title">{cat}</h3>
                {grouped[cat].map((skill) => (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-header">
                      <span>{skill.name}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div
                        className="skill-fill"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ),
        )}
      </div>
    </section>
  );
};

export default Skills;

import useStrapi from "../../hooks/useStrapi";
import { getProfile } from "../../api/strapi";
import "./Hero.css";

const Hero = () => {
  const { data, loading } = useStrapi(getProfile);
  // Strapi v5 Single Type devuelve objeto directo, no array
  const profile = Array.isArray(data) ? data[0] : data;

  return (
    <section id="inicio" className="hero">
      <div className="hero-tag">Disponible para trabajar ✦</div>

      {loading ? (
        <h1 className="hero-name">Cargando...</h1>
      ) : (
        <>
          <h1 className="hero-name">{profile?.name ?? "Tu Nombre"}</h1>
          <p className="hero-title">
            {profile?.title ?? "Desarrollador Full Stack"}
          </p>
          <p className="hero-bio">
            {profile?.bio ?? "Bienvenido a mi portafolio."}
          </p>

          <div className="hero-actions">
            <a href="#proyectos" className="btn-primary">
              Ver proyectos
            </a>
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="btn-ghost">
                Contactar
              </a>
            )}
          </div>

          <div className="hero-social">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            )}
          </div>
        </>
      )}

      <div className="hero-orb orb-1" />
      <div className="hero-orb orb-2" />
    </section>
  );
};

export default Hero;

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-logo">
        {"<Portfolio />"}
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        {isHome && (
          <>
            {["inicio", "proyectos", "skills", "experiencia"].map((l) => (
              <li key={l}>
                <a href={`#${l}`} onClick={() => setMenuOpen(false)}>
                  {l.charAt(0).toUpperCase() + l.slice(1)}
                </a>
              </li>
            ))}
          </>
        )}
        <li>
          <Link to="/products" onClick={() => setMenuOpen(false)}>
            Productos
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

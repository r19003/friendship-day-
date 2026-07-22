import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Music } from "lucide-react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";

const navLinks = [
  { to: "/", label: "Home", emoji: "🏠" },
  { to: "/aparna", label: "Daisy", emoji: "🌼" },
  { to: "/saayra", label: "Sunshine", emoji: "☀️" },
  { to: "/our-chaos", label: "Our Chaos", emoji: "💜" },
];

function getNavVariant(pathname) {
  if (pathname.startsWith("/aparna")) return "nav-daisy";
  if (pathname.startsWith("/saayra")) return "nav-sunshine";
  return "nav-shared";
}

export default function Navigation() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const variant = getNavVariant(location.pathname);
  const { playing, toggle } = useMusicPlayer("/audio/friendship-background.mp3");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const menuVariant = location.pathname.startsWith("/aparna")
    ? "daisy"
    : location.pathname.startsWith("/saayra")
    ? "sunshine"
    : "shared";

  return (
    <>
      <nav className={`site-nav ${variant}${scrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <NavLink to="/" className="nav-logo" aria-label="Home — Daisy, Sunshine & Me">
          🌼 Daisy, <span>Sunshine</span> & Me
        </NavLink>

        <ul className="nav-links" role="list">
          {navLinks.map(({ to, label, emoji }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                <span className="nav-link-dot" aria-hidden="true" />
                {emoji} {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            onClick={toggle}
            className="nav-cta"
            aria-label={playing ? "Pause background music" : "Play background music"}
            title={playing ? "Pause music" : "Play music"}
          >
            <Music size={14} />
            {playing ? "Pause" : "Music"}
          </button>

          <button
            className="nav-mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className={`mobile-menu-overlay ${menuVariant}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <button
              className="mobile-close-btn"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>

            {navLinks.map(({ to, label, emoji }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
              >
                <NavLink
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `mobile-menu-link${isActive ? " active" : ""}`
                  }
                >
                  <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
                  {label}
                </NavLink>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
            >
              <button
                onClick={toggle}
                style={{
                  marginTop: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1.5rem",
                  borderRadius: "var(--radius-pill)",
                  background: "rgba(255,255,255,0.12)",
                  color: "inherit",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: 0,
                  fontSize: "0.95rem",
                }}
              >
                <Music size={16} />
                {playing ? "Pause Music" : "Play Music"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

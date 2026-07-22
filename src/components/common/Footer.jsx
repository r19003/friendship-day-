import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "3rem 2rem",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-handwritten)",
          fontSize: "1.2rem",
          marginBottom: "0.75rem",
          opacity: 0.8,
        }}
      >
        Made with 💛💜 by Raina with love
      </div>
      <div style={{ fontSize: "0.85rem", opacity: 0.45, marginBottom: "1rem" }}>
        For Aparna 🌼 and Saayra ☀️ — Always close, no matter how far life takes us
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { to: "/", label: "Home" },
          { to: "/aparna", label: "Daisy" },
          { to: "/saayra", label: "Sunshine" },
          { to: "/our-chaos", label: "Our Chaos" },
        ].map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{ fontSize: "0.82rem", opacity: 0.55, transition: "opacity 180ms" }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.target.style.opacity = "0.55")}
          >
            {label}
          </Link>
        ))}
      </div>
      <div style={{ fontSize: "0.75rem", opacity: 0.3, marginTop: "1rem" }}>
        Happy Friendship Day ✨
      </div>
    </footer>
  );
}

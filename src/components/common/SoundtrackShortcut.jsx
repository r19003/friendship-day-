import React from "react";
import { Music } from "lucide-react";

export default function SoundtrackShortcut() {
  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("spotify-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/our-chaos#spotify-section";
    }
  };

  return (
    <a
      href="#spotify-section"
      onClick={handleClick}
      className="soundtrack-shortcut"
      aria-label="Scroll to Our Friendship Soundtrack"
      title="Our Friendship Soundtrack"
    >
      <Music className="soundtrack-shortcut__icon" size={18} />
      <span className="soundtrack-shortcut__label">Our Soundtrack</span>
    </a>
  );
}

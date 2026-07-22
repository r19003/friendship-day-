import React, { useState } from "react";
import { motion } from "framer-motion";

const starData = [
  { id: "raina", name: "Raina", label: "Creator & Friend", emoji: "⭐", cx: 220, cy: 130, color: "#f5c568" },
  { id: "aparna", name: "Aparna", label: "My Daisy", emoji: "🌼", cx: 360, cy: 260, color: "#cce8f5" },
  { id: "saayra", name: "Saayra", label: "My Sunshine", emoji: "☀️", cx: 180, cy: 390, color: "#cdb5e8" },
];

function StarNode({ star, onHover, onLeave }) {
  return (
    <g
      className="city-star-group"
      tabIndex={0}
      role="img"
      aria-label={`${star.name} — ${star.label}`}
      onMouseEnter={() => onHover(star.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(star.id)}
      onBlur={onLeave}
    >
      {/* Pulse ring */}
      <circle
        cx={star.cx}
        cy={star.cy}
        r={28}
        fill="none"
        stroke={star.color}
        strokeWidth={1.5}
        opacity={0.35}
        className="city-star-ring"
      />
      {/* Glow */}
      <circle
        cx={star.cx}
        cy={star.cy}
        r={18}
        fill={star.color}
        opacity={0.18}
        className="city-star-glow"
      />
      {/* Core */}
      <circle cx={star.cx} cy={star.cy} r={10} fill={star.color} opacity={0.9} />
      {/* Emoji */}
      <text x={star.cx} y={star.cy + 5} textAnchor="middle" fontSize={12} style={{ userSelect: "none" }}>
        {star.emoji}
      </text>
      {/* Name */}
      <text x={star.cx} y={star.cy + 26} textAnchor="middle" fill="white" fontSize={13} fontFamily="var(--font-handwritten)" opacity={0.9}>
        {star.name}
      </text>
      <text x={star.cx} y={star.cy + 40} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={10} fontFamily="var(--font-body)">
        {star.label}
      </text>
    </g>
  );
}

export default function CityStars() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="city-stars-container">
      <svg
        className="city-stars-svg"
        viewBox="0 0 540 520"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Three connected stars representing Raina, Aparna, and Saayra"
        role="img"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Curved paths between stars */}
        <path
          d={`M ${starData[0].cx} ${starData[0].cy} Q 340 180 ${starData[1].cx} ${starData[1].cy}`}
          fill="none"
          stroke="rgba(203,185,244,0.3)"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <path
          d={`M ${starData[0].cx} ${starData[0].cy} Q 100 280 ${starData[2].cx} ${starData[2].cy}`}
          fill="none"
          stroke="rgba(245,197,104,0.25)"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <path
          d={`M ${starData[1].cx} ${starData[1].cy} Q 360 340 ${starData[2].cx} ${starData[2].cy}`}
          fill="none"
          stroke="rgba(203,185,244,0.2)"
          strokeWidth={1}
          strokeDasharray="4 5"
        />

        {starData.map((star) => (
          <StarNode key={star.id} star={star} onHover={setHovered} onLeave={() => setHovered(null)} />
        ))}
      </svg>

      {/* Tooltip */}
      {hovered && (() => {
        const s = starData.find((d) => d.id === hovered);
        return s ? (
          <div
            className="star-tooltip"
            style={{ position: "absolute", top: "10px", right: "10px" }}
            role="tooltip"
          >
            <strong>{s.name}</strong> — {s.label}
          </div>
        ) : null;
      })()}
    </div>
  );
}

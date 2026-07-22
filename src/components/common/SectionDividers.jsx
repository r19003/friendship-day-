import React from "react";

export function DaisyPetalDivider() {
  return (
    <div className="section-divider divider-daisy" aria-hidden="true">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <path
          d="M0,32 C240,70 480,10 720,48 C960,86 1200,20 1440,40 L1440,80 L0,80 Z"
          fill="var(--daisy-cream)"
        />
        <circle cx="360" cy="38" r="6" fill="var(--daisy-yellow)" opacity="0.6" />
        <circle cx="1080" cy="28" r="8" fill="var(--daisy-blue-dark)" opacity="0.4" />
      </svg>
    </div>
  );
}

export function SunshineInkDivider() {
  return (
    <div className="section-divider divider-sunshine" aria-hidden="true">
      <svg viewBox="0 0 1440 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <path
          d="M0,45 Q360,90 720,40 T1440,55 L1440,90 L0,90 Z"
          fill="var(--sunshine-cream)"
        />
        <path
          d="M120,50 Q480,20 840,65 T1440,40"
          stroke="var(--sunshine-purple)"
          strokeWidth="2"
          strokeDasharray="6 6"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export function ChaosThreadDivider() {
  return (
    <div className="section-divider divider-chaos" aria-hidden="true">
      <svg viewBox="0 0 1440 70" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", display: "block" }}>
        <path
          d="M0,20 C320,65 640,-10 960,50 C1200,80 1360,10 1440,30"
          stroke="var(--chaos-violet)"
          strokeWidth="2.5"
          strokeDasharray="8 6"
          opacity="0.4"
        />
        <circle cx="480" cy="28" r="5" fill="var(--chaos-yellow)" />
        <circle cx="960" cy="50" r="5" fill="var(--chaos-lavender)" />
      </svg>
    </div>
  );
}

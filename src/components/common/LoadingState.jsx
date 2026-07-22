import React from "react";

export default function LoadingState({ theme = "shared" }) {
  const colors = {
    shared: ["var(--shared-purple)", "var(--shared-gold)", "var(--shared-purple-light)"],
    daisy: ["var(--daisy-yellow)", "var(--daisy-blue)", "var(--daisy-pink)"],
    sunshine: ["var(--sunshine-purple)", "var(--sunshine-gold)", "var(--sunshine-lavender)"],
  };
  const [c1, c2, c3] = colors[theme] || colors.shared;
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "40vh" }}>
      <div className="joke-loading">
        <div className="joke-loading-dot" style={{ background: c1 }} />
        <div className="joke-loading-dot" style={{ background: c2 }} />
        <div className="joke-loading-dot" style={{ background: c3 }} />
      </div>
    </div>
  );
}

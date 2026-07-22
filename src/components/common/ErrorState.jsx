import React from "react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 2rem", opacity: 0.75 }}>
      <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>😔</div>
      <p style={{ marginBottom: "1rem" }}>{message || "Something went wrong."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="primary-button"
          style={{ background: "var(--shared-purple)", color: "white" }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

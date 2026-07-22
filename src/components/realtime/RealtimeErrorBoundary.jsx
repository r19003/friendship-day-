import React, { Component } from "react";

export default class RealtimeErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Realtime Component Error:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="realtime-error-fallback"
          style={{
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 1.5rem",
            textAlign: "center",
            color: "white",
            background: "rgba(16, 12, 37, 0.95)",
            borderRadius: "var(--radius-medium)",
            border: "1px solid rgba(207, 186, 240, 0.2)",
            margin: "2rem auto",
            maxWidth: "680px",
          }}
        >
          <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>📡</span>
          <h3 style={{ fontSize: "1.6rem", fontFamily: "var(--font-heading)", color: "var(--chaos-yellow)", marginBottom: "0.5rem" }}>
            This Memory Corner Took a Small Break
          </h3>
          <p style={{ opacity: 0.82, fontSize: "1rem", maxWidth: "480px", marginInline: "auto", lineHeight: 1.6 }}>
            Something did not load correctly. Try opening the section again.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
            <button
              className="primary-button"
              style={{ background: "var(--chaos-yellow)", color: "#2a1800" }}
              onClick={this.handleReset}
            >
              🔄 Try Again
            </button>
            <a
              href="/"
              className="glow-button"
              style={{ textDecoration: "none" }}
            >
              🏠 Go to Home
            </a>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

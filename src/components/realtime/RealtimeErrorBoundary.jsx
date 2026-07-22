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
    console.warn("Realtime Component Handled Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="realtime-error-fallback page-grain"
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem 1.5rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <div className="premium-empty-state" style={{ color: "var(--chaos-text-dark)" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "0.5rem" }}>📡</span>
            <h3 style={{ fontSize: "1.5rem", fontFamily: "var(--font-display)", marginBottom: "0.5rem" }}>
              Connection Notice
            </h3>
            <p style={{ opacity: 0.8, fontSize: "0.95rem", maxWidth: 460, marginInline: "auto" }}>
              Realtime feature encountered a temporary issue. Operating in local mode.
            </p>
            <button
              className="primary-button btn-daisy"
              style={{ marginTop: "1.25rem" }}
              onClick={this.handleReset}
            >
              🔄 Retry Connection
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

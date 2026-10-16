import React from "react";
import { BrowserRouter } from "react-router-dom";

import {
  About,
  Achievements,
  Contact,
  Experience,
  // GitHub,
  Hero,
  Navbar,
  Philosophy,
  Tech,
  Works,
  StarsCanvas,
} from "./components";

/**
 * Top-level error boundary — prevents complete white screen on unhandled
 * render errors. Shows a minimal recovery UI instead.
 */
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App error boundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#050816",
            color: "#f3f3f3",
            fontFamily: "monospace",
            gap: "1rem",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#6366f1", fontSize: "2rem" }}>⚠</p>
          <p style={{ fontSize: "1.1rem", fontWeight: 700 }}>Something went wrong</p>
          <p style={{ color: "#aaa6c3", fontSize: "0.875rem" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "1rem",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #6366f1, #10b981)",
              border: "none",
              borderRadius: "0.75rem",
              color: "white",
              fontFamily: "monospace",
              fontWeight: 600,
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <div className="relative z-0 bg-primary">
          {/* Hero section with own background */}
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>

          {/* Main content sections */}
          <About />
          <Experience />
          <Works />
          <Tech />
          {/* <GitHub /> */}
          <Achievements />
          <Philosophy />

          {/* Contact with stars */}
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter>
    </AppErrorBoundary>
  );
};

export default App;

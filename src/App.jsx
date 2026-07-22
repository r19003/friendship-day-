import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Styles
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/navigation.css";
import "./styles/home.css";
import "./styles/aparna.css";
import "./styles/saayra.css";
import "./styles/chaos.css";
import "./styles/bts.css";
import "./styles/jokes.css";
import "./styles/gallery.css";
import "./styles/responsive.css";
import "./styles/components.css";
import "./styles/semester-gallery.css";
import "./styles/stackable-gallery.css";
import "./styles/chat.css";
import "./styles/message-wall.css";
import "./styles/bucket-list.css";
import "./styles/realtime.css";
import "./styles/upload-modal.css";
import "./styles/activity-feed.css";
import "./styles/mood-checkin.css";
import "./styles/capsules.css";
import "./styles/polls.css";
import "./styles/song-board.css";

// Components & Providers
import { RealtimeProvider } from "./components/realtime/RealtimeProvider";
import RealtimeErrorBoundary from "./components/realtime/RealtimeErrorBoundary";
import Navigation from "./components/common/Navigation";
import ScrollToTop from "./components/common/ScrollToTop";
import SoundtrackShortcut from "./components/common/SoundtrackShortcut";
import Footer from "./components/common/Footer";
import LoadingState from "./components/common/LoadingState";
import { RealtimeToastContainer } from "./components/activity/ActivityFeed";

// Pages (lazy for code splitting)
const HomePage = lazy(() => import("./pages/HomePage"));
const AparnaPage = lazy(() => import("./pages/AparnaPage"));
const SaayraPage = lazy(() => import("./pages/SaayraPage"));
const ChaosPage = lazy(() => import("./pages/ChaosPage"));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/aparna" element={<AparnaPage />} />
        <Route path="/saayra" element={<SaayraPage />} />
        <Route path="/our-chaos" element={<ChaosPage />} />
        {/* Fallback 404 */}
        <Route
          path="*"
          element={
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem", color: "white" }}>
              <span style={{ fontSize: "3rem" }}>🌙</span>
              <h1 style={{ fontSize: "2rem" }}>Page not found</h1>
              <a href="/" style={{ color: "var(--shared-gold)", textDecoration: "underline" }}>← Back to home</a>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <RealtimeErrorBoundary>
      <RealtimeProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="app-root">
            <Navigation />
            <RealtimeToastContainer />
            <main id="main-content" tabIndex={-1}>
              <Suspense fallback={<LoadingState theme="shared" />}>
                <AnimatedRoutes />
              </Suspense>
            </main>
            <SoundtrackShortcut />
            <Footer />
          </div>
        </BrowserRouter>
      </RealtimeProvider>
    </RealtimeErrorBoundary>
  );
}

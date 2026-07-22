import React from "react";
import PageTransition from "../components/common/PageTransition";
import HomeHero from "../components/home/HomeHero";
import UniversePortal from "../components/home/UniversePortal";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="home-page">
        <HomeHero />
        <UniversePortal />
      </div>
    </PageTransition>
  );
}

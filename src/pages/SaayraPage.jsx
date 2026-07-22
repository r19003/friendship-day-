import React from "react";
import PageTransition from "../components/common/PageTransition";
import SunshineHero from "../components/saayra/SunshineHero";
import NB107Story from "../components/saayra/NB107Story";
import CakeMemory from "../components/saayra/CakeMemory";
import SunshineRays from "../components/saayra/SunshineRays";
import MatureChildCards from "../components/saayra/MatureChildCards";
import PlatonicHusbandContract from "../components/saayra/PlatonicHusbandContract";
import SunshineThings from "../components/saayra/SunshineThings";
import FeedSunshine from "../components/saayra/FeedSunshine";
import PersonalGallery from "../components/galleries/PersonalGallery";
import { saayraGallery } from "../data/saayraGalleryData";
import SaayraThankYouWall from "../components/saayra/SaayraThankYouWall";
import SunshineRoastRoom from "../components/saayra/SunshineRoastRoom";
import SunshinePoem from "../components/saayra/SunshinePoem";
import SaayraLetter from "../components/saayra/SaayraLetter";
import "../styles/saayra.css";
import "../styles/stackable-gallery.css";

export default function SaayraPage() {
  return (
    <PageTransition>
      <div className="sunshine-page">
        <SunshineHero />
        <NB107Story />
        <CakeMemory />
        <SunshineRays />
        <MatureChildCards />
        <PlatonicHusbandContract />
        <SunshineThings />
        <FeedSunshine />

        <PersonalGallery
          initialDeck={saayraGallery}
          title="Twenty Frames of Sunshine"
          subtitle="Photographs of the person whose smile, warmth, words, jokes, food, and care made difficult days feel lighter."
          handwrittenLine="Purple skies, books, ramen, laughter, and a person I am endlessly grateful for."
          kicker="☀️ Sunshine Photo Collection"
          theme="sunshine"
        />

        <SaayraThankYouWall />
        <SunshineRoastRoom />
        <SunshinePoem />
        <SaayraLetter />
      </div>
    </PageTransition>
  );
}

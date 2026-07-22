import React from "react";
import PageTransition from "../components/common/PageTransition";
import DaisyHero from "../components/aparna/DaisyHero";
import AllenStory from "../components/aparna/AllenStory";
import CollegeFormStory from "../components/aparna/CollegeFormStory";
import FamiliarFaceSection from "../components/aparna/FamiliarFaceSection";
import SpringDaySection from "../components/aparna/SpringDaySection";
import SisterChildToggle from "../components/aparna/SisterChildToggle";
import AparnaEffectSection from "../components/aparna/AparnaEffectSection";
import HerLittleWorldSection from "../components/aparna/HerLittleWorldSection";
import CuteAngerEmergency from "../components/aparna/CuteAngerEmergency";
import AdviceDrawerSection from "../components/aparna/AdviceDrawerSection";
import CollegeConstantSection from "../components/aparna/CollegeConstantSection";
import ThingsToRememberSection from "../components/aparna/ThingsToRememberSection";
import PersonalGallery from "../components/galleries/PersonalGallery";
import { aparnaGallery } from "../data/aparnaGalleryData";
import ProzacDaisyCard from "../components/aparna/ProzacDaisyCard";
import AparnaThankYouWall from "../components/aparna/AparnaThankYouWall";
import AparnaLetter from "../components/aparna/AparnaLetter";
import DaisyJokeGarden from "../components/aparna/DaisyJokeGarden";
import "../styles/aparna.css";
import "../styles/stackable-gallery.css";

export default function AparnaPage() {
  return (
    <PageTransition>
      <div className="daisy-page">
        <DaisyHero />
        <AllenStory />
        <CollegeFormStory />
        <FamiliarFaceSection />
        <SpringDaySection />
        <SisterChildToggle />
        <AparnaEffectSection />
        <HerLittleWorldSection />
        <CuteAngerEmergency />
        <AdviceDrawerSection />
        <CollegeConstantSection />
        <ThingsToRememberSection />

        <PersonalGallery
          initialDeck={aparnaGallery}
          title="Twenty Little Frames of My Daisy"
          subtitle="Photographs of the person who made so many ordinary moments feel softer, safer, and more memorable."
          handwrittenLine="Somewhere between Allen, college, books, sweets, BTS, and endless conversations—you became home."
          kicker="🌼 Daisy Photo Collection"
          theme="daisy"
        />

        <ProzacDaisyCard />
        <AparnaThankYouWall />
        <AparnaLetter />
        <DaisyJokeGarden />
      </div>
    </PageTransition>
  );
}

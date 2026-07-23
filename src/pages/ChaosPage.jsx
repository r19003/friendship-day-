import React, { useMemo } from "react";
import PageTransition from "../components/common/PageTransition";
import ChaosHero from "../components/chaos/ChaosHero";
import TrioMemories from "../components/chaos/TrioMemories";
import MemoryRibbon from "../components/chaos/MemoryRibbon";
import BusAreaScene from "../components/chaos/BusAreaScene";
import NightStayPlanner from "../components/chaos/NightStayPlanner";
import ChatAnimation from "../components/chaos/ChatAnimation";
import TeasingGenerator from "../components/chaos/TeasingGenerator";
import AMIGroupChat from "../components/chaos/AMIGroupChat";
import CoffeeReceipt from "../components/chaos/CoffeeReceipt";
import SmashGame from "../components/chaos/SmashGame";
import PitaraNights from "../components/chaos/PitaraNights";
import BTSTimeline from "../components/chaos/BTSTimeline";
import BTSSongs from "../components/chaos/BTSSongs";
import SpotifySection from "../components/chaos/SpotifySection";
import SemesterArchive from "../components/galleries/SemesterArchive";
import AMIContractSection from "../components/chaos/AMIContractSection";
import SharedBucketList from "../components/bucket-list/SharedBucketList";
import AMIChatPreview from "../components/chat/AMIChatPreview";
import MessageWall from "../components/message-wall/MessageWall";
import TodayMemory from "../components/chaos/TodayMemory";
import MoodCheckIn from "../components/chaos/MoodCheckIn";
import MemoryCapsules from "../components/chaos/MemoryCapsules";
import SongRecommendations from "../components/chaos/SongRecommendations";
import CollaborativePolls from "../components/chaos/CollaborativePolls";
import { ActivityFeed } from "../components/activity/ActivityFeed";
import ChaosWall from "../components/chaos/ChaosWall";
import { semesterArchive } from "../data/semesterGalleryData";
import "../styles/chaos.css";
import "../styles/semester-gallery.css";
import "../styles/chat.css";
import "../styles/message-wall.css";
import "../styles/bucket-list.css";

export default function ChaosPage() {
  const allMemories = useMemo(() => {
    const memorySources = [semesterArchive];
    return memorySources
      .filter(Array.isArray)
      .flat()
      .flatMap((section) => (Array.isArray(section?.items) ? section.items : []))
      .map((item) => ({ ...item }))
      .filter(Boolean);
  }, []);

  return (
    <PageTransition>
      <div className="chaos-page">
        <ChaosHero />
        <TrioMemories />
        <MemoryRibbon />
        <AMIGroupChat />
        <BusAreaScene />
        <NightStayPlanner />
        <ChatAnimation />
        <TeasingGenerator />
        <CoffeeReceipt />
        <SmashGame />
        <PitaraNights />
        <BTSTimeline />
        <BTSSongs />
        <SpotifySection />

        <SemesterArchive />
        <TodayMemory memories={allMemories} />
        <AMIContractSection />
        <MoodCheckIn />
        <MemoryCapsules />
        <AMIChatPreview />
        <SharedBucketList />
        <CollaborativePolls />
        <SongRecommendations />
        <MessageWall />
        <ActivityFeed />
        <ChaosWall />
      </div>
    </PageTransition>
  );
}

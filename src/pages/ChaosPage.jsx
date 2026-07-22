import React from "react";
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
import SharedBucketList from "../components/bucket-list/SharedBucketList";
import ChaosChat from "../components/chat/ChaosChat";
import MessageWall from "../components/message-wall/MessageWall";
import TodayMemory from "../components/chaos/TodayMemory";
import MoodCheckIn from "../components/chaos/MoodCheckIn";
import MemoryCapsules from "../components/chaos/MemoryCapsules";
import SongRecommendations from "../components/chaos/SongRecommendations";
import CollaborativePolls from "../components/chaos/CollaborativePolls";
import { ActivityFeed } from "../components/activity/ActivityFeed";
import ChaosWall from "../components/chaos/ChaosWall";

export default function ChaosPage() {
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
        
        {/* Six Semesters of Us Archive */}
        <SemesterArchive />

        {/* Memory of the Day */}
        <TodayMemory />

        {/* Shared Friend Mood Check-In */}
        <MoodCheckIn />

        {/* Time Capsules */}
        <MemoryCapsules />

        {/* Realtime AMI Live Chat */}
        <ChaosChat />

        {/* Collaborative Trio Bucket List */}
        <SharedBucketList />

        {/* Collaborative Polls */}
        <CollaborativePolls />

        {/* Song Recommendation Board */}
        <SongRecommendations />

        {/* Realtime Permanent Message Wall */}
        <MessageWall />

        {/* Live Activity Feed */}
        <ActivityFeed />

        <ChaosWall />
      </div>
    </PageTransition>
  );
}

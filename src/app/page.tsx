"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MadinaSpotlight from "@/components/MadinaSpotlight";
import PakistanPortfolio from "@/components/PakistanPortfolio";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";
import BrochureModal from "@/components/BrochureModal";
import CRMPipelineDashboard from "@/components/CRMPipelineDashboard";

export default function HomePage() {
  const [activeModule, setActiveModule] = useState<"public" | "crm">("public");

  return (
    <div className="min-h-screen flex flex-col bg-navy-950">
      <Navbar activeModule={activeModule} setActiveModule={setActiveModule} />

      {activeModule === "public" ? (
        <main className="flex-1">
          <HeroSection />
          <MadinaSpotlight />
          <PakistanPortfolio />
          <LeadCaptureForm
            onSwitchToCRM={() => {
              setActiveModule("crm");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      ) : (
        <main className="flex-1">
          <CRMPipelineDashboard
            onSwitchToPublic={() => {
              setActiveModule("public");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </main>
      )}

      <Footer
        onSwitchToCRM={() => {
          setActiveModule("crm");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <BrochureModal />
    </div>
  );
}

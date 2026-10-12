"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import CRMPipelineDashboard from "@/components/CRMPipelineDashboard";
import Footer from "@/components/Footer";
import BrochureModal from "@/components/BrochureModal";

export default function CRMPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar activeModule="crm" />
      <main className="flex-1">
        <CRMPipelineDashboard />
      </main>
      <Footer />
      <BrochureModal />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import {
  FileDown,
  MapPin,
  Train,
  Plane,
  Cpu,
  ShieldCheck,
  Sparkles,
  Compass,
  Building,
  CheckCircle2,
  Eye,
  ArrowRight,
} from "lucide-react";
import { MADINA_FLAGSHIP_DATA } from "@/lib/data";
import { downloadOfficialBrochurePDF } from "@/lib/brochureGenerator";
import { useLeads } from "@/context/LeadContext";

export default function MadinaSpotlight() {
  const { setIsBrochureModalOpen, setPreselectedProjectForInquiry } = useLeads();
  const [selectedUnitIdx, setSelectedUnitIdx] = useState(1);
  const [brochureDownloadedToast, setBrochureDownloadedToast] = useState(false);

  const handleDirectDownload = () => {
    downloadOfficialBrochurePDF();
    setBrochureDownloadedToast(true);
    setTimeout(() => setBrochureDownloadedToast(false), 4500);
  };

  const handleInquireUnit = (unitType: string) => {
    setPreselectedProjectForInquiry(
      `Value Apartments - Madina Al Munawwarah (${unitType})`
    );
    const el = document.getElementById("lead-inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="madina-spotlight"
      className="relative py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 border-b border-gold-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Flagship International Project Spotlight • Kingdom of Saudi Arabia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              {MADINA_FLAGSHIP_DATA.title}{" "}
              <span className="text-gold-400">(Wadi Mubarak)</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {MADINA_FLAGSHIP_DATA.description}
            </p>
          </div>

          {/* Interactive Brochure Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={handleDirectDownload}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-400 text-navy-950 font-extrabold text-sm shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all"
            >
              <FileDown className="w-5 h-5" />
              <span>Download Official Brochure (PDF)</span>
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-navy-800 hover:bg-navy-700 text-gold-300 border border-gold-400/35 font-semibold text-sm transition-all"
            >
              <Eye className="w-4 h-4 text-gold-400" />
              <span>Interactive Brochure Reader</span>
            </button>
          </div>
        </div>

        {/* Toast confirmation when PDF downloads */}
        {brochureDownloadedToast && (
          <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-400/50 text-emerald-200 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Official Brochure Downloaded!</strong>{" "}
                <code>Value-Apartments-Madina-Wadi-Mubarak-Ravi-Estate-Brochure.pdf</code>{" "}
                has been saved to your device. You can also open the{" "}
                <button
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="underline font-bold text-gold-300 hover:text-gold-400"
                >
                  Interactive Brochure Viewer
                </button>
                .
              </span>
            </div>
          </div>
        )}

        {/* 4 Core Proximity & Connectivity Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-6 rounded-2xl bg-navy-900/90 border border-gold-400/30 shadow-lg space-y-2">
            <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400">
              <Compass className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-gold-400 pt-1">
              Sacred Proximity
            </div>
            <div className="text-xl font-serif font-bold text-white">
              10 Minutes to Masjid an-Nabawi
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Seamless access via Madinah First Ring Road corridor directly to The Prophet&apos;s Mosque.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/90 border border-emerald-500/30 shadow-lg space-y-2">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Train className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 pt-1">
              High-Speed Rail Link
            </div>
            <div className="text-xl font-serif font-bold text-white">
              Haramain Railway Station
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rapid high-speed rail connectivity linking Madina Al Munawwarah with Makkah &amp; Jeddah.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/90 border border-sky-500/30 shadow-lg space-y-2">
            <div className="w-11 h-11 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <Plane className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 pt-1">
              International Aviation
            </div>
            <div className="text-xl font-serif font-bold text-white">
              8 km to Madinah Int&apos;l Airport
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Direct Route 333 access to Prince Mohammad bin Abdulaziz International Airport.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-navy-900/90 border border-purple-500/30 shadow-lg space-y-2">
            <div className="w-11 h-11 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400 pt-1">
              Next-Gen Residence
            </div>
            <div className="text-xl font-serif font-bold text-white">
              Smart Living &amp; Hotel Lobby
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              IoT climate &amp; security automation paired with Value Group&apos;s signature grand marble lounge.
            </p>
          </div>
        </div>

        {/* Dual Visual Showcase: Smart Living Architecture + Interactive Unit Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Architectural & Smart Lifestyle Showcase */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl overflow-hidden bg-navy-900 border border-gold-400/30 shadow-2xl">
              <div className="p-4 bg-navy-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
                    EXCLUSIVE LIFESTYLE, EXCEPTIONAL COMFORT
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Value Apartments – Smart Living &amp; Modern Architectural Lounge
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-gold-400/15 text-gold-300 text-xs font-semibold border border-gold-400/30">
                  By Value Group
                </span>
              </div>

              <div className="relative bg-slate-950">
                <img
                  src="/images/value-apartments-showcase.png"
                  alt="Value Apartments Madina Munawwarah Smart Living and Modern Architecture Lobby"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-navy-900/95">
                {MADINA_FLAGSHIP_DATA.smartAmenities.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl bg-navy-950/80 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-gold-300">
                      <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
                      <span>{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Unit Configuration & Payment Schedule */}
          <div className="lg:col-span-5 rounded-2xl bg-navy-900 border border-gold-400/35 p-6 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Floor Plans &amp; Investment Tiers
              </span>
              <h3 className="text-2xl font-serif font-bold text-white mt-1">
                Luxury Apartment Configurations
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Select a residence tier below to inspect dimensions, smart features, and SAR installment schedule.
              </p>
            </div>

            {/* Unit Type Tabs */}
            <div className="grid grid-cols-2 gap-2">
              {MADINA_FLAGSHIP_DATA.unitConfigurations.map((unit, idx) => (
                <button
                  key={unit.type}
                  onClick={() => setSelectedUnitIdx(idx)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    selectedUnitIdx === idx
                      ? "bg-gradient-to-br from-gold-500/25 to-navy-950 border-gold-400 text-white shadow-md"
                      : "bg-navy-950/60 border-white/10 text-slate-300 hover:border-white/25"
                  }`}
                >
                  <div className="text-xs font-bold text-gold-300">
                    {unit.type}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {unit.area}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Selected Unit Detail Card */}
            {(() => {
              const activeUnit =
                MADINA_FLAGSHIP_DATA.unitConfigurations[selectedUnitIdx];
              return (
                <div className="p-5 rounded-xl bg-navy-950 border border-gold-400/30 space-y-4">
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">
                        Wadi Mubarak • Madina Al Munawwarah
                      </span>
                      <h4 className="text-xl font-serif font-bold text-white mt-0.5">
                        {activeUnit.type}
                      </h4>
                    </div>
                    <span className="px-3 py-1 rounded-lg bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold">
                      {activeUnit.area}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Indicative Price Range:</span>
                      <span className="text-white font-bold text-sm">
                        {activeUnit.priceRange}
                      </span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-white/5">
                      <span className="text-slate-400">Payment Schedule:</span>
                      <span className="text-gold-300 font-semibold">
                        {activeUnit.paymentPlan}
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-slate-400 block mb-1">
                        Included Specifications:
                      </span>
                      <p className="text-slate-200 leading-relaxed bg-navy-900 p-3 rounded-lg border border-white/5">
                        {activeUnit.features}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                    <button
                      onClick={() => handleInquireUnit(activeUnit.type)}
                      className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition-all"
                    >
                      <span>Request Unit Availability</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleDirectDownload}
                      className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                    >
                      <FileDown className="w-4 h-4 text-gold-400" />
                      <span>PDF Floor Plan</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Dedicated Madinah Strategic Location Map Showcase (Using Uploaded Map) */}
        <div
          id="madina-map"
          className="rounded-3xl bg-navy-900 border border-gold-400/35 overflow-hidden shadow-2xl"
        >
          <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
                <MapPin className="w-4 h-4 text-gold-400" />
                <span>Official Master Location &amp; Ring Road Connectivity Map</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                Strategic Connectivity Across Madina Al Munawwarah
              </h3>
              <p className="text-sm text-slate-300 mt-1">
                Direct connectivity via Highway 333 &amp; Highway 15 to Al-Masjid an-Nabawi, Prince Mohammad bin Abdulaziz Airport (8 km), Masjid Quba, Uhud Mountain &amp; King Fahad Hospital.
              </p>
            </div>
            <button
              onClick={handleDirectDownload}
              className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-400/15 hover:bg-gold-400/25 border border-gold-400/40 text-gold-300 text-xs font-bold transition-all shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Download High-Res Map in Brochure</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Map Image */}
            <div className="lg:col-span-8 bg-white p-3 sm:p-6 flex items-center justify-center">
              <img
                src="/images/madinah-location-map.png"
                alt="Madina Al Munawwarah Master Location & Landmarks Map"
                className="w-full h-auto max-h-[540px] object-contain rounded-xl"
              />
            </div>

            {/* Landmarks Directory Sidebar */}
            <div className="lg:col-span-4 bg-navy-950 p-6 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
                  <Building className="w-4 h-4" />
                  <span>Key Landmarks on Map</span>
                </div>

                <div className="space-y-2.5">
                  {MADINA_FLAGSHIP_DATA.keyLandmarks.map((lm, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-navy-900/90 border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">
                          {lm.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {lm.arabic} •{" "}
                          <span className="text-gold-300">{lm.category}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold shrink-0">
                        {lm.distance}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-gold-500/15 to-emerald-500/10 border border-gold-400/30 text-xs text-slate-200 space-y-2">
                <div className="font-bold text-gold-300">
                  Private Site Tours in Madina Al Munawwarah
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Our KSA International Support Desk (+966 50 XXX XXXX) arranges chauffeured site inspections from Haram hotels &amp; Madinah Airport.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

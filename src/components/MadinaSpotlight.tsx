"use client";

import React, { useState } from "react";
import {
  FileDown,
  MapPin,
  Train,
  Plane,
  ShieldCheck,
  Compass,
  Building,
  CheckCircle2,
  BookOpen,
  ArrowRight,
} from "lucide-react";
import { MADINA_FLAGSHIP_DATA } from "@/lib/data";
import { downloadOfficialBrochurePDF } from "@/lib/brochureGenerator";
import { useLeads } from "@/context/LeadContext";
import ScrollReveal from "./ScrollReveal";

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
      className="py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-16">
        {/* Corporate Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Flagship International Development • Kingdom of Saudi Arabia
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-slate-900 leading-tight">
                {MADINA_FLAGSHIP_DATA.title}{" "}
                <span className="text-gold-600">(Wadi Mubarak)</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {MADINA_FLAGSHIP_DATA.description}
              </p>
            </div>

            {/* Official Brochure Download Actions */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={handleDirectDownload}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all whitespace-nowrap"
              >
                <FileDown className="w-4 h-4 text-gold-400" />
                <span>Download Official Brochure (PDF)</span>
              </button>
              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 font-semibold text-sm transition-all whitespace-nowrap"
              >
                <BookOpen className="w-4 h-4 text-gold-600" />
                <span>View Brochure Details</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Confirmation Banner when PDF Downloads */}
        {brochureDownloadedToast && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                <strong>Official Brochure Downloaded.</strong> The PDF file for{" "}
                <em>Value Apartments – Madina Al Munawwarah (Wadi Mubarak)</em>{" "}
                has been saved to your device.
              </span>
            </div>
          </div>
        )}

        {/* 4 Core Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Compass,
              label: "Sacred Proximity",
              title: "10 Minutes to Masjid an-Nabawi",
              desc: "Direct access along the Madinah First Ring Road corridor to The Prophet's Mosque.",
            },
            {
              icon: Train,
              label: "Rail Connectivity",
              title: "Haramain High-Speed Railway",
              desc: "Convenient access to the Haramain High-Speed Railway Station connecting Madina, Makkah & Jeddah.",
            },
            {
              icon: Plane,
              label: "International Airport",
              title: "8 km to Madinah Airport",
              desc: "Rapid highway access to Prince Mohammad bin Abdulaziz International Airport.",
            },
            {
              icon: ShieldCheck,
              label: "Modern Comfort",
              title: "Smart Living & Hotel Lobby",
              desc: "Equipped with smart home climate & security controls, reception concierge, and family lounges.",
            },
          ].map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={idx} direction="up" delayMs={idx * 90}>
                <div className="h-full p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-gold-500/50 hover:shadow-md transition-all space-y-2.5">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gold-600 shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-gold-600 pt-1">
                    {pillar.label}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Architectural Showcase & Apartment Configurations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Columns: Smart Living & Lobby Showcase */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delayMs={100}>
              <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
                <div className="p-5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600">
                      Exclusive Lifestyle &amp; Exceptional Comfort
                    </span>
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Value Apartments – Smart Living &amp; Modern Lounge by Value Group
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded bg-white text-slate-700 text-xs font-semibold border border-slate-200">
                    Wadi Mubarak, Madina
                  </span>
                </div>

                <div className="border-b border-slate-200">
                  <img
                    src="/images/value-apartments-showcase.png"
                    alt="Value Apartments Madina Munawwarah Smart Living and Modern Architecture Lobby"
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white">
                  {MADINA_FLAGSHIP_DATA.smartAmenities.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                    >
                      <div className="flex items-center gap-2 text-sm font-serif font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right 5 Columns: Apartment Configurations & Payment Schedule */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delayMs={180}>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                    Residence Categories &amp; Payment Schedule
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                    Luxury Apartment Options
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Select a residence type below to view floor area, features, and flexible 36-month payment plan.
                  </p>
                </div>

                {/* Unit Selector Tabs */}
                <div className="grid grid-cols-2 gap-2.5">
                  {MADINA_FLAGSHIP_DATA.unitConfigurations.map((unit, idx) => (
                    <button
                      key={unit.type}
                      onClick={() => setSelectedUnitIdx(idx)}
                      className={`p-3.5 rounded-xl text-left border transition-all ${
                        selectedUnitIdx === idx
                          ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      <div
                        className={`text-xs font-bold ${
                          selectedUnitIdx === idx
                            ? "text-gold-400"
                            : "text-slate-900"
                        }`}
                      >
                        {unit.type}
                      </div>
                      <div
                        className={`text-[11px] mt-0.5 ${
                          selectedUnitIdx === idx
                            ? "text-slate-300"
                            : "text-slate-500"
                        }`}
                      >
                        {unit.area}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Unit Details */}
                {(() => {
                  const activeUnit =
                    MADINA_FLAGSHIP_DATA.unitConfigurations[selectedUnitIdx];
                  return (
                    <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4">
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-gold-600 font-bold">
                            Wadi Mubarak • Madina Al Munawwarah
                          </span>
                          <h4 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                            {activeUnit.type}
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 whitespace-nowrap">
                          {activeUnit.area}
                        </span>
                      </div>

                      <div className="space-y-2.5 text-xs">
                        <div className="flex justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500">Indicative Price:</span>
                          <span className="text-slate-900 font-bold text-sm">
                            {activeUnit.priceRange}
                          </span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-slate-100">
                          <span className="text-slate-500">Payment Plan:</span>
                          <span className="text-gold-600 font-semibold">
                            {activeUnit.paymentPlan}
                          </span>
                        </div>
                        <div className="pt-1">
                          <span className="text-slate-500 block mb-1.5">
                            Residence Features:
                          </span>
                          <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                            {activeUnit.features}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                        <button
                          onClick={() => handleInquireUnit(activeUnit.type)}
                          className="flex-1 py-3 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                        >
                          <span>Inquire About This Unit</span>
                          <ArrowRight className="w-4 h-4 text-gold-400" />
                        </button>
                        <button
                          onClick={handleDirectDownload}
                          className="py-3 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                        >
                          <FileDown className="w-4 h-4 text-gold-600" />
                          <span>Brochure PDF</span>
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Madinah Master Location & Connectivity Map Section */}
        <ScrollReveal direction="up" delayMs={100}>
          <div
            id="madina-map"
            className="rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden shadow-sm"
          >
            <div className="p-6 sm:p-8 bg-white border-b border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-600">
                  <MapPin className="w-4 h-4 text-gold-600" />
                  <span>Master Location &amp; Ring Road Connectivity</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
                  Prime Location in Madina Al Munawwarah
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Direct connectivity via Highway 333 &amp; Highway 15 to Al-Masjid an-Nabawi, Prince Mohammad bin Abdulaziz International Airport (8 km), Masjid Quba, Uhud Mountain &amp; King Fahad Hospital.
                </p>
              </div>
              <button
                onClick={handleDirectDownload}
                className="self-start lg:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-all shrink-0 whitespace-nowrap"
              >
                <FileDown className="w-4 h-4 text-gold-400" />
                <span>Download Map &amp; Brochure</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-8 bg-white p-4 sm:p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
                <img
                  src="/images/madinah-location-map.png"
                  alt="Madina Al Munawwarah Master Location & Landmarks Map"
                  className="w-full h-auto max-h-[520px] object-contain"
                />
              </div>

              <div className="lg:col-span-4 bg-slate-50 p-6 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-700">
                    <Building className="w-4 h-4 text-gold-600" />
                    <span>Surrounding Landmarks &amp; Distances</span>
                  </div>

                  <div className="space-y-2.5">
                    {MADINA_FLAGSHIP_DATA.keyLandmarks.map((lm, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">
                            {lm.name}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {lm.arabic} • {lm.category}
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-bold shrink-0 whitespace-nowrap">
                          {lm.distance}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 text-white text-xs space-y-1.5">
                  <div className="font-serif font-bold text-gold-400 text-sm">
                    Site Visits in Madina Al Munawwarah
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Contact our Saudi Arabia International Support Desk (+966 50 XXX XXXX) or Pakistan Office (+92 300 4154156) to arrange an on-site viewing in Wadi Mubarak.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

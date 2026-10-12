"use client";

import React, { useState } from "react";
import {
  X,
  FileDown,
  MapPin,
  CheckCircle2,
  Building2,
  Sparkles,
  Phone,
} from "lucide-react";
import {
  COMPANY_INFO,
  MADINA_FLAGSHIP_DATA,
  PAKISTAN_PORTFOLIO,
} from "@/lib/data";
import { downloadOfficialBrochurePDF } from "@/lib/brochureGenerator";
import { useLeads } from "@/context/LeadContext";

export default function BrochureModal() {
  const { isBrochureModalOpen, setIsBrochureModalOpen } = useLeads();
  const [activeTab, setActiveTab] = useState<
    "overview" | "map" | "units" | "track-record"
  >("overview");
  const [downloaded, setDownloaded] = useState(false);

  if (!isBrochureModalOpen) return null;

  const handleDownload = () => {
    downloadOfficialBrochurePDF();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative max-w-5xl w-full rounded-3xl bg-navy-900 border border-gold-400/40 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-navy-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-xl bg-white p-1 border border-gold-400/40 shrink-0">
              <img
                src="/images/ravi-estate-logo.png"
                alt="Ravi Estate"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400">
                  OFFICIAL DIGITAL BROCHURE &amp; INVESTMENT DOSSIER
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Value Apartments – Madina Al Munawwarah (Wadi Mubarak)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>
                {downloaded ? "PDF Saved!" : "Download Official PDF"}
              </span>
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
              aria-label="Close Brochure"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Page Navigation Tabs */}
        <div className="px-6 py-3 bg-navy-900 border-b border-white/10 flex flex-wrap gap-2">
          {[
            { id: "overview", label: "01. Executive Vision & Smart Living" },
            { id: "map", label: "02. Madinah Ring Road & Landmarks Map" },
            { id: "units", label: "03. Apartment Tiers & Payment Plan" },
            { id: "track-record", label: "04. Value Group Pakistan Track Record" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "overview" | "map" | "units" | "track-record"
                )
              }
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-gold-400 text-navy-950 shadow"
                  : "bg-navy-950/70 text-slate-300 hover:text-white border border-white/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Brochure Content Area */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold-400">
                  <Sparkles className="w-4 h-4" />
                  <span>Where Faith Meets Modern Architecture</span>
                </div>
                <h4 className="text-2xl font-serif font-bold text-white">
                  Experience A Premium Lifestyle Within Your Home in Wadi Mubarak
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {MADINA_FLAGSHIP_DATA.description}
                </p>
                <div className="space-y-2.5 pt-2">
                  {MADINA_FLAGSHIP_DATA.smartAmenities.map((am, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-navy-950 border border-white/10"
                    >
                      <div className="text-xs font-bold text-gold-300">
                        {am.title}
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {am.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 space-y-4">
                <img
                  src="/images/value-apartments-showcase.png"
                  alt="Value Apartments Smart Living & Lobby Showcase"
                  className="w-full rounded-2xl border border-gold-400/30 shadow-xl"
                />
                <div className="p-4 rounded-xl bg-navy-950 border border-gold-400/30 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-white block">
                      Advisory &amp; Global Marketing Partner
                    </strong>
                    <span className="text-slate-400">
                      Ravi Estate ({COMPANY_INFO.domain}) —{" "}
                      {COMPANY_INFO.pakistanPhone}
                    </span>
                  </div>
                  <span className="text-gold-300 font-bold">
                    {COMPANY_INFO.saudiPhone}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-2xl border border-gold-400/40">
                <img
                  src="/images/madinah-location-map.png"
                  alt="Madinah Master Connectivity Map"
                  className="w-full max-h-[420px] object-contain mx-auto"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {MADINA_FLAGSHIP_DATA.keyLandmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-navy-950 border border-white/10 space-y-1"
                  >
                    <div className="text-xs font-bold text-gold-300">
                      {lm.distance}
                    </div>
                    <div className="text-xs font-semibold text-white">
                      {lm.name}
                    </div>
                    <div className="text-[11px] text-slate-400">{lm.arabic}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "units" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MADINA_FLAGSHIP_DATA.unitConfigurations.map((u, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-navy-950 border border-gold-400/30 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-white">
                      {u.type}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-gold-400/15 text-gold-300 text-xs font-bold">
                      {u.area}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-emerald-300">
                    {u.priceRange}
                  </div>
                  <div className="text-xs text-gold-300 font-medium">
                    {u.paymentPlan}
                  </div>
                  <p className="text-xs text-slate-400 pt-1">{u.features}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "track-record" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-300">
                Ravi Estate &amp; Value Group&apos;s proven track record of completed and ongoing developments across Lahore, Pakistan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAKISTAN_PORTFOLIO.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-navy-950 border border-white/10 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gold-400">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{proj.status}</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-white">
                      {proj.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3 h-3 text-gold-400 shrink-0" />
                      <span>{proj.location}</span>
                    </div>
                    <div className="text-xs text-emerald-300 font-semibold pt-1">
                      {proj.startingPrice} • {proj.unitsInfo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-navy-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-semibold">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              PK: {COMPANY_INFO.pakistanPhone}
            </span>
            <span>•</span>
            <span className="text-emerald-300 font-semibold">
              KSA: {COMPANY_INFO.saudiPhone}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Brochure Data Verified • Value Group × Ravi Estate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

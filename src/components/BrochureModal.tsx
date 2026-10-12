"use client";

import React, { useState } from "react";
import {
  X,
  FileDown,
  MapPin,
  CheckCircle2,
  Building2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto">
      <div className="relative max-w-5xl w-full rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-lg bg-white p-1 border border-slate-200 shrink-0">
              <img
                src="/images/ravi-estate-logo.png"
                alt="Ravi Estate"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-400 block">
                Official Project Brochure &amp; Investment Summary
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
                Value Apartments – Madina Al Munawwarah (Wadi Mubarak)
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-xs shadow-sm transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>
                {downloaded ? "PDF Saved!" : "Download Official PDF"}
              </span>
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
              aria-label="Close Brochure"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Brochure Tabs */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
          {[
            { id: "overview", label: "1. Project Overview & Amenities" },
            { id: "map", label: "2. Madinah Location Map" },
            { id: "units", label: "3. Apartments & Payment Plan" },
            { id: "track-record", label: "4. Pakistan Portfolio (6 Projects)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(
                  tab.id as "overview" | "map" | "units" | "track-record"
                )
              }
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Brochure Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-800">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Value Group × Ravi Estate
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900">
                  Experience A Premium Lifestyle Within Your Home in Wadi Mubarak
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {MADINA_FLAGSHIP_DATA.description}
                </p>
                <div className="space-y-2.5 pt-2">
                  {MADINA_FLAGSHIP_DATA.smartAmenities.map((am, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="text-xs font-bold text-slate-900">
                        {am.title}
                      </div>
                      <div className="text-xs text-slate-600 mt-0.5">
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
                  className="w-full rounded-xl border border-slate-200 shadow-sm"
                />
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 block">
                      Official Advisory Partner
                    </strong>
                    <span className="text-slate-600">
                      Ravi Estate ({COMPANY_INFO.domain}) —{" "}
                      {COMPANY_INFO.pakistanPhone}
                    </span>
                  </div>
                  <span className="text-slate-900 font-bold">
                    {COMPANY_INFO.saudiPhone}
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "map" && (
            <div className="space-y-6">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <img
                  src="/images/madinah-location-map.png"
                  alt="Madinah Master Connectivity Map"
                  className="w-full max-h-[420px] object-contain mx-auto bg-white p-2 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {MADINA_FLAGSHIP_DATA.keyLandmarks.map((lm, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <div className="text-xs font-bold text-gold-600">
                      {lm.distance}
                    </div>
                    <div className="text-xs font-semibold text-slate-900">
                      {lm.name}
                    </div>
                    <div className="text-[11px] text-slate-500">{lm.arabic}</div>
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
                  className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-serif font-bold text-slate-900">
                      {u.type}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-800 text-xs font-bold">
                      {u.area}
                    </span>
                  </div>
                  <div className="text-sm font-bold text-slate-900">
                    {u.priceRange}
                  </div>
                  <div className="text-xs text-gold-600 font-semibold">
                    {u.paymentPlan}
                  </div>
                  <p className="text-xs text-slate-600 pt-1">{u.features}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "track-record" && (
            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Ravi Estate &amp; Value Group&apos;s track record of completed and ongoing developments across Lahore, Pakistan:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAKISTAN_PORTFOLIO.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gold-600">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{proj.status}</span>
                    </div>
                    <div className="text-sm font-serif font-bold text-slate-900">
                      {proj.title}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                      <span>{proj.location}</span>
                    </div>
                    <div className="text-xs text-slate-800 font-semibold pt-1">
                      {proj.startingPrice} • {proj.unitsInfo}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-900 font-semibold">
              <Phone className="w-3.5 h-3.5 text-gold-600" />
              PK: {COMPANY_INFO.pakistanPhone}
            </span>
            <span>•</span>
            <span className="text-slate-900 font-semibold">
              KSA: {COMPANY_INFO.saudiPhone}
            </span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official Brochure Data • Value Group × Ravi Estate</span>
          </div>
        </div>
      </div>
    </div>
  );
}

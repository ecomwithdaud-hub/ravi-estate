"use client";

import React from "react";
import {
  Sparkles,
  FileDown,
  ArrowRight,
  ShieldCheck,
  Building2,
  MapPin,
  Train,
  Plane,
  PhoneCall,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

export default function HeroSection() {
  const { setIsBrochureModalOpen } = useLeads();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-navy-950 pt-10 pb-20 lg:pt-16 lg:pb-28 border-b border-gold-400/20"
    >
      {/* Ambient Luxury Background Glows & Architectural Grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-gold-500/10 blur-[130px]" />
        <div className="absolute top-20 right-0 w-[460px] h-[460px] rounded-full bg-emerald-500/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Positioning & Value Proposition */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/35 text-gold-300 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>
                PREMIER REAL ESTATE ADVISORY &amp; GLOBAL INVESTMENT MARKETING
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.12]">
                Bridging Iconic{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-amber-500">
                  Pakistani Landmarks
                </span>{" "}
                &amp; Sacred{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-gold-300">
                  Madina Sanctuary Living
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Welcome to <strong className="text-white">Ravi Estate</strong> (
                <span className="text-gold-300">{COMPANY_INFO.domain}</span>) —{" "}
                <em className="font-serif text-gold-200">
                  &ldquo;{COMPANY_INFO.tagline}&rdquo;
                </em>{" "}
                In strategic partnership with <strong className="text-white">Value Group</strong>, we advise domestic and international diaspora investors across six landmark developments in Lahore and our flagship international residential enclave in{" "}
                <strong className="text-white">
                  Wadi Mubarak, Madina Al Munawwarah
                </strong>.
              </p>
            </div>

            {/* Key Value Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-navy-900/90 border border-white/10 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">
                    10 Mins to Haram
                  </div>
                  <div className="text-xs text-slate-400">
                    Masjid an-Nabawi, Madina
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-900/90 border border-white/10 flex items-start gap-3">
                <Train className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">
                    Haramain Rail
                  </div>
                  <div className="text-xs text-slate-400">
                    High-Speed Station Access
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-navy-900/90 border border-white/10 flex items-start gap-3">
                <Building2 className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white">
                    6+ Lahore Icons
                  </div>
                  <div className="text-xs text-slate-400">
                    DHA, Gulberg, Model Town
                  </div>
                </div>
              </div>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#madina-spotlight"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-400 text-navy-950 font-bold text-sm shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all"
              >
                <span>Explore Madina Flagship</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsBrochureModalOpen(true)}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-navy-800/90 hover:bg-navy-800 text-white border border-gold-400/40 font-semibold text-sm transition-all"
              >
                <FileDown className="w-4 h-4 text-gold-400" />
                <span>Download Official Brochure</span>
              </button>

              <a
                href="#lead-inquiry"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/15 font-medium text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>Book Advisory Consultation</span>
              </a>
            </div>

            {/* Trust Footer Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>
                  Pakistan Advisory:{" "}
                  <strong className="text-white">
                    {COMPANY_INFO.pakistanPhone}
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-emerald-400" />
                <span>
                  KSA International Desk:{" "}
                  <strong className="text-white">
                    {COMPANY_INFO.saudiPhone}
                  </strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Visual Card + Uploaded Brand Crest & Madina Preview */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-gradient-to-b from-navy-800 to-navy-900 border border-gold-400/35 p-5 shadow-2xl shadow-black/60 space-y-5">
              {/* Official Ravi Estate Crest Header */}
              <div className="flex items-center justify-between gap-4 bg-navy-950/90 p-4 rounded-xl border border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="h-14 w-16 rounded-lg bg-white p-1.5 shadow-md border border-gold-400/40 shrink-0">
                    <img
                      src="/images/ravi-estate-logo.png"
                      alt="Ravi Estate Official Crest"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-gold-400 font-bold">
                      Official Brand Identity
                    </div>
                    <div className="text-lg font-bold text-white">
                      Ravi Estate
                    </div>
                    <div className="text-xs font-serif italic text-slate-300">
                      &ldquo;Deals in all kinds of properties.&rdquo;
                    </div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold">
                  Verified Advisor
                </span>
              </div>

              {/* Flagship Spotlight Visual Showcase from Uploaded Media */}
              <div className="relative rounded-xl overflow-hidden border border-gold-400/30 group">
                <img
                  src="/images/value-apartments-showcase.png"
                  alt="Value Apartments Madina Al Munawwarah by Value Group"
                  className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-gold-400 text-navy-950 text-[11px] font-extrabold uppercase tracking-wider shadow">
                    International Flagship
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-navy-950/85 text-white text-[11px] font-medium border border-white/15">
                    Wadi Mubarak, Madina
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-xs text-gold-300 font-semibold">
                    Value Group × Ravi Estate Exclusive
                  </div>
                  <div className="text-lg font-serif font-bold text-white">
                    Value Apartments – Madina Al Munawwarah
                  </div>
                  <div className="text-xs text-slate-300 mt-0.5">
                    Smart Luxury Living • 10 Mins to Masjid an-Nabawi • 8 km to Airport
                  </div>
                </div>
              </div>

              {/* Interactive Location Map Thumbnail Preview */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/madinah-location-map.png"
                    alt="Madinah Ring Road & Landmarks Map"
                    className="w-16 h-12 rounded-lg object-cover border border-gold-400/30 shrink-0"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">
                      Madinah First Ring Road Corridor
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Connected to Route 333, Route 15, Masjid Quba &amp; Airport
                    </div>
                  </div>
                </div>
                <a
                  href="#madina-map"
                  className="px-3 py-1.5 rounded-lg bg-gold-400/15 hover:bg-gold-400/25 text-gold-300 border border-gold-400/30 text-xs font-semibold shrink-0 transition-colors"
                >
                  View Map
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

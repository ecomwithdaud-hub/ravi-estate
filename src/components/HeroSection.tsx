"use client";

import React from "react";
import {
  FileDown,
  ArrowRight,
  Building2,
  MapPin,
  Train,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { COMPANY_INFO } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";
import ScrollReveal from "./ScrollReveal";

export default function HeroSection() {
  const { setIsBrochureModalOpen } = useLeads();

  return (
    <section
      id="hero"
      className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 lg:py-24 border-b border-slate-200 overflow-hidden"
    >
      {/* Subtle Warm Architectural Accent Bar at Top */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left 7 Columns: Corporate Introduction & Complete Advisory Overview */}
          <div className="lg:col-span-7 space-y-7">
            <ScrollReveal direction="up" delayMs={50}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-md bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold uppercase tracking-widest">
                <span>Real Estate Advisory &amp; Investment Marketing</span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delayMs={120}>
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-serif font-bold text-slate-900 tracking-tight leading-[1.16]">
                  Trusted Property Advisory for{" "}
                  <span className="text-gold-600">Pakistan</span> &amp;{" "}
                  <span className="text-slate-800 underline decoration-gold-500/60 decoration-2 underline-offset-8">
                    Madina Al Munawwarah
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Welcome to <strong className="text-slate-900">Ravi Estate</strong> (
                  <span className="text-slate-800 font-medium">
                    {COMPANY_INFO.domain}
                  </span>
                  ) —{" "}
                  <em className="font-serif text-slate-800">
                    &ldquo;{COMPANY_INFO.tagline}&rdquo;
                  </em>{" "}
                  As an official advisory and marketing partner of{" "}
                  <strong className="text-slate-900">Value Group</strong>, we guide families and institutional investors across six premier developments in Lahore and our flagship international residence in{" "}
                  <strong className="text-slate-900">
                    Wadi Mubarak, Madina Al Munawwarah
                  </strong>
                  .
                </p>
              </div>
            </ScrollReveal>

            {/* Corporate Highlights Strip */}
            <ScrollReveal direction="up" delayMs={200}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-serif font-bold text-slate-900">
                      10 Mins to Haram
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Masjid an-Nabawi, Madina
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <Train className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-serif font-bold text-slate-900">
                      Haramain Railway
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      High-Speed Station Access
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                  <Building2 className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-serif font-bold text-slate-900">
                      6 Lahore Projects
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      DHA, Gulberg &amp; Model Town
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Primary Corporate Action Buttons */}
            <ScrollReveal direction="up" delayMs={280}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#madina-spotlight"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all"
                >
                  <span>Explore Madina Project</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </a>

                <button
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-gold-500 hover:bg-gold-600 text-slate-950 font-bold text-sm shadow-sm transition-all"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Official Brochure</span>
                </button>

                <a
                  href="#lead-inquiry"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-medium text-sm transition-all"
                >
                  <span>Schedule Consultation</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Direct Corporate Contact Strip */}
            <ScrollReveal direction="up" delayMs={350}>
              <div className="pt-5 border-t border-slate-200 flex flex-wrap items-center gap-6 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold-600" />
                  <span>
                    Pakistan Advisory:{" "}
                    <strong className="text-slate-900">
                      {COMPANY_INFO.pakistanPhone}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-800" />
                  <span>
                    Saudi Arabia Support:{" "}
                    <strong className="text-slate-900">
                      {COMPANY_INFO.saudiPhone}
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Authorized Value Group Partner</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right 5 Columns: Clean Corporate Presentation Card */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="left" delayMs={180}>
              <div className="rounded-2xl bg-white border border-slate-200 p-6 shadow-xl shadow-slate-200/60 space-y-5">
                {/* Official Uploaded Ravi Estate Logo Banner */}
                <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3.5">
                    <div className="h-14 w-16 rounded-lg bg-white p-1 border border-slate-200 shrink-0">
                      <img
                        src="/images/ravi-estate-logo.png"
                        alt="Ravi Estate Official Crest"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-widest text-gold-600 font-bold">
                        Established Property Advisors
                      </div>
                      <div className="text-lg font-serif font-bold text-slate-900">
                        Ravi Estate
                      </div>
                      <div className="text-xs font-serif italic text-slate-500">
                        &ldquo;Deals in all kinds of properties.&rdquo;
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded bg-slate-100 text-slate-800 text-[11px] font-semibold border border-slate-200 whitespace-nowrap">
                    Value Group Partner
                  </span>
                </div>

                {/* Featured Project Image */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                  <img
                    src="/images/value-apartments-showcase.png"
                    alt="Value Apartments Madina Al Munawwarah by Value Group"
                    className="w-full h-56 object-cover object-center"
                  />
                  <div className="p-4 bg-slate-900 text-white space-y-1">
                    <div className="text-[11px] uppercase tracking-widest text-gold-400 font-semibold">
                      Flagship International Offering • Wadi Mubarak
                    </div>
                    <div className="text-lg font-serif font-bold">
                      Value Apartments – Madina Al Munawwarah
                    </div>
                    <p className="text-xs text-slate-300">
                      Luxury residences located 10 minutes from Masjid an-Nabawi with direct access to the Haramain High-Speed Railway Station.
                    </p>
                  </div>
                </div>

                {/* Location Map Quick Preview */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/madinah-location-map.png"
                      alt="Madinah Master Location Map"
                      className="w-16 h-12 rounded-md object-cover border border-slate-300 shrink-0 bg-white"
                    />
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        Madinah Ring Road &amp; Landmarks Map
                      </div>
                      <div className="text-[11px] text-slate-500">
                        8 km to Madinah Int&apos;l Airport • Near Masjid Quba
                      </div>
                    </div>
                  </div>
                  <a
                    href="#madina-map"
                    className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 text-xs font-semibold shrink-0 transition-colors"
                  >
                    View Map
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

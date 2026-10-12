"use client";

import React from "react";
import {
  Phone,
  Globe,
  Instagram,
  Facebook,
  MapPin,
  FileDown,
  ShieldCheck,
  ArrowUpRight,
  LayoutDashboard,
} from "lucide-react";
import RaviEstateLogo from "./RaviEstateLogo";
import { COMPANY_INFO, PAKISTAN_PORTFOLIO } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

interface FooterProps {
  onSwitchToCRM?: () => void;
}

export default function Footer({ onSwitchToCRM }: FooterProps) {
  const { setIsBrochureModalOpen } = useLeads();

  return (
    <footer className="bg-navy-950 border-t border-gold-400/25 text-slate-300">
      {/* Top Luxury Callout Banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-navy-900 via-navy-800/80 to-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-2xl bg-white p-1.5 shadow-xl border-2 border-gold-400/50 shrink-0">
              <img
                src="/images/ravi-estate-logo.png"
                alt="Ravi Estate Logo Badge"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                Official Advisory &amp; Marketing Partner • Value Group
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                Ravi Estate — &ldquo;{COMPANY_INFO.tagline}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Connecting domestic investors in Pakistan &amp; the global diaspora to premier real estate in Lahore &amp; Madina Al Munawwarah.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-sm shadow-lg shadow-gold-500/20 hover:brightness-110 transition-all"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Madina Official Brochure</span>
            </button>
            {onSwitchToCRM && (
              <button
                onClick={onSwitchToCRM}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all"
              >
                <LayoutDashboard className="w-4 h-4 text-gold-400" />
                <span>Open Agent CRM Portal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand & Socials */}
        <div className="space-y-4">
          <RaviEstateLogo variant="dark" showTagline={true} />
          <p className="text-sm text-slate-400 leading-relaxed">
            Premier real estate advisory, investment marketing, and portfolio management firm specializing in high-yield domestic developments and sacred international real estate in Madina Al Munawwarah.
          </p>

          <div className="pt-2 space-y-2.5 text-xs">
            <div className="flex items-center gap-2 text-gold-300 font-medium">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Authorized Value Group Marketing Partner</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Globe className="w-4 h-4 text-gold-400 shrink-0" />
              <a
                href={COMPANY_INFO.websiteUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold-400 underline underline-offset-4"
              >
                {COMPANY_INFO.domain}
              </a>
            </div>
          </div>

          {/* Social Profiles */}
          <div className="pt-3 flex flex-wrap gap-2.5">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy-900 border border-white/10 hover:border-gold-400/50 text-xs font-medium text-white transition-all"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>{COMPANY_INFO.instagramHandle}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href={COMPANY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-navy-900 border border-white/10 hover:border-gold-400/50 text-xs font-medium text-white transition-all"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>{COMPANY_INFO.facebookName}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Col 2: Flagship International Spotlight */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            International Flagship (KSA)
          </h4>
          <p className="text-base font-serif font-semibold text-white">
            Value Apartments – Madina Al Munawwarah (Wadi Mubarak)
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <span className="text-gold-400">•</span>
              <span>10-Minute Proximity to Masjid an-Nabawi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">•</span>
              <span>Direct Access to Haramain High-Speed Railway Station</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">•</span>
              <span>8 km to Prince Mohammad bin Abdulaziz Int&apos;l Airport</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">•</span>
              <span>Smart Home IoT Automation &amp; 5-Star Lobby Concierge</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold-400">•</span>
              <span>Minutes to Masjid Quba, Uhud Mountain &amp; King Fahad Park</span>
            </li>
          </ul>
        </div>

        {/* Col 3: Pakistani Track Record Portfolio */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Pakistan Track Record (Value Group)
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {PAKISTAN_PORTFOLIO.map((proj) => (
              <li key={proj.id}>
                <a
                  href="#pakistan-portfolio"
                  className="hover:text-gold-400 transition-colors flex items-start gap-2"
                >
                  <span className="text-gold-400 mt-0.5">▸</span>
                  <span>
                    <strong className="text-white font-medium">
                      {proj.title}
                    </strong>{" "}
                    <span className="text-slate-400">({proj.location})</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Direct Advisory Desks */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Global Advisory Desks
          </h4>

          <div className="p-3.5 rounded-xl bg-navy-900/90 border border-white/10 space-y-1.5">
            <div className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
              Pakistan Domestic Hotline
            </div>
            <a
              href={`tel:${COMPANY_INFO.pakistanPhoneRaw}`}
              className="flex items-center gap-2 text-base font-bold text-white hover:text-gold-400 transition-colors"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>{COMPANY_INFO.pakistanPhone}</span>
            </a>
            <div className="flex items-start gap-1.5 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.headOffice}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-navy-900/90 border border-emerald-500/25 space-y-1.5">
            <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-semibold">
              Saudi Arabia International Support
            </div>
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>{COMPANY_INFO.saudiPhone}</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.internationalDesk}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-white/10 bg-navy-950 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} <strong className="text-white">Ravi Estate</strong> ({COMPANY_INFO.domain}) —{" "}
            <span className="italic text-gold-300">&ldquo;{COMPANY_INFO.tagline}&rdquo;</span> All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Instagram: {COMPANY_INFO.instagramHandle}</span>
            <span>•</span>
            <span>Facebook: {COMPANY_INFO.facebookName}</span>
            <span>•</span>
            <span>PK: {COMPANY_INFO.pakistanPhone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

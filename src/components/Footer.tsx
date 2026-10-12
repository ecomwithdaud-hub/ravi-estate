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
  LayoutDashboard,
} from "lucide-react";
import RaviEstateLogo from "./RaviEstateLogo";
import { COMPANY_INFO, PAKISTAN_PORTFOLIO } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";
import ScrollReveal from "./ScrollReveal";

interface FooterProps {
  onSwitchToCRM?: () => void;
}

export default function Footer({ onSwitchToCRM }: FooterProps) {
  const { setIsBrochureModalOpen } = useLeads();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Corporate Callout Banner */}
      <div className="border-b border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
          <ScrollReveal direction="up">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-white p-1.5 shadow-sm border border-slate-200 shrink-0">
                  <img
                    src="/images/ravi-estate-logo.png"
                    alt="Ravi Estate Official Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                    Authorized Advisory &amp; Marketing Partner • Value Group
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-0.5">
                    Ravi Estate — &ldquo;{COMPANY_INFO.tagline}&rdquo;
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Advising families and investors across Lahore, Pakistan and Madina Al Munawwarah, Saudi Arabia.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => setIsBrochureModalOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-sm transition-all whitespace-nowrap"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Official Brochure</span>
                </button>
                {onSwitchToCRM && (
                  <button
                    onClick={onSwitchToCRM}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-semibold text-sm transition-all whitespace-nowrap"
                  >
                    <LayoutDashboard className="w-4 h-4 text-gold-400" />
                    <span>Staff CRM Portal</span>
                  </button>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Main 4-Column Corporate Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Col 1: Brand & Socials */}
        <div className="space-y-4">
          <RaviEstateLogo variant="dark" showTagline={true} />
          <p className="text-sm text-slate-400 leading-relaxed">
            Premier real estate advisory and marketing company handling domestic residential and commercial developments across Pakistan and international real estate investments in Madina Al Munawwarah.
          </p>

          <div className="pt-1 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gold-400 font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Value Group Official Partner</span>
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

          <div className="pt-2 flex flex-wrap gap-2.5">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white transition-all"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-400" />
              <span>{COMPANY_INFO.instagramHandle}</span>
            </a>
            <a
              href={COMPANY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-white transition-all"
            >
              <Facebook className="w-3.5 h-3.5 text-gold-400" />
              <span>{COMPANY_INFO.facebookName}</span>
            </a>
          </div>
        </div>

        {/* Col 2: Flagship Madina Project */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            International Flagship (KSA)
          </h4>
          <p className="text-base font-serif font-semibold text-white">
            Value Apartments – Madina Al Munawwarah (Wadi Mubarak)
          </p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>• 10-Minute Proximity to Masjid an-Nabawi</li>
            <li>• Haramain High-Speed Railway Station Access</li>
            <li>• 8 km to Prince Mohammad bin Abdulaziz Int&apos;l Airport</li>
            <li>• Smart Home Living &amp; Hotel-Grade Reception</li>
            <li>• Near Masjid Quba, Uhud Mountain &amp; King Fahad Park</li>
          </ul>
        </div>

        {/* Col 3: Pakistani Portfolio */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Pakistan Portfolio (Lahore)
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            {PAKISTAN_PORTFOLIO.map((proj) => (
              <li key={proj.id}>
                <a
                  href="#pakistan-portfolio"
                  className="hover:text-gold-400 transition-colors block"
                >
                  <strong className="text-white font-medium">
                    {proj.title}
                  </strong>{" "}
                  <span className="text-slate-400">({proj.location})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Offices */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Direct Advisory Numbers
          </h4>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
              Pakistan Domestic Office
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

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-gold-400 font-semibold">
              Saudi Arabia International Support
            </div>
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Phone className="w-4 h-4 text-gold-400" />
              <span>{COMPANY_INFO.saudiPhone}</span>
            </div>
            <div className="flex items-start gap-1.5 text-xs text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
              <span>{COMPANY_INFO.internationalDesk}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-slate-800 bg-slate-950 py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()}{" "}
            <strong className="text-white">Ravi Estate</strong> (
            {COMPANY_INFO.domain}) —{" "}
            <span className="italic text-gold-400">
              &ldquo;{COMPANY_INFO.tagline}&rdquo;
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>Instagram: {COMPANY_INFO.instagramHandle}</span>
            <span>•</span>
            <span>Facebook: {COMPANY_INFO.facebookName}</span>
            <span>•</span>
            <span>Tel: {COMPANY_INFO.pakistanPhone}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

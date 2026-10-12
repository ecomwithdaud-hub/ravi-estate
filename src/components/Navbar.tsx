"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Globe,
  Instagram,
  Facebook,
  LayoutDashboard,
  Building2,
  Menu,
  X,
  FileDown,
  Sparkles,
} from "lucide-react";
import RaviEstateLogo from "./RaviEstateLogo";
import { COMPANY_INFO } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

interface NavbarProps {
  activeModule: "public" | "crm";
  setActiveModule?: (mod: "public" | "crm") => void;
}

export default function Navbar({ activeModule, setActiveModule }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { leads, setIsBrochureModalOpen } = useLeads();
  const newLeadsCount = leads.filter((l) => l.stage === "new").length;

  const handleSwitchModule = (target: "public" | "crm") => {
    if (setActiveModule) {
      setActiveModule(target);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-navy-950/90 border-b border-gold-400/20">
      {/* Top Executive Contact & Social Ribbon */}
      <div className="bg-navy-900/95 border-b border-white/10 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={`tel:${COMPANY_INFO.pakistanPhoneRaw}`}
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-slate-400">PK Advisory:</span>
              <span className="text-white font-semibold">
                {COMPANY_INFO.pakistanPhone}
              </span>
            </a>

            <span className="hidden sm:inline text-white/20">|</span>

            <a
              href="#lead-inquiry"
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">KSA Int&apos;l Desk:</span>
              <span className="text-white font-semibold">
                {COMPANY_INFO.saudiPhone}
              </span>
            </a>

            <span className="hidden md:inline text-white/20">|</span>

            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:text-gold-400 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span>{COMPANY_INFO.domain}</span>
            </a>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
              title="Instagram: @ravi_estate.pk"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">{COMPANY_INFO.instagramHandle}</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={COMPANY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-gold-400 transition-colors"
              title="Facebook: Ravi Estate"
            >
              <Facebook className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">{COMPANY_INFO.facebookName}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div
          onClick={() => handleSwitchModule("public")}
          className="cursor-pointer"
        >
          <RaviEstateLogo variant="dark" showTagline={true} />
        </div>

        {/* Desktop Navigation Links */}
        {activeModule === "public" ? (
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-200">
            <a
              href="#hero"
              className="hover:text-gold-400 transition-colors py-1"
            >
              Overview
            </a>
            <a
              href="#madina-spotlight"
              className="flex items-center gap-1.5 text-gold-300 hover:text-gold-400 transition-colors py-1 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              Madina Flagship
            </a>
            <a
              href="#madina-map"
              className="hover:text-gold-400 transition-colors py-1"
            >
              Wadi Mubarak Map
            </a>
            <a
              href="#pakistan-portfolio"
              className="hover:text-gold-400 transition-colors py-1"
            >
              Pakistan Portfolio (6)
            </a>
            <a
              href="#lead-inquiry"
              className="hover:text-gold-400 transition-colors py-1"
            >
              Investor Inquiry
            </a>
          </nav>
        ) : (
          <div className="hidden lg:flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/30 text-gold-300 text-xs font-medium">
            <LayoutDashboard className="w-4 h-4 text-gold-400" />
            <span>
              Internal Sales &amp; Lead Management CRM • Live Sync Active
            </span>
          </div>
        )}

        {/* Module Switcher & Primary CTA */}
        <div className="hidden md:flex items-center gap-3">
          {activeModule === "public" && (
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-gold-300 border border-gold-400/30 transition-all"
            >
              <FileDown className="w-4 h-4 text-gold-400" />
              <span>Madina Brochure</span>
            </button>
          )}

          {/* Dual Module Toggle Pill */}
          <div className="flex items-center bg-navy-900 p-1 rounded-xl border border-white/15">
            {setActiveModule ? (
              <>
                <button
                  onClick={() => handleSwitchModule("public")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeModule === "public"
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Public Website</span>
                </button>
                <button
                  onClick={() => handleSwitchModule("crm")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeModule === "crm"
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>CRM Pipeline</span>
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                      activeModule === "crm"
                        ? "bg-navy-950 text-gold-400"
                        : "bg-gold-400/20 text-gold-300"
                    }`}
                  >
                    {newLeadsCount} New
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeModule === "public"
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Public Website</span>
                </Link>
                <Link
                  href="/crm"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeModule === "crm"
                      ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 shadow-md"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>CRM Pipeline</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-navy-900 border border-white/15 text-slate-200 hover:text-gold-400"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-900 border-b border-gold-400/30 px-4 pt-3 pb-6 space-y-4">
          <div className="grid grid-cols-2 gap-2 bg-navy-950 p-1.5 rounded-xl border border-white/10">
            <button
              onClick={() => handleSwitchModule("public")}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold ${
                activeModule === "public"
                  ? "bg-gold-400 text-navy-950"
                  : "text-slate-300"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Public Website
            </button>
            <button
              onClick={() => handleSwitchModule("crm")}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold ${
                activeModule === "crm"
                  ? "bg-gold-400 text-navy-950"
                  : "text-slate-300"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              CRM Pipeline ({leads.length})
            </button>
          </div>

          {activeModule === "public" && (
            <div className="flex flex-col space-y-2 text-sm text-slate-200">
              <a
                href="#madina-spotlight"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5 text-gold-300 font-semibold"
              >
                ★ Flagship: Value Apartments Madina (Wadi Mubarak)
              </a>
              <a
                href="#pakistan-portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Pakistani Portfolio (6 Value Group Landmarks)
              </a>
              <a
                href="#lead-inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-white/5"
              >
                Submit Investor Inquiry
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBrochureModalOpen(true);
                }}
                className="w-full mt-2 py-2.5 px-4 rounded-lg bg-gold-400/20 border border-gold-400/40 text-gold-300 font-semibold flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4" />
                Download Official Brochure
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

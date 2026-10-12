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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      {/* Top Corporate Contact & Social Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-5 sm:gap-7">
            <a
              href={`tel:${COMPANY_INFO.pakistanPhoneRaw}`}
              className="flex items-center gap-2 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="text-slate-400">Pakistan Office:</span>
              <span className="font-semibold text-white">
                {COMPANY_INFO.pakistanPhone}
              </span>
            </a>

            <span className="hidden sm:inline text-slate-700">|</span>

            <a
              href="#lead-inquiry"
              className="flex items-center gap-2 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="text-slate-400">Saudi Arabia Support:</span>
              <span className="font-semibold text-white">
                {COMPANY_INFO.saudiPhone}
              </span>
            </a>

            <span className="hidden md:inline text-slate-700">|</span>

            <a
              href={COMPANY_INFO.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex items-center gap-1.5 hover:text-gold-300 transition-colors whitespace-nowrap"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{COMPANY_INFO.domain}</span>
            </a>
          </div>

          <div className="flex items-center gap-5 ml-auto whitespace-nowrap">
            <a
              href={COMPANY_INFO.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{COMPANY_INFO.instagramHandle}</span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href={COMPANY_INFO.facebookUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Facebook className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{COMPANY_INFO.facebookName}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Navigation Bar with generous padding */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 lg:py-5 flex items-center justify-between gap-6">
        <div
          onClick={() => handleSwitchModule("public")}
          className="cursor-pointer shrink-0"
        >
          <RaviEstateLogo variant="light" showTagline={true} />
        </div>

        {/* Center Navigation Links - strictly single line */}
        {activeModule === "public" ? (
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium text-slate-700 whitespace-nowrap">
            <a
              href="#hero"
              className="hover:text-slate-950 hover:underline underline-offset-8 decoration-gold-500 decoration-2 transition-all py-1"
            >
              Home
            </a>
            <a
              href="#madina-spotlight"
              className="text-slate-900 font-semibold hover:text-gold-600 hover:underline underline-offset-8 decoration-gold-500 decoration-2 transition-all py-1"
            >
              Madina Project
            </a>
            <a
              href="#madina-map"
              className="hover:text-slate-950 hover:underline underline-offset-8 decoration-gold-500 decoration-2 transition-all py-1"
            >
              Location Map
            </a>
            <a
              href="#pakistan-portfolio"
              className="hover:text-slate-950 hover:underline underline-offset-8 decoration-gold-500 decoration-2 transition-all py-1"
            >
              Pakistan Portfolio
            </a>
            <a
              href="#lead-inquiry"
              className="hover:text-slate-950 hover:underline underline-offset-8 decoration-gold-500 decoration-2 transition-all py-1"
            >
              Contact &amp; Inquiry
            </a>
          </nav>
        ) : (
          <div className="hidden xl:flex items-center gap-2 text-sm font-serif text-slate-600 whitespace-nowrap">
            <span>Internal Sales &amp; Lead Management Portal</span>
          </div>
        )}

        {/* Right Action Buttons - strictly single line whitespace-nowrap */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 whitespace-nowrap">
          {activeModule === "public" && (
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors whitespace-nowrap"
            >
              <FileDown className="w-4 h-4 text-gold-600 shrink-0" />
              <span>Official Brochure</span>
            </button>
          )}

          {/* Clean Corporate Module Switcher */}
          <div className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            {setActiveModule ? (
              <>
                <button
                  onClick={() => handleSwitchModule("public")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    activeModule === "public"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Website</span>
                </button>
                <button
                  onClick={() => handleSwitchModule("crm")}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    activeModule === "crm"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                  <span>CRM Portal</span>
                  <span
                    className={`ml-1 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      activeModule === "crm"
                        ? "bg-gold-500 text-slate-950"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {newLeadsCount}
                  </span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    activeModule === "public"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Website</span>
                </Link>
                <Link
                  href="/crm"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-semibold transition-all whitespace-nowrap ${
                    activeModule === "crm"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                  <span>CRM Portal</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-950"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-5 space-y-4 shadow-lg">
          <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
            <button
              onClick={() => handleSwitchModule("public")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-semibold ${
                activeModule === "public"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700"
              }`}
            >
              <Building2 className="w-4 h-4" />
              Corporate Website
            </button>
            <button
              onClick={() => handleSwitchModule("crm")}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-md text-xs font-semibold ${
                activeModule === "crm"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              CRM Portal ({leads.length})
            </button>
          </div>

          {activeModule === "public" && (
            <div className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
              <a
                href="#hero"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-50"
              >
                Home &amp; Overview
              </a>
              <a
                href="#madina-spotlight"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-50 font-semibold text-slate-900"
              >
                Value Apartments – Madina Al Munawwarah
              </a>
              <a
                href="#madina-map"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-50"
              >
                Wadi Mubarak Location Map
              </a>
              <a
                href="#pakistan-portfolio"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-50"
              >
                Pakistan Portfolio (6 Projects)
              </a>
              <a
                href="#lead-inquiry"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg hover:bg-slate-50"
              >
                Contact &amp; Investor Inquiry
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsBrochureModalOpen(true);
                }}
                className="w-full mt-2 py-3 px-4 rounded-lg bg-slate-900 text-white font-semibold flex items-center justify-center gap-2"
              >
                <FileDown className="w-4 h-4 text-gold-400" />
                Download Official Brochure
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

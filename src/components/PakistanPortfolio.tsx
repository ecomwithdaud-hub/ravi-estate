"use client";

import React, { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Building2,
} from "lucide-react";
import { PAKISTAN_PORTFOLIO, PortfolioProject } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";
import ScrollReveal from "./ScrollReveal";

export default function PakistanPortfolio() {
  const { setPreselectedProjectForInquiry } = useLeads();
  const [selectedFilter, setSelectedFilter] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] =
    useState<PortfolioProject | null>(null);

  const filterCategories = [
    "All",
    "Completed & Delivered",
    "Ready for Possession",
    "Ongoing Development",
  ];

  const filteredProjects =
    selectedFilter === "All"
      ? PAKISTAN_PORTFOLIO
      : PAKISTAN_PORTFOLIO.filter((p) => p.status === selectedFilter);

  const handleInquireProject = (projectTitle: string, location: string) => {
    setPreselectedProjectForInquiry(`${projectTitle} (${location})`);
    setActiveModalProject(null);
    const el = document.getElementById("lead-inquiry");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pakistan-portfolio"
      className="py-20 lg:py-24 bg-slate-50 border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-12">
        {/* Corporate Section Header */}
        <ScrollReveal direction="up">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-3 max-w-3xl">
              <div className="text-xs font-bold uppercase tracking-widest text-gold-600">
                Proven Domestic Track Record • Value Group Partnership
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-slate-900 leading-tight">
                Completed &amp; Ongoing{" "}
                <span className="text-gold-600">Pakistani Portfolio</span>
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Explore <strong className="text-slate-900">Ravi Estate</strong> and{" "}
                <strong className="text-slate-900">Value Group&apos;s</strong>{" "}
                established portfolio of residential apartments, smart homes, commercial towers, and organic farmhouses across Lahore.
              </p>
            </div>

            {/* Clean Corporate Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {filterCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all whitespace-nowrap ${
                    selectedFilter === cat
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* 6 Pakistani Portfolio Cards with Staggered ScrollReveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              direction="up"
              delayMs={(index % 3) * 100}
            >
              <div className="h-full rounded-2xl bg-white border border-slate-200 hover:border-gold-500/60 overflow-hidden shadow-sm hover:shadow-lg flex flex-col justify-between transition-all duration-300">
                <div>
                  {/* Clean Corporate Architectural Card Header */}
                  <div className="p-6 bg-slate-900 text-white border-b border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gold-400">
                        {project.type}
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded text-[11px] font-semibold border whitespace-nowrap ${
                          project.status === "Completed & Delivered"
                            ? "bg-emerald-950/80 text-emerald-300 border-emerald-700/50"
                            : project.status === "Ready for Possession"
                            ? "bg-sky-950/80 text-sky-300 border-sky-700/50"
                            : "bg-amber-950/80 text-amber-300 border-amber-700/50"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-serif font-bold text-white leading-snug">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1.5">
                        <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                        <span>{project.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-5">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Specs Box */}
                    <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                          Property Offering
                        </span>
                        <span className="font-bold text-slate-900 mt-0.5 block">
                          {project.unitsInfo}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 block">
                          Indicative Price
                        </span>
                        <span className="font-bold text-gold-600 mt-0.5 block">
                          {project.startingPrice}
                        </span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2 text-xs text-slate-700">
                      {project.highlights.slice(0, 3).map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="px-6 pb-6 pt-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      handleInquireProject(project.title, project.location)
                    }
                    className="flex-1 py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Inquire Now</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gold-400" />
                  </button>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all"
                  >
                    Overview
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
            <div className="max-w-xl w-full rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
                    {activeModalProject.partnership}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-slate-900 mt-1">
                    {activeModalProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{activeModalProject.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold"
                >
                  Close ✕
                </button>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Project Status:</span>
                  <span className="text-slate-900 font-bold">
                    {activeModalProject.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Architectural Profile:</span>
                  <span className="text-slate-900 font-medium">
                    {activeModalProject.architecturalStyle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Investment Highlight:</span>
                  <span className="text-gold-600 font-semibold">
                    {activeModalProject.roiHighlight}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-gold-600" />
                  <span>Key Project Features</span>
                </div>
                {activeModalProject.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() =>
                    handleInquireProject(
                      activeModalProject.title,
                      activeModalProject.location
                    )
                  }
                  className="flex-1 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Request Pricing &amp; Availability
                </button>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-3 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

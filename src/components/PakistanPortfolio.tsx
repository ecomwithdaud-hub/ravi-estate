"use client";

import React, { useState } from "react";
import {
  Building2,
  MapPin,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Layers,
  Award,
} from "lucide-react";
import { PAKISTAN_PORTFOLIO, PortfolioProject } from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

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
      className="py-20 lg:py-28 bg-navy-950 border-b border-gold-400/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>Proven Domestic Track Record • Value Group Partnership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white">
              Successfully Completed &amp; Ongoing{" "}
              <span className="text-gold-400">Pakistani Portfolio</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Before expanding into Madina Al Munawwarah,{" "}
              <strong className="text-white">Ravi Estate</strong> and{" "}
              <strong className="text-white">Value Group</strong> established an unmatched legacy across Lahore&apos;s most coveted residential, commercial, and farmhouse corridors.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  selectedFilter === cat
                    ? "bg-gold-400 text-navy-950 border-gold-400 shadow-md"
                    : "bg-navy-900 text-slate-300 border-white/10 hover:border-gold-400/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Portfolio Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-navy-900/90 border border-white/10 hover:border-gold-400/50 overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Top Architectural Visual Header */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${project.imageGradient} p-5 flex flex-col justify-between border-b border-white/10 overflow-hidden`}
                >
                  {/* Decorative Architectural SVG Grid Overlay */}
                  <svg
                    className="absolute right-0 bottom-0 w-44 h-44 text-white/5 group-hover:scale-110 transition-transform duration-500"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    <rect x="15" y="20" width="25" height="80" />
                    <rect x="45" y="5" width="30" height="95" />
                    <rect x="80" y="35" width="15" height="65" />
                  </svg>

                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-navy-950/85 border border-gold-400/40 text-gold-300 text-[11px] font-bold uppercase tracking-wider">
                      {project.badgeText}
                    </span>
                    <span
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${
                        project.status === "Completed & Delivered"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : project.status === "Ready for Possession"
                          ? "bg-sky-500/20 text-sky-300 border-sky-500/40"
                          : "bg-amber-500/20 text-amber-300 border-amber-500/40"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <div className="text-[11px] font-semibold text-gold-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>
                        0{index + 1} • {project.type}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-white mt-0.5 group-hover:text-gold-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metrics Strip */}
                  <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-navy-950/90 border border-white/10 text-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                        Configuration
                      </span>
                      <span className="font-bold text-white">
                        {project.unitsInfo}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-400 block">
                        Indicative Value
                      </span>
                      <span className="font-bold text-gold-400">
                        {project.startingPrice}
                      </span>
                    </div>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {project.highlights.slice(0, 3).map((hl, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 pb-6 pt-2 flex items-center gap-2.5">
                <button
                  onClick={() =>
                    handleInquireProject(project.title, project.location)
                  }
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gold-400/15 hover:bg-gold-400 text-gold-300 hover:text-navy-950 border border-gold-400/35 font-bold text-xs flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Inquire Now</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="py-2.5 px-3.5 rounded-xl bg-navy-950 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-semibold transition-all"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal if clicked */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="max-w-xl w-full rounded-2xl bg-navy-900 border border-gold-400/40 p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
                    {activeModalProject.partnership}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {activeModalProject.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-400" />
                    <span>{activeModalProject.location}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-3 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Close ✕
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalProject.description}
              </p>

              <div className="p-4 rounded-xl bg-navy-950 border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Development Status:</span>
                  <span className="text-emerald-400 font-bold">
                    {activeModalProject.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Architectural Style:</span>
                  <span className="text-white font-medium">
                    {activeModalProject.architecturalStyle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">ROI &amp; Yield Track Record:</span>
                  <span className="text-gold-300 font-semibold">
                    {activeModalProject.roiHighlight}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                  Key Project Highlights
                </div>
                {activeModalProject.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
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
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-bold text-xs"
                >
                  Request Availability &amp; Pricing
                </button>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-3 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

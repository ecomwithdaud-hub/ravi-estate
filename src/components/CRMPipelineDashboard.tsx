"use client";

import React, { useState } from "react";
import {
  Users,
  TrendingUp,
  Globe2,
  Briefcase,
  Search,
  Plus,
  Phone,
  MessageSquare,
  UserCheck,
  ArrowRight,
  ArrowLeft,
  Shield,
  Sparkles,
  Building2,
  RotateCcw,
  CheckCircle2,
  StickyNote,
  Send,
  X,
} from "lucide-react";
import {
  CRM_AGENTS,
  Lead,
  LeadOrigin,
  PAKISTAN_PORTFOLIO,
  PIPELINE_COLUMNS,
  PipelineStage,
  PropertyCategory,
} from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

interface CRMPipelineDashboardProps {
  onSwitchToPublic?: () => void;
}

export default function CRMPipelineDashboard({
  onSwitchToPublic,
}: CRMPipelineDashboardProps) {
  const {
    leads,
    addLead,
    updateLeadStage,
    updateLeadAgent,
    addLeadNote,
    resetDemoLeads,
  } = useLeads();

  // Role-based access state
  const [activeRole, setActiveRole] = useState<string>(
    "Sales Manager (All Desks)"
  );
  const [originFilter, setOriginFilter] = useState<"All" | LeadOrigin>("All");
  const [categoryFilter, setCategoryFilter] = useState<
    "All" | PropertyCategory
  >("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<PipelineStage | null>(
    null
  );

  // Selected lead for detailed note adding / drawer inspection
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

  // Modal for adding a new lead directly inside the CRM
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newOrigin, setNewOrigin] = useState<LeadOrigin>(
    "International Diaspora"
  );
  const [newCountryCity, setNewCountryCity] = useState("Jeddah, Saudi Arabia");
  const [newCategory, setNewCategory] = useState<PropertyCategory>(
    "Madina International Apartments"
  );
  const [newProject, setNewProject] = useState(
    "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)"
  );
  const [newUnit, setNewUnit] = useState("2-Bedroom Family Sanctuary");
  const [newBudget, setNewBudget] = useState("SAR 1,050,000 (~PKR 7.8 Cr)");
  const [newValPKR, setNewValPKR] = useState(78);
  const [newAgent, setNewAgent] = useState(CRM_AGENTS[0]);
  const [newInitialNote, setNewInitialNote] = useState("");

  // Filter leads according to role & search filters
  const filteredLeads = leads.filter((lead) => {
    if (
      activeRole !== "Sales Manager (All Desks)" &&
      lead.assignedAgent !== activeRole
    ) {
      return false;
    }
    if (originFilter !== "All" && lead.originType !== originFilter) {
      return false;
    }
    if (categoryFilter !== "All" && lead.propertyCategory !== categoryFilter) {
      return false;
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        lead.clientName.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.countryCity.toLowerCase().includes(q) ||
        lead.specificProject.toLowerCase().includes(q) ||
        lead.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Compute Analytics Header Metrics
  const totalInboundLeads = leads.length;
  const closedDealsCount = leads.filter((l) => l.stage === "closed").length;
  const conversionRate =
    totalInboundLeads > 0
      ? ((closedDealsCount / totalInboundLeads) * 100).toFixed(1)
      : "0.0";
  const activeInternationalMadinaLeads = leads.filter(
    (l) =>
      l.propertyCategory === "Madina International Apartments" ||
      l.originType === "International Diaspora"
  ).length;
  const totalPipelineValuePKR = leads.reduce(
    (sum, l) => sum + (Number(l.estimatedValuePKR) || 0),
    0
  );
  const totalPipelineValueSAR = leads.reduce(
    (sum, l) => sum + (Number(l.estimatedValueSAR) || 0),
    0
  );

  const stageOrder: PipelineStage[] = [
    "new",
    "contacted",
    "consultation",
    "closed",
  ];

  const moveStageRelative = (lead: Lead, direction: "prev" | "next") => {
    const currentIndex = stageOrder.indexOf(lead.stage);
    const targetIndex =
      direction === "next" ? currentIndex + 1 : currentIndex - 1;
    if (targetIndex >= 0 && targetIndex < stageOrder.length) {
      updateLeadStage(lead.id, stageOrder[targetIndex]);
    }
  };

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedLeadId(id);
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (dragOverColumn !== stage) {
      setDragOverColumn(stage);
    }
  };

  const handleDrop = (e: React.DragEvent, targetStage: PipelineStage) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || draggedLeadId;
    if (id) {
      updateLeadStage(id, targetStage);
    }
    setDraggedLeadId(null);
    setDragOverColumn(null);
  };

  const handleCreateCRMLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newPhone.trim()) return;

    await addLead({
      clientName: newClientName.trim(),
      phone: newPhone.trim(),
      email: "vip.client@raviestate.com",
      originType: newOrigin,
      countryCity: newCountryCity.trim() || "Riyadh, Saudi Arabia",
      propertyCategory: newCategory,
      specificProject: newProject,
      preferredUnitType: newUnit,
      budgetDisplay: newBudget,
      estimatedValuePKR: Number(newValPKR) || 65,
      estimatedValueSAR: Math.round((Number(newValPKR) || 65) * 13.5),
      assignedAgent: newAgent,
      stage: "new",
      priority: Number(newValPKR) >= 75 ? "VIP" : "High",
      notes: [
        newInitialNote.trim() ||
          "Direct advisor entry logged via Ravi Estate Internal CRM.",
      ],
    });

    setIsAddModalOpen(false);
    setNewClientName("");
    setNewPhone("");
    setNewInitialNote("");
  };

  const activeInspectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 pb-20">
      {/* Top Role-Based Security & Control Header */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-gold-400/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/35 text-gold-300 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5 text-gold-400" />
                <span>
                  Internal CRM Pipeline Dashboard • Role-Based Access Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Ravi Estate — Sales &amp; Global Lead Management
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Drag and drop cards across columns or use quick stage controls to manage Madina Al Munawwarah &amp; Pakistan domestic inquiries.
              </p>
            </div>

            {/* Role Selector + Quick Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-navy-950 px-3 py-2 rounded-xl border border-white/15">
                <UserCheck className="w-4 h-4 text-gold-400 shrink-0" />
                <span className="text-xs text-slate-400">Active Role:</span>
                <select
                  value={activeRole}
                  onChange={(e) => setActiveRole(e.target.value)}
                  className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
                >
                  <option
                    value="Sales Manager (All Desks)"
                    className="bg-navy-950 text-white"
                  >
                    Sales Manager (All Desks)
                  </option>
                  {CRM_AGENTS.map((agent) => (
                    <option
                      key={agent}
                      value={agent}
                      className="bg-navy-950 text-white"
                    >
                      Agent: {agent}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Lead</span>
              </button>

              <button
                onClick={resetDemoLeads}
                title="Reset Demo Pipeline Data"
                className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5 text-gold-400" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            </div>
          </div>

          {/* ANALYTICS HEADER: 4 Required KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric 1: Total Inbound Leads */}
            <div className="p-5 rounded-2xl bg-navy-950/90 border border-gold-400/30 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Inbound Leads
                </span>
                <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Users className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-serif font-bold text-white">
                {totalInboundLeads}
              </div>
              <div className="text-xs text-sky-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {leads.filter((l) => l.stage === "new").length} New •{" "}
                  {leads.filter((l) => l.stage === "consultation").length}{" "}
                  Consultations Booked
                </span>
              </div>
            </div>

            {/* Metric 2: Conversion Rate */}
            <div className="p-5 rounded-2xl bg-navy-950/90 border border-emerald-500/30 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Conversion Rate
                </span>
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-serif font-bold text-white">
                {conversionRate}%
              </div>
              <div className="text-xs text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>
                  {closedDealsCount} Deals Closed / Won (Above 18% Luxury Avg)
                </span>
              </div>
            </div>

            {/* Metric 3: Active International Leads (Madina Project) */}
            <div className="p-5 rounded-2xl bg-navy-950/90 border border-gold-400/35 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold-300">
                  Active Int&apos;l Leads (Madina)
                </span>
                <div className="w-9 h-9 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400">
                  <Globe2 className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-serif font-bold text-white">
                {activeInternationalMadinaLeads}
              </div>
              <div className="text-xs text-gold-300">
                Value Apartments – Wadi Mubarak, Madina Al Munawwarah
              </div>
            </div>

            {/* Metric 4: Total Pipeline Value */}
            <div className="p-5 rounded-2xl bg-navy-950/90 border border-purple-500/30 shadow-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Pipeline Value
                </span>
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Briefcase className="w-5 h-5" />
                </div>
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
                PKR {(totalPipelineValuePKR / 10).toFixed(2)} Cr
              </div>
              <div className="text-xs text-purple-300">
                ≈ SAR {(totalPipelineValueSAR / 1000).toFixed(2)} Million Combined Volume
              </div>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search client name, WhatsApp, project, city, or ID..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {/* Origin Filter */}
              <div className="flex items-center bg-navy-950 p-1 rounded-xl border border-white/10 text-xs">
                {(["All", "International Diaspora", "Pakistan"] as const).map(
                  (orig) => (
                    <button
                      key={orig}
                      onClick={() => setOriginFilter(orig)}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        originFilter === orig
                          ? "bg-gold-400 text-navy-950"
                          : "text-slate-300 hover:text-white"
                      }`}
                    >
                      {orig === "All" ? "All Origins" : orig}
                    </button>
                  )
                )}
              </div>

              {/* Project Category Filter */}
              <div className="flex items-center bg-navy-950 p-1 rounded-xl border border-white/10 text-xs">
                {(
                  [
                    "All",
                    "Madina International Apartments",
                    "Local Pakistani Properties",
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      categoryFilter === cat
                        ? "bg-emerald-400 text-navy-950"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {cat === "All"
                      ? "All Projects"
                      : cat === "Madina International Apartments"
                      ? "Madina Project"
                      : "Pakistan Portfolio"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* KANBAN PIPELINE BOARD */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {PIPELINE_COLUMNS.map((col) => {
            const colLeads = filteredLeads.filter((l) => l.stage === col.id);
            const colSumPKR = colLeads.reduce(
              (acc, l) => acc + (Number(l.estimatedValuePKR) || 0),
              0
            );

            return (
              <div
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={() => setDragOverColumn(null)}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`rounded-2xl bg-navy-900/80 border-2 transition-all flex flex-col min-h-[620px] ${
                  dragOverColumn === col.id
                    ? "border-gold-400 bg-navy-800/80 shadow-2xl shadow-gold-500/10"
                    : "border-white/10"
                }`}
              >
                {/* Column Header */}
                <div
                  className={`p-4 border-b border-white/10 bg-navy-950/70 rounded-t-2xl border-t-4 ${col.accentColor}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h2 className="text-sm font-serif font-bold text-white leading-snug">
                        {col.title}
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {col.subtitle}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${col.badgeBg}`}
                    >
                      {colLeads.length}
                    </span>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Stage Volume:</span>
                    <span className="font-bold text-gold-300">
                      PKR {(colSumPKR / 10).toFixed(2)} Cr
                    </span>
                  </div>
                </div>

                {/* Cards Container */}
                <div className="p-3.5 space-y-3.5 flex-1">
                  {colLeads.length === 0 ? (
                    <div className="h-44 rounded-xl border border-dashed border-white/15 flex flex-col items-center justify-center text-center p-4 text-xs text-slate-500">
                      <span>No leads in this stage</span>
                      <span className="text-[11px] mt-1">
                        Drag a lead card here or click stage arrows
                      </span>
                    </div>
                  ) : (
                    colLeads.map((lead) => {
                      const stageIdx = stageOrder.indexOf(lead.stage);
                      return (
                        <div
                          key={lead.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, lead.id)}
                          className="group rounded-xl bg-navy-950 border border-white/10 hover:border-gold-400/50 p-4 shadow-lg space-y-3 cursor-grab active:cursor-grabbing transition-all"
                        >
                          {/* Top Row: ID, Origin Badge & Priority */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                              {lead.id}
                            </span>

                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                                lead.originType === "International Diaspora"
                                  ? "bg-gold-400/15 text-gold-300 border-gold-400/35"
                                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/35"
                              }`}
                            >
                              {lead.originType === "International Diaspora"
                                ? "🌍 Int'l Diaspora"
                                : "🇵🇰 Pakistan"}
                            </span>

                            {lead.priority === "VIP" && (
                              <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-extrabold">
                                VIP
                              </span>
                            )}
                          </div>

                          {/* Client Name & Country/City */}
                          <div>
                            <h3 className="text-sm font-bold text-white group-hover:text-gold-300 transition-colors">
                              {lead.clientName}
                            </h3>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {lead.countryCity}
                            </div>
                          </div>

                          {/* Phone / WhatsApp Contact Pill */}
                          <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-navy-900 border border-white/5 text-xs">
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1.5 text-slate-200 hover:text-gold-400 font-medium truncate"
                            >
                              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                              <span className="truncate">{lead.phone}</span>
                            </a>
                            <a
                              href={`https://wa.me/${lead.phone.replace(
                                /[^0-9]/g,
                                ""
                              )}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold flex items-center gap-1 shrink-0"
                              title="Open WhatsApp Chat"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </a>
                          </div>

                          {/* Preferred Property Type & Project */}
                          <div className="p-2.5 rounded-lg bg-navy-900/90 border border-gold-400/20 space-y-1">
                            <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-400">
                              <Building2 className="w-3 h-3 shrink-0" />
                              <span className="truncate">
                                {lead.propertyCategory}
                              </span>
                            </div>
                            <div className="text-xs font-semibold text-white leading-snug">
                              {lead.specificProject}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {lead.preferredUnitType}
                            </div>
                            <div className="text-xs font-bold text-emerald-300 pt-0.5">
                              {lead.budgetDisplay}
                            </div>
                          </div>

                          {/* Assigned Agent Selector */}
                          <div className="text-[11px] space-y-1">
                            <span className="text-slate-400 block">
                              Assigned Advisor:
                            </span>
                            <select
                              value={lead.assignedAgent}
                              onChange={(e) =>
                                updateLeadAgent(lead.id, e.target.value)
                              }
                              className="w-full px-2.5 py-1.5 rounded-lg bg-navy-900 border border-white/10 text-xs text-slate-200 focus:outline-none focus:border-gold-400"
                            >
                              {CRM_AGENTS.map((ag) => (
                                <option
                                  key={ag}
                                  value={ag}
                                  className="bg-navy-950"
                                >
                                  {ag}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Notes Preview */}
                          <div className="p-2.5 rounded-lg bg-navy-900/60 border border-white/5 space-y-1.5">
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                                <StickyNote className="w-3 h-3 text-gold-400" />
                                Advisor Notes ({lead.notes.length})
                              </span>
                              <button
                                onClick={() => setSelectedLeadId(lead.id)}
                                className="text-gold-300 hover:underline font-bold"
                              >
                                + Add / View
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                              {lead.notes[0]}
                            </p>
                          </div>

                          {/* Interactive Stage Transition Controls */}
                          <div className="pt-1 flex items-center justify-between gap-2 border-t border-white/10">
                            <button
                              disabled={stageIdx === 0}
                              onClick={() => moveStageRelative(lead, "prev")}
                              className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-[11px] text-slate-300 flex items-center gap-1"
                              title="Move to Previous Stage"
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>Prev</span>
                            </button>

                            <span className="text-[10px] text-slate-500">
                              {lead.lastContacted}
                            </span>

                            <button
                              disabled={stageIdx === stageOrder.length - 1}
                              onClick={() => moveStageRelative(lead, "next")}
                              className="px-2.5 py-1.5 rounded-lg bg-gold-400/15 hover:bg-gold-400 text-gold-300 hover:text-navy-950 disabled:opacity-30 disabled:pointer-events-none text-[11px] font-bold flex items-center gap-1 transition-all"
                              title="Advance to Next Stage"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Details & Notes Drawer Modal */}
      {activeInspectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-lg w-full rounded-2xl bg-navy-900 border border-gold-400/40 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <span className="text-xs font-mono text-gold-400 font-bold">
                  {activeInspectedLead.id} • {activeInspectedLead.originType}
                </span>
                <h3 className="text-xl font-serif font-bold text-white mt-0.5">
                  {activeInspectedLead.clientName}
                </h3>
                <p className="text-xs text-slate-400">
                  {activeInspectedLead.phone} • {activeInspectedLead.countryCity}
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadId(null)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-navy-950 border border-white/10 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Project Interest:</span>
                <span className="text-gold-300 font-bold">
                  {activeInspectedLead.specificProject}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unit Configuration:</span>
                <span className="text-white font-medium">
                  {activeInspectedLead.preferredUnitType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Deal Value:</span>
                <span className="text-emerald-300 font-bold">
                  {activeInspectedLead.budgetDisplay}
                </span>
              </div>
            </div>

            {/* Add Follow-up Note Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newNoteText.trim()) return;
                addLeadNote(activeInspectedLead.id, newNoteText);
                setNewNoteText("");
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Log call summary, WhatsApp update, or payment milestone..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-gold-400 text-navy-950 font-bold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
            </form>

            {/* Activity Notes History */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Chronological Call &amp; Advisory Log
              </div>
              {activeInspectedLead.notes.map((n, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-navy-950 border border-white/10 text-xs text-slate-200 leading-relaxed"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modal to Add New Lead Directly in CRM */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-lg w-full rounded-2xl bg-navy-900 border border-gold-400/40 p-6 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold text-white">
                Register New Client Inquiry in Pipeline
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCRMLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g., Alhaji Omar Farooq"
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+966 50 ... or +92 300 ..."
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Origin Classification
                  </label>
                  <select
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value as LeadOrigin)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  >
                    <option value="International Diaspora">
                      International Diaspora
                    </option>
                    <option value="Pakistan">Pakistan Domestic</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    City &amp; Country
                  </label>
                  <input
                    type="text"
                    value={newCountryCity}
                    onChange={(e) => setNewCountryCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Portfolio Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => {
                    const cat = e.target.value as PropertyCategory;
                    setNewCategory(cat);
                    if (cat === "Madina International Apartments") {
                      setNewProject(
                        "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)"
                      );
                    } else {
                      setNewProject(
                        `${PAKISTAN_PORTFOLIO[0].title} (${PAKISTAN_PORTFOLIO[0].location})`
                      );
                    }
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                >
                  <option value="Madina International Apartments">
                    Madina International Apartments (Wadi Mubarak)
                  </option>
                  <option value="Local Pakistani Properties">
                    Local Pakistani Properties (Lahore)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Unit Preference
                  </label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-semibold block mb-1">
                    Est. Deal Value (PKR Millions)
                  </label>
                  <input
                    type="number"
                    value={newValPKR}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setNewValPKR(v);
                      setNewBudget(`PKR ${(v / 10).toFixed(2)} Crore`);
                    }}
                    className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Assigned Advisor
                </label>
                <select
                  value={newAgent}
                  onChange={(e) => setNewAgent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                >
                  {CRM_AGENTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-300 font-semibold block mb-1">
                  Initial Advisor Note
                </label>
                <input
                  type="text"
                  value={newInitialNote}
                  onChange={(e) => setNewInitialNote(e.target.value)}
                  placeholder="e.g., WhatsApp inquiry for 2-Bed Madina apartment..."
                  className="w-full px-3 py-2 rounded-lg bg-navy-950 border border-white/15 text-white"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-gold-400 text-navy-950 font-extrabold"
                >
                  Create Lead in Pipeline
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

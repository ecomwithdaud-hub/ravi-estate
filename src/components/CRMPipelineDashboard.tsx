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
import ScrollReveal from "./ScrollReveal";

interface CRMPipelineDashboardProps {
  onSwitchToPublic?: () => void;
}

export default function CRMPipelineDashboard({}: CRMPipelineDashboardProps) {
  const {
    leads,
    addLead,
    updateLeadStage,
    updateLeadAgent,
    addLeadNote,
    resetDemoLeads,
  } = useLeads();

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

  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [newNoteText, setNewNoteText] = useState("");

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
      email: "client@raviestate.com",
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
          "Direct advisor entry logged via Ravi Estate CRM.",
      ],
    });

    setIsAddModalOpen(false);
    setNewClientName("");
    setNewPhone("");
    setNewInitialNote("");
  };

  const activeInspectedLead = leads.find((l) => l.id === selectedLeadId) || null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      {/* Corporate Header & Analytics Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 space-y-8">
          <ScrollReveal direction="up">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Internal Sales &amp; Lead Management Portal
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Ravi Estate — Advisory Pipeline Dashboard
                </h1>
                <p className="text-xs sm:text-sm text-slate-600">
                  Manage domestic and international client inquiries across New Leads, Qualified, Consultations, and Closed Deals.
                </p>
              </div>

              {/* Role Switcher & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-lg border border-slate-200">
                  <UserCheck className="w-4 h-4 text-gold-600 shrink-0" />
                  <span className="text-xs text-slate-500">View As:</span>
                  <select
                    value={activeRole}
                    onChange={(e) => setActiveRole(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    <option value="Sales Manager (All Desks)">
                      Sales Manager (All Desks)
                    </option>
                    {CRM_AGENTS.map((agent) => (
                      <option key={agent} value={agent}>
                        {agent}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-all"
                >
                  <Plus className="w-4 h-4 text-gold-400" />
                  <span>Add New Lead</span>
                </button>

                <button
                  onClick={resetDemoLeads}
                  title="Reset Demo Data"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Analytics Header Cards */}
          <ScrollReveal direction="up" delayMs={100}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Inbound Leads
                  </span>
                  <Users className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-3xl font-serif font-bold text-slate-900">
                  {totalInboundLeads}
                </div>
                <div className="text-xs text-slate-600">
                  {leads.filter((l) => l.stage === "new").length} New •{" "}
                  {leads.filter((l) => l.stage === "consultation").length}{" "}
                  Consultations Scheduled
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Conversion Rate
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-serif font-bold text-slate-900">
                  {conversionRate}%
                </div>
                <div className="text-xs text-emerald-700 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{closedDealsCount} Deals Closed / Won</span>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
                    Active Int&apos;l Leads (Madina)
                  </span>
                  <Globe2 className="w-4 h-4 text-gold-600" />
                </div>
                <div className="text-3xl font-serif font-bold text-slate-900">
                  {activeInternationalMadinaLeads}
                </div>
                <div className="text-xs text-slate-600">
                  Value Apartments – Wadi Mubarak, KSA
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Total Pipeline Value
                  </span>
                  <Briefcase className="w-4 h-4 text-slate-700" />
                </div>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  PKR {(totalPipelineValuePKR / 10).toFixed(2)} Cr
                </div>
                <div className="text-xs text-slate-600">
                  ≈ SAR {(totalPipelineValueSAR / 1000).toFixed(2)} Million Volume
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Search & Filter Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by client name, phone, city, or project..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
                {(["All", "International Diaspora", "Pakistan"] as const).map(
                  (orig) => (
                    <button
                      key={orig}
                      onClick={() => setOriginFilter(orig)}
                      className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                        originFilter === orig
                          ? "bg-white text-slate-900 shadow-sm"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {orig === "All" ? "All Origins" : orig}
                    </button>
                  )
                )}
              </div>

              <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
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
                    className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                      categoryFilter === cat
                        ? "bg-slate-900 text-white shadow-sm"
                        : "text-slate-600 hover:text-slate-900"
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

      {/* 4-Column Kanban Pipeline Board */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-start">
          {PIPELINE_COLUMNS.map((col, colIndex) => {
            const colLeads = filteredLeads.filter((l) => l.stage === col.id);
            const colSumPKR = colLeads.reduce(
              (acc, l) => acc + (Number(l.estimatedValuePKR) || 0),
              0
            );

            return (
              <ScrollReveal
                key={col.id}
                direction="up"
                delayMs={colIndex * 80}
              >
                <div
                  onDragOver={(e) => handleDragOver(e, col.id)}
                  onDragLeave={() => setDragOverColumn(null)}
                  onDrop={(e) => handleDrop(e, col.id)}
                  className={`rounded-xl bg-slate-100/80 border transition-all flex flex-col min-h-[600px] ${
                    dragOverColumn === col.id
                      ? "border-slate-900 bg-slate-100 shadow-md"
                      : "border-slate-200"
                  }`}
                >
                  {/* Column Header */}
                  <div className="p-4 bg-white border-b border-slate-200 rounded-t-xl">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-serif font-bold text-slate-900 leading-snug">
                          {col.title}
                        </h2>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {col.subtitle}
                        </p>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {colLeads.length}
                      </span>
                    </div>
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Column Value:</span>
                      <span className="font-bold text-slate-900">
                        PKR {(colSumPKR / 10).toFixed(2)} Cr
                      </span>
                    </div>
                  </div>

                  {/* Cards List */}
                  <div className="p-3.5 space-y-3.5 flex-1">
                    {colLeads.length === 0 ? (
                      <div className="h-40 rounded-lg border border-dashed border-slate-300 flex flex-col items-center justify-center text-center p-4 text-xs text-slate-500">
                        <span>No inquiries in this stage</span>
                      </div>
                    ) : (
                      colLeads.map((lead) => {
                        const stageIdx = stageOrder.indexOf(lead.stage);
                        return (
                          <div
                            key={lead.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, lead.id)}
                            className="rounded-xl bg-white border border-slate-200 hover:border-slate-400 p-4 shadow-sm space-y-3 cursor-grab active:cursor-grabbing transition-all"
                          >
                            {/* Top Row: ID & Origin */}
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                {lead.id}
                              </span>

                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                                  lead.originType === "International Diaspora"
                                    ? "bg-amber-50 text-amber-900 border-amber-200"
                                    : "bg-slate-100 text-slate-800 border-slate-200"
                                }`}
                              >
                                {lead.originType}
                              </span>
                            </div>

                            {/* Client Name & Location */}
                            <div>
                              <h3 className="text-sm font-serif font-bold text-slate-900">
                                {lead.clientName}
                              </h3>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {lead.countryCity}
                              </div>
                            </div>

                            {/* Phone / WhatsApp */}
                            <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                              <a
                                href={`tel:${lead.phone}`}
                                className="flex items-center gap-1.5 text-slate-800 hover:text-gold-600 font-medium truncate"
                              >
                                <Phone className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                                <span className="truncate">{lead.phone}</span>
                              </a>
                              <a
                                href={`https://wa.me/${lead.phone.replace(
                                  /[^0-9]/g,
                                  ""
                                )}`}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-semibold flex items-center gap-1 shrink-0"
                              >
                                <MessageSquare className="w-3 h-3" />
                                <span>WhatsApp</span>
                              </a>
                            </div>

                            {/* Property Interest */}
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-gold-600">
                                <Building2 className="w-3 h-3 shrink-0" />
                                <span className="truncate">
                                  {lead.propertyCategory}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-slate-900 leading-snug">
                                {lead.specificProject}
                              </div>
                              <div className="text-[11px] text-slate-500">
                                {lead.preferredUnitType}
                              </div>
                              <div className="text-xs font-bold text-slate-900 pt-0.5">
                                {lead.budgetDisplay}
                              </div>
                            </div>

                            {/* Assigned Advisor */}
                            <div className="text-[11px] space-y-1">
                              <span className="text-slate-500 block">
                                Assigned Advisor:
                              </span>
                              <select
                                value={lead.assignedAgent}
                                onChange={(e) =>
                                  updateLeadAgent(lead.id, e.target.value)
                                }
                                className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-slate-900"
                              >
                                {CRM_AGENTS.map((ag) => (
                                  <option key={ag} value={ag}>
                                    {ag}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Notes */}
                            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60 space-y-1">
                              <div className="flex items-center justify-between text-[10px] text-slate-500">
                                <span className="font-semibold uppercase tracking-wider flex items-center gap-1">
                                  <StickyNote className="w-3 h-3 text-gold-600" />
                                  Notes ({lead.notes.length})
                                </span>
                                <button
                                  onClick={() => setSelectedLeadId(lead.id)}
                                  className="text-slate-900 hover:underline font-bold"
                                >
                                  + Add / View
                                </button>
                              </div>
                              <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                                {lead.notes[0]}
                              </p>
                            </div>

                            {/* Stage Controls */}
                            <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100">
                              <button
                                disabled={stageIdx === 0}
                                onClick={() => moveStageRelative(lead, "prev")}
                                className="px-2.5 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:pointer-events-none text-[11px] text-slate-700 flex items-center gap-1"
                              >
                                <ArrowLeft className="w-3 h-3" />
                                <span>Prev</span>
                              </button>

                              <span className="text-[10px] text-slate-400">
                                {lead.lastContacted}
                              </span>

                              <button
                                disabled={stageIdx === stageOrder.length - 1}
                                onClick={() => moveStageRelative(lead, "next")}
                                className="px-2.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-30 disabled:pointer-events-none text-[11px] font-semibold flex items-center gap-1 transition-all"
                              >
                                <span>Next Stage</span>
                                <ArrowRight className="w-3 h-3 text-gold-400" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Lead Notes Inspector Modal */}
      {activeInspectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4">
          <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs text-gold-600 font-bold">
                  {activeInspectedLead.id} • {activeInspectedLead.originType}
                </span>
                <h3 className="text-xl font-serif font-bold text-slate-900 mt-0.5">
                  {activeInspectedLead.clientName}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeInspectedLead.phone} • {activeInspectedLead.countryCity}
                </p>
              </div>
              <button
                onClick={() => setSelectedLeadId(null)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Project Interest:</span>
                <span className="text-slate-900 font-bold">
                  {activeInspectedLead.specificProject}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Unit Configuration:</span>
                <span className="text-slate-800 font-medium">
                  {activeInspectedLead.preferredUnitType}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Deal Value:</span>
                <span className="text-gold-600 font-bold">
                  {activeInspectedLead.budgetDisplay}
                </span>
              </div>
            </div>

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
                placeholder="Add call summary or follow-up note..."
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-xs flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-gold-400" />
                <span>Add</span>
              </button>
            </form>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Advisory Notes History
              </div>
              {activeInspectedLead.notes.map((n, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="max-w-lg w-full rounded-2xl bg-white border border-slate-200 p-6 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-serif font-bold text-slate-900">
                Add New Lead to Pipeline
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCRMLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Client Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Enter client name"
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="text"
                    required
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    placeholder="+966 50 ... or +92 300 ..."
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    Origin Classification
                  </label>
                  <select
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value as LeadOrigin)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  >
                    <option value="International Diaspora">
                      International Diaspora
                    </option>
                    <option value="Pakistan">Pakistan Domestic</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
                    City &amp; Country
                  </label>
                  <input
                    type="text"
                    value={newCountryCity}
                    onChange={(e) => setNewCountryCity(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
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
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
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
                  <label className="text-slate-700 font-semibold block mb-1">
                    Unit Preference
                  </label>
                  <input
                    type="text"
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">
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
                    className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Assigned Advisor
                </label>
                <select
                  value={newAgent}
                  onChange={(e) => setNewAgent(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                >
                  {CRM_AGENTS.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">
                  Initial Note
                </label>
                <input
                  type="text"
                  value={newInitialNote}
                  onChange={(e) => setNewInitialNote(e.target.value)}
                  placeholder="Enter note..."
                  className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-900"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-slate-900 text-white font-semibold"
                >
                  Save Lead
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700"
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

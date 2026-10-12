"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { INITIAL_CRM_LEADS, Lead, PipelineStage } from "@/lib/data";

interface LeadContextType {
  leads: Lead[];
  addLead: (newLeadData: Omit<Lead, "id" | "createdAt" | "lastContacted">) => Promise<Lead>;
  updateLeadStage: (id: string, stage: PipelineStage) => void;
  updateLeadAgent: (id: string, agent: string) => void;
  addLeadNote: (id: string, note: string) => void;
  deleteLead: (id: string) => void;
  resetDemoLeads: () => void;
  isBrochureModalOpen: boolean;
  setIsBrochureModalOpen: (open: boolean) => void;
  preselectedProjectForInquiry: string | null;
  setPreselectedProjectForInquiry: (project: string | null) => void;
}

const LeadContext = createContext<LeadContextType | undefined>(undefined);

const STORAGE_KEY = "ravi_estate_crm_leads_v1";

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_CRM_LEADS);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [preselectedProjectForInquiry, setPreselectedProjectForInquiry] =
    useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setLeads(parsed);
          return;
        }
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const persist = (updated: Lead[]) => {
    setLeads(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const addLead = async (
    newLeadData: Omit<Lead, "id" | "createdAt" | "lastContacted">
  ): Promise<Lead> => {
    const generatedId = `LD-${Math.floor(1049 + Math.random() * 8900)}`;
    const newLead: Lead = {
      ...newLeadData,
      id: generatedId,
      createdAt: new Date().toISOString().split("T")[0],
      lastContacted: "Just now",
    };

    const updated = [newLead, ...leads];
    persist(updated);

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead),
      });
    } catch {
      // fallback already handled in state
    }

    return newLead;
  };

  const updateLeadStage = (id: string, stage: PipelineStage) => {
    const updated = leads.map((lead) =>
      lead.id === id ? { ...lead, stage, lastContacted: "Just now" } : lead
    );
    persist(updated);

    fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, stage }),
    }).catch(() => {});
  };

  const updateLeadAgent = (id: string, assignedAgent: string) => {
    const updated = leads.map((lead) =>
      lead.id === id
        ? { ...lead, assignedAgent, lastContacted: "Just now" }
        : lead
    );
    persist(updated);

    fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, assignedAgent }),
    }).catch(() => {});
  };

  const addLeadNote = (id: string, note: string) => {
    if (!note.trim()) return;
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const formattedNote = `[${timestamp}] ${note.trim()}`;
    const updated = leads.map((lead) =>
      lead.id === id
        ? {
            ...lead,
            notes: [formattedNote, ...lead.notes],
            lastContacted: "Just now",
          }
        : lead
    );
    persist(updated);

    fetch("/api/leads", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, note: formattedNote }),
    }).catch(() => {});
  };

  const deleteLead = (id: string) => {
    const updated = leads.filter((lead) => lead.id !== id);
    persist(updated);
  };

  const resetDemoLeads = () => {
    persist(INITIAL_CRM_LEADS);
  };

  return (
    <LeadContext.Provider
      value={{
        leads,
        addLead,
        updateLeadStage,
        updateLeadAgent,
        addLeadNote,
        deleteLead,
        resetDemoLeads,
        isBrochureModalOpen,
        setIsBrochureModalOpen,
        preselectedProjectForInquiry,
        setPreselectedProjectForInquiry,
      }}
    >
      {children}
    </LeadContext.Provider>
  );
}

export function useLeads() {
  const ctx = useContext(LeadContext);
  if (!ctx) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return ctx;
}

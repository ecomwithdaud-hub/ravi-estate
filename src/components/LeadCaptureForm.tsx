"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  Globe,
  Sparkles,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import {
  COMPANY_INFO,
  CRM_AGENTS,
  Lead,
  LeadOrigin,
  PAKISTAN_PORTFOLIO,
  PropertyCategory,
} from "@/lib/data";
import { useLeads } from "@/context/LeadContext";

interface LeadCaptureFormProps {
  onSwitchToCRM?: () => void;
}

export default function LeadCaptureForm({
  onSwitchToCRM,
}: LeadCaptureFormProps) {
  const {
    addLead,
    preselectedProjectForInquiry,
    setPreselectedProjectForInquiry,
  } = useLeads();

  const [clientName, setClientName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [originType, setOriginType] = useState<LeadOrigin>(
    "International Diaspora"
  );
  const [countryCity, setCountryCity] = useState("Riyadh, Saudi Arabia");
  const [propertyCategory, setPropertyCategory] = useState<PropertyCategory>(
    "Madina International Apartments"
  );
  const [specificProject, setSpecificProject] = useState(
    "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)"
  );
  const [preferredUnitType, setPreferredUnitType] = useState(
    "1-Bedroom Luxury Residence"
  );
  const [budgetTier, setBudgetTier] = useState(
    "SAR 680,000 – 790,000 (~PKR 5.2 Cr)"
  );
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (preselectedProjectForInquiry) {
      if (preselectedProjectForInquiry.includes("Madina")) {
        setPropertyCategory("Madina International Apartments");
      } else {
        setPropertyCategory("Local Pakistani Properties");
        setOriginType("Pakistan");
        setCountryCity("Lahore, Pakistan");
      }
      setSpecificProject(preselectedProjectForInquiry);
    }
  }, [preselectedProjectForInquiry]);

  const handleCategoryChange = (cat: PropertyCategory) => {
    setPropertyCategory(cat);
    if (cat === "Madina International Apartments") {
      setSpecificProject(
        "Value Apartments - Madina Al Munawwarah (Wadi Mubarak)"
      );
      setPreferredUnitType("1-Bedroom Luxury Residence");
      setBudgetTier("SAR 680,000 – 790,000 (~PKR 5.2 Cr)");
    } else {
      setSpecificProject(
        `${PAKISTAN_PORTFOLIO[0].title} (${PAKISTAN_PORTFOLIO[0].location})`
      );
      setPreferredUnitType("2-Bed Executive Apartment");
      setBudgetTier("PKR 2.85 Crore – 4.50 Crore");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !phone.trim()) return;

    setSubmitting(true);

    // Estimate numeric pipeline value based on budget selection
    let estimatedValuePKR = 52;
    let estimatedValueSAR = 720;
    if (budgetTier.includes("1,850,000") || budgetTier.includes("10+ Crore")) {
      estimatedValuePKR = 135;
      estimatedValueSAR = 1850;
    } else if (budgetTier.includes("980,000") || budgetTier.includes("6.00")) {
      estimatedValuePKR = 78;
      estimatedValueSAR = 1050;
    } else if (budgetTier.includes("420,000") || budgetTier.includes("2.85")) {
      estimatedValuePKR = 35;
      estimatedValueSAR = 460;
    }

    const assignedAgent =
      propertyCategory === "Madina International Apartments"
        ? CRM_AGENTS[0]
        : CRM_AGENTS[1];

    const created = await addLead({
      clientName: clientName.trim(),
      phone: phone.trim(),
      email: email.trim() || "investor@raviestate-client.com",
      originType,
      countryCity: countryCity.trim() || "Lahore / International",
      propertyCategory,
      specificProject,
      preferredUnitType,
      budgetDisplay: budgetTier,
      estimatedValuePKR,
      estimatedValueSAR,
      assignedAgent,
      stage: "new",
      priority: estimatedValuePKR >= 75 ? "VIP" : "High",
      notes: [
        notes.trim()
          ? `Investor Inquiry Note: "${notes.trim()}"`
          : `Inbound web inquiry for ${specificProject} (${preferredUnitType}).`,
      ],
    });

    setSubmitting(false);
    setSubmittedLead(created);
    setPreselectedProjectForInquiry(null);
  };

  const resetForm = () => {
    setSubmittedLead(null);
    setClientName("");
    setPhone("");
    setEmail("");
    setNotes("");
  };

  return (
    <section
      id="lead-inquiry"
      className="py-20 lg:py-28 bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Advisory Pitch & Direct Contact Numbers */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Private Investor Desk • CRM Connected</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
              Schedule a Private Portfolio Briefing or{" "}
              <span className="text-gold-400">Reserve Your Unit</span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Whether you are an international diaspora family seeking a smart apartment 10 minutes from{" "}
              <strong className="text-white">Masjid an-Nabawi in Madina</strong>, or a domestic investor targeting high-yield assets in{" "}
              <strong className="text-white">DHA, Gulberg, Model Town, or Barki Road Lahore</strong>, our senior advisors provide end-to-end legal, escrow, and portfolio guidance.
            </p>

            {/* Direct Contact Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-navy-900 border border-gold-400/30 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center text-gold-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-gold-400">
                    Pakistan Domestic Advisory Desk
                  </div>
                  <div className="text-lg font-bold text-white">
                    {COMPANY_INFO.pakistanPhone}
                  </div>
                  <div className="text-xs text-slate-400">
                    Direct Call &amp; WhatsApp • Lahore Head Office
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-navy-900 border border-emerald-500/30 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Saudi Arabia International Support
                  </div>
                  <div className="text-lg font-bold text-white">
                    {COMPANY_INFO.saudiPhone}
                  </div>
                  <div className="text-xs text-slate-400">
                    Wadi Mubarak Site Tours • Madina Al Munawwarah
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-navy-950/90 border border-white/10 text-xs text-slate-400 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Live CRM Pipeline Sync:</strong>{" "}
                Every inquiry submitted through this form is automatically routed into Ravi Estate&apos;s Internal CRM Pipeline Dashboard under{" "}
                <em className="text-gold-300">New Leads</em> with instant advisor assignment.
              </span>
            </div>
          </div>

          {/* Right 7 Columns: Interactive Lead Capture Form or Success Confirmation */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-navy-900 border border-gold-400/35 p-6 sm:p-8 lg:p-10 shadow-2xl">
              {submittedLead ? (
                <div className="py-6 space-y-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-300 text-xs font-bold uppercase tracking-widest">
                      Inquiry Logged • Ref #{submittedLead.id}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                      Thank You, {submittedLead.clientName}!
                    </h3>
                    <p className="text-sm text-slate-300 max-w-lg mx-auto">
                      Your investment inquiry for{" "}
                      <strong className="text-gold-300">
                        {submittedLead.specificProject}
                      </strong>{" "}
                      has been registered and assigned to{" "}
                      <strong className="text-white">
                        {submittedLead.assignedAgent}
                      </strong>
                      .
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-5 rounded-2xl bg-navy-950 border border-white/10 text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block">Client Phone / WhatsApp:</span>
                      <span className="text-white font-bold">{submittedLead.phone}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Investor Origin:</span>
                      <span className="text-emerald-300 font-bold">
                        {submittedLead.originType} ({submittedLead.countryCity})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Selected Portfolio:</span>
                      <span className="text-gold-300 font-bold">
                        {submittedLead.propertyCategory}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Target Budget:</span>
                      <span className="text-white font-bold">
                        {submittedLead.budgetDisplay}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    {onSwitchToCRM && (
                      <button
                        onClick={onSwitchToCRM}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 font-extrabold text-xs shadow-lg hover:brightness-110 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        <span>View Lead in Internal CRM Pipeline</span>
                      </button>
                    )}
                    <button
                      onClick={resetForm}
                      className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 text-xs font-semibold transition-all"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif font-bold text-white">
                      Investor Registration &amp; Property Inquiry
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Select your investment preference below to receive tailored floor plans, ROI projections, and payment schedules.
                    </p>
                  </div>

                  {/* Step 1: Primary Interest Toggle (Madina vs Pakistan) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gold-300 block">
                      1. Primary Investment Interest *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          handleCategoryChange("Madina International Apartments")
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          propertyCategory === "Madina International Apartments"
                            ? "bg-gold-400/15 border-gold-400 text-white shadow-md"
                            : "bg-navy-950/70 border-white/10 text-slate-300 hover:border-white/25"
                        }`}
                      >
                        <div className="text-xs font-bold text-gold-300">
                          ★ Madina International Apartments
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          Value Apartments – Wadi Mubarak, KSA
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleCategoryChange("Local Pakistani Properties")
                        }
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          propertyCategory === "Local Pakistani Properties"
                            ? "bg-gold-400/15 border-gold-400 text-white shadow-md"
                            : "bg-navy-950/70 border-white/10 text-slate-300 hover:border-white/25"
                        }`}
                      >
                        <div className="text-xs font-bold text-emerald-300">
                          ◆ Local Pakistani Properties
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          DHA, Gulberg, Model Town &amp; Barki Road Lahore
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Full Name / Investor Entity *
                      </label>
                      <input
                        type="text"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="e.g., Tariq Al-Mansoor / Mian Ahmed"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 50 ... or +92 300 ..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Origin Type & City/Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Investor Origin Classification *
                      </label>
                      <select
                        value={originType}
                        onChange={(e) =>
                          setOriginType(e.target.value as LeadOrigin)
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="International Diaspora">
                          International Diaspora (KSA / UAE / UK / North America)
                        </option>
                        <option value="Pakistan">
                          Pakistan Domestic Investor
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Current City &amp; Country
                      </label>
                      <input
                        type="text"
                        value={countryCity}
                        onChange={(e) => setCountryCity(e.target.value)}
                        placeholder="e.g., Riyadh KSA / London UK / Lahore PK"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Specific Project & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Preferred Project
                      </label>
                      <select
                        value={specificProject}
                        onChange={(e) => setSpecificProject(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="Value Apartments - Madina Al Munawwarah (Wadi Mubarak)">
                          Value Apartments - Madina Al Munawwarah (Wadi Mubarak)
                        </option>
                        {PAKISTAN_PORTFOLIO.map((p) => (
                          <option
                            key={p.id}
                            value={`${p.title} (${p.location})`}
                          >
                            {p.title} ({p.location})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Investment Budget Range
                      </label>
                      <select
                        value={budgetTier}
                        onChange={(e) => setBudgetTier(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white focus:outline-none focus:border-gold-400"
                      >
                        <option value="SAR 420,000 – 495,000 (~PKR 3.4 Cr)">
                          SAR 420,000 – 495,000 (~PKR 3.4 Cr • Studio)
                        </option>
                        <option value="SAR 680,000 – 790,000 (~PKR 5.2 Cr)">
                          SAR 680,000 – 790,000 (~PKR 5.2 Cr • 1-Bed Luxury)
                        </option>
                        <option value="SAR 980,000 – 1,180,000 (~PKR 8.2 Cr)">
                          SAR 980,000 – 1,180,000 (~PKR 8.2 Cr • 2-Bed Family)
                        </option>
                        <option value="SAR 1,850,000+ (~PKR 14+ Cr)">
                          SAR 1,850,000+ (~PKR 14+ Cr • Penthouse / Bulk)
                        </option>
                        <option value="PKR 1.65 Crore – 2.85 Crore (Lahore Residential)">
                          PKR 1.65 Cr – 2.85 Cr (Lahore Apartments)
                        </option>
                        <option value="PKR 3.00 Crore – 6.00 Crore (Smart Homes / Villas)">
                          PKR 3.00 Cr – 6.00 Cr (Smart Homes / Residencies)
                        </option>
                        <option value="PKR 6.75 Crore – 12+ Crore (Commercial / Farmhouses)">
                          PKR 6.75 Cr – 12+ Cr (Corporate Tower / Farmhouses)
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Email & Preferred Unit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Email Address (For Brochure &amp; Floor Plans)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="investor@domain.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                        Preferred Configuration
                      </label>
                      <input
                        type="text"
                        value={preferredUnitType}
                        onChange={(e) => setPreferredUnitType(e.target.value)}
                        placeholder="e.g., 1-Bed Luxury / 2-Bed / Commercial Floor"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      Specific Questions or Consultation Preference
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g., Requesting WhatsApp video walkthrough of Wadi Mubarak site or installment plan details..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-navy-950 border border-white/15 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-400 text-navy-950 font-extrabold text-sm shadow-xl shadow-gold-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {submitting
                        ? "Registering Inquiry in CRM..."
                        : "Submit Investor Inquiry & Request Dossier"}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

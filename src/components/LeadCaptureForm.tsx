"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  CheckCircle2,
  Phone,
  Globe,
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
import ScrollReveal from "./ScrollReveal";

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

    let estimatedValuePKR = 52;
    let estimatedValueSAR = 720;
    if (budgetTier.includes("1,850,000") || budgetTier.includes("12+ Crore")) {
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
          ? `Client Inquiry Note: "${notes.trim()}"`
          : `Website inquiry submitted for ${specificProject} (${preferredUnitType}).`,
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
      className="py-20 lg:py-24 bg-white border-b border-slate-200 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left 5 Columns: Corporate Advisory Details */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delayMs={80}>
              <div className="space-y-6">
                <div className="text-xs font-bold uppercase tracking-widest text-gold-600">
                  Investor Relations &amp; Advisory Desk
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                  Request a Private Consultation or{" "}
                  <span className="text-gold-600">Property Dossier</span>
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Whether you are interested in{" "}
                  <strong className="text-slate-900">
                    Value Apartments in Madina Al Munawwarah (Wadi Mubarak)
                  </strong>{" "}
                  or our residential and commercial developments across{" "}
                  <strong className="text-slate-900">Lahore, Pakistan</strong>, our senior property advisors are ready to assist you with payment plans, legal documentation, and site visits.
                </p>

                {/* Direct Contact Cards */}
                <div className="space-y-3.5 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-gold-600 shrink-0 shadow-sm">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Pakistan Domestic Advisory
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        {COMPANY_INFO.pakistanPhone}
                      </div>
                      <div className="text-xs text-slate-500">
                        Direct Call &amp; WhatsApp • Lahore Head Office
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shrink-0 shadow-sm">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Saudi Arabia International Support
                      </div>
                      <div className="text-lg font-bold text-slate-900">
                        {COMPANY_INFO.saudiPhone}
                      </div>
                      <div className="text-xs text-slate-500">
                        Wadi Mubarak Site Viewings • Madina Al Munawwarah
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-slate-700 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-900">
                      Direct Advisory Assignment:
                    </strong>{" "}
                    All inquiries submitted via this form are assigned directly to a dedicated Ravi Estate advisor in our CRM pipeline.
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right 7 Columns: Corporate Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" delayMs={150}>
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-sm">
                {submittedLead ? (
                  <div className="py-6 space-y-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>

                    <div className="space-y-2">
                      <span className="px-3 py-1 rounded bg-white border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-widest">
                        Inquiry Registered • Reference {submittedLead.id}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                        Thank You, {submittedLead.clientName}
                      </h3>
                      <p className="text-sm text-slate-600 max-w-lg mx-auto">
                        Your inquiry regarding{" "}
                        <strong className="text-slate-900">
                          {submittedLead.specificProject}
                        </strong>{" "}
                        has been received and assigned to{" "}
                        <strong className="text-slate-900">
                          {submittedLead.assignedAgent}
                        </strong>
                        .
                      </p>
                    </div>

                    <div className="p-5 rounded-xl bg-white border border-slate-200 text-left grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-500 block">
                          Phone / WhatsApp:
                        </span>
                        <span className="text-slate-900 font-bold">
                          {submittedLead.phone}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Investor Origin:
                        </span>
                        <span className="text-slate-900 font-bold">
                          {submittedLead.originType} ({submittedLead.countryCity})
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Selected Portfolio:
                        </span>
                        <span className="text-gold-600 font-bold">
                          {submittedLead.propertyCategory}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">
                          Investment Budget:
                        </span>
                        <span className="text-slate-900 font-bold">
                          {submittedLead.budgetDisplay}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      {onSwitchToCRM && (
                        <button
                          onClick={onSwitchToCRM}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all"
                        >
                          <LayoutDashboard className="w-4 h-4 text-gold-400" />
                          <span>View Inquiry in CRM Pipeline</span>
                        </button>
                      )}
                      <button
                        onClick={resetForm}
                        className="w-full sm:w-auto px-5 py-3.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 text-xs font-semibold transition-all"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-slate-200 pb-4">
                      <h3 className="text-xl font-serif font-bold text-slate-900">
                        Investor Inquiry Form
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        Complete the details below to receive official floor plans, payment schedules, and advisory assistance.
                      </p>
                    </div>

                    {/* Portfolio Selection */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        1. Select Property Interest *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            handleCategoryChange(
                              "Madina International Apartments"
                            )
                          }
                          className={`p-3.5 rounded-xl border text-left transition-all ${
                            propertyCategory ===
                            "Madina International Apartments"
                              ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`text-xs font-bold ${
                              propertyCategory ===
                              "Madina International Apartments"
                                ? "text-gold-400"
                                : "text-slate-900"
                            }`}
                          >
                            Madina International Apartments
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              propertyCategory ===
                              "Madina International Apartments"
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
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
                              ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                              : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                          }`}
                        >
                          <div
                            className={`text-xs font-bold ${
                              propertyCategory === "Local Pakistani Properties"
                                ? "text-gold-400"
                                : "text-slate-900"
                            }`}
                          >
                            Local Pakistani Properties
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              propertyCategory === "Local Pakistani Properties"
                                ? "text-slate-300"
                                : "text-slate-500"
                            }`}
                          >
                            DHA, Gulberg, Model Town &amp; Barki Road Lahore
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Name & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="Enter your full name"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+966 50 ... or +92 300 ..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    {/* Origin & Location */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Investor Origin *
                        </label>
                        <select
                          value={originType}
                          onChange={(e) =>
                            setOriginType(e.target.value as LeadOrigin)
                          }
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
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
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          City &amp; Country
                        </label>
                        <input
                          type="text"
                          value={countryCity}
                          onChange={(e) => setCountryCity(e.target.value)}
                          placeholder="e.g., Riyadh, London, Dubai, Lahore"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    {/* Specific Project & Budget */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Preferred Development
                        </label>
                        <select
                          value={specificProject}
                          onChange={(e) => setSpecificProject(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
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
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Estimated Budget Range
                        </label>
                        <select
                          value={budgetTier}
                          onChange={(e) => setBudgetTier(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-slate-900"
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
                            SAR 1,850,000+ (~PKR 14+ Cr • Penthouse)
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

                    {/* Email & Unit Type */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="yourname@domain.com"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                          Preferred Unit Type
                        </label>
                        <input
                          type="text"
                          value={preferredUnitType}
                          onChange={(e) => setPreferredUnitType(e.target.value)}
                          placeholder="e.g., 1-Bed Luxury / 2-Bed / Commercial"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                        />
                      </div>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                        Message or Inquiry Notes
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Please share any specific requirements or preferred consultation time..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4 text-gold-400" />
                      <span>
                        {submitting
                          ? "Submitting Inquiry..."
                          : "Submit Property Inquiry"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

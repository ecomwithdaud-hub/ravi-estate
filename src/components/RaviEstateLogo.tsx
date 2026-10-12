"use client";

import React from "react";

interface RaviEstateLogoProps {
  variant?: "dark" | "light" | "compact";
  showTagline?: boolean;
}

export default function RaviEstateLogo({
  variant = "light",
  showTagline = true,
}: RaviEstateLogoProps) {
  const isDark = variant === "dark";

  return (
    <div className="inline-flex items-center gap-3.5 select-none shrink-0">
      {/* Clean Corporate Architectural Roofline Emblem */}
      <div
        className={`flex items-center justify-center rounded-lg px-3 py-2.5 border transition-colors shrink-0 ${
          isDark
            ? "bg-navy-900 border-gold-400/40"
            : "bg-slate-50 border-slate-200 shadow-sm"
        }`}
      >
        <svg
          viewBox="0 0 140 54"
          className="w-12 h-5 overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Ravi Estate Logo"
        >
          {/* Chimney on left slope */}
          <path
            d="M24 31V15H35V24"
            stroke={isDark ? "#d4af37" : "#0f172a"}
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Primary roof peak */}
          <path
            d="M6 42L56 10L106 42"
            stroke={isDark ? "#ffffff" : "#0f172a"}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Secondary roof peak */}
          <path
            d="M67 17L78 10L132 42"
            stroke="#c59b27"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Name & Tagline - strictly single-line whitespace-nowrap */}
      <div className="flex flex-col justify-center whitespace-nowrap">
        <span
          className={`font-serif font-bold tracking-tight leading-tight ${
            variant === "compact" ? "text-lg" : "text-xl sm:text-2xl"
          } ${isDark ? "text-white" : "text-slate-900"}`}
        >
          Ravi <span className="text-gold-600">Estate</span>
        </span>
        {showTagline && (
          <span
            className={`font-serif italic leading-snug mt-0.5 ${
              variant === "compact" ? "text-xs" : "text-xs sm:text-[13px]"
            } ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Deals in all kinds of properties.
          </span>
        )}
      </div>
    </div>
  );
}

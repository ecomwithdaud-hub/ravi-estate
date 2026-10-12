"use client";

import React from "react";

interface RaviEstateLogoProps {
  variant?: "dark" | "light" | "compact";
  showTagline?: boolean;
  showOriginalBadge?: boolean;
}

export default function RaviEstateLogo({
  variant = "dark",
  showTagline = true,
  showOriginalBadge = false,
}: RaviEstateLogoProps) {
  const isDark = variant === "dark";

  return (
    <div className="inline-flex items-center gap-3.5 select-none group">
      {showOriginalBadge ? (
        <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-white p-1 shadow-md border border-gold-400/40 shrink-0">
          <img
            src="/images/ravi-estate-logo.png"
            alt="Ravi Estate Official Logo"
            className="h-full w-full object-contain"
          />
        </div>
      ) : (
        <div
          className={`relative flex flex-col items-center justify-center rounded-xl px-3 py-2 border transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-b from-navy-800 to-navy-950 border-gold-400/35 group-hover:border-gold-400/70 shadow-lg shadow-black/40"
              : "bg-white border-slate-200 shadow-sm"
          }`}
        >
          {/* Exact SVG recreation of the Ravi Estate double-pitched roof + chimney logo */}
          <svg
            viewBox="0 0 140 54"
            className="w-14 h-6 overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Ravi Estate Roofline Emblem"
          >
            {/* Chimney on left slope */}
            <path
              d="M24 31V15H35V24"
              stroke={isDark ? "#d4af37" : "#0a1224"}
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Main primary roof peak */}
            <path
              d="M6 42L56 10L106 42"
              stroke={isDark ? "#ffffff" : "#0a1224"}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Secondary twin roof peak on right */}
            <path
              d="M67 17L78 10L132 42"
              stroke={isDark ? "#d4af37" : "#c59b27"}
              strokeWidth="4.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`font-sans font-extrabold tracking-tight leading-none ${
              variant === "compact" ? "text-lg" : "text-xl sm:text-2xl"
            } ${isDark ? "text-white" : "text-navy-950"}`}
          >
            Ravi <span className="text-gold-400">Estate</span>
          </span>
          <span className="hidden xl:inline-block text-[10px] font-medium uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-400/15 text-gold-300 border border-gold-400/30">
            raviestate.com
          </span>
        </div>
        {showTagline && (
          <span
            className={`font-serif italic tracking-wide mt-0.5 ${
              variant === "compact" ? "text-[11px]" : "text-xs sm:text-[13px]"
            } ${isDark ? "text-slate-300" : "text-slate-600"}`}
          >
            Deals in all kinds of properties.
          </span>
        )}
      </div>
    </div>
  );
}

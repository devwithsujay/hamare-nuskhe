"use client";

import React, { useState, useEffect } from "react";
import {
  detectRegionFromCoords,
  getRegionInfo,
  findRegionByName,
  REGIONAL_LANGUAGES,
  RegionalLanguageInfo,
} from "@/lib/location/regional-mapper";
import { MapPin, Globe, Check, X, ChevronRight, Sparkles } from "lucide-react";
import { DiyaIcon } from "./IndianMotifs";

export default function LocationLanguagePrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [detectedRegion, setDetectedRegion] = useState<RegionalLanguageInfo | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [isChangingState, setIsChangingState] = useState(false);

  useEffect(() => {
    // ALWAYS listen to custom event to open this modal from Header or anywhere
    const handleOpenPrompt = () => {
      setIsChangingState(false);
      triggerLocationDetection();
      setIsOpen(true);
    };
    window.addEventListener("hn-open-location-prompt", handleOpenPrompt);

    // Auto-detect on first visit only if user hasn't made a decision yet
    const alreadyDecided = localStorage.getItem("hn-lang-decided");
    if (!alreadyDecided) {
      triggerLocationDetection();
    }

    return () => {
      window.removeEventListener("hn-open-location-prompt", handleOpenPrompt);
    };
  }, []);

  const triggerLocationDetection = async () => {
    setDetecting(true);

    // Tier 1: Real-time regional IP lookup (works without prompting for GPS permission)
    try {
      const res = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3500) });
      const data = await res.json();
      if (data && data.success && (data.country_code === "IN" || data.country === "India")) {
        const matched =
          findRegionByName(data.region) ||
          findRegionByName(data.city) ||
          (data.latitude && data.longitude ? detectRegionFromCoords(data.latitude, data.longitude) : null);

        if (matched) {
          setDetectedRegion(matched);
          setDetecting(false);
          setIsOpen(true);
          return;
        }
      }
    } catch (e) {
      console.log("[Location] IP lookup error or timeout, trying device GPS...", e);
    }

    // Tier 2: Device GPS coordinates if available
    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const region = detectRegionFromCoords(pos.coords.latitude, pos.coords.longitude);
          setDetectedRegion(region);
          setDetecting(false);
          setIsOpen(true);
        },
        (err) => {
          console.log("[Location] GPS unavailable:", err.message);
          // If neither IP nor GPS succeeds, open state selection directly without guessing wrong
          setIsChangingState(true);
          setDetectedRegion(getRegionInfo("Karnataka"));
          setDetecting(false);
          setIsOpen(true);
        },
        { timeout: 5000, maximumAge: 300000 }
      );
    } else {
      setIsChangingState(true);
      setDetectedRegion(getRegionInfo("Karnataka"));
      setDetecting(false);
      setIsOpen(true);
    }
  };

  const handleSelectRegional = (regionInfo: RegionalLanguageInfo) => {
    localStorage.setItem("hn-lang", regionInfo.code);
    localStorage.setItem("hn-user-state", regionInfo.state);
    localStorage.setItem("hn-lang-decided", "true");

    // Dispatch event to inform Header and ArchiveExplorer
    window.dispatchEvent(
      new CustomEvent("hn-language-changed", {
        detail: { lang: regionInfo.code, state: regionInfo.state },
      })
    );

    setIsOpen(false);
  };

  const handleContinueEnglish = () => {
    localStorage.setItem("hn-lang", "en");
    if (detectedRegion) {
      localStorage.setItem("hn-user-state", detectedRegion.state);
    }
    localStorage.setItem("hn-lang-decided", "true");

    window.dispatchEvent(
      new CustomEvent("hn-language-changed", {
        detail: { lang: "en", state: detectedRegion?.state },
      })
    );

    setIsOpen(false);
  };

  const handleDismiss = () => {
    localStorage.setItem("hn-lang-decided", "dismissed");
    setIsOpen(false);
  };

  if (!isOpen || !detectedRegion) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Location and language preference"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1C1714]/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
    >
      <div className="bg-[#FAF6ED] dark:bg-[#1C1917] text-[#1C1714] dark:text-[#F4ECE0] border border-[#DFCFAF] dark:border-[#3B352D] rounded-t-xl sm:rounded-sm shadow-2xl max-w-lg w-full overflow-hidden transition-all transform animate-in slide-in-from-bottom sm:slide-in-from-bottom-2 duration-300">
        {/* Traditional Temple Band */}
        <div className="indian-temple-stripe" aria-hidden="true" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#DFCFAF] dark:border-[#3B352D] flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#F3ECE0] dark:bg-[#221F1B] border border-[#DFCFAF] dark:border-[#3B352D] flex items-center justify-center p-1.5 shadow-xs flex-shrink-0">
              <DiyaIcon className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#9C3820] dark:text-[#F59E0B]" />
                <span className="state-stamp text-[10px]">
                  क्षेत्रीय अवस्थिति • DETECTED REGION
                </span>
              </div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#1C1714] dark:text-[#F4ECE0] mt-0.5">
                {detectedRegion.greeting} • Welcome to Our Archive
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close language selector"
            className="p-1.5 text-[#4A3E34] dark:text-[#BFB6A8] hover:bg-[#F3ECE0] dark:hover:bg-[#2A2622] rounded-xs transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 space-y-4">
          <div className="bg-[#F3ECE0] dark:bg-[#221F1B] border border-[#DFCFAF] dark:border-[#3B352D] p-3.5 rounded-xs">
            <p className="text-xs sm:text-sm text-[#4A3E34] dark:text-[#D1C9BE] leading-relaxed">
              Based on your location, we detected you are in{" "}
              <strong className="text-[#9C3820] dark:text-[#F59E0B] font-semibold">
                {detectedRegion.state}
              </strong>{" "}
              ({detectedRegion.region} India).
            </p>
            <p className="mt-1.5 text-xs text-[#1C1714] dark:text-[#F4ECE0] font-serif italic">
              &quot;{detectedRegion.sampleUsePrompt}&quot;
            </p>
          </div>

          {isChangingState ? (
            /* State picker selection */
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-[#4A3E34] dark:text-[#BFB6A8] block">
                Select Your State / अपना राज्य चुनें:
              </label>
              <div className="max-h-48 overflow-y-auto divide-y divide-[#DFCFAF]/60 dark:divide-[#3B352D]/60 border border-[#DFCFAF] dark:border-[#3B352D] rounded-xs bg-[#FAF6ED] dark:bg-[#181614]">
                {Object.values(REGIONAL_LANGUAGES).map((reg) => (
                  <button
                    key={reg.state}
                    type="button"
                    onClick={() => {
                      setDetectedRegion(reg);
                      setIsChangingState(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F3ECE0] dark:hover:bg-[#221F1B] transition-colors"
                  >
                    <span className="font-medium text-[#1C1714] dark:text-[#F4ECE0]">
                      {reg.state}
                    </span>
                    <span className="text-[11px] text-[#9C3820] dark:text-[#F59E0B] font-serif">
                      {reg.nativeName} ({reg.language})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Action Choices */
            <div className="space-y-2.5 pt-1">
              {/* Option 1: Explore in Regional Language */}
              <button
                type="button"
                onClick={() => handleSelectRegional(detectedRegion)}
                className="w-full flex items-center justify-between p-3.5 bg-[#9C3820] text-[#FAF6ED] hover:bg-[#832014] rounded-xs font-medium text-xs sm:text-sm shadow-xs transition-all group"
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Sparkles className="w-4 h-4 text-[#FDE68A] flex-shrink-0" />
                  <div>
                    <span className="font-semibold block">
                      Explore in {detectedRegion.language} ({detectedRegion.nativeName})
                    </span>
                    <span className="text-[11px] text-[#FDE68A] opacity-90 block">
                      Highlight {detectedRegion.state} remedies & native scripts
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#FDE68A] group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Option 2: Continue with English */}
              <button
                type="button"
                onClick={handleContinueEnglish}
                className="w-full flex items-center justify-between p-3 border border-[#DFCFAF] dark:border-[#3B352D] bg-[#F3ECE0] dark:bg-[#221F1B] text-[#1C1714] dark:text-[#F4ECE0] hover:border-[#9C3820] rounded-xs font-medium text-xs sm:text-sm transition-colors group"
              >
                <div className="flex items-center gap-2.5 text-left">
                  <Globe className="w-4 h-4 text-[#4A3E34] dark:text-[#BFB6A8]" />
                  <span>Continue with English (All India Archive)</span>
                </div>
                <Check className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </button>
            </div>
          )}

          {/* Footer note & state change trigger */}
          <div className="flex items-center justify-between pt-2 border-t border-[#DFCFAF]/60 dark:border-[#3B352D]/60 text-[11px] text-[#4A3E34] dark:text-[#BFB6A8]">
            <button
              type="button"
              onClick={() => setIsChangingState(!isChangingState)}
              className="hover:text-[#9C3820] underline transition-colors"
            >
              {isChangingState ? "Back to suggestion" : "Not in " + detectedRegion.state + "? Choose state"}
            </button>

            <button
              type="button"
              onClick={handleDismiss}
              className="hover:underline opacity-80"
            >
              Decide later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

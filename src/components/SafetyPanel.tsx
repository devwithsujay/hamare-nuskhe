"use client";

import React, { useState } from "react";
import { Remedy } from "@/data/schema";
import { WarningItem } from "@/lib/safety/rules";
import {
  ShieldAlert,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  HeartPulse,
} from "lucide-react";

interface Props {
  remedy: Remedy;
  warnings: WarningItem[];
}

export default function SafetyPanel({ remedy, warnings }: Props) {
  const [collapsedItems, setCollapsedItems] = useState<Record<string, boolean>>({});

  const toggleCollapse = (id: string) => {
    setCollapsedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Urgent clinical banners (Infant Botulism, High Risk Drug Interaction, Pregnancy avoidance)
  // Exclude red-flags-stop here since it is consolidated into the dedicated Red Flag section below
  const criticalWarnings = warnings.filter(
    (w) => (!w.collapsible || w.severity === "DANGER") && w.id !== "red-flags-stop"
  );

  // Secondary caution / allergen details
  const secondaryWarnings = warnings.filter(
    (w) => w.collapsible && w.severity !== "DANGER" && w.id !== "red-flags-stop"
  );

  // Deduplicated list of red flag symptoms & doctor visit reasons
  const uniqueRedFlags = Array.from(
    new Set([...remedy.safety.redFlagSymptoms, ...remedy.safety.stopAndSeeDoctorIf])
  );

  return (
    <div className="space-y-4">
      {/* 1. Critical High-Priority Banners (Only when truly urgent) */}
      {criticalWarnings.length > 0 && (
        <div className="space-y-2.5">
          {criticalWarnings.map((item) => {
            const isDanger = item.severity === "DANGER";
            return (
              <div
                key={item.id}
                className={`p-4 rounded-[2px] border transition-colors shadow-xs ${
                  isDanger
                    ? "bg-[#FAF6EE] dark:bg-[#251A1A] border-l-4 border-l-[#9E2A2B] border-[#9E2A2B]/30 text-[#1C1917] dark:text-[#F4ECE0]"
                    : "bg-[#FAF6EE] dark:bg-[#252014] border-l-4 border-l-[#D99B26] border-[#D99B26]/40 text-[#1C1917] dark:text-[#F4ECE0]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {isDanger ? (
                    <ShieldAlert className="w-5 h-5 text-[#9E2A2B] flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-[#D99B26] flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h4
                      className={`font-mono font-bold uppercase tracking-wider text-xs sm:text-sm leading-tight ${
                        isDanger ? "text-[#9E2A2B] dark:text-[#F87171]" : "text-[#D99B26] dark:text-[#FBBF24]"
                      }`}
                    >
                      {item.title}
                    </h4>
                    <p className="mt-1.5 text-sm sm:text-base font-serif leading-relaxed text-[#5C5346] dark:text-[#C5BCB0]">
                      {item.message}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Unified Safety & Clinical Context Card */}
      <div className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] p-5 sm:p-6 rounded-[3px] shadow-[inset_0_0_12px_rgba(216,203,184,0.1)]">
        <div className="flex items-center gap-2.5 pb-3 border-b border-[#D8CBB8]/80 dark:border-[#38332A] mb-4">
          <HeartPulse className="w-5 h-5 text-[#9E2A2B]" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#1C1917] dark:text-[#F4ECE0]">
            Safety, Contraindications &amp; Clinical Precautions
          </h3>
        </div>

        {/* Secondary Warnings (Contraindications, Allergens, Topical Patch Test) */}
        {secondaryWarnings.length > 0 && (
          <div className="space-y-2.5 mb-4">
            {secondaryWarnings.map((item) => {
              const isCollapsed = Boolean(collapsedItems[item.id]);
              return (
                <div
                  key={item.id}
                  className="border border-[#D8CBB8] dark:border-[#38332A] bg-[#F4EFE6] dark:bg-[#25221F] rounded-[2px] p-3 text-sm"
                >
                  <div
                    onClick={() => toggleCollapse(item.id)}
                    className="flex items-center justify-between cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-2 font-mono font-bold uppercase text-xs sm:text-sm text-[#1C1917] dark:text-[#F4ECE0]">
                      <Info className="w-4 h-4 text-[#B5945B]" />
                      <span>{item.title}</span>
                    </div>
                    <button type="button" aria-label="Toggle details">
                      {isCollapsed ? (
                        <ChevronDown className="w-4 h-4 text-[#5C5346] dark:text-[#B8B2A7]" />
                      ) : (
                        <ChevronUp className="w-4 h-4 text-[#5C5346] dark:text-[#B8B2A7]" />
                      )}
                    </button>
                  </div>

                  {!isCollapsed && (
                    <p className="mt-2 text-sm sm:text-base text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed pl-6 font-serif">
                      {item.message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Deduplicated Red Flag Symptoms & Discontinuation Criteria */}
        {uniqueRedFlags.length > 0 && (
          <div className="bg-[#FAF6EE] dark:bg-[#201D1A] border-2 border-[#9E2A2B]/40 p-4 sm:p-5 rounded-[2px] text-sm">
            <div className="flex items-center gap-2 font-mono font-bold text-[#9E2A2B] uppercase tracking-wider text-xs sm:text-sm mb-2.5">
              <Stethoscope className="w-4.5 h-4.5 flex-shrink-0" />
              <span>चिकित्सकीय चेतावनी • When to Stop &amp; Consult a Medical Doctor</span>
            </div>
            <p className="text-sm sm:text-base font-serif text-[#1C1917] dark:text-[#F4ECE0] leading-relaxed mb-2 font-medium">
              Discontinue this traditional domestic preparation and seek qualified medical care immediately if:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-sm sm:text-base font-serif text-[#5C5346] dark:text-[#C5BCB0] pl-1">
              {uniqueRedFlags.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

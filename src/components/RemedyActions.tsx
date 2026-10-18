"use client";

import React, { useState, useEffect } from "react";
import { Remedy } from "@/data/schema";
import {
  Bookmark,
  BookmarkCheck,
  Share2,
  Copy,
  Printer,
  Download,
  Check,
  FileCode,
  FileText,
  X,
} from "lucide-react";
import { MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";

interface Props {
  remedy: Remedy;
}

export default function RemedyActions({ remedy }: Props) {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [showWhatsAppPreview, setShowWhatsAppPreview] = useState<boolean>(false);

  // Check saved state from localStorage
  useEffect(() => {
    try {
      const savedRaw = localStorage.getItem("hn-saved-remedies");
      if (savedRaw) {
        const savedList: string[] = JSON.parse(savedRaw);
        setIsSaved(savedList.includes(remedy.slug));
      }
    } catch (e) {
      console.error("Failed to read saved remedies from localStorage:", e);
    }
  }, [remedy.slug]);

  // Toggle bookmark
  const toggleSave = () => {
    try {
      const savedRaw = localStorage.getItem("hn-saved-remedies");
      let savedList: string[] = savedRaw ? JSON.parse(savedRaw) : [];

      if (isSaved) {
        savedList = savedList.filter((s) => s !== remedy.slug);
        setIsSaved(false);
      } else {
        if (!savedList.includes(remedy.slug)) {
          savedList.push(remedy.slug);
        }
        setIsSaved(true);
      }

      localStorage.setItem("hn-saved-remedies", JSON.stringify(savedList));
    } catch (e) {
      console.error("Failed to toggle save:", e);
    }
  };

  // Build formatted text with mandatory warnings and citation
  const buildFormattedText = (): string => {
    const lines = [
      `*${remedy.titleEn}* ${remedy.titleNative ? `(${remedy.titleNative})` : ""}`,
      `Origin: ${remedy.stateOrUT} (${remedy.region} India) | Tradition: ${remedy.tradition}`,
      "",
      `*Traditionally used for:*`,
      ...remedy.traditionalUses.map((u) => `• ${u}`),
      "",
      `*Ingredients:*`,
      ...remedy.ingredients.map(
        (ing) =>
          `• ${ing.name}${ing.amountValue ? `: ${ing.amountValue} ${ing.amountUnit || ""}` : ""}`
      ),
      "",
      `*Preparation:*`,
      ...remedy.steps.map((st, i) => `${i + 1}. ${st}`),
      "",
      `*CRITICAL SAFETY WARNINGS:*`,
      ...(remedy.ingredients.some((i) => i.name.toLowerCase().includes("honey")) ||
      remedy.safety.avoidUnderAge
        ? [`⚠️ NOT FOR INFANTS (Honey/Botulism Risk)`]
        : []),
      ...(remedy.safety.avoidInPregnancy === true
        ? [`⚠️ AVOID IN PREGNANCY (Uterine Stimulant Cautions)`]
        : []),
      ...(remedy.safety.drugInteractionClasses.length > 0
        ? [`⚠️ DRUG INTERACTIONS: ${remedy.safety.drugInteractionClasses.join(", ")}`]
        : []),
      "",
      `Source: ${remedy.sources[0]?.citation || "Documented household lore"}`,
      `Archived at: ${typeof window !== "undefined" ? window.location.href : `https://hamarenuskhe.in/remedy/${remedy.slug}`}`,
      "",
      `_Notice: ${MANDATORY_ARCHIVE_DISCLAIMER}_`,
    ];

    return lines.join("\n");
  };

  const handleCopyText = async () => {
    try {
      const text = buildFormattedText();
      await navigator.clipboard.writeText(text);
      setCopyFeedback("Copied to clipboard!");
      setTimeout(() => setCopyFeedback(null), 3000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(buildFormattedText());
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setShowWhatsAppPreview(false);
  };

  const handleDownloadJSON = () => {
    const data = {
      _meta: {
        site: "हमारे नुस्खे / Hamare Nuskhe",
        disclaimer: MANDATORY_ARCHIVE_DISCLAIMER,
        exportedAt: new Date().toISOString(),
      },
      remedy,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${remedy.slug}-folio.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadMarkdown = () => {
    const md = [
      `# ${remedy.titleEn} ${remedy.titleNative ? `(${remedy.titleNative})` : ""}`,
      `**State / Region:** ${remedy.stateOrUT} (${remedy.region})  `,
      `**Category:** ${remedy.category} | **Tradition:** ${remedy.tradition}  `,
      "",
      `> **Archival Notice:** ${MANDATORY_ARCHIVE_DISCLAIMER}`,
      "",
      `## Traditional Uses`,
      ...remedy.traditionalUses.map((u) => `- ${u}`),
      "",
      `## Ingredients (Base: ${remedy.baseServings} serving)`,
      ...remedy.ingredients.map(
        (ing) =>
          `- **${ing.name}**: ${ing.amountValue || ""} ${ing.amountUnit || ""} ${ing.notes ? `(${ing.notes})` : ""}`
      ),
      "",
      `## Method`,
      ...remedy.steps.map((st, i) => `${i + 1}. ${st}`),
      "",
      `## Safety & Contraindications`,
      `- **Risk Level:** ${remedy.safety.riskLevel}`,
      `- **Avoid in Pregnancy:** ${remedy.safety.avoidInPregnancy}`,
      `- **Drug Interactions:** ${remedy.safety.drugInteractionClasses.join(", ") || "None recorded"}`,
      "",
      `## Sources`,
      ...remedy.sources.map((s) => `- ${s.type}: ${s.citation}`),
    ].join("\n");

    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${remedy.slug}-folio.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-5 rounded-[3px] space-y-3.5 shadow-[inset_0_0_14px_rgba(181,148,91,0.08)]">
      <div className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#9E2A2B] dark:text-[#D99B26] border-b border-[#D8CBB8] dark:border-[#38332A] pb-2 flex items-center justify-between">
        <span>ARCHIVE ACTIONS &amp; FILING</span>
        <span className="text-[#B5945B]">§ FOLIO OPS</span>
      </div>

      {copyFeedback && (
        <div className="bg-[#FAF6EE] dark:bg-[#201D1A] border-l-4 border-l-[#2D4A3E] border border-[#D8CBB8] text-[#2D4A3E] dark:text-[#66BB58] p-2.5 text-xs font-mono rounded-[2px] flex items-center gap-1.5 font-bold">
          <Check className="w-3.5 h-3.5 text-[#2D4A3E]" />
          <span>{copyFeedback}</span>
        </div>
      )}

      {/* 1. Bookmark / Save to Drawer */}
      <button
        type="button"
        onClick={toggleSave}
        className={`w-full flex items-center justify-center gap-2 px-3.5 py-3 min-h-[46px] text-xs font-mono uppercase tracking-wider font-bold rounded-[2px] border transition-colors shadow-xs ${
          isSaved
            ? "bg-[#2D4A3E] text-[#FAF6EE] border-[#2D4A3E]"
            : "bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] border-[#D8CBB8] dark:border-[#38332A] hover:border-[#9E2A2B]"
        }`}
      >
        {isSaved ? (
          <>
            <BookmarkCheck className="w-4 h-4 text-[#FAF6EE]" />
            <span>Filed in Heirloom Sandook</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4 text-[#9E2A2B]" />
            <span>Bookmark to Heirloom Drawer</span>
          </>
        )}
      </button>

      {/* 2. WhatsApp Share */}
      <button
        type="button"
        onClick={() => setShowWhatsAppPreview(true)}
        className="w-full flex items-center justify-center gap-2 px-3.5 py-3 min-h-[46px] text-xs font-mono uppercase tracking-wider font-bold bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] border border-[#D8CBB8] dark:border-[#38332A] hover:border-[#2D4A3E] rounded-[2px] transition-colors shadow-xs"
      >
        <Share2 className="w-4 h-4 text-[#2D4A3E]" />
        <span>Share via WhatsApp</span>
      </button>

      {/* 3. Copy Text */}
      <button
        type="button"
        onClick={handleCopyText}
        className="w-full flex items-center justify-center gap-2 px-3.5 py-3 min-h-[46px] text-xs font-mono uppercase tracking-wider font-bold bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] border border-[#D8CBB8] dark:border-[#38332A] hover:border-[#9E2A2B] rounded-[2px] transition-colors shadow-xs"
      >
        <Copy className="w-4 h-4 text-[#5C5346] dark:text-[#B8B2A7]" />
        <span>Copy Archival Text</span>
      </button>

      {/* 4. Print Sheet */}
      <button
        type="button"
        onClick={() => window.print()}
        className="w-full flex items-center justify-center gap-2 px-3.5 py-3 min-h-[46px] text-xs font-mono uppercase tracking-wider font-bold bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] border border-[#D8CBB8] dark:border-[#38332A] hover:border-[#9E2A2B] rounded-[2px] transition-colors shadow-xs"
      >
        <Printer className="w-4 h-4 text-[#5C5346] dark:text-[#B8B2A7]" />
        <span>Print Archival A4 Sheet</span>
      </button>

      {/* Download Options */}
      <div className="pt-2 border-t border-[#D8CBB8] dark:border-[#38332A] flex gap-2">
        <button
          type="button"
          onClick={handleDownloadJSON}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 min-h-[42px] text-xs font-mono font-bold uppercase tracking-wider border border-[#D8CBB8] dark:border-[#38332A] bg-[#F4EFE6] dark:bg-[#25221F] hover:border-[#9E2A2B] rounded-[2px] text-[#5C5346] dark:text-[#B8B2A7] shadow-xs"
        >
          <FileCode className="w-3.5 h-3.5 text-[#9E2A2B]" />
          <span>JSON</span>
        </button>
        <button
          type="button"
          onClick={handleDownloadMarkdown}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 min-h-[42px] text-xs font-mono font-bold uppercase tracking-wider border border-[#D8CBB8] dark:border-[#38332A] bg-[#F4EFE6] dark:bg-[#25221F] hover:border-[#9E2A2B] rounded-[2px] text-[#5C5346] dark:text-[#B8B2A7] shadow-xs"
        >
          <FileText className="w-3.5 h-3.5 text-[#2D4A3E]" />
          <span>MARKDOWN</span>
        </button>
      </div>

      {/* WhatsApp Share Preview Modal */}
      {showWhatsAppPreview && (
        <div className="fixed inset-0 z-50 bg-[#1C1917]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 max-w-lg w-full p-6 rounded-[3px] shadow-xl text-[#1C1917] dark:text-[#F4ECE0]">
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB8] dark:border-[#38332A]">
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-[#2D4A3E]" />
                <h4 className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                  WhatsApp Archival Dispatch Preview
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setShowWhatsAppPreview(false)}
                className="p-1 hover:bg-[#F4EFE6] dark:hover:bg-[#25221F] rounded-[2px]"
                aria-label="Close preview"
              >
                <X className="w-4 h-4 text-[#5C5346]" />
              </button>
            </div>

            <p className="text-xs text-[#5C5346] dark:text-[#C5BCB0] mt-3 font-serif">
              Mandatory safety warnings are always appended to shared messages and cannot be untoggled.
            </p>

            {/* Message Preview Box */}
            <div className="bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] p-3 rounded-[2px] text-xs font-mono whitespace-pre-wrap max-h-60 overflow-y-auto mt-3 text-[#1C1917] dark:text-[#F4ECE0] leading-relaxed">
              {buildFormattedText()}
            </div>

            <div className="flex justify-end gap-2.5 mt-4 pt-3 border-t border-[#D8CBB8] dark:border-[#38332A]">
              <button
                type="button"
                onClick={() => setShowWhatsAppPreview(false)}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold border border-[#D8CBB8] dark:border-[#38332A] hover:bg-[#F4EFE6] rounded-[2px] text-[#5C5346]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleWhatsAppSend}
                className="px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold bg-[#2D4A3E] text-[#FAF6EE] rounded-[2px] hover:bg-[#233b31] shadow-xs"
              >
                Open in WhatsApp →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

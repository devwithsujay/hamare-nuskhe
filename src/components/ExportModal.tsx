"use client";

import React, { useState } from "react";
import { Remedy } from "@/data/schema";
import { Download, FileJson, FileSpreadsheet, Printer, X } from "lucide-react";
import { MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";

interface Props {
  remedies: Remedy[];
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ remedies, isOpen, onClose }: Props) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Export as JSON with _meta
  const handleExportJSON = () => {
    const exportData = {
      _meta: {
        site: "हमारे नुस्खे / Hamare Nuskhe",
        subtitle: "Home remedies from across India",
        exportedAt: new Date().toISOString(),
        count: remedies.length,
        disclaimer: MANDATORY_ARCHIVE_DISCLAIMER,
      },
      remedies,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hamare-nuskhe-export-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess("JSON exported successfully");
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  // 2. Export as CSV with UTF-8 BOM for Excel Indic script compatibility
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "Slug",
      "Title (English)",
      "Title (Native Script)",
      "State / UT",
      "Region",
      "Category",
      "Tradition",
      "Remedy Type",
      "Traditional Uses",
      "Botanicals (Common / Scientific)",
      "Ingredients",
      "Prep Time (min)",
      "Safety Risk Level",
      "Avoid Under Age",
      "Avoid In Pregnancy",
      "Drug Interactions",
      "Allergens",
      "Sources",
      "Verification Status",
    ];

    const rows = remedies.map((r) => {
      const botanicals = r.botanicals
        .map((b) => `${b.commonName} (${b.scientificName || "N/A"})`)
        .join(" | ");

      const ingredients = r.ingredients
        .map(
          (ing) =>
            `${ing.name}${ing.amountValue ? ` (${ing.amountValue} ${ing.amountUnit || ""})` : ""}`
        )
        .join(" | ");

      const sources = r.sources.map((s) => s.citation).join(" | ");

      return [
        `"${r.id}"`,
        `"${r.slug}"`,
        `"${r.titleEn.replace(/"/g, '""')}"`,
        `"${(r.titleNative || "").replace(/"/g, '""')}"`,
        `"${r.stateOrUT}"`,
        `"${r.region}"`,
        `"${r.category}"`,
        `"${r.tradition}"`,
        `"${r.remedyType}"`,
        `"${r.traditionalUses.join(" | ").replace(/"/g, '""')}"`,
        `"${botanicals.replace(/"/g, '""')}"`,
        `"${ingredients.replace(/"/g, '""')}"`,
        `"${r.prepTimeMinutes || ""}"`,
        `"${r.safety.riskLevel}"`,
        `"${r.safety.avoidUnderAge ?? ""}"`,
        `"${r.safety.avoidInPregnancy}"`,
        `"${r.safety.drugInteractionClasses.join(" | ")}"`,
        `"${r.safety.allergens.join(" | ")}"`,
        `"${sources.replace(/"/g, '""')}"`,
        `"${r.verificationStatus}"`,
      ].join(",");
    });

    // Disclaimer row at end
    const disclaimerRow = `\n"DISCLAIMER:","${MANDATORY_ARCHIVE_DISCLAIMER.replace(/"/g, '""')}"`;

    // \uFEFF is UTF-8 Byte Order Mark so Microsoft Excel recognizes Hindi/Kannada/Tamil scripts
    const csvContent = "\uFEFF" + headers.join(",") + "\n" + rows.join("\n") + disclaimerRow;

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `hamare-nuskhe-export-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess("CSV exported with UTF-8 BOM");
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1C1917]/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] dark:bg-[#1E1C1A] border border-[#E7DEC8] dark:border-[#36332E] max-w-md w-full p-6 rounded-[2px] shadow-lg text-[#1C1917] dark:text-[#F5F0E6]">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#E7DEC8] dark:border-[#36332E]">
          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-[#9C4129]" />
            <h3 className="font-serif text-lg font-bold">
              Export Archive ({remedies.length} entries)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#F5F0E6] dark:hover:bg-[#22201D] rounded-[2px]"
            aria-label="Close export dialog"
          >
            <X className="w-4 h-4 text-[#44403C] dark:text-[#B8B2A7]" />
          </button>
        </div>

        <p className="text-xs text-[#44403C] dark:text-[#B8B2A7] mt-3 leading-relaxed">
          All exported files include complete ethnobotanical metadata, source citations, and the mandatory non-medical advice disclaimer.
        </p>

        {downloadSuccess && (
          <div className="mt-3 bg-[#FEF3C7] dark:bg-[#2B200E] border border-[#B45309] text-[#B45309] dark:text-[#FBBF24] p-2 text-xs rounded-[2px]">
            {downloadSuccess}
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 mt-5">
          <button
            onClick={handleExportJSON}
            className="w-full flex items-center justify-between p-3 border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#9C4129] bg-[#F5F0E6] dark:bg-[#22201D] text-left rounded-[2px] transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileJson className="w-5 h-5 text-[#9C4129]" />
              <div>
                <div className="text-sm font-medium">JSON Archive</div>
                <div className="text-[11px] text-[#44403C] dark:text-[#B8B2A7]">
                  Exact Zod schema array with _meta archival block
                </div>
              </div>
            </div>
            <span className="text-xs font-mono">.json</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full flex items-center justify-between p-3 border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#9C4129] bg-[#F5F0E6] dark:bg-[#22201D] text-left rounded-[2px] transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-5 h-5 text-[#2D5A27]" />
              <div>
                <div className="text-sm font-medium">CSV Spreadsheet</div>
                <div className="text-[11px] text-[#44403C] dark:text-[#B8B2A7]">
                  UTF-8 BOM formatted for Excel & Google Sheets
                </div>
              </div>
            </div>
            <span className="text-xs font-mono">.csv</span>
          </button>

          <button
            onClick={handlePrint}
            className="w-full flex items-center justify-between p-3 border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#9C4129] bg-[#F5F0E6] dark:bg-[#22201D] text-left rounded-[2px] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Printer className="w-5 h-5 text-[#44403C]" />
              <div>
                <div className="text-sm font-medium">Print Booklet</div>
                <div className="text-[11px] text-[#44403C] dark:text-[#B8B2A7]">
                  Clean A4 black-and-white printable collection
                </div>
              </div>
            </div>
            <span className="text-xs font-mono">print</span>
          </button>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-3 border-t border-[#E7DEC8] dark:border-[#36332E] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium border border-[#E7DEC8] dark:border-[#36332E] hover:bg-[#F5F0E6] dark:hover:bg-[#22201D] rounded-[2px]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

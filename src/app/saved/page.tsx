"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RemedyIndexRow from "@/components/RemedyIndexRow";
import RemedyCard from "@/components/RemedyCard";
import ExportModal from "@/components/ExportModal";
import { Remedy, RemedySchema } from "@/data/schema";
import {
  Bookmark,
  Download,
  Upload,
  Trash2,
  List,
  LayoutGrid,
  ArrowLeft,
  Check,
  AlertTriangle,
  Archive,
} from "lucide-react";
import { SandookIllustration, BrassCornerBracket, HeritageOrnateDivider } from "@/components/IndianMotifs";

export default function SavedDrawerPage() {
  const [allRemedies, setAllRemedies] = useState<Remedy[]>([]);
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"index" | "cards">("index");
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Load all remedies from API and saved slugs from localStorage
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/v1/remedies?limit=2000", {
          cache: "no-store",
          headers: { "Cache-Control": "no-cache" },
        });
        const data = await res.json();
        if (data && data.remedies) {
          setAllRemedies(data.remedies);
        }

        const savedRaw = localStorage.getItem("hn-saved-remedies");
        if (savedRaw) {
          setSavedSlugs(JSON.parse(savedRaw));
        }
      } catch (err) {
        console.error("Failed to load saved remedies:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const savedRemedies = allRemedies.filter((r) => savedSlugs.includes(r.slug));

  const clearAllSaved = () => {
    if (window.confirm("Are you sure you want to clear your saved heirloom drawer?")) {
      setSavedSlugs([]);
      localStorage.setItem("hn-saved-remedies", JSON.stringify([]));
    }
  };

  // Restore / Import bookmarks from a JSON file
  const handleRestoreFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        let slugsToAdd: string[] = [];

        // Check if file is full remedies export with remedies array or raw slugs
        if (parsed.remedies && Array.isArray(parsed.remedies)) {
          slugsToAdd = parsed.remedies.map((r: any) => r.slug).filter(Boolean);
        } else if (Array.isArray(parsed)) {
          slugsToAdd = parsed.map((item: any) => (typeof item === "string" ? item : item.slug)).filter(Boolean);
        }

        const merged = Array.from(new Set([...savedSlugs, ...slugsToAdd]));
        setSavedSlugs(merged);
        localStorage.setItem("hn-saved-remedies", JSON.stringify(merged));
        setImportStatus(`Successfully restored ${slugsToAdd.length} remedies to your heirloom drawer!`);
        setTimeout(() => setImportStatus(null), 4000);
      } catch (err) {
        setImportStatus("Error reading file. Please provide a valid Hamare Nuskhe JSON export.");
        setTimeout(() => setImportStatus(null), 4000);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 py-6 sm:py-10 pb-24 lg:pb-10">
        <header className="border-b-2 border-[#D8CBB8] dark:border-[#38332A] pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="stamp-badge stamp-folk">
              पारिवारिक संदूक • PRIVATE HEIRLOOM DRAWER
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight">
                Grandmother&apos;s Heirloom Drawer ({savedRemedies.length})
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5C5346] dark:text-[#C5BCB0] max-w-2xl leading-relaxed font-serif">
                Your private recipe collection stored securely in your browser sandbox. Works completely offline like an old copper and teak spice box (*Sandook*)—available whenever family cooking or seasonal ailments arise.
              </p>
            </div>

            {/* Actions: Export / Import / Clear */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {savedRemedies.length > 0 && (
                <button
                  type="button"
                  onClick={() => setIsExportOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-bold border border-[#B5945B]/60 bg-[#FAF6EE] dark:bg-[#201D1A] hover:border-[#9E2A2B] text-[#1C1917] dark:text-[#F4ECE0] rounded-[2px] transition-colors shadow-xs"
                >
                  <Download className="w-3.5 h-3.5 text-[#9E2A2B]" />
                  <span>Export Drawer</span>
                </button>
              )}

              {/* Restore input */}
              <label className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-bold border border-[#D8CBB8] dark:border-[#38332A] bg-[#FAF6EE] dark:bg-[#201D1A] hover:border-[#2D4A3E] text-[#1C1917] dark:text-[#F4ECE0] rounded-[2px] cursor-pointer transition-colors shadow-xs">
                <Upload className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>Restore Backup</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleRestoreFromFile}
                  className="sr-only"
                />
              </label>

              {savedRemedies.length > 0 && (
                <button
                  type="button"
                  onClick={clearAllSaved}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-wider font-bold border border-[#9E2A2B]/40 hover:border-[#9E2A2B] bg-[#FAF6EE] dark:bg-[#201D1A] text-[#9E2A2B] rounded-[2px] transition-colors shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Empty Drawer</span>
                </button>
              )}
            </div>
          </div>

          {importStatus && (
            <div className="mt-4 p-3 bg-[#FAF6EE] dark:bg-[#201D1A] border-l-4 border-l-[#D99B26] border border-[#D8CBB8] text-[#9E2A2B] dark:text-[#D99B26] text-xs font-mono rounded-[2px]">
              {importStatus}
            </div>
          )}
        </header>

        {loading ? (
          <div className="py-24 text-center text-sm font-mono uppercase tracking-wider text-[#5C5346] animate-pulse">
            Opening Grandmother&apos;s Heirloom Sandook...
          </div>
        ) : savedRemedies.length === 0 ? (
          /* Empty Drawer State Evoking Wooden & Brass Sandook / Masaledani */
          <div className="relative max-w-2xl mx-auto my-8 bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-10 sm:p-14 text-center rounded-[3px] shadow-[inset_0_0_24px_rgba(181,148,91,0.12)] space-y-6">
            {/* Brass Corner Brackets */}
            <BrassCornerBracket position="tl" className="absolute top-2 left-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="tr" className="absolute top-2 right-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="bl" className="absolute bottom-2 left-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="br" className="absolute bottom-2 right-2 w-5 h-5 text-[#B5945B]" />

            {/* Custom Sandook & Mortar-Pestle SVG Illustration */}
            <div className="flex justify-center">
              <SandookIllustration className="w-36 h-36" />
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#B5945B] font-bold block mb-1">
                रिक्त संदूक • HERITAGE ARCHIVE EMPTY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                Your Heirloom Drawer is Empty
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5346] dark:text-[#C5BCB0] max-w-md mx-auto leading-relaxed font-serif">
              When consulting any traditional recipe folio, tap <strong>&ldquo;Bookmark Folio&rdquo;</strong> to store it in your personal brass-bound drawer for instant offline access.
            </p>

            <div className="pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-mono uppercase tracking-wider font-bold bg-[#9E2A2B] text-[#FAF6EE] hover:bg-[#832014] rounded-[2px] transition-colors shadow-xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Explore the Heritage Archive</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Saved Remedies List */
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#D8CBB8] dark:border-[#38332A] pb-3 text-xs">
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#5C5346] dark:text-[#B8B2A7] font-semibold">
                Filed Specimens: {savedRemedies.length} Bookmarked Folios
              </span>

              {/* View Switcher */}
              <div className="flex items-center border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] overflow-hidden bg-[#FAF6EE] dark:bg-[#201D1A]">
                <button
                  type="button"
                  onClick={() => setViewMode("index")}
                  aria-label="Switch to Index List view"
                  className={`p-2 transition-colors ${
                    viewMode === "index"
                      ? "bg-[#9E2A2B] text-[#FAF6EE]"
                      : "text-[#5C5346] dark:text-[#B8B2A7] hover:bg-[#F4EFE6]"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("cards")}
                  aria-label="Switch to Herbarium Cards view"
                  className={`p-2 transition-colors ${
                    viewMode === "cards"
                      ? "bg-[#9E2A2B] text-[#FAF6EE]"
                      : "text-[#5C5346] dark:text-[#B8B2A7] hover:bg-[#F4EFE6]"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>

            {viewMode === "index" ? (
              <div className="divide-y divide-[#D8CBB8] dark:divide-[#38332A] border border-[#D8CBB8] dark:border-[#38332A] bg-[#FAF6EE] dark:bg-[#1E1C1A] rounded-[2px]">
                {savedRemedies.map((remedy, idx) => (
                  <RemedyIndexRow
                    key={remedy.id}
                    remedy={remedy}
                    folioNumber={idx + 1}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {savedRemedies.map((remedy, idx) => (
                  <RemedyCard
                    key={remedy.id}
                    remedy={remedy}
                    folioNumber={idx + 1}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Export Modal */}
        <ExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          remedies={savedRemedies}
        />

        <div className="mt-14 pt-4">
          <HeritageOrnateDivider className="opacity-80 text-[#B5945B]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

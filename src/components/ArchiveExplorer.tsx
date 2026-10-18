"use client";

import React, { useState, useEffect, useMemo, useRef, useDeferredValue } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Remedy, STATES_AND_UTS, CATEGORIES, REGIONS, REMEDY_TYPES } from "@/data/schema";
import RemedyIndexRow from "./RemedyIndexRow";
import RemedyCard from "./RemedyCard";
import ExportModal from "./ExportModal";
import AyurvedicHeritageGuide from "./AyurvedicHeritageGuide";
import {
  Search,
  X,
  SlidersHorizontal,
  RotateCcw,
  List,
  LayoutGrid,
  Download,
  AlertCircle,
  HelpCircle,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Loader2,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  initialRemedies: Remedy[];
  facets: {
    states: Record<string, number>;
    regions: Record<string, number>;
    categories: Record<string, number>;
    remedyTypes: Record<string, number>;
    traditionalUses: Record<string, number>;
    totalCount: number;
  };
}

function getPageNumbers(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

const COMMON_CONCERNS = [
  { id: "cough", label: "Cough & Cold (कफ-वात)", query: "cold" },
  { id: "acidity", label: "Acidity & Heat (पित्त शामक)", query: "acidity" },
  { id: "throat", label: "Sore Throat (कण्ठ्य)", query: "throat" },
  { id: "bloating", label: "Gas & Bloating (वात अनुलोमन)", query: "bloating" },
  { id: "digestion", label: "Digestion Comfort (दीपन-पाचन)", query: "digestive" },
  { id: "postpartum", label: "Postpartum Care (सूतिका परिचर्या)", query: "postpartum" },
  { id: "chills", label: "Seasonal Chills (ऋतु संधि)", query: "chills" },
];

export default function ArchiveExplorer({ initialRemedies, facets }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLanguage();

  const getConcernLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case "cough": return t.concernCough;
      case "acidity": return t.concernAcidity;
      case "throat": return t.concernThroat;
      case "bloating": return t.concernBloating;
      case "digestion": return t.concernDigestion;
      case "postpartum": return t.concernPostpartum;
      case "chills": return t.concernChills;
      default: return defaultLabel;
    }
  };

  const getCategoryLabel = (c: string) => {
    switch (c) {
      case "Respiratory": return t.catRespiratory;
      case "Digestion": return t.catDigestion;
      case "Immunity & Seasonal": return t.catImmunity;
      case "Joint & Muscle": return t.catJointMuscle;
      case "Skin & Hair": return t.catSkinHair;
      case "Postpartum & Women": return t.catPostpartum;
      case "Sleep & Calming": return t.catSleepCalming;
      case "Oral & Throat": return t.catOralThroat;
      case "General Wellness": return t.catGeneralWellness;
      default: return c;
    }
  };

  // Filter state
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const deferredQuery = useDeferredValue(query);
  const isSearchPending = query !== deferredQuery;

  const [selectedState, setSelectedState] = useState(searchParams.get("state") || "");
  const [selectedRegion, setSelectedRegion] = useState(searchParams.get("region") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "");
  const [maxPrep, setMaxPrep] = useState<number | "">(
    searchParams.get("maxPrep") ? Number(searchParams.get("maxPrep")) : ""
  );
  const [reviewedOnly, setReviewedOnly] = useState(searchParams.get("reviewed") === "true");
  const [activeConcern, setActiveConcern] = useState(searchParams.get("concern") || "");

  // Pagination state (default: list 10 remedies at once)
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const resultsTopRef = useRef<HTMLDivElement>(null);

  // Display state
  const [viewMode, setViewMode] = useState<"index" | "cards">("index");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(
    Boolean(
      searchParams.get("state") ||
      searchParams.get("region") ||
      searchParams.get("category") ||
      searchParams.get("type") ||
      searchParams.get("maxPrep") ||
      searchParams.get("reviewed")
    )
  );

  const activeFilterCount = [
    Boolean(selectedState),
    Boolean(selectedRegion),
    Boolean(selectedCategory),
    Boolean(selectedType),
    Boolean(maxPrep),
    Boolean(reviewedOnly),
  ].filter(Boolean).length;

  // Load view mode preference
  useEffect(() => {
    const saved = localStorage.getItem("hn-view-mode") as "index" | "cards" | null;
    if (saved) setViewMode(saved);
  }, []);

  // Keyboard shortcut '/' to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listen to regional location & language selection
  useEffect(() => {
    const handleLangChange = (e: any) => {
      if (e.detail?.state && e.detail.lang !== "en") {
        setSelectedState(e.detail.state);
      }
    };
    window.addEventListener("hn-language-changed", handleLangChange);
    return () => window.removeEventListener("hn-language-changed", handleLangChange);
  }, []);

  // Sync state to URL search parameters without triggering Next.js server RSC refetches
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedState) params.set("state", selectedState);
    if (selectedRegion) params.set("region", selectedRegion);
    if (selectedCategory) params.set("category", selectedCategory);
    if (selectedType) params.set("type", selectedType);
    if (maxPrep) params.set("maxPrep", String(maxPrep));
    if (reviewedOnly) params.set("reviewed", "true");
    if (activeConcern) params.set("concern", activeConcern);

    const queryString = params.toString();
    const target = queryString ? `/?${queryString}` : "/";
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", target);
    }
  }, [
    query,
    selectedState,
    selectedRegion,
    selectedCategory,
    selectedType,
    maxPrep,
    reviewedOnly,
    activeConcern,
  ]);

  const toggleViewMode = (mode: "index" | "cards") => {
    setViewMode(mode);
    localStorage.setItem("hn-view-mode", mode);
  };

  const handleConcernClick = (concern: (typeof COMMON_CONCERNS)[number]) => {
    if (activeConcern === concern.id) {
      setActiveConcern("");
      setQuery("");
    } else {
      setActiveConcern(concern.id);
      setQuery(concern.query);
    }
  };

  const resetAllFilters = () => {
    setQuery("");
    setSelectedState("");
    setSelectedRegion("");
    setSelectedCategory("");
    setSelectedType("");
    setMaxPrep("");
    setReviewedOnly(false);
    setActiveConcern("");
  };

  // Pre-index remedies into a single lowercase search corpus for 60 FPS instantaneous filtering
  const indexedRemedies = useMemo(() => {
    return initialRemedies.map((r) => {
      const parts = [
        r.titleEn,
        r.titleNative || "",
        r.transliteration || "",
        ...r.alternateNames,
        ...r.traditionalUses,
        ...r.botanicals.map((b) => `${b.commonName} ${b.scientificName || ""}`),
        r.stateOrUT,
        ...r.ingredients.map((i) => i.name),
        r.communityOrTradition || "",
      ];
      return {
        remedy: r,
        searchCorpus: parts.join(" ").toLowerCase(),
      };
    });
  }, [initialRemedies]);

  // Ultra-fast filtered remedies evaluation using pre-indexed corpus
  const filteredRemedies = useMemo(() => {
    const q = deferredQuery.toLowerCase().trim();
    const hasQuery = q.length > 0;

    return indexedRemedies
      .filter(({ remedy: r, searchCorpus }) => {
        if (hasQuery && !searchCorpus.includes(q)) return false;
        if (selectedState && r.stateOrUT !== selectedState) return false;
        if (selectedRegion && r.region !== selectedRegion) return false;
        if (selectedCategory && r.category !== selectedCategory) return false;
        if (selectedType && r.remedyType !== selectedType) return false;
        if (maxPrep && (r.prepTimeMinutes === null || r.prepTimeMinutes > maxPrep)) return false;
        if (reviewedOnly && r.verificationStatus !== "EXPERT_REVIEWED") return false;
        return true;
      })
      .map(({ remedy }) => remedy);
  }, [
    indexedRemedies,
    deferredQuery,
    selectedState,
    selectedRegion,
    selectedCategory,
    selectedType,
    maxPrep,
    reviewedOnly,
  ]);

  // Reset pagination to page 1 whenever any filter, search query, or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    deferredQuery,
    selectedState,
    selectedRegion,
    selectedCategory,
    selectedType,
    maxPrep,
    reviewedOnly,
    activeConcern,
    pageSize,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredRemedies.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredRemedies.length);

  const visibleRemedies = useMemo(() => {
    return filteredRemedies.slice(startIndex, endIndex);
  }, [filteredRemedies, startIndex, endIndex]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Scroll listener for floating Back-to-Top pill
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 450);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const hasActiveFilters = Boolean(
    query ||
      selectedState ||
      selectedRegion ||
      selectedCategory ||
      selectedType ||
      maxPrep ||
      reviewedOnly ||
      activeConcern
  );

  return (
    <section className="space-y-6">
      {/* Traditional Indian Ayurvedic Heritage Guide & Tridosha Showcase */}
      <AyurvedicHeritageGuide
        onSelectConcern={(concernQuery) => {
          setQuery(concernQuery);
          setActiveConcern("");
          searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }}
      />

      {/* Apple-style Widescreen Split Layout (Sidebar on lg+, Unified Flow on mobile) */}
      <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
        {/* Desktop Left Sidebar: Apple-inspired Facets Inspector */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-24 space-y-4">
          <div className="bg-[#FAF6EE] dark:bg-[#1F1C18] border border-[#D8CBB8] dark:border-[#383229] p-4 rounded-[2px] shadow-[0_1px_3px_rgba(45,38,30,0.03)] space-y-4">
            {/* Sidebar Header: Apothecary Drawer Handle Style */}
            <div className="flex items-center justify-between pb-3 border-b border-[#D8CBB8] dark:border-[#383229]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#9E2A2B] dark:text-[#D4B373]" />
                <span className="font-mono text-sm font-bold uppercase tracking-[0.08em] text-[#1C1917] dark:text-[#F4EFE6]">
                  Apothecary Index Drawer
                </span>
                {activeFilterCount > 0 && (
                  <span className="w-4.5 h-4.5 rounded-[2px] bg-[#9E2A2B] text-[#FAF6EE] font-mono text-xs font-bold flex items-center justify-center">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="font-mono text-xs text-[#9E2A2B] dark:text-[#D4B373] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetFilters}</span>
                </button>
              )}
            </div>

            {/* Filter: State / UT (Classic Framed Ledger Input) */}
            <div>
              <label className="block font-mono text-xs sm:text-[13px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase tracking-[0.08em] mb-1.5">
                {t.filterState}
              </label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF6EE] dark:bg-[#161412] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-[#1C1917] dark:text-[#F4EFE6] focus:border-[#9E2A2B] focus:outline-none focus:ring-1 focus:ring-[#9E2A2B] text-sm font-mono tracking-wide"
              >
                <option value="">{t.allStates}</option>
                {STATES_AND_UTS.map((st) => {
                  const count = facets.states[st] || 0;
                  return (
                    <option key={st} value={st}>
                      {st} {count > 0 ? `(${count})` : ""}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* Filter: Region (2-Column Ledger Grid with Visible Hairline Borders) */}
            <div>
              <label className="block font-mono text-xs sm:text-[13px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase tracking-[0.08em] mb-1.5">
                {t.filterRegion}
              </label>
              <div className="grid grid-cols-2 border border-[#E2D9C8] dark:border-[#2D271F] divide-x divide-y divide-[#E2D9C8] dark:divide-[#2D271F] rounded-[2px] overflow-hidden bg-[#FAF6EE] dark:bg-[#161412]">
                {REGIONS.map((r) => {
                  const isSelected = selectedRegion === r;
                  const count = facets.regions[r] || 0;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setSelectedRegion(isSelected ? "" : r)}
                      className={`p-2.5 text-left text-xs sm:text-[13px] font-mono uppercase tracking-wider transition-colors flex items-center justify-between ${
                        isSelected
                          ? "bg-[#9E2A2B] text-[#FAF6EE] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                          : "hover:bg-[#D99B26]/15 hover:text-[#9E2A2B] text-[#5C5346] dark:text-[#C7BDB0]"
                      }`}
                    >
                      <span className="truncate">{r}</span>
                      <span className={`text-xs font-bold opacity-80 ${isSelected ? "text-white" : "text-[#B5945B]"}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Category (Classic Framed Ledger Select) */}
            <div>
              <label className="block font-mono text-xs sm:text-[13px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase tracking-[0.08em] mb-1.5">
                {t.filterCategory}
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF6EE] dark:bg-[#161412] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-[#1C1917] dark:text-[#F4EFE6] focus:border-[#9E2A2B] focus:outline-none focus:ring-1 focus:ring-[#9E2A2B] text-sm font-mono tracking-wide"
              >
                <option value="">{t.allCategories}</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {getCategoryLabel(c)} {facets.categories[c] ? `(${facets.categories[c]})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter: Remedy Type */}
            <div>
              <label className="block font-mono text-xs sm:text-[13px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase tracking-[0.08em] mb-1.5">
                {t.filterType}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#FAF6EE] dark:bg-[#161412] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-[#1C1917] dark:text-[#F4EFE6] focus:border-[#9E2A2B] focus:outline-none focus:ring-1 focus:ring-[#9E2A2B] text-sm font-mono tracking-wide"
              >
                <option value="">{t.allTypes}</option>
                {REMEDY_TYPES.map((tItem) => (
                  <option key={tItem} value={tItem}>
                    {tItem.replace(/_/g, " ")} {facets.remedyTypes[tItem] ? `(${facets.remedyTypes[tItem]})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter: Max Prep Time (4-Column Ledger Grid) */}
            <div>
              <label className="block font-mono text-xs sm:text-[13px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase tracking-[0.08em] mb-1.5">
                {t.filterPrepTime}
              </label>
              <div className="grid grid-cols-4 border border-[#E2D9C8] dark:border-[#2D271F] divide-x divide-[#E2D9C8] dark:divide-[#2D271F] rounded-[2px] overflow-hidden bg-[#FAF6EE] dark:bg-[#161412]">
                {[
                  { label: "Any", val: "" },
                  { label: "10m", val: 10 },
                  { label: "20m", val: 20 },
                  { label: "30m", val: 30 },
                ].map((item) => {
                  const isSelected = maxPrep === item.val;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setMaxPrep(isSelected && item.val !== "" ? "" : (item.val as number | ""))}
                      className={`py-2 text-xs sm:text-[13px] font-mono uppercase tracking-wider text-center transition-colors ${
                        isSelected
                          ? "bg-[#9E2A2B] text-[#FAF6EE] font-bold shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                          : "text-[#5C5346] dark:text-[#C7BDB0] hover:bg-[#D99B26]/15 hover:text-[#9E2A2B]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter: Reviewed Only */}
            <div className="pt-2.5 border-t border-[#D8CBB8] dark:border-[#383229]">
              <label className="flex items-center justify-between cursor-pointer select-none">
                <span className="font-mono text-xs font-bold text-[#1C1917] dark:text-[#F4EFE6] uppercase tracking-wider">
                  {t.filterReviewedOnly}
                </span>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={reviewedOnly}
                    onChange={(e) => setReviewedOnly(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-[#D8CBB8] dark:bg-[#383229] peer-focus:outline-none rounded-[2px] peer peer-checked:after:translate-x-4 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[#FAF6EE] after:border-[#B5945B] after:border after:rounded-[1px] after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D4A3E]"></div>
                </div>
              </label>
            </div>
          </div>
        </aside>

        {/* Main Area: Spotlight Search, Quick Chips, Controls & Cards */}
        <div className="lg:col-span-9 space-y-6">
          {/* Spotlight Search Bar */}
          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 flex items-center">
              <label htmlFor="archive-search" className="sr-only">
                Search traditional home remedies
              </label>
              <Search className="w-5 h-5 absolute left-4 text-[#B5945B] pointer-events-none" />
              <input
                id="archive-search"
                ref={searchInputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (activeConcern) setActiveConcern("");
                }}
                placeholder={t.searchPlaceholder}
                className="w-full pl-11 pr-24 py-3 bg-[#FAF6EE] dark:bg-[#1F1C18] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-sm sm:text-base text-[#1C1917] dark:text-[#F4EFE6] focus:outline-none focus:border-[#9E2A2B] focus:ring-1 focus:ring-[#9E2A2B]/30 placeholder-[#5C5346]/50 dark:placeholder-[#C7BDB0]/50 font-body transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
              />

              <div className="absolute right-3.5 flex items-center gap-2">
                {isSearchPending && (
                  <Loader2 className="w-4.5 h-4.5 text-[#9E2A2B] dark:text-[#D4B373] animate-spin" />
                )}
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("");
                      setActiveConcern("");
                    }}
                    className="p-1 hover:bg-[#E2D9C8] dark:hover:bg-[#25221F] text-[#5C5346] dark:text-[#C7BDB0] rounded-[2px] transition-colors"
                    aria-label="Clear search query"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <kbd className="hidden sm:inline-block border border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#161412] px-2.5 py-1 text-xs text-[#5C5346] dark:text-[#C7BDB0] rounded-[2px] font-mono tracking-wider font-semibold">
                  /
                </kbd>
              </div>
            </div>

            {/* Mobile Filters Toggle Button */}
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden flex items-center gap-2 px-4 py-3 border rounded-[2px] font-mono text-sm uppercase tracking-wider transition-colors flex-shrink-0 font-bold ${
                showFilters || activeFilterCount > 0
                  ? "bg-[#9E2A2B] text-[#FAF6EE] border-[#9E2A2B]"
                  : "bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#5C5346] dark:text-[#C7BDB0] border-[#D8CBB8] dark:border-[#383229] hover:border-[#9E2A2B]"
              }`}
              aria-expanded={showFilters}
            >
              <SlidersHorizontal className="w-4.5 h-4.5 text-[#B5945B]" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4.5 h-4.5 rounded-[1px] bg-[#D99B26] text-[#1C1917] text-xs font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Filter Drawer (Only visible on mobile when toggled) */}
          {showFilters && (
            <div className="lg:hidden bg-[#FAF6EE] dark:bg-[#1F1C18] border border-[#D8CBB8] dark:border-[#383229] p-4 rounded-[2px] shadow-[0_1px_3px_rgba(45,38,30,0.04)] space-y-3 animate-in fade-in duration-150">
              <div className="flex items-center justify-between pb-1.5 border-b border-[#D8CBB8] dark:border-[#383229]">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#9E2A2B] dark:text-[#D4B373]">
                  Refine Archive Folios
                </span>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={resetAllFilters}
                    className="font-mono text-xs text-[#9E2A2B] hover:underline flex items-center gap-1 font-semibold uppercase tracking-wider"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>{t.resetFilters}</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                {/* State / UT */}
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase mb-1">
                    {t.filterState}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full p-2 bg-[#FAF6EE] dark:bg-[#161412] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-xs font-mono"
                  >
                    <option value="">{t.allStates}</option>
                    {STATES_AND_UTS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block font-mono text-[11px] font-bold text-[#5C5346] dark:text-[#C7BDB0] uppercase mb-1">
                    {t.filterCategory}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-[#FAF6EE] dark:bg-[#161412] border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] text-xs font-mono"
                  >
                    <option value="">{t.allCategories}</option>
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{getCategoryLabel(c)}</option>
                    ))}
                  </select>
                </div>

                {/* Reviewed Only */}
                <div className="flex flex-col justify-end pb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={reviewedOnly}
                      onChange={(e) => setReviewedOnly(e.target.checked)}
                      className="rounded-[2px] border-[#D8CBB8] text-[#2D4A3E] focus:ring-[#2D4A3E]"
                    />
                    <span className="font-mono text-xs text-[#1C1917] dark:text-[#F4EFE6] font-bold uppercase tracking-wider">
                      {t.filterReviewedOnly}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Common Concerns Quick Chips (Archival Index Tabs) */}
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x flex-nowrap sm:flex-wrap -mx-1 px-1 sm:mx-0 sm:px-0">
              {COMMON_CONCERNS.map((c) => {
                const isSelected = activeConcern === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleConcernClick(c)}
                    className={`font-mono text-xs uppercase tracking-[0.05em] px-3 py-1.5 rounded-[2px] border transition-all flex items-center gap-1.5 flex-shrink-0 whitespace-nowrap font-bold ${
                      isSelected
                        ? "bg-[#9E2A2B] text-[#FAF6EE] border-[#9E2A2B] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                        : "bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#5C5346] dark:text-[#C7BDB0] border-[#D8CBB8] dark:border-[#383229] hover:border-[#9E2A2B] hover:text-[#9E2A2B]"
                    }`}
                  >
                    <span>{getConcernLabel(c.id, c.label)}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Filter Bar & View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-b border-[#D8CBB8] dark:border-[#383229] pb-2.5 text-sm">
            {/* Active summary */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-serif font-bold text-sm sm:text-base text-[#1C1917] dark:text-[#F4EFE6]">
                {t.showingResults
                  .replace("{count}", String(filteredRemedies.length))
                  .replace("{total}", String(initialRemedies.length))}
              </span>

              {selectedState && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] border border-[#B5945B]/70 bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] font-serif font-bold text-xs tracking-wide">
                  <MapPin className="w-3 h-3 text-[#A62B21]" />
                  <span>{selectedState}</span>
                </span>
              )}

              {selectedCategory && (
                <span className="font-serif text-xs font-bold px-2.5 py-0.5 rounded-[2px] border border-[#B5945B]/50 bg-[#B5945B]/10 text-[#5C5346] dark:text-[#D4B373]">
                  {getCategoryLabel(selectedCategory)}
                </span>
              )}

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="font-mono text-xs uppercase tracking-wider text-[#9E2A2B] dark:text-[#D4B373] hover:underline flex items-center gap-1 font-bold ml-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.resetFilters}</span>
                </button>
              )}
            </div>

            {/* View mode toggle & Export button */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
              {/* Export Menu trigger */}
              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] hover:bg-[#9E2A2B] hover:text-[#FAF6EE] hover:border-[#9E2A2B] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-[0_1px_2px_rgba(45,38,30,0.03)]"
              >
                <Download className="w-3.5 h-3.5 text-[#B5945B]" />
                <span>{t.exportDrawer} ({filteredRemedies.length})</span>
              </button>

              {/* Archival Ledger View Switcher */}
              <div className="flex items-center border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] divide-x divide-[#D8CBB8] dark:divide-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] overflow-hidden">
                <button
                  id="view-index-btn"
                  type="button"
                  onClick={() => toggleViewMode("index")}
                  aria-label="Switch to Index List view"
                  className={`p-1.5 transition-colors ${
                    viewMode === "index"
                      ? "bg-[#9E2A2B] text-[#FAF6EE] font-bold"
                      : "text-[#5C5346] dark:text-[#C7BDB0] hover:bg-[#D99B26]/10"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  id="view-cards-btn"
                  type="button"
                  onClick={() => toggleViewMode("cards")}
                  aria-label="Switch to Cards view"
                  className={`p-1.5 transition-colors ${
                    viewMode === "cards"
                      ? "bg-[#9E2A2B] text-[#FAF6EE] font-bold"
                      : "text-[#5C5346] dark:text-[#C7BDB0] hover:bg-[#D99B26]/10"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Top scroll anchor for smooth page transitions */}
          <div ref={resultsTopRef} className="scroll-mt-28" />

          {filteredRemedies.length === 0 ? (
            /* Empty State */
            <div className="bg-[#FAF6ED] dark:bg-[#1E1C1A] border border-[#DFCFAF]/70 dark:border-[#38332A]/70 p-10 text-center rounded-2xl space-y-3 shadow-xs">
              <HelpCircle className="w-8 h-8 text-[#9C3820] mx-auto opacity-80" />
              <h3 className="font-serif text-lg font-bold text-[#1C1714] dark:text-[#F5F0E6]">
                {t.noResultsTitle}
              </h3>
              <p className="text-xs text-[#4A3E34] dark:text-[#B8B2A7] max-w-md mx-auto leading-relaxed">
                {t.noResultsDesc}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="px-4 py-2 text-xs font-medium bg-[#9C3820] text-[#FDFBF7] rounded-full hover:bg-[#832014] transition-colors shadow-xs"
                >
                  {t.clearFiltersBtn}
                </button>
              </div>
            </div>
          ) : viewMode === "index" ? (
            /* 1. Index View: Book-style Contents Rows */
            <div className="divide-y divide-[#DFCFAF]/40 dark:divide-[#38332A]/40 border-t border-[#DFCFAF]/40 dark:border-[#38332A]/40 transition-opacity duration-200">
              {visibleRemedies.map((remedy, idx) => (
                <RemedyIndexRow
                  key={remedy.id}
                  remedy={remedy}
                  folioNumber={startIndex + idx + 1}
                />
              ))}
            </div>
          ) : (
            /* 2. Cards View: Responsive Grid utilizing widescreen space */
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity duration-200">
              {visibleRemedies.map((remedy, idx) => (
                <RemedyCard
                  key={remedy.id}
                  remedy={remedy}
                  folioNumber={startIndex + idx + 1}
                />
              ))}
            </div>
          )}

          {/* Apple-styled Clean Pagination Controls */}
          {filteredRemedies.length > 0 && (
            <div className="pt-8 pb-4 border-t border-[#DFCFAF]/50 dark:border-[#38332A]/50 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Folios range count */}
                <div className="text-xs text-[#4A3E34] dark:text-[#BFB6A8] font-medium flex items-center gap-2">
                  <span>Showing folios</span>
                  <span className="font-mono font-bold text-[#9C3820] dark:text-[#F59E0B]">
                    {startIndex + 1}–{endIndex}
                  </span>
                  <span>of</span>
                  <span className="font-mono font-bold text-[#1C1714] dark:text-[#F4ECE0]">
                    {filteredRemedies.length}
                  </span>
                  {totalPages > 1 && (
                    <span className="text-xs opacity-75 hidden sm:inline">
                      • Page {currentPage} of {totalPages}
                    </span>
                  )}
                </div>

                {/* Per-page size pills */}
                <div className="flex items-center gap-2 text-sm text-[#5C5346] dark:text-[#C7BDB0]">
                  <span className="font-mono uppercase text-xs font-bold tracking-wider">Per page:</span>
                  <div className="inline-flex items-center border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] divide-x divide-[#D8CBB8] dark:divide-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18]">
                    {[10, 25, 50].map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          setPageSize(size);
                          setCurrentPage(1);
                          resultsTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={`px-3 py-1.5 text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                          pageSize === size
                            ? "bg-[#9E2A2B] text-[#FAF6EE]"
                            : "text-[#5C5346] dark:text-[#C7BDB0] hover:bg-[#D99B26]/10"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Numbered Page Stepper */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#1C1917] dark:text-[#F4EFE6] hover:border-[#9E2A2B] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_1px_2px_rgba(45,38,30,0.03)]"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  {getPageNumbers(currentPage, totalPages).map((p, pIdx) =>
                    typeof p === "number" ? (
                      <button
                        key={p}
                        type="button"
                        onClick={() => goToPage(p)}
                        className={`min-w-9 h-9 px-2.5 rounded-[2px] font-mono text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                          currentPage === p
                            ? "bg-[#9E2A2B] text-[#FAF6EE] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                            : "bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#5C5346] dark:text-[#C7BDB0] hover:border-[#9E2A2B] border border-[#D8CBB8] dark:border-[#383229]"
                        }`}
                        aria-current={currentPage === p ? "page" : undefined}
                      >
                        {p}
                      </button>
                    ) : (
                      <span key={`dots-${pIdx}`} className="px-1.5 text-xs sm:text-sm text-[#5C5346]/50 dark:text-[#C7BDB0]/50 select-none font-mono">
                        ...
                      </span>
                    )
                  )}

                  <button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] font-mono text-xs sm:text-sm uppercase tracking-wider font-bold bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#1C1917] dark:text-[#F4EFE6] hover:border-[#9E2A2B] disabled:opacity-35 disabled:cursor-not-allowed transition-all cursor-pointer shadow-[0_1px_2px_rgba(45,38,30,0.03)]"
                    aria-label="Next Page"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-30 flex items-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#FAF6EE]/95 dark:bg-[#1E1C1A]/95 text-[#1C1917] dark:text-[#F4ECE0] border border-[#B5945B]/60 dark:border-[#383229] shadow-xl backdrop-blur-md hover:border-[#9E2A2B] hover:scale-105 active:scale-95 transition-all text-xs font-semibold cursor-pointer animate-in fade-in slide-in-from-bottom-3 duration-200"
          aria-label="Scroll back to top"
        >
          <ChevronUp className="w-4 h-4 text-[#9C3820] dark:text-[#F59E0B]" />
          <span>Top</span>
        </button>
      )}

      {/* Export Modal Dialog */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        remedies={filteredRemedies}
      />
    </section>
  );
}

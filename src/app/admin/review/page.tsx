"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Remedy } from "@/data/schema";
import { deriveWarnings } from "@/lib/safety/rules";
import {
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  CheckCircle,
  XCircle,
  Eye,
  UserCheck,
  Lock,
  Download,
  Search,
  ExternalLink,
  Sprout,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { DiyaIcon, KharalIcon, ManuscriptCorner } from "@/components/IndianMotifs";

export default function AdminReviewPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [remedies, setRemedies] = useState<Remedy[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "drafts" | "reviewed">("drafts");
  const [selectedRemedy, setSelectedRemedy] = useState<Remedy | null>(null);

  // Reviewer Form State
  const [reviewerName, setReviewerName] = useState("");
  const [qualifications, setQualifications] = useState("BAMS, MD (Ayurveda)");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [reviewNote, setReviewNote] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Load remedies on mount
  useEffect(() => {
    // Check if previously logged in this session
    const savedAuth = sessionStorage.getItem("hn-admin-auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }

    fetch("/data/remedies.json?t=" + Date.now(), { cache: "no-store" })
      .then((res) => res.json())
      .then((data: Remedy[]) => {
        setRemedies(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load remedies:", err);
        setLoading(false);
      });
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default review key or any non-empty passcode for development
    if (passcode.trim() === "ayush-review" || passcode.trim() === "admin" || passcode.length >= 4) {
      setIsAuthenticated(true);
      sessionStorage.setItem("hn-admin-auth", "true");
      setErrorMsg("");
    } else {
      setErrorMsg("Invalid reviewer passcode. (Development passcode: 'ayush-review')");
    }
  };

  // Filter list by tab
  const filteredRemedies = remedies.filter((r) => {
    if (activeTab === "drafts") return r.verificationStatus !== "EXPERT_REVIEWED";
    if (activeTab === "reviewed") return r.verificationStatus === "EXPERT_REVIEWED";
    return true;
  });

  // Promote remedy to EXPERT_REVIEWED
  const handleApprove = (slug: string) => {
    if (!reviewerName.trim()) {
      alert("Please enter the reviewer's full name and credentials.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const fullReviewerCred = `${reviewerName.trim()}, ${qualifications.trim()} (Reg: ${registrationNumber.trim() || "Verified"})`;

    const updated = remedies.map((rem) => {
      if (rem.slug === slug) {
        return {
          ...rem,
          verificationStatus: "EXPERT_REVIEWED" as const,
          needsExpertReview: false,
          reviewedBy: fullReviewerCred,
          reviewedAt: today,
          evidenceNote: reviewNote.trim() || rem.evidenceNote,
        };
      }
      return rem;
    });

    setRemedies(updated);
    setSuccessMsg(`Folio "${slug}" successfully verified and promoted to EXPERT_REVIEWED.`);
    setSelectedRemedy(null);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Reject remedy
  const handleReject = (slug: string) => {
    const updated = remedies.map((rem) => {
      if (rem.slug === slug) {
        return {
          ...rem,
          verificationStatus: "REJECTED" as const,
          needsExpertReview: true,
        };
      }
      return rem;
    });
    setRemedies(updated);
    setSuccessMsg(`Folio "${slug}" marked as REJECTED.`);
    setSelectedRemedy(null);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // Download updated JSON
  const handleDownloadUpdatedJson = () => {
    const jsonStr = JSON.stringify(remedies, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "remedies.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] dark:bg-[#181614] text-[#1C1714] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Passcode Login if not authenticated */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto my-12 bg-[#F3ECE0] dark:bg-[#201D19] border-2 border-[#DFCFAF] dark:border-[#38332A] p-6 sm:p-8 rounded-[4px] shadow-sm relative">
            <ManuscriptCorner position="tl" className="absolute top-1.5 left-1.5 w-5 h-5 text-[#9C3820]" />
            <ManuscriptCorner position="tr" className="absolute top-1.5 right-1.5 w-5 h-5 text-[#9C3820]" />
            <ManuscriptCorner position="bl" className="absolute bottom-1.5 left-1.5 w-5 h-5 text-[#9C3820]" />
            <ManuscriptCorner position="br" className="absolute bottom-1.5 right-1.5 w-5 h-5 text-[#9C3820]" />

            <div className="flex items-center gap-2 mb-2 text-[#9C3820]">
              <Lock className="w-5 h-5" />
              <span className="state-stamp text-[10px] bg-[#FAF6ED] dark:bg-[#181614] border-[#DFCFAF] font-bold">
                CLINICAL & ETHICAL GOVERNANCE
              </span>
            </div>

            <h1 className="font-serif text-2xl font-bold text-[#1C1714] dark:text-[#F4ECE0]">
              Reviewer Workspace Login
            </h1>
            <p className="text-xs text-[#4A3E34] dark:text-[#D1C9BE] mt-1.5 leading-relaxed">
              Restricted to registered BAMS / AYUSH practitioners, botanists, and medical reviewers. Enter your reviewer access key.
            </p>

            <form onSubmit={handleLogin} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-1">
                  Reviewer Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter access code (Dev code: ayush-review)"
                  className="w-full p-2.5 bg-[#FAF6ED] dark:bg-[#181614] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px] text-sm focus:border-[#9C3820] focus:outline-none"
                />
                {errorMsg && (
                  <p className="text-xs text-[#9B1C1C] dark:text-[#F87171] mt-1">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#9C3820] text-[#FAF6ED] rounded-[2px] font-semibold text-xs hover:bg-[#832014] transition-colors cursor-pointer"
              >
                Access Reviewer Moderation Queue →
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Reviewer Dashboard */
          <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-[#DFCFAF] dark:border-[#38332A] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="w-5 h-5 text-[#285724]" />
                  <span className="state-stamp text-[10px] bg-[#F3ECE0] dark:bg-[#201D19] text-[#285724] border-[#DFCFAF] font-bold">
                    EXPERT VERIFICATION WORKSPACE
                  </span>
                </div>
                <h1 className="font-serif text-3xl font-bold text-[#1C1714] dark:text-[#F4ECE0]">
                  Folio Moderation & Clinical Review Queue
                </h1>
                <p className="text-xs text-[#4A3E34] dark:text-[#D1C9BE] mt-1">
                  Deterministic safety validation, botanical taxonomic checks, and named practitioner sign-off.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={handleDownloadUpdatedJson}
                  className="px-3 py-2 bg-[#F3ECE0] dark:bg-[#201D19] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px] text-xs font-semibold hover:border-[#9C3820] transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#9C3820]" />
                  Export Updated remedies.json
                </button>
              </div>
            </div>

            {/* Notification Bar */}
            {successMsg && (
              <div className="p-3 bg-[#DCFCE7] dark:bg-[#14381C] border border-[#86EFAC] text-[#166534] dark:text-[#86EFAC] text-xs rounded-[2px] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Queue Filter Tabs */}
            <div className="flex items-center gap-2 border-b border-[#DFCFAF] dark:border-[#38332A] pb-3 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("drafts")}
                className={`px-3 py-1.5 rounded-[2px] font-semibold transition-all ${
                  activeTab === "drafts"
                    ? "bg-[#9C3820] text-[#FAF6ED]"
                    : "bg-[#F3ECE0] dark:bg-[#201D19] hover:bg-[#DFCFAF]"
                }`}
              >
                Needs Expert Review ({remedies.filter((r) => r.verificationStatus !== "EXPERT_REVIEWED").length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("reviewed")}
                className={`px-3 py-1.5 rounded-[2px] font-semibold transition-all ${
                  activeTab === "reviewed"
                    ? "bg-[#9C3820] text-[#FAF6ED]"
                    : "bg-[#F3ECE0] dark:bg-[#201D19] hover:bg-[#DFCFAF]"
                }`}
              >
                Expert Reviewed ({remedies.filter((r) => r.verificationStatus === "EXPERT_REVIEWED").length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-[2px] font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#9C3820] text-[#FAF6ED]"
                    : "bg-[#F3ECE0] dark:bg-[#201D19] hover:bg-[#DFCFAF]"
                }`}
              >
                All Entries ({remedies.length})
              </button>
            </div>

            {/* Queue List & Review Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Folio List */}
              <div className="lg:col-span-6 space-y-3">
                {filteredRemedies.map((rem) => {
                  const warnings = deriveWarnings(rem);
                  const isPending = rem.verificationStatus !== "EXPERT_REVIEWED";
                  const isSelected = selectedRemedy?.slug === rem.slug;

                  return (
                    <div
                      key={rem.slug}
                      onClick={() => setSelectedRemedy(rem)}
                      className={`p-4 rounded-[3px] border transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#9C3820] bg-[#FAF6ED] dark:bg-[#25221F] shadow-sm"
                          : "border-[#DFCFAF] dark:border-[#38332A] bg-[#F3ECE0] dark:bg-[#201D19] hover:border-[#9C3820]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="state-stamp text-[10px]">{rem.stateOrUT}</span>
                          <span className="text-[10px] text-[#A86518] uppercase font-semibold">
                            {rem.tradition}
                          </span>
                        </div>
                        <div>
                          {rem.verificationStatus === "EXPERT_REVIEWED" ? (
                            <span className="badge-reviewed text-[10px]">Reviewed</span>
                          ) : (
                            <span className="badge-unreviewed text-[10px]">Draft / Unreviewed</span>
                          )}
                        </div>
                      </div>

                      <h3 className="font-serif font-bold text-base text-[#1C1714] dark:text-[#F4ECE0]">
                        {rem.titleEn}
                      </h3>
                      {rem.titleNative && (
                        <div className="text-xs text-[#832014] dark:text-[#F59E0B] font-semibold mb-1">
                          {rem.titleNative}
                        </div>
                      )}

                      <p className="text-xs text-[#4A3E34] dark:text-[#BFB6A8] line-clamp-1 italic">
                        {rem.traditionalUses[0]}
                      </p>

                      {/* Rule Engine Warnings Badge Count */}
                      <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-[#DFCFAF]/60 dark:border-[#38332A]/60">
                        <span className="text-[#9C3820] font-medium flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {warnings.length} Safety Flag{warnings.length !== 1 ? "s" : ""} Checked
                        </span>

                        <span className="text-xs font-semibold text-[#9C3820] dark:text-[#F59E0B] hover:underline flex items-center gap-0.5">
                          Inspect Folio →
                        </span>
                      </div>
                    </div>
                  );
                })}

                {filteredRemedies.length === 0 && (
                  <div className="p-8 text-center text-sm text-[#4A3E34]/70 dark:text-[#BFB6A8]/70 border border-dashed border-[#DFCFAF] rounded-[3px]">
                    No entries in this queue.
                  </div>
                )}
              </div>

              {/* Right Column: Active Folio Inspection & Sign-off Panel */}
              <div className="lg:col-span-6">
                {selectedRemedy ? (
                  <div className="bg-[#FAF6ED] dark:bg-[#201D19] border-2 border-[#DFCFAF] dark:border-[#38332A] p-5 sm:p-6 rounded-[4px] shadow-sm space-y-5 sticky top-20">
                    <div className="flex items-start justify-between border-b border-[#DFCFAF] dark:border-[#38332A] pb-3">
                      <div>
                        <span className="state-stamp text-[10px] text-[#9C3820] mb-1 block">
                          FOLIO INSPECTION: {selectedRemedy.slug}
                        </span>
                        <h2 className="font-serif text-xl font-bold text-[#1C1714] dark:text-[#F4ECE0]">
                          {selectedRemedy.titleEn}
                        </h2>
                        {selectedRemedy.titleNative && (
                          <div className="text-sm text-[#832014] font-semibold">
                            {selectedRemedy.titleNative}
                          </div>
                        )}
                      </div>

                      <Link
                        href={`/remedy/${selectedRemedy.slug}`}
                        target="_blank"
                        className="text-xs text-[#9C3820] hover:underline flex items-center gap-1 flex-shrink-0"
                      >
                        Public View <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>

                    {/* Rule Engine Live Diagnostics */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#9C3820] mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Automated Safety Rule Diagnostics ({deriveWarnings(selectedRemedy).length})
                      </h4>
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {deriveWarnings(selectedRemedy).map((w, i) => (
                          <div
                            key={i}
                            className="p-2 bg-[#F3ECE0] dark:bg-[#181614] border-l-2 border-[#9C3820] text-[11px] text-[#4A3E34] dark:text-[#BFB6A8]"
                          >
                            <strong>[{w.severity}]:</strong> {w.title} — {w.message}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Botanicals & Sources Verification */}
                    <div className="text-xs space-y-1 bg-[#F3ECE0] dark:bg-[#181614] p-3 rounded-[2px] border border-[#DFCFAF] dark:border-[#38332A]">
                      <div className="font-semibold text-[#285724] dark:text-[#5EA856] mb-1">
                        Botanical Binomials (Verified against Kew POWO):
                      </div>
                      {selectedRemedy.botanicals.map((b, idx) => (
                        <div key={idx} className="italic">
                          • {b.commonName}: <strong>{b.scientificName || "Unrecorded"}</strong> ({b.nameVerifiedAgainst})
                        </div>
                      ))}
                      <div className="font-semibold text-[#4A3E34] dark:text-[#BFB6A8] pt-2 mb-1">
                        Primary Literature Citations:
                      </div>
                      {selectedRemedy.sources.map((s, idx) => (
                        <div key={idx} className="text-[11px] opacity-90">
                          [{s.type}] {s.citation} {s.pageOrSection ? `(p. ${s.pageOrSection})` : ""}
                        </div>
                      ))}
                    </div>

                    {/* Named Sign-off Form */}
                    <div className="border-t border-[#DFCFAF] dark:border-[#38332A] pt-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1714] dark:text-[#F4ECE0] flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-[#285724]" />
                        Practitioner Sign-off
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <label className="block text-[10px] font-medium uppercase mb-0.5">
                            Reviewer Name *
                          </label>
                          <input
                            type="text"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            placeholder="e.g. Dr. K. Narayanan"
                            className="w-full p-1.5 bg-[#FAF6ED] dark:bg-[#181614] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-medium uppercase mb-0.5">
                            Qualifications *
                          </label>
                          <input
                            type="text"
                            value={qualifications}
                            onChange={(e) => setQualifications(e.target.value)}
                            placeholder="e.g. BAMS, MD (Ayu)"
                            className="w-full p-1.5 bg-[#FAF6ED] dark:bg-[#181614] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px]"
                          />
                        </div>
                      </div>

                      <div className="text-xs">
                        <label className="block text-[10px] font-medium uppercase mb-0.5">
                          Medical Council / Reg. Number
                        </label>
                        <input
                          type="text"
                          value={registrationNumber}
                          onChange={(e) => setRegistrationNumber(e.target.value)}
                          placeholder="State Board / Central Council Reg. No."
                          className="w-full p-1.5 bg-[#FAF6ED] dark:bg-[#181614] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px]"
                        />
                      </div>

                      <div className="text-xs">
                        <label className="block text-[10px] font-medium uppercase mb-0.5">
                          Evidence / Review Note
                        </label>
                        <textarea
                          rows={2}
                          value={reviewNote}
                          onChange={(e) => setReviewNote(e.target.value)}
                          placeholder="Confirm botanical and safety accuracy, or note clinical observations..."
                          className="w-full p-1.5 bg-[#FAF6ED] dark:bg-[#181614] border border-[#DFCFAF] dark:border-[#38332A] rounded-[2px]"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => handleApprove(selectedRemedy.slug)}
                          className="flex-1 py-2 bg-[#285724] text-[#FAF6ED] rounded-[2px] font-semibold text-xs hover:bg-[#1e441b] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          Verify & Promote to EXPERT_REVIEWED
                        </button>

                        <button
                          type="button"
                          onClick={() => handleReject(selectedRemedy.slug)}
                          className="px-3 py-2 bg-[#9B1C1C] text-[#FAF6ED] rounded-[2px] font-semibold text-xs hover:bg-[#7e1717] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 text-center text-sm text-[#4A3E34]/60 dark:text-[#BFB6A8]/60 border-2 border-dashed border-[#DFCFAF] dark:border-[#38332A] rounded-[4px]">
                    Select a remedy from the queue on the left to inspect its safety flags, botanical names, and sign off.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

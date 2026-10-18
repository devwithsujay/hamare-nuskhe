"use client";

import React, { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Remedy, RemedySchema } from "@/data/schema";
import { validateSafetyRules } from "@/lib/safety/rules";
import { Upload, FileCheck, AlertOctagon, Download, Eye, FileCode } from "lucide-react";

interface ValidationRow {
  index: number;
  slug: string;
  title: string;
  isValid: boolean;
  errors: string[];
  data: any;
}

export default function DevImportPage() {
  const [rows, setRows] = useState<ValidationRow[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [stats, setStats] = useState<{ total: number; valid: number; invalid: number } | null>(null);

  const processFileContent = (content: string) => {
    let rawItems: any[] = [];

    // Support both JSON (array) and JSONL (one JSON object per line)
    try {
      const trimmed = content.trim();
      if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        rawItems = JSON.parse(trimmed);
      } else {
        // Parse JSONL line by line
        const lines = trimmed.split("\n").filter((l) => l.trim().length > 0);
        rawItems = lines.map((line, idx) => {
          try {
            return JSON.parse(line);
          } catch (e) {
            return { _parseError: `JSON syntax error on line ${idx + 1}` };
          }
        });
      }
    } catch (err: any) {
      alert("Invalid JSON format: " + err.message);
      return;
    }

    const evaluated: ValidationRow[] = rawItems.map((item, idx) => {
      const rowErrors: string[] = [];

      if (item._parseError) {
        rowErrors.push(item._parseError);
        return {
          index: idx + 1,
          slug: "syntax-error",
          title: "Malformed Line",
          isValid: false,
          errors: rowErrors,
          data: item,
        };
      }

      // 1. Zod Schema
      const parsed = RemedySchema.safeParse(item);
      if (!parsed.success) {
        parsed.error.issues.forEach((iss) => {
          rowErrors.push(`[Schema] ${iss.path.join(".")}: ${iss.message}`);
        });
      }

      // 2. Safety Rules
      if (parsed.success) {
        const safety = validateSafetyRules(parsed.data);
        if (!safety.isValid) {
          safety.errors.forEach((e) => rowErrors.push(`[Safety] ${e}`));
        }
      }

      return {
        index: idx + 1,
        slug: item.slug || `entry-${idx + 1}`,
        title: item.titleEn || item.title || "Untitled",
        isValid: rowErrors.length === 0,
        errors: rowErrors,
        data: parsed.success ? parsed.data : item,
      };
    });

    const validCount = evaluated.filter((r) => r.isValid).length;
    setRows(evaluated);
    setStats({
      total: evaluated.length,
      valid: validCount,
      invalid: evaluated.length - validCount,
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      processFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      processFileContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleDownloadCleaned = () => {
    const validOnly = rows.filter((r) => r.isValid).map((r) => r.data);
    const blob = new Blob([JSON.stringify(validOnly, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cleaned-remedies.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] dark:bg-[#181715] text-[#1C1917] dark:text-[#F5F0E6] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        <header className="border-b border-[#E7DEC8] dark:border-[#36332E] pb-6 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FileCode className="w-4 h-4 text-[#9C4129]" />
            <span className="state-stamp text-[10px]">Curator Ingestion Tool</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#1C1917] dark:text-[#FDFBF7]">
            Candidate Data Ingestion &amp; Validator
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#44403C] dark:text-[#C8C2B7] max-w-3xl leading-relaxed">
            Drag and drop candidate raw JSON or JSONL batches collected per state. The validator runs each line through the Zod schema and deterministic safety rule engine, highlighting issues line-by-line and producing a clean, exportable <code className="bg-[#F5F0E6] px-1 font-mono">remedies.json</code>.
          </p>
        </header>

        {/* Dropzone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-[2px] p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-[#9C4129] bg-[#F5F0E6] dark:bg-[#22201D]"
              : "border-[#E7DEC8] dark:border-[#36332E] bg-[#FDFBF7] dark:bg-[#1E1C1A]"
          }`}
        >
          <Upload className="w-8 h-8 text-[#9C4129] mx-auto mb-2 opacity-80" />
          <h3 className="font-serif text-base font-bold text-[#1C1917] dark:text-[#F5F0E6]">
            Drag and drop a candidate JSON or JSONL file
          </h3>
          <p className="text-xs text-[#44403C] dark:text-[#B8B2A7] mt-1">
            or click to browse from your computer
          </p>

          <label className="mt-4 inline-block px-4 py-2 bg-[#1C1917] text-[#FDFBF7] dark:bg-[#F5F0E6] dark:text-[#1C1917] hover:bg-[#9C4129] text-xs font-semibold rounded-[2px] cursor-pointer">
            Select File (.json or .jsonl)
            <input
              type="file"
              accept=".json,.jsonl,text/plain"
              onChange={handleFileUpload}
              className="sr-only"
            />
          </label>
        </div>

        {/* Ingestion Results Stats & Actions */}
        {stats && (
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F5F0E6] dark:bg-[#22201D] border border-[#E7DEC8] dark:border-[#36332E] rounded-[2px]">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  Total Processed: <strong>{stats.total}</strong>
                </div>
                <div className="text-[#2D5A27] dark:text-[#5BA852]">
                  Valid: <strong>{stats.valid}</strong>
                </div>
                <div className="text-[#9B1C1C] dark:text-[#F87171]">
                  Failing: <strong>{stats.invalid}</strong>
                </div>
              </div>

              {stats.valid > 0 && (
                <button
                  type="button"
                  onClick={handleDownloadCleaned}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#2D5A27] text-[#FDFBF7] text-xs font-medium rounded-[2px] hover:bg-[#2D5A27]/90 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Cleaned remedies.json ({stats.valid} items)</span>
                </button>
              )}
            </div>

            {/* Ingestion Validation Table */}
            <div className="overflow-x-auto border border-[#E7DEC8] dark:border-[#36332E] rounded-[2px]">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#F5F0E6] dark:bg-[#22201D] border-b border-[#E7DEC8] dark:border-[#36332E] text-[11px] uppercase tracking-wider text-[#44403C] dark:text-[#B8B2A7]">
                    <th className="p-3 w-12 font-semibold">#</th>
                    <th className="p-3 font-semibold">Title / Slug</th>
                    <th className="p-3 w-28 font-semibold">Status</th>
                    <th className="p-3 font-semibold">Validation Diagnostics</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7DEC8]/50 dark:divide-[#36332E]/50 font-mono text-[11px]">
                  {rows.map((row) => (
                    <tr
                      key={row.index}
                      className={
                        row.isValid
                          ? "hover:bg-[#F5F0E6]/30 dark:hover:bg-[#22201D]/30"
                          : "bg-[#FEF2F2]/40 dark:bg-[#2A1616]/40"
                      }
                    >
                      <td className="p-3 text-[#44403C] dark:text-[#B8B2A7]">
                        {row.index}
                      </td>
                      <td className="p-3 font-sans">
                        <div className="font-semibold text-[#1C1917] dark:text-[#F5F0E6]">
                          {row.title}
                        </div>
                        <div className="text-[10px] font-mono text-[#44403C] dark:text-[#B8B2A7]">
                          {row.slug}
                        </div>
                      </td>
                      <td className="p-3">
                        {row.isValid ? (
                          <span className="inline-flex items-center gap-1 text-[#2D5A27] dark:text-[#5BA852] font-semibold text-[10px]">
                            <FileCheck className="w-3.5 h-3.5" />
                            Valid
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[#9B1C1C] dark:text-[#F87171] font-semibold text-[10px]">
                            <AlertOctagon className="w-3.5 h-3.5" />
                            Errors
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-sans">
                        {row.isValid ? (
                          <span className="text-[#2D5A27] dark:text-[#5BA852] text-[11px]">
                            Passed Zod schema and safety engine checks.
                          </span>
                        ) : (
                          <ul className="list-disc list-inside space-y-0.5 text-[#9B1C1C] dark:text-[#F87171] text-[11px]">
                            {row.errors.map((err, i) => (
                              <li key={i}>{err}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

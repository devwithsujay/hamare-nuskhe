import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Info, ShieldAlert, BookOpen, Scale, Flag, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";
import { HeritageOrnateDivider, BrassCornerBracket } from "@/components/IndianMotifs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About & Safety — हमारे नुस्खे / Hamare Nuskhe",
  description:
    "Ethnobotanical archiving principles, medical disclaimer, verification status standards, and legal compliance under Indian law.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-5xl w-full mx-auto px-3.5 sm:px-8 py-6 sm:py-10 pb-24 lg:pb-10 space-y-8 sm:space-y-12">
        {/* Archival Charter Header */}
        <header className="border-b-2 border-[#D8CBB8] dark:border-[#38332A] pb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="stamp-badge stamp-state">
              अभिलेखीय संविधि • ARCHIVAL CHARTER &amp; ETHICAL GOVERNANCE
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight">
            About हमारे नुस्खे (Hamare Nuskhe)
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
            A sourced, safety-first digital humanities archive of traditional Indian home remedies (<em>nuskhe</em>) cataloged across 28 states and 8 Union Territories.
          </p>
        </header>

        {/* 1. Core Archival Principle */}
        <section className="relative bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-6 sm:p-8 rounded-[3px] shadow-[inset_0_0_20px_rgba(181,148,91,0.08)] space-y-4">
          <BrassCornerBracket position="tl" className="absolute top-2 left-2 w-5 h-5 text-[#B5945B]" />
          <BrassCornerBracket position="tr" className="absolute top-2 right-2 w-5 h-5 text-[#B5945B]" />
          <BrassCornerBracket position="bl" className="absolute bottom-2 left-2 w-5 h-5 text-[#B5945B]" />
          <BrassCornerBracket position="br" className="absolute bottom-2 right-2 w-5 h-5 text-[#B5945B]" />

          <h2 className="font-serif text-2xl font-bold text-[#1C1917] dark:text-[#F4ECE0] flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#9E2A2B]" />
            <span>Archive of Cultural Practice, Not Medical Prescription</span>
          </h2>
          <p className="text-sm leading-relaxed text-[#5C5346] dark:text-[#C5BCB0] font-serif">
            This repository belongs to no commercial clinic and provides no medical diagnosis or cure. Indian household kitchens have preserved millennia of culinary wisdom, plant knowledge, and seasonal comfort practices. We document these preparations as cultural memory, strictly phrased as <em>&ldquo;traditionally used for…&rdquo;</em>, never as cures or medical substitutes.
          </p>
          <div className="p-4 bg-[#F4EFE6] dark:bg-[#25221F] border-l-4 border-l-[#9E2A2B] border border-[#D8CBB8] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] mt-3">
            <strong className="font-mono text-[#9E2A2B] uppercase tracking-wider block mb-1">Mandatory Archival Notice:</strong> {MANDATORY_ARCHIVE_DISCLAIMER}
          </div>
        </section>

        {/* 2. Verification Badges Standard */}
        <section className="space-y-5">
          <h2 className="font-serif text-2xl font-bold border-b border-[#D8CBB8] dark:border-[#38332A] pb-2 text-[#1C1917] dark:text-[#F4ECE0]">
            Verification Standards &amp; Rubber Stamps (Mohar)
          </h2>
          <p className="text-sm text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
            Nothing in this archive is marked &quot;verified&quot; or &quot;safe&quot; by default. Every entry displays its provenance and status transparently:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
            <div className="p-5 border border-[#2D4A3E]/60 bg-[#FAF6EE] dark:bg-[#1E1C1A] rounded-[3px] shadow-[inset_0_0_12px_rgba(45,74,62,0.06)] space-y-2.5">
              <span className="stamp-badge stamp-reviewed inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E]" />
                <span>EXPERT REVIEWED</span>
              </span>
              <h3 className="font-serif font-bold text-base text-[#1C1917] dark:text-[#F4ECE0]">
                Expert Reviewed Sign-Off
              </h3>
              <p className="text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
                A qualified practitioner (registered BAMS/AYUSH practitioner or medical doctor) has reviewed the entry, verified botanical species names, and validated all safety contraindications and drug interactions.
              </p>
            </div>

            <div className="p-5 border border-[#D8CBB8] dark:border-[#38332A] bg-[#FAF6EE] dark:bg-[#1E1C1A] rounded-[3px] shadow-[inset_0_0_12px_rgba(216,203,184,0.08)] space-y-2.5">
              <span className="stamp-badge font-mono text-[10px] text-[#9E2A2B] border-[#9E2A2B]/40 bg-[#9E2A2B]/10 font-bold">
                UNREVIEWED ARCHIVE ENTRY
              </span>
              <h3 className="font-serif font-bold text-base text-[#1C1917] dark:text-[#F4ECE0]">
                Draft / Community Field Entry
              </h3>
              <p className="text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
                Recorded from community folklore or preliminary ethnobotanical field surveys. Displayed with prominent warnings and unverified notice until medical sign-off.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Safety Rules Enforced in Code */}
        <section className="space-y-5">
          <h2 className="font-serif text-2xl font-bold border-b border-[#D8CBB8] dark:border-[#38332A] pb-2 text-[#1C1917] dark:text-[#F4ECE0]">
            Deterministic Safety Rules Enforced in Code
          </h2>
          <p className="text-sm text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
            Safety cautions in Hamare Nuskhe are not left to editorial discretion—they are strictly enforced in our validation engine:
          </p>
          <ul className="space-y-3 text-xs text-[#5C5346] dark:text-[#C5BCB0] font-serif">
            <li className="flex items-start gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px]">
              <span className="font-mono text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-1.5 py-0.5 rounded-[2px] mt-0.5">RULE 1</span>
              <span><strong className="text-[#1C1917] dark:text-[#F4ECE0]">Honey Rule:</strong> Any preparation containing honey automatically enforces an age restriction of at least 1 year and renders a prominent infant botulism caution.</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px]">
              <span className="font-mono text-xs font-bold text-[#D99B26] bg-[#D99B26]/10 px-1.5 py-0.5 rounded-[2px] mt-0.5">RULE 2</span>
              <span><strong className="text-[#1C1917] dark:text-[#F4ECE0]">Blood-Thinning Cautions:</strong> Turmeric, ginger, and garlic in medicinal quantities enforce anticoagulant interaction flags and pre-surgery discontinuation notes.</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px]">
              <span className="font-mono text-xs font-bold text-[#9E2A2B] bg-[#9E2A2B]/10 px-1.5 py-0.5 rounded-[2px] mt-0.5">RULE 3</span>
              <span><strong className="text-[#1C1917] dark:text-[#F4ECE0]">Pregnancy Cautions:</strong> Fenugreek, ajwain, raw papaya, and uterine stimulants are strictly flagged to avoid during pregnancy.</span>
            </li>
            <li className="flex items-start gap-2.5 p-3 bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px]">
              <span className="font-mono text-xs font-bold text-[#2D4A3E] bg-[#2D4A3E]/10 px-1.5 py-0.5 rounded-[2px] mt-0.5">RULE 4</span>
              <span><strong className="text-[#1C1917] dark:text-[#F4ECE0]">Topical Safety:</strong> Every external skin paste or oil enforces a mandatory 24-hour patch test note.</span>
            </li>
          </ul>
        </section>

        {/* 4. Legal Compliance in India */}
        <section className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] p-6 sm:p-8 rounded-[3px] shadow-[inset_0_0_14px_rgba(216,203,184,0.1)] space-y-4">
          <div className="flex items-center gap-2.5 text-[#1C1917] dark:text-[#F4ECE0]">
            <Scale className="w-5 h-5 text-[#B5945B]" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold">
              Legal Compliance &amp; DPDP Act 2023
            </h2>
          </div>
          <div className="space-y-3 text-xs text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
            <p>
              <strong>Drugs and Magic Remedies (Objectionable Advertisements) Act, 1954:</strong> This archive never claims that any remedy cures, treats, or mitigates any specified disease or condition. No magic or supernatural claims are documented.
            </p>
            <p>
              <strong>Digital Personal Data Protection Act (DPDP Act 2023):</strong> This site collects zero user tracking cookies and stores your Heirloom Drawer bookmarks strictly locally in your browser&apos;s <code className="bg-[#F4EFE6] dark:bg-[#25221F] px-1.5 py-0.5 font-mono text-[#9E2A2B]">localStorage</code>. No personal identifiable information is sold or transmitted to third parties.
            </p>
          </div>
        </section>

        {/* 5. How to Report a Problem */}
        <section className="border-t border-[#D8CBB8] dark:border-[#38332A] pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#1C1917] dark:text-[#F4ECE0]">
              Report Unsafe or Inaccurate Specimen Information
            </h3>
            <p className="text-xs text-[#5C5346] dark:text-[#C5BCB0] mt-1 font-serif">
              Found an inaccurate botanical binomial, missing allergen warning, or unsafe practice? Contact our editorial reviewers.
            </p>
          </div>
          <a
            href="mailto:curators@hamarenuskhe.org?subject=Content%20Safety%20Report"
            className="px-5 py-2.5 bg-[#9E2A2B] text-[#FAF6EE] text-xs font-mono uppercase tracking-wider font-bold rounded-[2px] hover:bg-[#832014] transition-colors flex-shrink-0 shadow-xs"
          >
            Report an Entry
          </a>
        </section>

        <div className="pt-4">
          <HeritageOrnateDivider className="opacity-80 text-[#B5945B]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

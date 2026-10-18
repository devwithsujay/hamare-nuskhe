"use client";

import React from "react";
import { KharalIcon, BrassCornerBracket } from "./IndianMotifs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  remedyCount: number;
}

function LotusSuryaMandala({ className }: { className?: string }) {
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      viewBox="0 0 520 520"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Concentric rings */}
      <circle cx="260" cy="260" r="248" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
      <circle cx="260" cy="260" r="236" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="180" stroke="currentColor" strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="260" cy="260" r="140" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="260" cy="260" r="70" stroke="currentColor" strokeWidth="2" />
      <circle cx="260" cy="260" r="24" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" />

      {/* 8 Geometric Lotus Petals */}
      {angles.map((angle) => (
        <g key={angle} transform={`rotate(${angle} 260 260)`}>
          <path
            d="M 260 260 C 230 180 215 100 260 24 C 305 100 290 180 260 260 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="currentColor"
            fillOpacity="0.05"
          />
          <path
            d="M 260 260 L 260 30"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 4"
          />
          <path
            d="M 260 170 C 242 140 242 100 260 65 C 278 100 278 140 260 170 Z"
            stroke="currentColor"
            strokeWidth="1"
          />
        </g>
      ))}

      {/* 8 Surya Rays */}
      {angles.map((angle) => (
        <g key={`ray-${angle}`} transform={`rotate(${angle + 22.5} 260 260)`}>
          <line x1="260" y1="140" x2="260" y2="236" stroke="currentColor" strokeWidth="1.2" strokeDasharray="6 4" />
          <circle cx="260" cy="236" r="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export default function HomeHeroBanner({ remedyCount }: Props) {
  const { t, lang } = useLanguage();
  const [showCharterMobile, setShowCharterMobile] = React.useState(false);

  const isHindi = lang === "hi";

  const integrityStrings = {
    badge: isHindi ? "अभिलेखीय प्रामाणिकता व मानक" : "Archival Rigor & Governance",
    statusPill: isHindi ? "सुरक्षा मानक" : "Deterministic Engine",
    p1Title: isHindi ? "सटीक वानस्पतिक वर्गीकरण" : "Botanical Binomial Taxonomy",
    p1Desc: isHindi
      ? "रॉयल बॉटैनिक गार्डन्स Kew (POWO) एवं IPNI पादप नामकरण से सत्यापित।"
      : "Cross-indexed with Royal Botanic Gardens Kew (POWO) & IPNI systematic taxonomy.",
    p2Title: isHindi ? "शून्य-उपचारात्मक सुरक्षा इंजन" : "Zero-Curative Safety Architecture",
    p2Desc: isHindi
      ? "शिशु निषेध, गर्भावस्था चेतावनियां एवं चिकित्सीय परामर्श अनिवार्य नियम।"
      : "Automated pediatric bans, pregnancy contraindications & doctor consult triggers.",
    p3Title: isHindi ? "जीवंत सांस्कृतिक वाचिक धरोहर" : "Household Living Provenance",
    p3Desc: isHindi
      ? "३६ राज्यों व संघ क्षेत्रों की घरेलू रसोई से संजोए गए प्रामाणिक नुस्खे।"
      : "Documented from grandma kitchen traditions across 36 States & UTs without commercial dilution.",
    complianceNote: isHindi ? "औषधि एवं चमत्कारिक उपचार अधिनियम, १९५४ सम्मत" : "Compliant: Drugs & Magic Remedies Act, 1954",
    statusActive: isHindi ? "सक्रिय" : "Active Audit",
    verifiedPill: isHindi ? "Kew POWO एवं आयुष सत्यापित" : "Kew POWO & AYUSH Taxa",
  };

  return (
    <section
      className="mb-8 sm:mb-12 rounded-[32px] border border-[#C89D54]/45 p-6 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_24px_50px_rgba(7,19,14,0.35)] transition-all"
      style={{
        background: "radial-gradient(110% 110% at 80% 20%, #1C4332 0%, #0D2118 65%, #07130E 100%)",
      }}
    >
      {/* 520px Rotating 8-petal Lotus / Surya Sacred Geometric Mandala */}
      <div className="absolute -top-20 -right-20 sm:-top-16 sm:-right-16 w-[420px] h-[420px] sm:w-[520px] sm:h-[520px] pointer-events-none opacity-[0.12] text-[#C89D54] z-0 select-none">
        <LotusSuryaMandala className="w-full h-full animate-spin-slow-90s" />
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-stretch">
        {/* Left Column: Materia Medica Title & Metadata */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-between">
          <div>
            {/* Archival Folio Badges */}
            <div className="flex items-center gap-2 mb-3.5 sm:mb-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#A62B21]/30 border border-[#A62B21]/60 text-[#FFD6D0] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7D75] animate-pulse" />
                {t.heroBadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#C89D54]/25 border border-[#C89D54]/55 text-[#F9E8B6] font-mono text-xs sm:text-[13px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-xs">
                {t.heroSubbadge}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FAF6EE] font-mono text-xs sm:text-[13px] font-semibold uppercase tracking-wider backdrop-blur-sm shadow-xs">
                न निघण्टु • MATERIA MEDICA
              </span>
            </div>

            {/* Primary Materia Medica Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[50px] xl:text-[54px] font-serif font-bold text-[#FAF6EE] tracking-tight leading-[1.18] sm:leading-[1.12]">
              {t.heroTitle}
            </h1>

            {/* Humanist Body Description */}
            <p className="mt-3.5 sm:mt-5 text-base sm:text-lg lg:text-xl text-[#D8CBB8] leading-relaxed font-body max-w-2xl">
              {t.heroDesc}
            </p>
          </div>

          {/* Museum Specimen Status Index Capsules */}
          <div className="mt-6 sm:mt-8 pt-4 flex items-center gap-2.5 sm:gap-3.5 flex-wrap border-t border-white/15">
            {/* Folios Count Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 backdrop-blur-md border border-[#C89D54]/40 rounded-xl font-mono text-xs sm:text-sm font-semibold text-[#E5A93B] shadow-sm">
              <KharalIcon className="w-4 h-4 text-[#E5A93B]" />
              <span>{remedyCount} {t.heroFoliosStat}</span>
            </div>

            {/* States & UTs Coverage Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 backdrop-blur-md border border-[#C89D54]/40 rounded-xl font-mono text-xs sm:text-sm font-semibold text-[#FAF6EE] shadow-sm">
              <svg className="w-4 h-4 text-[#62A873]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{t.heroStatesStat}</span>
            </div>

            {/* Botanical Verification Capsule */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-white/10 backdrop-blur-md border border-[#C89D54]/40 rounded-xl font-mono text-xs sm:text-sm font-semibold text-[#62A873] shadow-sm">
              <svg className="w-4 h-4 text-[#62A873]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>{integrityStrings.verifiedPill}</span>
            </div>
          </div>

          {/* Mobile Accordion Toggle for Archival Charter */}
          <div className="mt-4 lg:hidden">
            <button
              type="button"
              onClick={() => setShowCharterMobile(!showCharterMobile)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-2xl border border-[#C89D54]/40 bg-white/10 backdrop-blur-md text-sm font-serif font-bold text-[#FAF6EE] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E5A93B]" />
                <span>{integrityStrings.badge}</span>
              </div>
              <span className="text-xs text-[#E5A93B] font-mono uppercase tracking-wider font-semibold">
                {showCharterMobile ? "Hide ▲" : "View Standards ▼"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Frosted Glass Archival Rigor & Governance Sanctuary Box */}
        <div className={`${showCharterMobile ? "flex" : "hidden"} lg:flex lg:col-span-5 xl:col-span-4 flex-col justify-center mt-2 lg:mt-0`}>
          <div className="relative p-6 sm:p-7 bg-white/10 backdrop-blur-xl rounded-3xl border border-[#C89D54]/40 shadow-[0_16px_40px_rgba(0,0,0,0.35)] text-[#FAF6EE]">
            {/* Charter Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/15">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C89D54] shadow-[0_0_8px_#C89D54]" title="Official Archival Seal" />
                <span className="font-serif text-base font-bold uppercase tracking-wider text-[#FAF6EE]">
                  {integrityStrings.badge}
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#C89D54]/20 border border-[#C89D54]/40 text-[#F9E8B6] font-mono text-xs font-semibold">
                {integrityStrings.statusPill}
              </span>
            </div>

            {/* 3 Structured Archival Pillars */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#2D4A3E]/60 border border-[#62A873]/50 flex items-center justify-center text-[#62A873] shrink-0 mt-0.5 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#FAF6EE] text-sm">
                    {integrityStrings.p1Title}
                  </h4>
                  <p className="text-[#D8CBB8] mt-0.5 leading-relaxed text-xs sm:text-[13px] font-body">
                    {integrityStrings.p1Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#A62B21]/50 border border-[#E06456]/50 flex items-center justify-center text-[#FFB3A7] shrink-0 mt-0.5 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#FAF6EE] text-sm">
                    {integrityStrings.p2Title}
                  </h4>
                  <p className="text-[#D8CBB8] mt-0.5 leading-relaxed text-xs sm:text-[13px] font-body">
                    {integrityStrings.p2Desc}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#C89D54]/30 border border-[#C89D54]/60 flex items-center justify-center text-[#F9E8B6] shrink-0 mt-0.5 shadow-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#FAF6EE] text-sm">
                    {integrityStrings.p3Title}
                  </h4>
                  <p className="text-[#D8CBB8] mt-0.5 leading-relaxed text-xs sm:text-[13px] font-body">
                    {integrityStrings.p3Desc}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Compliance & Registry Seal */}
            <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs sm:text-[13px] font-mono text-[#D8CBB8]">
              <span className="truncate max-w-[200px]">{integrityStrings.complianceNote}</span>
              <span className="inline-flex items-center gap-1.5 font-bold text-[#62A873]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#62A873] shadow-[0_0_6px_#62A873]" />
                {integrityStrings.statusActive}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { IndianOrnamentalBand, HeritageOrnateDivider } from "./IndianMotifs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[#D8CBB8] dark:border-[#38332A] bg-[#F4EFE6] dark:bg-[#181614] mt-16 text-sm text-[#5C5346] dark:text-[#BFB6A8] transition-colors">
      <IndianOrnamentalBand className="opacity-70" />

      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12 py-10 pb-28 lg:pb-10 space-y-8">
        {/* Ornate Indian Botanical/Geometric Brass Divider */}
        <div className="py-1">
          <HeritageOrnateDivider className="opacity-85 text-[#B5945B]" />
        </div>

        {/* Sanskrit Cultural Benediction in Brass-Bordered Parchment */}
        <div className="shloka-box rounded-[3px] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 bg-[#FAF6EE] dark:bg-[#1E1C1A] shadow-[inset_0_0_16px_rgba(181,148,91,0.08)] p-6 sm:p-7 text-center">
          <div className="text-xs font-mono tracking-[0.12em] uppercase text-[#B5945B] mb-2 font-bold">
            कल्याण मन्त्र • UNIVERSAL BENEDICTION
          </div>
          <p className="font-serif text-xl sm:text-2xl font-bold text-[#9E2A2B] dark:text-[#E0A845] tracking-wide">
            {t.footerPrayer}
          </p>
          <p className="text-sm sm:text-base text-[#5C5346] dark:text-[#BFB6A8] mt-2.5 italic font-serif leading-relaxed max-w-2xl mx-auto">
            &ldquo;{t.footerPrayerMeaning}&rdquo;
          </p>
        </div>

        {/* Archival Disclaimer Box */}
        <div className="border border-[#D8CBB8] dark:border-[#38332A] bg-[#FAF6EE] dark:bg-[#201D1A] p-5 sm:p-6 rounded-[2px] shadow-[inset_0_0_10px_rgba(216,203,184,0.15)]">
          <span className="inline-block text-xs sm:text-sm font-mono uppercase tracking-[0.1em] text-[#9E2A2B] dark:text-[#D99B26] font-bold mb-2">
            {t.footerDisclaimerTitle}
          </span>
          <p className="text-sm sm:text-[15px] leading-relaxed text-[#5C5346] dark:text-[#C5BCB0]">
            {t.footerDisclaimerBody}
          </p>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-4">
          <div>
            <div className="font-bold text-[#1C1917] dark:text-[#F5F0E6] text-lg font-serif">
              {t.brandName}
            </div>
            <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#5C5346] dark:text-[#B8B2A7]">
              {t.footerArchiveDesc}
            </p>
          </div>

          <div>
            <div className="font-bold text-[#1C1917] dark:text-[#F5F0E6] mb-3 uppercase tracking-wider text-xs sm:text-sm font-mono">
              {t.navArchive} & {t.navStates}
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navArchive}
                </Link>
              </li>
              <li>
                <Link href="/states" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navStates} (36 States & UTs)
                </Link>
              </li>
              <li>
                <Link href="/plants" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navPlants} (Kew POWO/IPNI)
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navSaved}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-bold text-[#1C1917] dark:text-[#F5F0E6] mb-3 uppercase tracking-wider text-xs sm:text-sm font-mono">
              {t.navAbout}
            </div>
            <ul className="space-y-2.5 text-sm sm:text-base">
              <li>
                <Link href="/about" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navAbout}
                </Link>
              </li>
              <li>
                <Link href="/contribute" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  {t.navContribute}
                </Link>
              </li>
              <li>
                <Link href="/dev/type-specimen" className="hover:text-[#9E2A2B] dark:hover:text-[#D99B26] underline underline-offset-2">
                  Indic Type Specimen Matrix
                </Link>
              </li>
              <li className="text-xs sm:text-sm text-[#5C5346]/85 dark:text-[#B8B2A7]/85 pt-1 leading-relaxed">
                Complies with Drugs & Magic Remedies Act, 1954 and DPDP Act, 2023. Zero tracking cookies.
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#D8CBB8] dark:border-[#38332A] pt-6 text-center text-xs sm:text-sm text-[#5C5346]/80 dark:text-[#B8B2A7]/80">
          © {new Date().getFullYear()} {t.footerRights}
        </div>
      </div>
    </footer>
  );
}

import React from "react";
import Link from "next/link";
import { Remedy } from "@/data/schema";
import { MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  remedy: Remedy;
  folioNumber: number;
}

function RemedyIndexRow({ remedy, folioNumber }: Props) {
  const { t } = useLanguage();
  const formattedFolio = String(folioNumber).padStart(4, "0");
  const isReviewed = remedy.verificationStatus === "EXPERT_REVIEWED";
  const firstUse = remedy.traditionalUses[0] || "";

  return (
    <article className="border-b border-[#D8CBB8]/60 dark:border-[#383229]/60 py-1 transition-colors group">
      <Link
        href={`/remedy/${remedy.slug}`}
        className="block focus:outline-none focus:ring-1 focus:ring-[#9E2A2B] px-3 py-2 rounded-[2px] hover:bg-[#D99B26]/5 dark:hover:bg-[#D99B26]/10 transition-all"
      >
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5 sm:gap-4">
          {/* Left: Folio, Titles, State */}
          <div className="flex items-baseline gap-2.5 flex-wrap flex-1 min-w-0">
            <span className="font-mono text-xs text-[#9E2A2B] dark:text-[#D4B373] font-bold tracking-[0.08em] px-2 py-0.5 rounded-[2px] bg-[#9E2A2B]/10 dark:bg-[#D4B373]/10 border border-[#9E2A2B]/20">
              #{formattedFolio}
            </span>

            <span className="font-serif font-bold text-base sm:text-lg text-[#1C1917] dark:text-[#F4EFE6] group-hover:text-[#9E2A2B] dark:group-hover:text-[#D4B373] transition-colors underline-offset-4 group-hover:underline">
              {remedy.titleEn}
            </span>

            {remedy.titleNative && (
              <span className="font-rozha text-sm sm:text-base text-[#9E2A2B] dark:text-[#D4B373] font-bold">
                ({remedy.titleNative})
              </span>
            )}

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] border border-[#B5945B]/70 bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] font-serif font-bold text-xs tracking-wide">
              <MapPin className="w-3 h-3 text-[#9E2A2B] shrink-0" />
              <span>{remedy.stateOrUT}</span>
            </span>

            {/* Virya indicator if known */}
            {remedy.ayurvedicAttributes?.virya && (
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-wider px-2 py-0.5 bg-[#D99B26]/10 text-[#8B5E0D] dark:text-[#D4B373] rounded-[2px] border border-[#D99B26]/30 font-bold">
                {remedy.ayurvedicAttributes.virya === "USHNA" ? "🔥 Ushna" : "❄️ Sheeta"}
              </span>
            )}
          </div>

          {/* Leader line on desktop */}
          <span className="hidden md:block index-leader opacity-60 dark:opacity-30 border-[#D8CBB8] dark:border-[#383229]" />

          {/* Right: Traditional Use, Category, Badge */}
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#5C5346] dark:text-[#C7BDB0] flex-shrink-0">
            <span className="hidden sm:inline font-body italic max-w-xs truncate text-xs sm:text-sm opacity-90">
              {firstUse}
            </span>

            <span className="font-serif text-xs font-bold px-2.5 py-0.5 rounded-[2px] border border-[#B5945B]/50 bg-[#B5945B]/10 text-[#5C5346] dark:text-[#D4B373]">
              {remedy.category}
            </span>

            {isReviewed ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] border border-[#2D4A3E] bg-[#2D4A3E]/12 dark:bg-[#2D4A3E]/25 text-[#2D4A3E] dark:text-[#66BB58] font-serif font-bold text-xs tracking-wide shadow-2xs whitespace-nowrap">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E] dark:text-[#66BB58] shrink-0" />
                <span>{t.reviewedBadge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[2px] border border-[#B5945B]/40 bg-[#FAF6EE] dark:bg-[#25221F] text-[#5C5346] dark:text-[#B8B2A7] font-serif font-medium text-xs tracking-wide whitespace-nowrap">
                <AlertCircle className="w-3 h-3 text-[#B5945B] shrink-0" />
                <span>{t.unreviewedBadge}</span>
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default React.memo(RemedyIndexRow);

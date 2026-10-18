import React from "react";
import Link from "next/link";
import { Remedy } from "@/data/schema";
import { Clock, ShieldAlert, Sprout, ArrowRight, MapPin, CheckCircle2, AlertCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  remedy: Remedy;
  folioNumber: number;
}

function BotanicalSprigWatermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-3 -right-3 z-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform translate-x-[15px] translate-y-[15px] rotate-[12deg] scale-[0.9] opacity-[0.07] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0 group-hover:scale-[1.08] group-hover:opacity-[0.18] text-[#1C4332] dark:text-[#C89D54]"
    >
      <svg
        width="130"
        height="130"
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Curving Stem */}
        <path d="M18 88 C32 68 48 46 76 14" />
        <path d="M76 14 L80 10" />

        {/* Lower Left Leaf */}
        <path
          d="M30 72 C22 66 20 54 26 48 C32 54 32 64 30 72 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path d="M26 48 C28 58 29 65 30 72" strokeWidth="1" />

        {/* Lower Right Leaf */}
        <path
          d="M40 60 C48 54 56 56 60 64 C52 66 44 64 40 60 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path d="M60 64 C52 62 46 61 40 60" strokeWidth="1" />

        {/* Mid Left Leaf */}
        <path
          d="M50 46 C42 40 40 28 46 22 C52 28 52 38 50 46 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path d="M46 22 C48 32 49 39 50 46" strokeWidth="1" />

        {/* Mid Right Leaf */}
        <path
          d="M60 34 C68 28 76 30 80 38 C72 40 64 38 60 34 Z"
          fill="currentColor"
          fillOpacity="0.25"
        />
        <path d="M80 38 C72 36 66 35 60 34" strokeWidth="1" />

        {/* Apex Leaf Pair */}
        <path
          d="M76 14 C78 6 88 8 90 14 C84 20 78 18 76 14 Z"
          fill="currentColor"
          fillOpacity="0.3"
        />
      </svg>
    </div>
  );
}

function RemedyCard({ remedy, folioNumber }: Props) {
  const { t } = useLanguage();
  const formattedFolio = String(folioNumber).padStart(4, "0");
  const isReviewed = remedy.verificationStatus === "EXPERT_REVIEWED";
  const primaryBotanical = remedy.botanicals[0];

  const hasHoney =
    remedy.ingredients.some((i) => i.name.toLowerCase().includes("honey")) ||
    remedy.safety.allergens.includes("honey");

  return (
    <article className="relative rounded-[26px] bg-[rgba(255,252,247,0.88)] dark:bg-[rgba(26,23,21,0.88)] backdrop-blur-[12px] border border-[#C89D54]/45 hover:border-[#A62B21] dark:hover:border-[#E5A93B] p-4 sm:p-5 flex flex-col justify-between group overflow-hidden shadow-[0_4px_20px_rgba(45,38,30,0.06),inset_0_0_0_1px_rgba(200,157,84,0.15)] hover:shadow-[0_16px_36px_rgba(166,43,33,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Top 4px Gradient Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#A62B21] via-[#E5A93B] to-[#0F261C]" />

      {/* Botanical Sprig Watermark in bottom-right corner with Apple spring hover bloom */}
      <BotanicalSprigWatermark />

      <div className="relative z-10">
        {/* Card Header Row 1: Accession Folio & Expert Review Archival Seal */}
        <div className="flex items-center justify-between gap-2 mb-2.5 pt-0.5">
          {/* Folio Catalog Number */}
          <span className="font-mono text-[15px] font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#A62B21]/10 dark:bg-[#E06456]/15 border border-[#A62B21]/30 text-[#A62B21] dark:text-[#E06456] shadow-2xs">
            #{formattedFolio}
          </span>

          {/* Expert Review Archival Seal Badge */}
          {isReviewed ? (
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#2D4A3E]/70 bg-[#2D4A3E]/10 dark:bg-[#2D4A3E]/20 text-[#1C4332] dark:text-[#66BB58] font-serif font-bold text-[15px] tracking-wide shadow-2xs"
              title="Verified against classical Ayurvedic & Ethnobotanical criteria"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C4332] dark:text-[#66BB58] shrink-0" />
              <span>{t.reviewedBadge}</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border border-[#C89D54]/40 bg-[#FAF6EE] dark:bg-[#25221F] text-[#5C5346] dark:text-[#B8B2A7] font-serif font-medium text-[15px] tracking-wide">
              <AlertCircle className="w-3 h-3 text-[#C89D54] shrink-0" />
              <span>{t.unreviewedBadge}</span>
            </span>
          )}
        </div>

        {/* Card Header Row 2: State Geographical Tag & Tradition */}
        <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
          {/* State Name in Prestigious Editorial Serif with MapPin */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg border border-[#C89D54]/50 bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] font-serif font-bold text-[15px] tracking-wide shadow-2xs">
            <MapPin className="w-3.5 h-3.5 text-[#A62B21] shrink-0" />
            <span>{remedy.stateOrUT}</span>
          </span>

          {/* Tradition Badge in Editorial Serif */}
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg border border-[#C89D54]/40 bg-[#C89D54]/10 text-[#8C6D32] dark:text-[#E0A845] font-serif font-semibold text-[15px] tracking-wide">
            {remedy.tradition === "AYURVEDA" ? "AYURVEDA" : remedy.tradition}
          </span>
        </div>

        {/* Titles: High-contrast Editorial Serif & Indic Calligraphy */}
        <Link href={`/remedy/${remedy.slug}`} className="block group/title mb-1.5">
          {remedy.titleNative && (
            <div className="font-rozha text-[15px] sm:text-[16px] font-bold text-[#A62B21] dark:text-[#E0A845] mb-0.5 tracking-tight">
              {remedy.titleNative}
            </div>
          )}
          <h3 className="font-serif text-[18px] sm:text-[19px] font-bold text-[#1C1917] dark:text-[#F4ECE0] group-hover/title:text-[#A62B21] dark:group-hover/title:text-[#E5A93B] transition-colors line-clamp-1 leading-snug tracking-tight">
            {remedy.titleEn}
          </h3>
        </Link>

        {/* Recessed Warm Limestone Well for Botanical POWO & Plant Part */}
        {primaryBotanical ? (
          <div className="bg-[#F4EFE6]/80 dark:bg-[#25221F]/80 border border-[#C89D54]/30 rounded-xl p-2.5 sm:p-3 flex items-center justify-between gap-2 my-2.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 overflow-hidden">
              <Sprout className="w-4 h-4 text-[#1C4332] dark:text-[#66BB58] shrink-0" />
              <span className="italic font-serif text-[15px] text-[#1C4332] dark:text-[#66BB58] truncate font-semibold">
                {primaryBotanical.scientificName || primaryBotanical.commonName}
              </span>
            </div>
            {primaryBotanical.plantPart && (
              <span className="font-mono text-[13.5px] text-[#5C5346] dark:text-[#C7BDB0] shrink-0 tracking-wider font-semibold bg-white/70 dark:bg-black/30 px-2 py-0.5 rounded border border-[#C89D54]/20">
                [{primaryBotanical.plantPart}]
              </span>
            )}
          </div>
        ) : (
          <div className="my-2.5 h-[1px] bg-[#D8CBB8]/60 dark:border-[#383229]" />
        )}

        {/* Classical Ayurvedic Attributes (Virya & Dosha) in Warm Serif */}
        {remedy.ayurvedicAttributes && (
          <div className="flex items-center gap-1.5 mb-2 flex-wrap">
            {remedy.ayurvedicAttributes.virya === "USHNA" && (
              <span className="inline-flex items-center gap-1 font-serif text-[14px] bg-[#C89D54]/15 text-[#8C6D32] dark:text-[#E0A845] px-2 py-0.5 rounded-md border border-[#C89D54]/40 font-bold">
                🔥 Ushna (Warming)
              </span>
            )}
            {remedy.ayurvedicAttributes.virya === "SHEETA" && (
              <span className="inline-flex items-center gap-1 font-serif text-[14px] bg-[#2D4A3E]/12 text-[#1C4332] dark:text-[#66BB58] px-2 py-0.5 rounded-md border border-[#2D4A3E]/40 font-bold">
                ❄️ Sheeta (Cooling)
              </span>
            )}
            {remedy.ayurvedicAttributes.doshaEffect.length > 0 && (
              <span className="text-[#5C5346] dark:text-[#C7BDB0] font-serif italic text-[14px] truncate max-w-[200px]">
                {remedy.ayurvedicAttributes.doshaEffect.slice(0, 2).join(", ")}
              </span>
            )}
          </div>
        )}

        {/* Traditional Use Description */}
        <p className="text-[15px] text-[#4A4237] dark:text-[#C5BCB0] font-serif line-clamp-2 leading-relaxed">
          {remedy.traditionalUses[0]}
        </p>

        {/* Red Flag or Honey Warning */}
        {hasHoney && (
          <div className="mt-2.5 flex items-center gap-1.5 font-mono text-[15px] text-[#A62B21] dark:text-[#F87171] bg-[#A62B21]/10 p-2 rounded-lg border border-[#A62B21]/30 font-bold uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 flex-shrink-0" />
            <span>Contains honey: Never for infants &lt; 1 yr</span>
          </div>
        )}
      </div>

      {/* Index Ledger Footer */}
      <div className="relative z-10 border-t border-[#D8CBB8]/60 dark:border-[#383229] pt-2.5 mt-3 flex items-center justify-between gap-3 text-xs text-[#5C5346] dark:text-[#C7BDB0]">
        <div className="flex items-center gap-1.5 font-mono text-[14px] sm:text-[15px] tracking-wider uppercase font-medium min-w-0 flex-1 truncate">
          {remedy.prepTimeMinutes && (
            <span className="flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-[#C89D54]" />
              {remedy.prepTimeMinutes}m
            </span>
          )}
          {remedy.prepTimeMinutes && <span className="opacity-40 shrink-0">•</span>}
          <span className="truncate">{remedy.remedyType.replace(/_/g, " ").toLowerCase()}</span>
        </div>

        <Link
          href={`/remedy/${remedy.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C89D54]/70 hover:border-[#A62B21] dark:border-[#C89D54]/40 bg-[#FAF6EE] dark:bg-[#27231F] hover:bg-[#A62B21] dark:hover:bg-[#A62B21] text-[#A62B21] dark:text-[#E5A93B] hover:text-[#FAF6EE] dark:hover:text-[#FAF6EE] font-serif text-[15px] font-bold tracking-wide transition-all shadow-xs whitespace-nowrap shrink-0 group/btn"
        >
          <span>{t.readFolioBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover/btn:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
}

export default React.memo(RemedyCard);

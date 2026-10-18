import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServingsIngredients from "@/components/ServingsIngredients";
import SafetyPanel from "@/components/SafetyPanel";
import RemedyActions from "@/components/RemedyActions";
import { CookingModeTrigger } from "@/components/CookingModeModal";
import { remedyRepo } from "@/lib/repository";
import { deriveWarnings, MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";
import {
  ChevronRight,
  Sprout,
  Clock,
  Compass,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Calendar,
  UserCheck,
  MapPin,
} from "lucide-react";
import {
  ManuscriptCorner,
  DiyaIcon,
  LotusMandalaIcon,
  VataDoshaIcon,
  PittaDoshaIcon,
  KaphaDoshaIcon,
  IndianOrnamentalBand,
  KharalIcon,
  BrassCornerBracket,
} from "@/components/IndianMotifs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const remedy = await remedyRepo.getBySlug(slug);

  if (!remedy) {
    return {
      title: "Remedy Not Found — हमारे नुस्खे",
    };
  }

  const native = remedy.titleNative ? ` (${remedy.titleNative})` : "";
  const primaryUse = remedy.traditionalUses[0] || "Traditional home remedy";

  return {
    title: `${remedy.titleEn}${native} — हमारे नुस्खे / Hamare Nuskhe`,
    description: `${remedy.titleEn} from ${remedy.stateOrUT}. Traditionally used for ${primaryUse}. Recorded with botanical names and safety contraindications.`,
  };
}

export default async function RemedyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const remedy = await remedyRepo.getBySlug(slug);

  if (!remedy) {
    notFound();
  }

  const warnings = deriveWarnings(remedy);
  const isReviewed = remedy.verificationStatus === "EXPERT_REVIEWED";

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 py-6 sm:py-8 pb-24 lg:pb-12">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-sm text-[#44403C] dark:text-[#B8B2A7] mb-6 flex-wrap font-medium"
        >
          <Link href="/" className="hover:text-[#9C4129] underline underline-offset-2">
            Archive
          </Link>
          <ChevronRight className="w-4 h-4 opacity-60" />
          <Link
            href={`/?state=${encodeURIComponent(remedy.stateOrUT)}`}
            className="hover:text-[#9C4129] underline underline-offset-2"
          >
            {remedy.stateOrUT}
          </Link>
          <ChevronRight className="w-4 h-4 opacity-60" />
          <Link
            href={`/?category=${encodeURIComponent(remedy.category)}`}
            className="hover:text-[#9C4129] underline underline-offset-2"
          >
            {remedy.category}
          </Link>
          <ChevronRight className="w-4 h-4 opacity-60" />
          <span className="text-[#1C1917] dark:text-[#F5F0E6] font-bold truncate max-w-xs">
            {remedy.titleEn}
          </span>
        </nav>

        {/* Two-column layout: Wide reading column on left + narrow margin notes column on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Reading Column (8 cols on desktop) */}
          <article className="lg:col-span-8 space-y-8">
            {/* Header: Herbarium Specimen Folio Frame with Brass Corner Brackets */}
            <header className="relative bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/80 dark:border-[#B5945B]/60 p-5 sm:p-8 rounded-[3px] shadow-[inset_0_0_20px_rgba(181,148,91,0.08)]">
              {/* Brass Corner Brackets */}
              <BrassCornerBracket position="tl" className="absolute top-2 left-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="tr" className="absolute top-2 right-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="bl" className="absolute bottom-2 left-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="br" className="absolute bottom-2 right-2 w-5 h-5 text-[#B5945B]" />

              <div className="flex items-center justify-between gap-2.5 mb-3.5 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] border border-[#B5945B] bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] font-serif font-bold text-xs sm:text-sm tracking-wide shadow-2xs">
                    <MapPin className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" />
                    <span>{remedy.stateOrUT}</span>
                  </span>
                  <span className="stamp-badge font-mono text-xs text-[#5C5346] dark:text-[#B8B2A7] border-[#D8CBB8] bg-[#F4EFE6] dark:bg-[#25221F]">
                    {remedy.region} INDIA
                  </span>
                  <span className="font-serif text-xs sm:text-sm font-bold px-3 py-1 rounded-[2px] border border-[#D99B26]/60 bg-[#D99B26]/12 text-[#8C6D32] dark:text-[#E0A845]">
                    {remedy.tradition === "AYURVEDA" ? "शास्त्रोक्त आयुर्वेद • AYURVEDA" : remedy.tradition}
                  </span>
                  {remedy.communityOrTradition && (
                    <span className="font-mono text-xs px-2.5 py-1 border border-[#D8CBB8] bg-[#F4EFE6] dark:bg-[#25221F] text-[#5C5346] dark:text-[#B8B2A7] rounded-[2px]">
                      {remedy.communityOrTradition}
                    </span>
                  )}
                </div>

                <div>
                  {isReviewed ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] border border-[#2D4A3E] bg-[#2D4A3E]/12 dark:bg-[#2D4A3E]/25 text-[#2D4A3E] dark:text-[#66BB58] font-serif font-bold text-xs sm:text-sm tracking-wide shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-[#2D4A3E] dark:text-[#66BB58] shrink-0" />
                      <span>Expert Reviewed</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-[2px] border border-[#B5945B]/40 bg-[#FAF6EE] dark:bg-[#25221F] text-[#5C5346] dark:text-[#B8B2A7] font-serif font-medium text-xs sm:text-sm tracking-wide">
                      <AlertCircle className="w-3.5 h-3.5 text-[#B5945B] shrink-0" />
                      <span>Unreviewed Folio (Draft)</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Native Script Title (Prominent Indian calligraphy) */}
              {remedy.titleNative && (
                <div
                  lang={
                    remedy.nativeScript === "Tamil"
                      ? "ta"
                      : remedy.nativeScript === "Kannada"
                      ? "kn"
                      : remedy.nativeScript === "Malayalam"
                      ? "ml"
                      : remedy.nativeScript === "Bengali"
                      ? "bn"
                      : remedy.nativeScript === "Gujarati"
                      ? "gu"
                      : "hi"
                  }
                  className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#9E2A2B] dark:text-[#E0A845] mb-1.5 font-serif tracking-tight"
                >
                  {remedy.titleNative}
                </div>
              )}

              {/* Primary English Title */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight leading-snug">
                {remedy.titleEn}
              </h1>

              {/* Transliteration & Alternate Names */}
              <div className="mt-2 text-sm text-[#5C5346] dark:text-[#BFB6A8] space-x-2 font-serif">
                {remedy.transliteration && (
                  <span>
                    Romanized: <strong className="font-semibold text-[#1C1917] dark:text-[#F4ECE0]">{remedy.transliteration}</strong>
                  </span>
                )}
                {remedy.alternateNames.length > 0 && (
                  <span>• Regional variants: {remedy.alternateNames.join(", ")}</span>
                )}
              </div>

              {/* Botanical Identity Specimen Strip */}
              <div className="mt-5 p-4 bg-[#FAF6EE] dark:bg-[#201D1A] border border-dashed border-[#B5945B]/80 dark:border-[#B5945B]/60 rounded-[2px] shadow-xs">
                <div className="text-xs uppercase tracking-[0.1em] font-mono font-bold text-[#2D4A3E] dark:text-[#5EA856] flex items-center gap-2 mb-2.5">
                  <Sprout className="w-4 h-4 text-[#2D4A3E]" />
                  <span>वानस्पतिक पहचान • Botanical Binomial Verification (Kew POWO / IPNI)</span>
                </div>
                <div className="flex flex-wrap gap-3.5 text-sm">
                  {remedy.botanicals.map((bot, idx) => (
                    <div key={idx} className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-bold text-[#1C1917] dark:text-[#F5F0E6]">
                        {bot.commonName}:
                      </span>
                      {bot.scientificName ? (
                        <span className="italic font-serif text-[#2D4A3E] dark:text-[#5BA852] font-bold text-base">
                          {bot.scientificName}
                        </span>
                      ) : (
                        <span className="text-[#5C5346]/70 italic">
                          (unidentified species)
                        </span>
                      )}
                      {bot.plantPart && (
                        <span className="text-xs sm:text-sm text-[#5C5346] dark:text-[#B8B2A7] font-mono font-bold">
                          [{bot.plantPart}]
                        </span>
                      )}
                      <span className="text-xs bg-[#B5945B]/15 text-[#8C6D32] dark:text-[#E0A845] border border-[#B5945B] px-2 py-0.5 rounded-[2px] font-mono font-bold">
                        verified: {bot.nameVerifiedAgainst}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </header>

            {/* Top Critical Safety Banners (Non-collapsible) */}
            <SafetyPanel remedy={remedy} warnings={warnings} />

            {/* Traditional Uses Tags */}
            <section>
              <h3 className="text-xs font-mono font-bold uppercase tracking-[0.1em] text-[#9E2A2B] dark:text-[#D99B26] mb-3">
                पारम्परिक उपयोग • DOCUMENTED TRADITIONAL USES
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {remedy.traditionalUses.map((use, i) => (
                  <span
                    key={i}
                    className="text-sm font-serif bg-[#FAF6EE] dark:bg-[#201D1A] border border-[#D8CBB8] dark:border-[#38332A] px-4 py-2 rounded-[2px] text-[#1C1917] dark:text-[#F4ECE0] font-medium shadow-xs"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </section>

            {/* Ingredients Table with Servings Multiplier (1x, 2x, 4x) */}
            <section>
              <ServingsIngredients
                baseServings={remedy.baseServings}
                ingredients={remedy.ingredients}
              />
            </section>

            {/* Method / Numbered Preparation Steps */}
            <section className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] p-6 sm:p-7 rounded-[3px] shadow-[inset_0_0_14px_rgba(216,203,184,0.12)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8CBB8]/80 dark:border-[#38332A] gap-3 mb-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                    Method of Preparation (निर्माण विधि)
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-[#5C5346] dark:text-[#B8B2A7] mt-1 font-mono">
                    {remedy.prepTimeMinutes && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#B5945B]" />
                        {remedy.prepTimeMinutes} MINS PREP
                      </span>
                    )}
                    {remedy.storage && <span>• {remedy.storage}</span>}
                  </div>
                </div>

                {/* Cooking Mode Trigger Button */}
                <CookingModeTrigger
                  titleEn={remedy.titleEn}
                  steps={remedy.steps}
                />
              </div>

              {/* Numbered Steps */}
              <ol className="space-y-4">
                {remedy.steps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-base leading-relaxed">
                    <span className="font-mono text-sm font-bold text-[#9E2A2B] bg-[#F4EFE6] dark:bg-[#25221F] border border-[#B5945B]/60 w-8 h-8 rounded-[2px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                    <span className="text-[#1C1917] dark:text-[#F4ECE0] flex-1 font-serif text-base sm:text-lg leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Traditional Reported Usage & Ayurvedic Attributes */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Reported Dosage */}
              <div className="bg-[#FAF6EE] dark:bg-[#201D1A] border border-[#D8CBB8] dark:border-[#38332A] p-5 sm:p-6 rounded-[3px] shadow-[inset_0_0_12px_rgba(216,203,184,0.1)]">
                <h4 className="font-mono font-bold uppercase tracking-wider text-[#9E2A2B] dark:text-[#D99B26] text-xs sm:text-sm mb-3.5 flex items-center gap-2">
                  <KharalIcon className="w-4 h-4 text-[#9E2A2B]" />
                  <span>पारम्परिक मात्रा • Traditional Usage</span>
                </h4>
                <div className="space-y-2 text-[#5C5346] dark:text-[#C5BCB0] font-serif text-sm sm:text-base">
                  <div>
                    <strong>Amount:</strong>{" "}
                    {remedy.traditionalUsage.typicalAdultAmount || "No amount recorded in sources"}
                  </div>
                  <div>
                    <strong>Frequency:</strong>{" "}
                    {remedy.traditionalUsage.typicalFrequency || "As recorded in sources"}
                  </div>
                  <div>
                    <strong>Timing:</strong>{" "}
                    {remedy.traditionalUsage.traditionalTiming || "Not specified"}
                  </div>
                  <div>
                    <strong>Max Duration:</strong>{" "}
                    {remedy.traditionalUsage.maxDurationDays
                      ? `${remedy.traditionalUsage.maxDurationDays} consecutive days`
                      : "Brief domestic use"}
                  </div>
                  <div className="text-xs sm:text-sm text-[#9E2A2B] pt-2 font-sans font-semibold">
                    * The archive never provides pediatric dosing. Never administer to infants.
                  </div>
                </div>
              </div>

              {/* Ayurvedic Attributes if documented */}
              <div className="bg-[#FAF6EE] dark:bg-[#201D1A] border border-[#D8CBB8] dark:border-[#38332A] p-5 sm:p-6 rounded-[3px] shadow-[inset_0_0_12px_rgba(216,203,184,0.1)] flex flex-col justify-between">
                <div>
                  <h4 className="font-mono font-bold uppercase tracking-wider text-[#2D4A3E] dark:text-[#5EA856] text-xs sm:text-sm mb-3.5 flex items-center gap-2">
                    <LotusMandalaIcon className="w-4 h-4 text-[#2D4A3E]" />
                    <span>शास्त्रोक्त गुणधर्म • Classical Ayurvedic Profile</span>
                  </h4>
                  {remedy.ayurvedicAttributes ? (
                    <div className="space-y-2.5 text-[#5C5346] dark:text-[#C5BCB0] font-serif text-sm sm:text-base">
                      <div className="flex items-center gap-2 flex-wrap">
                        <strong>Virya (वीर्य):</strong>
                        {remedy.ayurvedicAttributes.virya === "USHNA" ? (
                          <span className="inline-flex items-center gap-1.5 bg-[#D99B26]/15 text-[#9E2A2B] dark:text-[#D99B26] px-2.5 py-1 rounded-[2px] border border-[#D99B26] font-bold text-xs sm:text-sm font-mono">
                            <PittaDoshaIcon className="w-3.5 h-3.5" />
                            उष्ण (Ushna - Warming / Agni)
                          </span>
                        ) : remedy.ayurvedicAttributes.virya === "SHEETA" ? (
                          <span className="inline-flex items-center gap-1.5 bg-[#2D4A3E]/10 text-[#2D4A3E] dark:text-[#66BB58] px-2.5 py-1 rounded-[2px] border border-[#2D4A3E]/30 font-bold text-xs sm:text-sm font-mono">
                            <KaphaDoshaIcon className="w-3.5 h-3.5" />
                            शीत (Sheeta - Cooling / Soma)
                          </span>
                        ) : (
                          <span>{remedy.ayurvedicAttributes.virya || "Sama (Neutral)"}</span>
                        )}
                      </div>
                      <div>
                        <strong>Dosha Karma (दोष प्रभाव):</strong>{" "}
                        <span className="font-medium text-[#1C1917] dark:text-[#F4ECE0]">
                          {remedy.ayurvedicAttributes.doshaEffect.join(", ")}
                        </span>
                      </div>
                      {remedy.ayurvedicAttributes.rasa && remedy.ayurvedicAttributes.rasa.length > 0 && (
                        <div>
                          <strong>Rasa (रस / Taste):</strong>{" "}
                          <span className="font-medium text-[#1C1917] dark:text-[#F4ECE0]">
                            {remedy.ayurvedicAttributes.rasa.join(", ")}
                          </span>
                        </div>
                      )}
                      {remedy.ayurvedicAttributes.guna && remedy.ayurvedicAttributes.guna.length > 0 && (
                        <div>
                          <strong>Guna (गुण / Qualities):</strong>{" "}
                          <span className="font-medium text-[#1C1917] dark:text-[#F4ECE0]">
                            {remedy.ayurvedicAttributes.guna.join(", ")}
                          </span>
                        </div>
                      )}
                      {remedy.ayurvedicAttributes.vipaka && (
                        <div>
                          <strong>Vipaka (विपाक):</strong>{" "}
                          <span className="font-medium text-[#1C1917] dark:text-[#F4ECE0]">
                            {remedy.ayurvedicAttributes.vipaka}
                          </span>
                        </div>
                      )}
                      {remedy.ayurvedicAttributes.source && (
                        <div className="text-xs italic opacity-85 pt-1.5 border-t border-[#D8CBB8]/50 dark:border-[#38332A]/50">
                          Classical Reference: {remedy.ayurvedicAttributes.source}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-[#5C5346]/80 dark:text-[#BFB6A8]/80 italic text-xs leading-relaxed font-serif">
                      लोक परम्परा (Folk Kitchen Lore): Documented from oral domestic practices. Classical Ayurvedic doshic attributes are not assigned without textual citation, honouring ethnobotanical precision.
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Grandmother's Note (Oral Tradition with Drop-Cap and Diya Emblem) */}
            {remedy.folkloreNote && (
              <section className="bg-[#FAF6EE] dark:bg-[#201D1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-6 sm:p-7 rounded-[3px] shadow-[inset_0_0_16px_rgba(181,148,91,0.08)] relative">
                <div className="flex items-center gap-2.5 mb-3">
                  <DiyaIcon className="w-4 h-4 text-[#D99B26]" />
                  <span className="stamp-badge stamp-folk">
                    दादी की सीख • ORAL TRADITION
                  </span>
                  <span className="text-xs text-[#B5945B] font-mono uppercase tracking-wider font-bold">
                    Grandmother&apos;s Domestic Lore
                  </span>
                </div>
                <p className="drop-cap text-base sm:text-lg text-[#1C1917] dark:text-[#F4ECE0] leading-relaxed font-serif">
                  {remedy.folkloreNote}
                </p>
              </section>
            )}

            {/* Evidence Note & Scientific Context */}
            <section className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] p-5 sm:p-6 rounded-[3px] text-sm shadow-[inset_0_0_10px_rgba(216,203,184,0.1)]">
              <h4 className="font-mono font-bold text-xs uppercase tracking-wider text-[#5C5346] dark:text-[#B8B2A7] mb-2.5">
                Ethnobotanical &amp; Scientific Evidence Note
              </h4>
              <p className="text-[#1C1917] dark:text-[#F4ECE0] leading-relaxed italic font-serif">
                &ldquo;{remedy.evidenceNote}&rdquo;
              </p>
            </section>

            {/* Sources & Citations */}
            <section className="border-t border-[#D8CBB8] dark:border-[#38332A] pt-6">
              <h3 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F4ECE0] mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#9E2A2B]" />
                <span>Documented Sources &amp; Literature</span>
              </h3>
              <ul className="space-y-3 text-sm">
                {remedy.sources.map((src, i) => (
                  <li
                    key={i}
                    className="p-3 bg-[#FAF6EE] dark:bg-[#201D1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px]"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="font-semibold font-serif text-[#1C1917] dark:text-[#F4ECE0]">
                        {src.citation}
                      </span>
                      <span className="text-[10px] font-mono bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] px-2 py-0.5 rounded-[2px] font-bold">
                        {src.type.replace(/_/g, " ")}
                      </span>
                    </div>
                    {src.pageOrSection && (
                      <div className="text-xs text-[#5C5346] dark:text-[#B8B2A7] mt-1 font-mono">
                        Section / Page: {src.pageOrSection}
                      </div>
                    )}
                    {src.url && (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#9E2A2B] hover:underline text-xs mt-1 inline-block font-mono font-semibold"
                      >
                        External Archive Link ↗
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            {/* Verification Sign-Off Block */}
            <footer className="border-t border-[#D8CBB8] dark:border-[#38332A] pt-4 text-xs font-mono text-[#5C5346] dark:text-[#B8B2A7]">
              {isReviewed ? (
                <div className="flex items-center gap-2 text-[#2D4A3E] dark:text-[#5BA852]">
                  <UserCheck className="w-4 h-4" />
                  <span>
                    Reviewed and signed off by: <strong>{remedy.reviewedBy}</strong> on{" "}
                    {remedy.reviewedAt ? new Date(remedy.reviewedAt).toLocaleDateString() : ""}
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#5C5346] dark:text-[#B8B2A7]">
                  <AlertCircle className="w-4 h-4 text-[#D99B26]" />
                  <span>
                    Unreviewed archive entry (Status: DRAFT). Requires formal review by a qualified BAMS/AYUSH practitioner or medical doctor.
                  </span>
                </div>
              )}
            </footer>
          </article>

          {/* Margin Column: Actions & Tools (4 cols on desktop, sticky) */}
          <aside className="lg:col-span-4 sticky top-24 space-y-4">
            <RemedyActions remedy={remedy} />

            {/* Archival Notice in Margin */}
            <div className="bg-[#FAF6EE] dark:bg-[#201D1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-4 rounded-[2px] text-xs leading-relaxed text-[#5C5346] dark:text-[#C5BCB0] shadow-[inset_0_0_10px_rgba(181,148,91,0.08)] font-serif">
              <span className="text-[#9E2A2B] dark:text-[#D99B26] font-mono font-bold block mb-1 uppercase tracking-wider text-[10px]">
                Cultural Heritage Notice
              </span>
              Recorded strictly for cultural memory and ethnobotanical documentation. Not medical advice. Always consult a qualified medical doctor before use.
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

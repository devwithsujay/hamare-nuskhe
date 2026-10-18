"use client";

import React, { useState } from "react";
import {
  DiyaIcon,
  KharalIcon,
  LotusMandalaIcon,
  VataDoshaIcon,
  PittaDoshaIcon,
  KaphaDoshaIcon,
  IndianOrnamentalBand,
  ManuscriptCorner,
} from "./IndianMotifs";
import { Flame, Wind, Droplets, Sparkles, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Props {
  onSelectConcern?: (query: string) => void;
}

export default function AyurvedicHeritageGuide({ onSelectConcern }: Props) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"doshas" | "spices" | "philosophy">("doshas");
  const [isExpanded, setIsExpanded] = useState(false);

  // 7 Sacred Indian Kitchen Herbs
  const sacredHerbs = [
    {
      nameHi: "हल्दी",
      nameEn: "Haldi (Turmeric)",
      botanical: "Curcuma longa",
      role: "विश्वभेषज (Universal Purifier)",
      dosha: "Tridoshic (balances Vata, Pitta, Kapha)",
      note: "Golden rhizome of Agni. Revered in every Indian kitchen for immunity, skin healing, and respiratory comfort.",
      remedyQuery: "Haldi",
    },
    {
      nameHi: "तुलसी",
      nameEn: "Tulsi (Holy Basil)",
      botanical: "Ocimum tenuiflorum",
      role: "सुरसा (Queen of Herbs)",
      dosha: "Balances Kapha & Vata",
      note: "Grown in the courtyard of traditional homes. Clears the respiratory channels (Prana Vaha Srotas) and calms the mind.",
      remedyQuery: "Tulsi",
    },
    {
      nameHi: "सोंठ / अदरक",
      nameEn: "Sunth & Adrak (Ginger)",
      botanical: "Zingiber officinale",
      role: "दीपन-पाचन (Digestive Fire)",
      dosha: "Balances Vata & Kapha",
      note: "Kindles the digestive fire (Jatharagni) without aggravating Pitta when dried (Sunth). Cornerstone of monsoon brews.",
      remedyQuery: "Ginger",
    },
    {
      nameHi: "जीरा",
      nameEn: "Jeera (Cumin)",
      botanical: "Cuminum cyminum",
      role: "पित्तशामक (Gentle Carminative)",
      dosha: "Balances Pitta & Vata",
      note: "Boiled in water across South and Central India as daily drinking water to ease digestion and soothe internal heat.",
      remedyQuery: "Cumin",
    },
    {
      nameHi: "अजवाइन",
      nameEn: "Ajwain (Carom)",
      botanical: "Trachyspermum ammi",
      role: "वातानुलोमन (Gas & Cramp Relief)",
      dosha: "Strongly pacifies Vata & Kapha",
      note: "Warmed in dry potlis or chewed with rock salt. The grandmother's immediate domestic answer to colic and chest chill.",
      remedyQuery: "Ajwain",
    },
    {
      nameHi: "काली मिर्च",
      nameEn: "Kali Mirch (Black Pepper)",
      botanical: "Piper nigrum",
      role: "योगवाही (Bio-Enhancer)",
      dosha: "Liquefies Kapha",
      note: "Native to the Western Ghats. In Ayurvedic science, it carries the therapeutic potency of other herbs deeper into the tissues.",
      remedyQuery: "Pepper",
    },
    {
      nameHi: "मुलेठी",
      nameEn: "Mulethi (Licorice)",
      botanical: "Glycyrrhiza glabra",
      role: "कण्ठ्य (Throat & Voice Soother)",
      dosha: "Balances Vata & Pitta",
      note: "Naturally sweet soothing root. Sucked on for hoarseness and irritated vocal cords. (Caution in hypertension).",
      remedyQuery: "Licorice",
    },
  ];

  return (
    <section
      aria-label="Ayurvedic Cultural Heritage & Philosophy"
      className="mb-6 rounded-2xl border border-[#DFCFAF]/70 dark:border-[#38332A]/70 bg-[#FAF6ED] dark:bg-[#1E1C1A] overflow-hidden shadow-xs transition-all"
    >
      {/* Sleek, Non-Cluttered Drawer Header */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3.5 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between text-left hover:bg-[#F3ECE0]/70 dark:hover:bg-[#25221F]/70 transition-colors group gap-2"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <DiyaIcon className="w-4 h-4 text-[#D97706] flex-shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-serif font-bold text-xs sm:text-base text-[#832613] dark:text-[#F59E0B] truncate">
              ॥ {t.heritageTitle} ॥
            </span>
            <span className="hidden md:inline text-xs text-[#4A3E34] dark:text-[#BFB6A8] truncate opacity-85 font-medium">
              — The 3 Doshas, 7 Sacred Kitchen Herbs & Seasonal Wisdom
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-[#9C4129] dark:text-[#F59E0B] flex-shrink-0 ml-1">
          <span className="hidden sm:inline">{isExpanded ? "Collapse Guide" : "Explore Guide"}</span>
          <span className="sm:hidden">{isExpanded ? "Hide" : "Guide"}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
        </div>
      </button>

      {/* Expanded Cultural Guide Content */}
      {isExpanded && (
        <div className="p-4 sm:p-6 border-t border-[#DFCFAF] dark:border-[#38332A] bg-[#FDFBF7] dark:bg-[#181614] space-y-6">
          <IndianOrnamentalBand className="opacity-70 mb-2" />

          {/* Sanskrit Invocation & Classical Shloka Banner */}
          <div className="text-center pb-3 border-b border-[#E7DEC8] dark:border-[#36332E]">
            <div className="my-1 p-3 sm:p-4 bg-[#F5EEDC] dark:bg-[#25221F] border border-[#E7DEC8] dark:border-[#3E3A33] rounded-2xl max-w-2xl mx-auto shadow-2xs">
              <p className="font-serif text-base sm:text-lg font-bold text-[#832613] dark:text-[#F59E0B] tracking-wide">
                ॥ स्वस्थस्य स्वास्थ्यरक्षणं, आतुरस्य विकारप्रशमनं च ॥
              </p>
              <p className="text-xs sm:text-sm text-[#524335] dark:text-[#C5BDB1] mt-1.5 italic">
                &ldquo;To preserve the natural harmony of the healthy, and to gently alleviate imbalance in the afflicted.&rdquo;
                <span className="block text-xs uppercase font-mono tracking-wider opacity-80 mt-1 font-semibold">
                  — Charaka Samhita, Sutrasthana 30.26
                </span>
              </p>
            </div>

            <p className="text-sm text-[#44403C] dark:text-[#D1C9BE] max-w-3xl mx-auto mt-3 leading-relaxed">
              In traditional Indian culture, the kitchen was the first apothecary (<em>Rasashala</em>) and food was the sacred medicine (<em>Maha-Aushadha</em>). Every home remedy was guided by centuries of seasonal observation, five-element balance, and oral grandmother lore.
            </p>
          </div>

          <div className="space-y-5">
          {/* Section Navigation Tabs */}
          <div className="flex items-center justify-center gap-2.5 border-b border-[#E7DEC8] dark:border-[#36332E] pb-3 flex-wrap text-sm">
            <button
              type="button"
              onClick={() => setActiveTab("doshas")}
              className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                activeTab === "doshas"
                  ? "bg-[#9C4129] text-[#FDFBF7] shadow-xs"
                  : "bg-[#F5F0E6] dark:bg-[#25221F] text-[#44403C] dark:text-[#C5BDB1] hover:bg-[#E7DEC8]"
              }`}
            >
              <LotusMandalaIcon className="w-4 h-4" color={activeTab === "doshas" ? "#FDE68A" : "#9C4129"} />
              {t.tabDoshas}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("spices")}
              className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                activeTab === "spices"
                  ? "bg-[#9C4129] text-[#FDFBF7] shadow-xs"
                  : "bg-[#F5F0E6] dark:bg-[#25221F] text-[#44403C] dark:text-[#C5BDB1] hover:bg-[#E7DEC8]"
              }`}
            >
              <KharalIcon className="w-4 h-4" />
              {t.tabKitchenHerbs}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("philosophy")}
              className={`px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 ${
                activeTab === "philosophy"
                  ? "bg-[#9C4129] text-[#FDFBF7] shadow-xs"
                  : "bg-[#F5F0E6] dark:bg-[#25221F] text-[#44403C] dark:text-[#C5BDB1] hover:bg-[#E7DEC8]"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {t.tabElementsSeasons}
            </button>
          </div>

          {/* TAB 1: THE TRIDOSHA PRINCIPLE */}
          {activeTab === "doshas" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* VATA */}
              <div className="bg-[#FAF7F0] dark:bg-[#22201D] border border-[#CBD5E1] dark:border-[#3E4552] p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#1E3A8A] dark:text-[#93C5FD] flex items-center gap-1.5">
                      <VataDoshaIcon className="w-5 h-5" />
                      वात • VĀTA
                    </span>
                    <span className="text-xs uppercase font-mono px-2 py-0.5 bg-[#EFF6FF] dark:bg-[#1E293B] text-[#1E40AF] dark:text-[#93C5FD] rounded-full border border-[#BFDBFE] font-semibold">
                      Air & Space
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] dark:text-[#94A3B8] italic mb-2.5 leading-relaxed">
                    The principle of movement, respiration, circulation, and nervous impulses.
                  </p>
                  <div className="text-sm space-y-2 text-[#334155] dark:text-[#CBD5E1] leading-relaxed">
                    <div>
                      <strong>When Imbalanced:</strong> Joint stiffness, dry cough, bloating, gas, restlessness.
                    </div>
                    <div>
                      <strong>Household Balancers:</strong> Warm sesame oil, dry ginger, ajwain, warm milk with nutmeg.
                    </div>
                  </div>
                </div>
                {onSelectConcern && (
                  <button
                    type="button"
                    onClick={() => onSelectConcern("Gas")}
                    className="mt-4 text-xs sm:text-sm font-semibold text-[#1E40AF] dark:text-[#93C5FD] hover:underline text-left cursor-pointer"
                  >
                    Explore Vata-pacifying remedies (Gas / Joint) →
                  </button>
                )}
              </div>

              {/* PITTA */}
              <div className="bg-[#FAF7F0] dark:bg-[#22201D] border border-[#FDE68A] dark:border-[#52441E] p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#B45309] dark:text-[#FBBF24] flex items-center gap-1.5">
                      <PittaDoshaIcon className="w-5 h-5" />
                      पित्त • PITTA
                    </span>
                    <span className="text-xs uppercase font-mono px-2 py-0.5 bg-[#FEF3C7] dark:bg-[#3D2C0C] text-[#92400E] dark:text-[#FDE68A] rounded-full border border-[#FDE68A] font-semibold">
                      Fire & Water
                    </span>
                  </div>
                  <p className="text-xs text-[#78350F] dark:text-[#FDE68A]/80 italic mb-2.5 leading-relaxed">
                    The principle of transformation, digestion (Jatharagni), and cellular metabolism.
                  </p>
                  <div className="text-sm space-y-2 text-[#451A03] dark:text-[#E2E8F0] leading-relaxed">
                    <div>
                      <strong>When Imbalanced:</strong> Acidity, heartburn, skin flare-ups, excessive body heat.
                    </div>
                    <div>
                      <strong>Household Balancers:</strong> Cumin water (Jeeraka Vellam), Solkadhi (Kokum), Coriander seeds, Ghee, Amla.
                    </div>
                  </div>
                </div>
                {onSelectConcern && (
                  <button
                    type="button"
                    onClick={() => onSelectConcern("Acidity")}
                    className="mt-4 text-xs sm:text-sm font-semibold text-[#B45309] dark:text-[#FBBF24] hover:underline text-left cursor-pointer"
                  >
                    Explore Pitta-cooling remedies (Acidity / Digestion) →
                  </button>
                )}
              </div>

              {/* KAPHA */}
              <div className="bg-[#FAF7F0] dark:bg-[#22201D] border border-[#BBF7D0] dark:border-[#204E2B] p-4 rounded-2xl flex flex-col justify-between shadow-2xs">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-serif font-bold text-base sm:text-lg text-[#15803D] dark:text-[#4ADE80] flex items-center gap-1.5">
                      <KaphaDoshaIcon className="w-5 h-5" />
                      कफ • KAPHA
                    </span>
                    <span className="text-xs uppercase font-mono px-2 py-0.5 bg-[#DCFCE7] dark:bg-[#14381C] text-[#166534] dark:text-[#4ADE80] rounded-full border border-[#BBF7D0] font-semibold">
                      Water & Earth
                    </span>
                  </div>
                  <p className="text-xs text-[#14532D] dark:text-[#86EFAC]/80 italic mb-2.5 leading-relaxed">
                    The principle of structure, lubrication, physical stamina, and mucosal immunity.
                  </p>
                  <div className="text-sm space-y-2 text-[#052E16] dark:text-[#E2E8F0] leading-relaxed">
                    <div>
                      <strong>When Imbalanced:</strong> Chest congestion, cold-weather phlegm, lethargy, heavy digestion.
                    </div>
                    <div>
                      <strong>Household Balancers:</strong> Black pepper, Tulsi kadha, Chukku Kaapi, roasted fenugreek, dry fomentation.
                    </div>
                  </div>
                </div>
                {onSelectConcern && (
                  <button
                    type="button"
                    onClick={() => onSelectConcern("Cough")}
                    className="mt-4 text-xs sm:text-sm font-semibold text-[#15803D] dark:text-[#4ADE80] hover:underline text-left cursor-pointer"
                  >
                    Explore Kapha-clearing brews (Cough & Cold) →
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: THE 7 SACRED KITCHEN HERBS */}
          {activeTab === "spices" && (
            <div>
              <div className="mb-3 text-xs text-[#524335] dark:text-[#C5BDB1]">
                Every traditional Indian kitchen houses a round stainless or brass spice box (<em>Masala Dabba</em>). In ethnobotanical science, these culinary spices were chosen precisely because of their digestive and antimicrobial virtues:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {sacredHerbs.map((herb, idx) => (
                  <div
                    key={idx}
                    className="bg-[#FAF6EC] dark:bg-[#22201D] border border-[#E7DEC8] dark:border-[#38332A] p-4 rounded-2xl hover:border-[#9C4129] transition-all shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-base font-bold text-[#9C4129] dark:text-[#F59E0B]">
                            {herb.nameHi} • {herb.nameEn}
                          </span>
                          <div className="text-xs font-serif italic text-[#2D5A27] dark:text-[#5BA852] mt-0.5">
                            {herb.botanical}
                          </div>
                        </div>
                        <span className="text-xs font-mono font-bold text-[#D97706] bg-[#FEF3C7] dark:bg-[#3D2C0C] px-2 py-0.5 rounded-full border border-[#FDE68A]/60 flex-shrink-0">
                          #{idx + 1}
                        </span>
                      </div>

                      <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] dark:text-[#FBBF24] mt-2">
                        {herb.role}
                      </div>

                      <p className="text-sm text-[#44403C] dark:text-[#C5BDB1] mt-1.5 leading-relaxed">
                        {herb.note}
                      </p>
                    </div>

                    {onSelectConcern && (
                      <button
                        type="button"
                        onClick={() => onSelectConcern(herb.remedyQuery)}
                        className="mt-3 text-xs font-bold text-[#9C4129] dark:text-[#F59E0B] hover:underline inline-block cursor-pointer text-left"
                      >
                        Find remedies with {herb.nameHi} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIVE ELEMENTS & SEASONS */}
          {activeTab === "philosophy" && (
            <div className="bg-[#FAF6EC] dark:bg-[#22201D] border border-[#E7DEC8] dark:border-[#38332A] p-5 rounded-2xl space-y-4 text-sm text-[#44403C] dark:text-[#C5BDB1] leading-relaxed shadow-2xs">
              <div>
                <h4 className="font-serif font-bold text-base text-[#9C4129] dark:text-[#F59E0B] mb-1.5 flex items-center gap-2">
                  <LotusMandalaIcon className="w-5 h-5 text-[#D97706]" />
                  पंचमहाभूत (The Five Great Elements)
                </h4>
                <p>
                  According to ancient Indian natural philosophy, all living organisms, food, and herbs are formed of five eternal building blocks:
                  <strong> पृथ्वी (Prithvi / Earth)</strong> which gives density and structure;
                  <strong> जल (Jala / Water)</strong> which provides cohesion and hydration;
                  <strong> अग्नि (Agni / Fire)</strong> which enables enzymatic digestion and illumination;
                  <strong> वायु (Vayu / Air)</strong> which propels breathing and peristalsis; and
                  <strong> आकाश (Akasha / Ether)</strong> which creates non-resistance and open channels.
                </p>
              </div>

              <div className="border-t border-[#E7DEC8] dark:border-[#36332E] pt-3.5">
                <h4 className="font-serif font-bold text-base text-[#2D5A27] dark:text-[#5BA852] mb-1.5">
                  ऋतुचर्या (The Wisdom of Indian Seasons)
                </h4>
                <p>
                  In Indian household tradition, remedies are rarely taken out of season. During the monsoons (<em>Varsha Ritu</em>), when digestive fire weakens and dampness aggravates Vata, warming decoctions of ginger, black pepper, and horse gram are brewed. In peak summer (<em>Grishma Ritu</em>), coastal homes switch to cooling Kokum (Solkadhi), Bael fruit sharbat, and cumin-infused cooling waters.
                </p>
              </div>

              <div className="p-3 bg-[#FEF3C7] dark:bg-[#2C210E] border-l-3 border-[#D97706] rounded-r-xl text-xs sm:text-sm text-[#78350F] dark:text-[#FDE68A] leading-relaxed">
                <strong>Cultural Distinction:</strong> Classical Ayurveda (*Samhitas*) and regional Folk practice (*Loka-Parampara*) share botanical roots but represent different lineages. This archive records both with exact provenance, ensuring folk wisdom is credited to its native communities.
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </section>
  );
}

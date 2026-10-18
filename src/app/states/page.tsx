import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STATES_AND_UTS, REGIONS } from "@/data/schema";
import { remedyRepo } from "@/lib/repository";
import { MapPin, ArrowRight, BookOpen, Compass } from "lucide-react";
import { HeritageOrnateDivider, ArchivalMoharStamp } from "@/components/IndianMotifs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse by Place — 36 States & Union Territories — हमारे नुस्खे",
  description:
    "Explore traditional domestic remedies cataloged by geography across India's 28 states and 8 Union Territories.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function StatesPage() {
  const facets = await remedyRepo.facets();
  const allRemedies = await remedyRepo.all();

  // Group states by region
  const regionMap: Record<string, { states: string[]; hindi: string; description: string }> = {
    South: {
      states: ["Andhra Pradesh", "Karnataka", "Kerala", "Tamil Nadu", "Telangana", "Puducherry", "Lakshadweep"],
      hindi: "दक्षिण भारत",
      description: "Rich coastal Malabar spice lore, Western Ghats biodiversity, decoctions (kashayams), and coconut-sesame home preparations.",
    },
    North: {
      states: ["Haryana", "Himachal Pradesh", "Punjab", "Rajasthan", "Uttar Pradesh", "Uttarakhand", "Chandigarh", "Delhi", "Jammu & Kashmir", "Ladakh"],
      hindi: "उत्तर भारत",
      description: "Himalayan alpine herbs, winter mustard and ginger tonics, desert arid-zone seed lore, and classical Charaka-lineage kitchen remedies.",
    },
    West: {
      states: ["Goa", "Gujarat", "Maharashtra", "Dadra & Nagar Haveli and Daman & Diu"],
      hindi: "पश्चिम भारत",
      description: "Konkan herbal pastes, Kathiawadi digestive spice carminatives, and Western Sahyadri wild edible shoots.",
    },
    East: {
      states: ["Bihar", "Jharkhand", "Odisha", "West Bengal", "Andaman & Nicobar Islands"],
      hindi: "पूर्व भारत",
      description: "Gangetic flood-plain greens, tribal Chota Nagpur root folklore, mustard seed compresses, and island ethnomedicinal flora.",
    },
    Central: {
      states: ["Chhattisgarh", "Madhya Pradesh"],
      hindi: "मध्य भारत",
      description: "Vindhya and Satpura forest traditions, Gond and Baiga indigenous folk botany, and household mahua-neem preparations.",
    },
    Northeast: {
      states: ["Arunachal Pradesh", "Assam", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Sikkim", "Tripura"],
      hindi: "पूर्वोत्तर भारत",
      description: "Sub-Himalayan rainforest flora, indigenous fermented bamboo shoot tonics, and living folk healers (Bez/Kabiraj) lineages.",
    },
    "Pan-India": {
      states: ["Pan-India"],
      hindi: "अखिल भारतीय",
      description: "Ubiquitous household remedies known uniformly across linguistic barriers (haldi doodh, ajwain ark, tulsi chai).",
    },
  };

  const totalStatesDocumented = Object.values(facets.states).filter((c) => c > 0).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 py-6 sm:py-10 pb-24 lg:pb-10">
        {/* Archival Ledger Header */}
        <header className="border-b-2 border-[#D8CBB8] dark:border-[#38332A] pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="stamp-badge stamp-state">
              भौगोलिक परम्परा • GEOGRAPHIC REGISTRY • 36 JURISDICTIONS
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight">
                Regional Cultural Dossiers
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5C5346] dark:text-[#C5BCB0] max-w-3xl leading-relaxed font-serif">
                Domestic home remedies are deeply tied to local agro-climatic zones, seasonal crops, and indigenous plant diversity. Explore documented folk and classical preparations across India&apos;s 28 states and 8 Union Territories.
              </p>
            </div>

            {/* Archival Accession Stamp */}
            <div className="flex items-center gap-4 p-4 border border-[#B5945B]/60 bg-[#FAF6EE] dark:bg-[#201D1A] rounded-[2px] shadow-[inset_0_0_10px_rgba(181,148,91,0.08)] shrink-0">
              <div className="p-2 border border-[#B5945B]/50 bg-[#F4EFE6] dark:bg-[#181614]">
                <Compass className="w-5 h-5 text-[#9E2A2B]" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                  Archival Coverage
                </div>
                <div className="text-sm font-bold font-serif text-[#1C1917] dark:text-[#F4ECE0]">
                  {totalStatesDocumented} of 36 Jurisdictions Documented
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Regional Dossiers */}
        <div className="space-y-12">
          {Object.entries(regionMap).map(([region, info]) => {
            const regionCount = facets.regions[region] || 0;
            return (
              <section
                key={region}
                className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[3px] p-6 sm:p-8 shadow-[inset_0_0_16px_rgba(216,203,184,0.12)] transition-all hover:border-[#B5945B]/80"
              >
                {/* Regional Dossier Header */}
                <div className="border-b border-[#D8CBB8]/80 dark:border-[#38332A] pb-4 mb-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                        {region} India Dossier
                      </span>
                      <span className="font-serif text-base text-[#9E2A2B] dark:text-[#D99B26] font-semibold">
                        ({info.hindi})
                      </span>
                      <span className="stamp-badge font-mono text-[10px] text-[#5C5346] border-[#D8CBB8] bg-[#F4EFE6] dark:bg-[#25221F]">
                        {regionCount} FOLIOS CATALOGED
                      </span>
                    </div>

                    <Link
                      href={`/?region=${encodeURIComponent(region)}`}
                      className="text-xs font-mono uppercase tracking-wider text-[#9E2A2B] dark:text-[#D99B26] hover:underline flex items-center gap-1.5 font-bold group"
                    >
                      <span>Examine All {region} Folios</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-[#5C5346] dark:text-[#C5BCB0] font-serif italic max-w-3xl">
                    {info.description}
                  </p>
                </div>

                {/* State Cards Grid with Miniature Brass Index Borders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
                  {info.states.map((st) => {
                    const count = facets.states[st] || 0;
                    const hasRemedies = count > 0;
                    return (
                      <Link
                        key={st}
                        href={hasRemedies ? `/?state=${encodeURIComponent(st)}` : "#"}
                        className={`group relative p-3.5 border transition-all duration-200 flex items-center justify-between gap-2 rounded-[2px] ${
                          hasRemedies
                            ? "border-[#D8CBB8] dark:border-[#38332A] bg-[#F4EFE6] dark:bg-[#22201D] hover:border-[#9E2A2B] hover:bg-[#FAF6EE] dark:hover:bg-[#282522] hover:-translate-y-0.5 shadow-xs"
                            : "border-[#D8CBB8]/40 dark:border-[#38332A]/40 bg-[#F4EFE6]/40 dark:bg-[#22201D]/30 opacity-60 cursor-not-allowed"
                        }`}
                      >
                        {/* Miniature Brass Indicator Bar */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 ${
                            hasRemedies ? "bg-[#B5945B] group-hover:bg-[#9E2A2B]" : "bg-[#D8CBB8]/50"
                          } transition-colors`}
                        />

                        <div className="pl-1.5">
                          <span className="font-serif font-bold text-sm text-[#1C1917] dark:text-[#F4ECE0] group-hover:text-[#9E2A2B] dark:group-hover:text-[#D99B26] transition-colors block">
                            {st}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-[0.08em] text-[#5C5346]/80 dark:text-[#B8B2A7]/80">
                            {hasRemedies ? "Specimens Filed" : "Field Survey Pending"}
                          </span>
                        </div>

                        {/* Stamped Catalog Number */}
                        <div
                          className={`font-mono text-[11px] px-2 py-0.5 border rounded-[2px] transition-colors shrink-0 font-bold ${
                            hasRemedies
                              ? "bg-[#FAF6EE] dark:bg-[#181614] border-[#B5945B]/60 text-[#9E2A2B] dark:text-[#D99B26] group-hover:border-[#9E2A2B]"
                              : "bg-[#F4EFE6]/50 dark:bg-[#181614]/50 border-[#D8CBB8]/40 text-[#5C5346]/50"
                          }`}
                        >
                          N° {count.toString().padStart(3, "0")}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* Decorative Divider at Bottom of Dossier */}
        <div className="mt-14 pt-4">
          <HeritageOrnateDivider className="opacity-80 text-[#B5945B]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

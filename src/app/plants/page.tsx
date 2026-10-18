import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { remedyRepo } from "@/lib/repository";
import { Sprout, ArrowRight, ExternalLink, Tag } from "lucide-react";
import { HeritageOrnateDivider, SpecimenLeafWatermark } from "@/components/IndianMotifs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Botanical Plant Index (POWO/IPNI) — हमारे नुस्खे",
  description:
    "Systematic botanical index of medicinal plants and herbs cataloged across traditional Indian home remedies, verified against Kew POWO and IPNI.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PlantsPage() {
  const allRemedies = await remedyRepo.all();

  // Aggregate plants with remedies
  interface PlantAgg {
    commonName: string;
    scientificName: string | null;
    verification: string;
    remedies: { slug: string; title: string; state: string }[];
  }

  const plantMap = new Map<string, PlantAgg>();

  for (const r of allRemedies) {
    for (const b of r.botanicals) {
      const key = (b.scientificName || b.commonName).toLowerCase();
      if (!plantMap.has(key)) {
        plantMap.set(key, {
          commonName: b.commonName,
          scientificName: b.scientificName,
          verification: b.nameVerifiedAgainst,
          remedies: [],
        });
      }
      const existing = plantMap.get(key)!;
      if (!existing.remedies.some((rem) => rem.slug === r.slug)) {
        existing.remedies.push({
          slug: r.slug,
          title: r.titleEn,
          state: r.stateOrUT,
        });
      }
    }
  }

  const plantList = Array.from(plantMap.values()).sort((a, b) => {
    const nameA = a.scientificName || a.commonName;
    const nameB = b.scientificName || b.commonName;
    return nameA.localeCompare(nameB);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 py-6 sm:py-10 pb-24 lg:pb-10">
        {/* Archival Ledger Header */}
        <header className="border-b-2 border-[#D8CBB8] dark:border-[#38332A] pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="stamp-badge stamp-reviewed">
              द्रव्यगुण विज्ञान • BOTANICAL & AYURVEDIC TAXA REGISTER
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight">
                Systematic Botanical Index
              </h1>
              <p className="mt-3 text-sm sm:text-base text-[#5C5346] dark:text-[#C5BCB0] max-w-3xl leading-relaxed font-serif">
                In Ayurvedic Dravyaguna science and Indian ethnobotany, every domestic plant holds specific energetic virtues (rasa, guna, virya, vipaka). Every botanical ingredient in this archive is cross-referenced against authoritative taxonomic databases (Kew Plants of the World Online & IPNI) and linked directly to its regional kitchen folios.
              </p>
            </div>

            {/* Specimen Ledger Accession Count */}
            <div className="flex items-center gap-4 p-4 border border-[#B5945B]/60 bg-[#FAF6EE] dark:bg-[#201D1A] rounded-[2px] shadow-[inset_0_0_10px_rgba(181,148,91,0.08)] shrink-0">
              <div className="p-2 border border-[#2D4A3E]/40 bg-[#2D4A3E]/10">
                <Sprout className="w-5 h-5 text-[#2D4A3E] dark:text-[#5BA852]" />
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                  Taxonomic Catalog
                </div>
                <div className="text-sm font-bold font-serif text-[#1C1917] dark:text-[#F4ECE0]">
                  {plantList.length} Verified Botanical Taxa
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Botanical Ledger Entries */}
        <div className="space-y-5">
          {plantList.map((plant, idx) => (
            <article
              key={idx}
              className="relative overflow-hidden bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] rounded-[3px] p-6 shadow-[inset_0_0_14px_rgba(216,203,184,0.12)] transition-all hover:border-[#2D4A3E] group"
            >
              {/* Subtle Watermarked Botanical Leaf SVG in background */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 text-[#2D4A3E] pointer-events-none opacity-[0.04] dark:opacity-[0.06] group-hover:opacity-[0.08] transition-opacity">
                <SpecimenLeafWatermark className="w-full h-full" />
              </div>

              {/* Top Row: Taxon Details + Botanical Garden Brass Tag */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 border-b border-[#D8CBB8]/80 dark:border-[#38332A] pb-3.5 mb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  {/* Specimen Index Number */}
                  <span className="font-mono text-[11px] font-bold text-[#5C5346] dark:text-[#B8B2A7] px-2 py-0.5 border border-[#D8CBB8] bg-[#F4EFE6] dark:bg-[#25221F] rounded-[2px]">
                    TAXON #{(idx + 1).toString().padStart(4, "0")}
                  </span>

                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F4ECE0] flex items-baseline gap-2 flex-wrap">
                    {plant.scientificName ? (
                      <span className="italic text-[#2D4A3E] dark:text-[#66BB58]">
                        {plant.scientificName}
                      </span>
                    ) : (
                      <span>{plant.commonName}</span>
                    )}

                    {plant.scientificName && (
                      <span className="font-sans text-sm font-normal text-[#5C5346] dark:text-[#B8B2A7]">
                        — {plant.commonName}
                      </span>
                    )}
                  </h2>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Official Botanical Garden Brass Tag */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#B5945B]/15 border border-[#B5945B] text-[#8C6D32] dark:text-[#E0A845] font-mono text-[10px] uppercase tracking-[0.08em] font-bold rounded-[2px] shadow-xs">
                    <Tag className="w-3 h-3 text-[#B5945B]" />
                    <span>VERIFIED {plant.verification}</span>
                  </span>

                  {plant.scientificName && (
                    <a
                      href={`https://powo.science.kew.org/results?q=${encodeURIComponent(plant.scientificName)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-[#2D4A3E] dark:text-[#66BB58] border border-[#2D4A3E]/30 bg-[#2D4A3E]/5 hover:bg-[#2D4A3E]/15 rounded-[2px] transition-colors font-semibold"
                    >
                      <span>Kew POWO Specimen</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Linked Remedies underneath as Horizontal Filed Index Slips */}
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7] font-bold block mb-2.5">
                  Filed in {plant.remedies.length} Archival Household Folio{plant.remedies.length > 1 ? "s" : ""}:
                </span>

                <div className="flex flex-wrap gap-2.5">
                  {plant.remedies.map((rem) => (
                    <Link
                      key={rem.slug}
                      href={`/remedy/${rem.slug}`}
                      className="group/slip relative px-3 py-1.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] hover:border-[#9E2A2B] hover:bg-[#FAF6EE] dark:hover:bg-[#2C2926] rounded-[2px] transition-all flex items-center gap-2 shadow-xs"
                    >
                      {/* Left index notch */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B5945B] group-hover/slip:bg-[#9E2A2B] transition-colors" />

                      <span className="font-serif font-bold text-xs text-[#1C1917] dark:text-[#F4ECE0] group-hover/slip:text-[#9E2A2B] dark:group-hover/slip:text-[#D99B26] transition-colors">
                        {rem.title}
                      </span>

                      <span className="font-mono text-[10px] text-[#5C5346] dark:text-[#B8B2A7] border-l border-[#D8CBB8] dark:border-[#38332A] pl-1.5">
                        {rem.state}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Ornate Divider at page bottom */}
        <div className="mt-14 pt-4">
          <HeritageOrnateDivider className="opacity-80 text-[#B5945B]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

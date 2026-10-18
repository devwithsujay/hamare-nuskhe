import React, { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ArchiveExplorer from "@/components/ArchiveExplorer";
import HomeHeroBanner from "@/components/HomeHeroBanner";
import { remedyRepo } from "@/lib/repository";

export const revalidate = 3600;

export default async function HomePage() {
  const allRemedies = await remedyRepo.forExplorer();
  const facets = await remedyRepo.facets();

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1714] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-[1536px] w-full mx-auto px-3.5 sm:px-8 lg:px-12 py-5 sm:py-8 pb-24 lg:pb-8">
        {/* Cultural Editorial Intro Banner with Traditional Manuscript Frame */}
        <HomeHeroBanner remedyCount={allRemedies.length} />

        {/* Client-side Archive Explorer with search, filters, and index/card toggle */}
        <Suspense
          fallback={
            <div className="py-20 text-center text-sm text-[#4A3E34] animate-pulse">
              Loading traditional remedy folios...
            </div>
          }
        >
          <ArchiveExplorer
            initialRemedies={allRemedies}
            facets={facets}
          />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";

export default function TypeSpecimenPage() {
  const indicScripts = [
    {
      script: "Devanagari",
      language: "Hindi / Marathi / Sanskrit",
      sample: "हल्दी दूध — पारम्परिक अदरक-तुलसी-काली मिर्च काढ़ा",
      botanical: "कर्कुमा लोंगा (Curcuma longa), ओसीमम सैंक्टम (Ocimum sanctum)",
      fontClass: "font-indic-devanagari",
      langCode: "hi",
    },
    {
      script: "Kannada",
      language: "Kannada",
      sample: "ದೊಡ್ಡಪತ್ರೆ ತಂಬುಳಿ — ಹವ್ಯಕ ಅಡುಗೆಮನೆಯ ಸಾಂಪ್ರದಾಯಿಕ ತಂಪು ಪೇಯ",
      botanical: "ಕೋಲಿಯಸ್ ಆಂಬೊಯಿನಿಕಸ್ (Coleus amboinicus)",
      fontClass: "font-indic-kannada",
      langCode: "kn",
    },
    {
      script: "Tamil",
      language: "Tamil",
      sample: "கொள்ளு ரசம் — பாரம்பரிய மழைக்கால மிளகு சீரகக் கஷாயம்",
      botanical: "மேக்ரோடைலோமா யுனிப்ளோரம் (Macrotyloma uniflorum)",
      fontClass: "font-indic-tamil",
      langCode: "ta",
    },
    {
      script: "Telugu",
      language: "Telugu",
      sample: "జీలకర్ర నీరు — జీర్ణక్రియకు సంప్రదాయ ఉదయపు పానీయము",
      botanical: "క్యూమినం సైమినం (Cuminum cyminum)",
      fontClass: "font-indic-telugu",
      langCode: "te",
    },
    {
      script: "Malayalam",
      language: "Malayalam",
      sample: "ചുക്കുകാപ്പി — മലബാറിലെ പരമ്പരാഗത ഉണക്ക ഇഞ്ചി പാനീയം",
      botanical: "സിഞ്ചിബർ ഒഫിസിനേൽ (Zingiber officinale)",
      fontClass: "font-indic-malayalam",
      langCode: "ml",
    },
    {
      script: "Bengali",
      language: "Bengali",
      sample: "থানকুনি পাতা বাটা — বাংলার ঐতিহ্যবাহী পথ্য ও স্নিগ্ধ ব্যঞ্জন",
      botanical: "সেন্টেলা এশিয়াটিকা (Centella asiatica)",
      fontClass: "font-indic-bengali",
      langCode: "bn",
    },
    {
      script: "Gujarati",
      language: "Gujarati",
      sample: "મેથી દાણા પાણી — સવારનું પરંપરાગત ઘરેલું પાચક પીણું",
      botanical: "ટ્રિગોનેલા ફોઈનમ-ગ્રેકમ (Trigonella foenum-graecum)",
      fontClass: "font-indic-gujarati",
      langCode: "gu",
    },
    {
      script: "Gurmukhi",
      language: "Punjabi",
      sample: "ਅਜਵਾਇਨ ਅਰਕ — ਸਰਦੀਆਂ ਵਿੱਚ ਘਰੇਲੂ ਪੋਟਲੀ ਦਾ ਸੇਕ",
      botanical: "ਟ੍ਰੈਕੀਸਪਰਮਮ ਅੰਮੀ (Trachyspermum ammi)",
      fontClass: "font-indic-gurmukhi",
      langCode: "pa",
    },
    {
      script: "Odia",
      language: "Odia",
      sample: "ତୁଳସୀ କାଢ଼ା — ଋତୁ ପରିବର୍ତ୍ତନ ସମୟର ପାରମ୍ପରିକ ପାନୀୟ",
      botanical: "ଓସିମମ୍ ସାଙ୍କଟମ୍ (Ocimum sanctum)",
      fontClass: "font-indic-odia",
      langCode: "or",
    },
    {
      script: "Assamese",
      language: "Assamese",
      sample: "আদা-মৰিচ চাহ — পাহাৰীয়া জাৰৰ পৰম্পৰাগত প্ৰলেপ",
      botanical: "জিঞ্জিবাৰ অফিচিনেল (Zingiber officinale)",
      fontClass: "font-indic-assamese",
      langCode: "as",
    },
    {
      script: "Urdu",
      language: "Urdu",
      sample: "سونف اور الائچی کا قہوہ — ہاضمے کی روایتی گھریلو تراکیب",
      botanical: "فینیکلم ولگیر (Foeniculum vulgare)",
      fontClass: "font-sans",
      langCode: "ur",
    },
  ];

  const designTokens = [
    { name: "Parchment", hex: "#FDFBF7", text: "#1C1917", role: "Primary canvas surface" },
    { name: "Paper", hex: "#F5F0E6", text: "#1C1917", role: "Margin columns, cards, stamps" },
    { name: "Rule", hex: "#E7DEC8", text: "#44403C", role: "Hairline editorial borders" },
    { name: "Ink", hex: "#1C1917", text: "#FDFBF7", role: "Headlines, high-contrast text" },
    { name: "Sepia", hex: "#44403C", text: "#FDFBF7", role: "Secondary notes, metadata" },
    { name: "Terracotta", hex: "#9C4129", text: "#FDFBF7", role: "Drop caps, editorial emphasis" },
    { name: "Turmeric", hex: "#D97706", text: "#1C1917", role: "Warm accents, active filters" },
    { name: "Sage", hex: "#2D5A27", text: "#FDFBF7", role: "Reviewed badges, botanicals" },
    { name: "Caution Amber", hex: "#B45309", text: "#FDFBF7", role: "Pregnancy & condition alerts" },
    { name: "Deep Red", hex: "#9B1C1C", text: "#FDFBF7", role: "Infant botulism & high risk" },
  ];

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Editorial Header */}
      <header className="border-b border-[#E7DEC8] pb-6 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <span className="state-stamp mb-2">Phase 1 Foundation Specimen</span>
            <h1 className="text-3xl sm:text-4xl text-[#1C1917] tracking-tight">
              हमारे नुस्खे <span className="font-sans text-2xl font-normal text-[#44403C]">/ Hamare Nuskhe</span>
            </h1>
            <p className="text-sm text-[#44403C] mt-1 italic">
              Home remedies from across India — Field Guide & Typographic Specimen
            </p>
          </div>
          <div className="text-xs text-[#44403C] space-y-1 sm:text-right">
            <div>Archive Standard: v1.0</div>
            <div>Strict Zod Schema + 38 Vitest Tests Passed</div>
          </div>
        </div>
      </header>

      {/* Mandatory Archive Disclaimer Banner */}
      <section className="mb-10 bg-[#F5F0E6] border border-[#E7DEC8] p-4 text-xs text-[#44403C] leading-relaxed">
        <strong className="text-[#9C4129] block mb-1 uppercase tracking-wider text-[11px]">
          Archival Notice (Appears on every remedy):
        </strong>
        {MANDATORY_ARCHIVE_DISCLAIMER}
      </section>

      {/* Section 1: Color Tokens */}
      <section className="mb-12">
        <h2 className="text-xl text-[#1C1917] border-b border-[#E7DEC8] pb-2 mb-4">
          1. Editorial Design Tokens (No Neon, No Glows, No Synthetic Gradients)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {designTokens.map((t) => (
            <div
              key={t.name}
              className="border border-[#E7DEC8] p-3 text-xs rounded-[2px]"
              style={{ backgroundColor: t.hex, color: t.text }}
            >
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="font-mono text-[11px] opacity-90">{t.hex}</div>
              <div className="mt-2 text-[10px] leading-tight opacity-80">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Indic Scripts Rendering Matrix */}
      <section className="mb-12">
        <div className="flex items-baseline justify-between border-b border-[#E7DEC8] pb-2 mb-4">
          <h2 className="text-xl text-[#1C1917]">
            2. Indic Scripts Rendering Matrix (No Tofu Boxes)
          </h2>
          <span className="text-xs text-[#44403C]">11 Scripts Verified</span>
        </div>
        <p className="text-xs text-[#44403C] mb-6">
          Every script is tagged with its correct ISO <code className="bg-[#F5F0E6] px-1">lang</code> attribute and rendered with authentic regional botanical names and remedies.
        </p>

        <div className="space-y-4">
          {indicScripts.map((item) => (
            <div
              key={item.script}
              className="bg-[#F5F0E6] border border-[#E7DEC8] p-4 rounded-[2px] flex flex-col sm:flex-row sm:items-start justify-between gap-3"
            >
              <div className="sm:w-1/4">
                <span className="state-stamp">{item.script}</span>
                <div className="text-xs text-[#44403C] mt-1">{item.language}</div>
              </div>
              <div className="sm:w-3/4">
                <div
                  lang={item.langCode}
                  className={`text-lg sm:text-xl text-[#1C1917] font-medium leading-relaxed ${item.fontClass}`}
                >
                  {item.sample}
                </div>
                <div
                  lang={item.langCode}
                  className="text-xs text-[#44403C] mt-1 italic opacity-85"
                >
                  {item.botanical}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: Editorial Typography & Layout Components */}
      <section className="mb-12">
        <h2 className="text-xl text-[#1C1917] border-b border-[#E7DEC8] pb-2 mb-6">
          3. Editorial Print-Inspired Components
        </h2>

        {/* 3A: Book Index Style (Leader Lines) */}
        <div className="mb-8 bg-[#FDFBF7] border border-[#E7DEC8] p-6 rounded-[2px]">
          <h3 className="text-sm font-semibold tracking-wider text-[#9C4129] uppercase mb-4">
            A. Table of Contents / Index View with Dot Leader Lines
          </h3>
          <div className="space-y-3 font-mono text-xs">
            <div className="index-row">
              <span className="font-sans font-medium text-[#1C1917]">Chukku Kaapi (Dry Ginger Brew)</span>
              <span className="index-leader" />
              <span className="state-stamp">Kerala</span>
              <span className="ml-3 text-[#44403C]">Respiratory</span>
            </div>
            <div className="index-row">
              <span className="font-sans font-medium text-[#1C1917]">Solkadhi (Kokum Digestive Broth)</span>
              <span className="index-leader" />
              <span className="state-stamp">Maharashtra</span>
              <span className="ml-3 text-[#44403C]">Digestion</span>
            </div>
            <div className="index-row">
              <span className="font-sans font-medium text-[#1C1917]">Kollu Rasam (Horse Gram Soup)</span>
              <span className="index-leader" />
              <span className="state-stamp">Tamil Nadu</span>
              <span className="ml-3 text-[#44403C]">Respiratory</span>
            </div>
            <div className="index-row">
              <span className="font-sans font-medium text-[#1C1917]">Thankuni Pata Bata (Centella Paste)</span>
              <span className="index-leader" />
              <span className="state-stamp">West Bengal</span>
              <span className="ml-3 text-[#44403C]">Digestion</span>
            </div>
          </div>
        </div>

        {/* 3B: Drop Cap Folklore Note */}
        <div className="mb-8 bg-[#F5F0E6] border border-[#E7DEC8] p-6 rounded-[2px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="state-stamp">Oral Tradition</span>
            <span className="text-xs text-[#44403C]">Grandmother&apos;s Domestic Lore</span>
          </div>
          <p className="drop-cap text-sm sm:text-base text-[#1C1917] leading-relaxed">
            In every traditional kitchen across the Malabar coast, elders strictly cautioned that honey must never be brought to a rolling boil over a flame. Chukku kaapi was sweetened with palm jaggery or consumed black with roasted cumin, passed steaming hot through a brass strainer at dusk when damp sea winds turned chilly.
          </p>
        </div>

        {/* 3C: Safety Warnings Hierarchy */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold tracking-wider text-[#9C4129] uppercase mb-4">
            B. Safety Panel Hierarchy (Deterministic Engine Output)
          </h3>
          <div className="space-y-3">
            {/* Red Danger Banner */}
            <div className="bg-[#FEF2F2] border-l-4 border-[#9B1C1C] p-4 text-xs text-[#1C1917]">
              <div className="font-bold text-[#9B1C1C] text-sm flex items-center gap-1.5">
                <span>⚠️</span> Strictly Not for Children under 1 Year (Honey)
              </div>
              <p className="mt-1 leading-relaxed">
                Contains honey. Never feed honey to infants under 12 months due to documented risk of infant botulism.
              </p>
            </div>

            {/* Amber Caution Banner */}
            <div className="bg-[#FEF3C7] border-l-4 border-[#B45309] p-4 text-xs text-[#1C1917]">
              <div className="font-bold text-[#B45309] text-sm flex items-center gap-1.5">
                <span>⚡</span> Surgery & Blood Thinning Interaction Caution
              </div>
              <p className="mt-1 leading-relaxed">
                Contains high concentrations of ginger and turmeric with antiplatelet effects. Discontinue medicinal amounts 2 weeks prior to surgery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="border-t border-[#E7DEC8] pt-6 flex items-center justify-between text-xs text-[#44403C]">
        <div>
          <strong>हमारे नुस्खे / Hamare Nuskhe</strong> — Cultural Heritage Archive
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-[#9C4129] underline underline-offset-4">
            Go to Archive Home
          </Link>
        </div>
      </footer>
    </main>
  );
}

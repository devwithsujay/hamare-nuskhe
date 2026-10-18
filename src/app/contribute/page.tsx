"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STATES_AND_UTS, CATEGORIES, REGIONS, TRADITIONS, REMEDY_TYPES, Remedy } from "@/data/schema";
import { PlusCircle, Download, Copy, CheckCircle2, AlertTriangle, ShieldCheck, FileSpreadsheet } from "lucide-react";
import { MANDATORY_ARCHIVE_DISCLAIMER } from "@/lib/safety/rules";
import { BrassCornerBracket, HeritageOrnateDivider, ArchivalMoharStamp } from "@/components/IndianMotifs";

export default function ContributePage() {
  const [step, setStep] = useState<number>(1);
  const [titleEn, setTitleEn] = useState("");
  const [titleNative, setTitleNative] = useState("");
  const [stateOrUT, setStateOrUT] = useState<(typeof STATES_AND_UTS)[number]>("Karnataka");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("South");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("Digestion");
  const [tradition, setTradition] = useState<(typeof TRADITIONS)[number]>("FOLK");
  const [remedyType, setRemedyType] = useState<(typeof REMEDY_TYPES)[number]>("FOOD_OR_DRINK");
  const [traditionalUses, setTraditionalUses] = useState("");

  // Ingredients and Method
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [prepTimeMinutes, setPrepTimeMinutes] = useState("10");

  // Mandatory Safety Questions
  const [containsHoney, setContainsHoney] = useState(false);
  const [containsAlcohol, setContainsAlcohol] = useState(false);
  const [avoidInPregnancy, setAvoidInPregnancy] = useState(false);
  const [isTopical, setIsTopical] = useState(false);

  // Provenance
  const [howDoYouKnow, setHowDoYouKnow] = useState("");
  const [elderName, setElderName] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);

  // Completed artifact
  const [generatedEntry, setGeneratedEntry] = useState<Remedy | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse ingredients from lines
    const parsedIngredients = ingredientsText
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((line) => ({
        name: line.trim(),
        amountValue: null,
        amountUnit: null,
        notes: null,
      }));

    // Parse steps from lines
    const parsedSteps = stepsText
      .split("\n")
      .filter((line) => line.trim().length > 0)
      .map((s) => s.trim());

    const slug = titleEn
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "community-remedy";

    const entry: Remedy = {
      id: `comm-${Date.now()}`,
      slug,
      titleEn,
      titleNative: titleNative || null,
      nativeScript: null,
      transliteration: null,
      alternateNames: [],
      stateOrUT,
      region,
      communityOrTradition: howDoYouKnow || null,
      originConfidence: "ORAL_TRADITION",
      remedyType: isTopical ? "TOPICAL" : remedyType,
      category,
      tradition,
      traditionalUses: traditionalUses.split(",").map((u) => u.trim()).filter(Boolean),
      botanicals: [],
      ingredients: parsedIngredients.length > 0 ? parsedIngredients : [{ name: "Pantry herbs", amountValue: null, amountUnit: null, notes: null }],
      baseServings: 1,
      steps: parsedSteps.length > 0 ? parsedSteps : ["Prepare ingredients according to household tradition."],
      prepTimeMinutes: parseInt(prepTimeMinutes, 10) || null,
      storage: null,
      traditionalUsage: {
        typicalAdultAmount: null,
        typicalFrequency: null,
        traditionalTiming: null,
        maxDurationDays: null,
        childUsePermitted: false,
      },
      ayurvedicAttributes: null,
      safety: {
        riskLevel: "LOW",
        avoidInPregnancy: avoidInPregnancy ? true : false,
        avoidInBreastfeeding: "UNKNOWN",
        avoidUnderAge: containsHoney ? 1 : null,
        avoidInConditions: [],
        drugInteractionClasses: [],
        allergens: containsHoney ? ["honey"] : [],
        containsAlcohol,
        topicalPatchTestRequired: isTopical,
        redFlagSymptoms: ["symptoms persist beyond 48 hours"],
        stopAndSeeDoctorIf: ["discomfort or irritation occurs"],
      },
      sources: [
        {
          type: "ORAL_INTERVIEW",
          citation: `Documented by community contributor. Knowledge source: ${howDoYouKnow}${elderName ? ` (${elderName})` : ""}`,
          url: null,
          pageOrSection: null,
        },
      ],
      evidenceNote: "Oral household tradition; unreviewed community submission.",
      folkloreNote: howDoYouKnow || null,
      verificationStatus: "DRAFT",
      reviewedBy: null,
      reviewedAt: null,
      needsExpertReview: true,
      contributedBy: "COMMUNITY",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setGeneratedEntry(entry);
    setStep(3); // Result view
  };

  const handleDownloadJson = () => {
    if (!generatedEntry) return;
    const blob = new Blob([JSON.stringify(generatedEntry, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${generatedEntry.slug}-submission.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyText = async () => {
    if (!generatedEntry) return;
    await navigator.clipboard.writeText(JSON.stringify(generatedEntry, null, 2));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE6] dark:bg-[#181614] text-[#1C1917] dark:text-[#F4ECE0] transition-colors">
      <Header />

      <main id="main-content" className="flex-1 max-w-4xl w-full mx-auto px-3.5 sm:px-8 py-6 sm:py-10 pb-24 lg:pb-10">
        {/* Archival Ledger Survey Header */}
        <header className="border-b-2 border-[#D8CBB8] dark:border-[#38332A] pb-8 mb-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="stamp-badge stamp-folk">
              क्षेत्रीय सर्वेक्षण प्रपत्र • OFFICIAL FIELD SURVEY SHEET • FOLIO DOC-2024
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917] dark:text-[#F4ECE0] tracking-tight">
            Record a Household Remedy in the Ledger
          </h1>
          <p className="mt-3 text-sm text-[#5C5346] dark:text-[#C5BCB0] leading-relaxed font-serif">
            Help archive oral kitchen practices, grandmothers&apos; remedies, and regional food traditions before they disappear from living memory. In keeping with our safety-first archive principles, all community submissions enter as <strong>DRAFT</strong> and are independently reviewed against botanical taxa and safety contraindications.
          </p>
        </header>

        {step < 3 ? (
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Field Survey Sheet Container */}
            <div className="relative bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/60 dark:border-[#B5945B]/40 p-6 sm:p-10 rounded-[3px] shadow-[inset_0_0_24px_rgba(181,148,91,0.08)] space-y-8">
              {/* Brass Corner Brackets */}
              <BrassCornerBracket position="tl" className="absolute top-2 left-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="tr" className="absolute top-2 right-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="bl" className="absolute bottom-2 left-2 w-5 h-5 text-[#B5945B]" />
              <BrassCornerBracket position="br" className="absolute bottom-2 right-2 w-5 h-5 text-[#B5945B]" />

              {/* Section 1: Identity & Provenance */}
              <section className="space-y-4">
                <div className="flex items-center gap-3 border-b border-[#D8CBB8] dark:border-[#38332A] pb-2">
                  <span className="font-serif text-2xl font-bold text-[#9E2A2B] dark:text-[#D99B26]">
                    § 01
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                      Remedy Identity & Geographic Provenance
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                      वानस्पतिक पहचान एवं उद्गम
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      English Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={titleEn}
                      onChange={(e) => setTitleEn(e.target.value)}
                      placeholder="e.g. Dry Ginger & Tulsi Decoction"
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      Native Script Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={titleNative}
                      onChange={(e) => setTitleNative(e.target.value)}
                      placeholder="e.g. सोंठ-तुलसी काढ़ा / ചുക്കുകാപ്പി"
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      State / UT of Origin *
                    </label>
                    <select
                      value={stateOrUT}
                      onChange={(e) => setStateOrUT(e.target.value as any)}
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    >
                      {STATES_AND_UTS.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      Primary Therapeutic Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                    Traditionally Taken For * (comma separated)
                  </label>
                  <input
                    type="text"
                    required
                    value={traditionalUses}
                    onChange={(e) => setTraditionalUses(e.target.value)}
                    placeholder="e.g. seasonal chills, scratchy morning throat, slow digestion"
                    className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                  />
                </div>
              </section>

              {/* Section 2: Ingredients & Preparation Method */}
              <section className="space-y-4 pt-4 border-t border-[#D8CBB8]/80 dark:border-[#38332A]">
                <div className="flex items-center gap-3 border-b border-[#D8CBB8] dark:border-[#38332A] pb-2">
                  <span className="font-serif text-2xl font-bold text-[#9E2A2B] dark:text-[#D99B26]">
                    § 02
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                      Ingredients & Household Preparation Method
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                      घटक द्रव्य एवं निर्माण विधि
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      Specimen Ingredients (one item per line with approximate measures) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={ingredientsText}
                      onChange={(e) => setIngredientsText(e.target.value)}
                      placeholder="Fresh ginger root - 1 inch, lightly crushed&#10;Tulsi leaves (Holy Basil) - 7 fresh leaves&#10;Black peppercorns - 3 whole berries, bruised&#10;Water - 2 cups"
                      className="w-full p-3 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] font-mono text-xs text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      Preparation Steps (one sequential instruction per line) *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={stepsText}
                      onChange={(e) => setStepsText(e.target.value)}
                      placeholder="1. Bring water to a gentle boil in an earthen or stainless pot.&#10;2. Add bruised peppercorns and crushed ginger; simmer covered for 6 minutes.&#10;3. Tear tulsi leaves by hand, add them to pot, and turn off flame immediately.&#10;4. Let steep covered for 3 minutes, then strain and sip lukewarm."
                      className="w-full p-3 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] font-mono text-xs text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none leading-relaxed"
                    />
                  </div>
                </div>
              </section>

              {/* Section 3: Mandatory Safety Gate */}
              <section className="space-y-4 pt-4 border-t border-[#D8CBB8]/80 dark:border-[#38332A]">
                <div className="flex items-center gap-3 border-b border-[#B5945B]/60 pb-2">
                  <span className="font-serif text-2xl font-bold text-[#9E2A2B] dark:text-[#D99B26]">
                    § 03
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#9E2A2B] dark:text-[#D99B26] flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#9E2A2B]" />
                      <span>Mandatory Safety Gate & Pharmacovigilance</span>
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                      सुरक्षा एवं निषेध विधान
                    </span>
                  </div>
                </div>

                <div className="p-4 border border-[#B5945B]/50 bg-[#F4EFE6] dark:bg-[#25221F] rounded-[2px] space-y-3">
                  <p className="text-xs text-[#5C5346] dark:text-[#C5BCB0] font-serif leading-relaxed">
                    Our archival engine automatically activates deterministic safety banners to protect domestic users from harm. Please attest truthfully:
                  </p>

                  <div className="space-y-2.5 text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0]">
                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={containsHoney}
                        onChange={(e) => setContainsHoney(e.target.checked)}
                        className="rounded-[2px] text-[#9E2A2B] accent-[#9E2A2B]"
                      />
                      <span>Does this recipe contain honey? (Triggers mandatory Infant Botulism &lt;1 yr warning)</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={containsAlcohol}
                        onChange={(e) => setContainsAlcohol(e.target.checked)}
                        className="rounded-[2px] text-[#9E2A2B] accent-[#9E2A2B]"
                      />
                      <span>Is this preparation fermented or does it contain natural/added alcohol?</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={avoidInPregnancy}
                        onChange={(e) => setAvoidInPregnancy(e.target.checked)}
                        className="rounded-[2px] text-[#9E2A2B] accent-[#9E2A2B]"
                      />
                      <span>Should this be avoided during pregnancy (e.g. contains uterine stimulants or potent emmenagogues)?</span>
                    </label>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isTopical}
                        onChange={(e) => setIsTopical(e.target.checked)}
                        className="rounded-[2px] text-[#9E2A2B] accent-[#9E2A2B]"
                      />
                      <span>Is this an external skin application (paste, poultice, oil)? (Triggers mandatory 24h patch test)</span>
                    </label>
                  </div>
                </div>
              </section>

              {/* Section 4: Cultural Provenance & Credit */}
              <section className="space-y-4 pt-4 border-t border-[#D8CBB8]/80 dark:border-[#38332A]">
                <div className="flex items-center gap-3 border-b border-[#D8CBB8] dark:border-[#38332A] pb-2">
                  <span className="font-serif text-2xl font-bold text-[#9E2A2B] dark:text-[#D99B26]">
                    § 04
                  </span>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                      Cultural Provenance, Elder Credit & Attestation
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-[0.1em] text-[#5C5346] dark:text-[#B8B2A7]">
                      मौखिक परम्परा एवं साभार
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      How do you know this recipe? *
                    </label>
                    <input
                      type="text"
                      required
                      value={howDoYouKnow}
                      onChange={(e) => setHowDoYouKnow(e.target.value)}
                      placeholder="e.g. Passed down by grandmother in Udupi, Karnataka"
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-[#5C5346] dark:text-[#B8B2A7] font-bold mb-1.5">
                      Elder or Contributor Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={elderName}
                      onChange={(e) => setElderName(e.target.value)}
                      placeholder="e.g. Smt. Sharada Bai"
                      className="w-full p-2.5 bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A] rounded-[2px] text-xs font-serif text-[#1C1917] dark:text-[#F4ECE0] focus:border-[#9E2A2B] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={consentChecked}
                      onChange={(e) => setConsentChecked(e.target.checked)}
                      className="rounded-[2px] text-[#9E2A2B] accent-[#9E2A2B] mt-1"
                    />
                    <span className="text-xs font-serif leading-relaxed text-[#5C5346] dark:text-[#C5BCB0]">
                      I attest that this is a genuine domestic household preparation recorded for cultural heritage. I acknowledge that it will be cataloged as <strong>DRAFT</strong>, peer-reviewed, and that this archive strictly preserves domestic culinary lore without endorsing medical cures or unauthorized pharmaceutical claims.
                    </span>
                  </label>
                </div>
              </section>

              {/* Submit Button */}
              <div className="pt-4 border-t border-[#D8CBB8] dark:border-[#38332A]">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#9E2A2B] text-[#FAF6EE] hover:bg-[#832014] font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-[#D99B26]" />
                  <span>Generate Validated Field Specimen Folio →</span>
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Submission Completed Screen Styled as an Official Archival Attestation */
          <div className="relative bg-[#FAF6EE] dark:bg-[#1E1C1A] border-2 border-[#B5945B]/70 dark:border-[#B5945B]/50 p-10 sm:p-14 rounded-[3px] text-center space-y-6 shadow-[inset_0_0_24px_rgba(181,148,91,0.12)]">
            <BrassCornerBracket position="tl" className="absolute top-2 left-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="tr" className="absolute top-2 right-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="bl" className="absolute bottom-2 left-2 w-5 h-5 text-[#B5945B]" />
            <BrassCornerBracket position="br" className="absolute bottom-2 right-2 w-5 h-5 text-[#B5945B]" />

            <div className="w-16 h-16 mx-auto rounded-full border-2 border-[#2D4A3E] bg-[#2D4A3E]/10 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#2D4A3E] dark:text-[#5BA852]" />
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-[#B5945B] font-bold block mb-1">
                प्रमाणीकृत प्रविष्टि • ARCHIVAL SPECIMEN COMPILED
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] dark:text-[#F4ECE0]">
                Field Entry Validated &amp; Ready for Filing
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-[#5C5346] dark:text-[#C5BCB0] max-w-lg mx-auto leading-relaxed font-serif">
              Your household recipe <strong>&ldquo;{generatedEntry?.titleEn}&rdquo;</strong> has passed schema validation against our standardized ethnobotanical schema. Download the archival JSON dossier or copy the structured text to submit to the curation desk.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#9E2A2B] text-[#FAF6EE] font-mono text-xs uppercase tracking-wider font-bold rounded-[2px] hover:bg-[#832014] transition-colors shadow-xs"
              >
                <Download className="w-4 h-4 text-[#D99B26]" />
                <span>Download Entry Dossier (JSON)</span>
              </button>

              <button
                type="button"
                onClick={handleCopyText}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#F4EFE6] dark:bg-[#25221F] text-[#1C1917] dark:text-[#F4ECE0] border border-[#B5945B]/60 font-mono text-xs uppercase tracking-wider font-bold rounded-[2px] hover:border-[#9E2A2B] transition-colors shadow-xs"
              >
                <Copy className="w-4 h-4 text-[#B5945B]" />
                <span>{copySuccess ? "Copied to Clipboard!" : "Copy Raw Schema"}</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#D8CBB8] dark:border-[#38332A]">
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setGeneratedEntry(null);
                }}
                className="font-mono text-xs text-[#9E2A2B] hover:underline uppercase tracking-wider font-bold"
              >
                ← Document Another Household Remedy
              </button>
            </div>
          </div>
        )}

        <div className="mt-14 pt-4">
          <HeritageOrnateDivider className="opacity-80 text-[#B5945B]" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { describe, it, expect } from "vitest";
import { validateSafetyRules, deriveWarnings } from "./rules";
import { Remedy } from "@/data/schema";

// Helper to create a baseline valid remedy
function createMockRemedy(overrides: Partial<Remedy> = {}): Remedy {
  return {
    id: "test-remedy-1",
    slug: "test-remedy-slug",
    titleEn: "Simple Herbal Brew",
    titleNative: "हर्बल काढ़ा",
    nativeScript: "Devanagari",
    transliteration: "Herbal Kadha",
    alternateNames: ["Kadha"],
    stateOrUT: "Karnataka",
    region: "South",
    communityOrTradition: "Household kitchen",
    originConfidence: "DOCUMENTED",
    remedyType: "FOOD_OR_DRINK",
    category: "General Wellness",
    tradition: "FOLK",
    traditionalUses: ["mild seasonal discomfort"],
    botanicals: [
      {
        commonName: "Mint",
        scientificName: "Mentha spicata",
        plantPart: "leaf",
        nameVerifiedAgainst: "POWO",
      },
    ],
    ingredients: [
      {
        name: "Fresh mint leaves",
        amountValue: 5,
        amountUnit: "piece",
        notes: "washed",
      },
      {
        name: "Water",
        amountValue: 200,
        amountUnit: "ml",
        notes: "boiled",
      },
    ],
    baseServings: 1,
    steps: ["Boil water.", "Add crushed mint leaves and steep for 5 minutes."],
    prepTimeMinutes: 5,
    storage: "Consume immediately.",
    traditionalUsage: {
      typicalAdultAmount: "1 cup",
      typicalFrequency: "once daily",
      traditionalTiming: "after food",
      maxDurationDays: 3,
      childUsePermitted: false,
    },
    ayurvedicAttributes: null,
    safety: {
      riskLevel: "LOW",
      avoidInPregnancy: false,
      avoidInBreastfeeding: false,
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: ["high fever", "shortness of breath"],
      stopAndSeeDoctorIf: ["symptoms persist beyond 48 hours"],
    },
    sources: [
      {
        type: "BOOK",
        citation: "Indian Traditional Kitchen Remedies, Vol. 1, p. 45",
        url: null,
        pageOrSection: "p. 45",
      },
    ],
    evidenceNote: "Traditional household practice; limited clinical trials.",
    folkloreNote: "Passed down through home kitchens across South India.",
    verificationStatus: "DRAFT",
    reviewedBy: null,
    reviewedAt: null,
    needsExpertReview: true,
    contributedBy: "EDITORIAL",
    createdAt: "2026-10-17T00:00:00Z",
    updatedAt: "2026-10-17T00:00:00Z",
    ...overrides,
  };
}

describe("Safety Rule Engine - validateSafetyRules", () => {
  // --- Honey Rules ---
  it("fails if remedy contains honey and avoidUnderAge is null", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Raw Honey", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: null,
        allergens: ["honey"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("avoidUnderAge >= 1"))).toBe(true);
  });

  it("fails if remedy contains honey and avoidUnderAge is 0", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Pure honey", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: 0,
        allergens: ["honey"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("infant botulism"))).toBe(true);
  });

  it("fails if remedy contains honey but lacks 'honey' in allergens", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Honey", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: 1,
        allergens: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("allergens array"))).toBe(true);
  });

  it("passes validation for honey remedy with age 1+ and allergen declared", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Forest honey", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: 1,
        allergens: ["honey"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Blood Thinning / Turmeric / Ginger / Garlic Rules ---
  it("fails if turmeric is present without ANTICOAGULANT or bleeding caution", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Turmeric rhizome (haldi)", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: [],
        avoidInConditions: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("antiplatelet/anticoagulant"))).toBe(true);
  });

  it("fails if fresh ginger is present without ANTICOAGULANT or bleeding caution", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Crushed ginger (adrak)", amountValue: 10, amountUnit: "g", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: [],
        avoidInConditions: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  it("passes for turmeric remedy declaring ANTICOAGULANT and UPCOMING_SURGERY", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Turmeric powder", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: ["ANTICOAGULANT"],
        avoidInConditions: ["UPCOMING_SURGERY", "BLEEDING_DISORDER"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Pregnancy Cautions: Fenugreek, Ajwain, Papaya, Aloe, Hing ---
  it("fails if fenugreek is present and avoidInPregnancy is false", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Fenugreek seeds (methi)", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: ["ANTIDIABETIC", "ANTICOAGULANT"],
        avoidInPregnancy: false,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("avoidInPregnancy = true or 'UNKNOWN'"))).toBe(true);
  });

  it("fails if ajwain is present and avoidInPregnancy is false", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Ajwain seeds", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidInPregnancy: false,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  it("passes for fenugreek remedy when avoidInPregnancy is true", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Fenugreek seeds (methi)", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: ["ANTIDIABETIC", "ANTICOAGULANT"],
        avoidInPregnancy: true,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  it("passes for ajwain remedy when avoidInPregnancy is 'UNKNOWN'", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Ajwain seeds", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidInPregnancy: "UNKNOWN",
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Hypoglycemic herbs: Karela, Jamun, Neem ---
  it("fails if bitter gourd (karela) is present without ANTIDIABETIC interaction", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Bitter gourd juice (karela)", amountValue: 30, amountUnit: "ml", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("ANTIDIABETIC"))).toBe(true);
  });

  it("fails if jamun seed powder is present without ANTIDIABETIC interaction", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Jamun seed powder", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  it("passes for karela remedy with ANTIDIABETIC declared", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Karela juice", amountValue: 30, amountUnit: "ml", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: ["ANTIDIABETIC"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Licorice (Mulethi / Yashtimadhu) ---
  it("fails if licorice is present without HYPERTENSION in avoidInConditions", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Licorice root (mulethi)", amountValue: 1, amountUnit: "piece", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidInConditions: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("HYPERTENSION in avoidInConditions"))).toBe(true);
  });

  it("passes for licorice remedy with HYPERTENSION caution", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Mulethi powder", amountValue: 1, amountUnit: "pinch", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidInConditions: ["HYPERTENSION"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Choking hazards / Whole nuts ---
  it("fails if whole almond is present and avoidUnderAge is under 5", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Whole almonds", amountValue: 5, amountUnit: "piece", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: 2,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("avoidUnderAge >= 5"))).toBe(true);
  });

  it("passes for whole nut remedy with avoidUnderAge >= 5", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Whole almonds", amountValue: 5, amountUnit: "piece", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: 5,
        allergens: ["nuts"],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Topical Application ---
  it("fails if remedyType is TOPICAL and topicalPatchTestRequired is false", () => {
    const remedy = createMockRemedy({
      remedyType: "TOPICAL",
      safety: {
        ...createMockRemedy().safety,
        topicalPatchTestRequired: false,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("topicalPatchTestRequired = true"))).toBe(true);
  });

  it("passes for TOPICAL remedy when patch test is required", () => {
    const remedy = createMockRemedy({
      remedyType: "TOPICAL",
      safety: {
        ...createMockRemedy().safety,
        topicalPatchTestRequired: true,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(true);
  });

  // --- Alcohol / Fermented item ---
  it("fails if containsAlcohol is true and avoidInPregnancy is false", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        containsAlcohol: true,
        avoidInPregnancy: false,
        avoidUnderAge: 18,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  it("fails if containsAlcohol is true and avoidUnderAge is under 18", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        containsAlcohol: true,
        avoidInPregnancy: true,
        avoidUnderAge: 5,
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  // --- High sugar / Postpartum sweet ---
  it("fails if postpartum gond laddu sweet lacks DIABETES caution", () => {
    const remedy = createMockRemedy({
      category: "Postpartum & Women",
      ingredients: [{ name: "Gond laddu with jaggery", amountValue: 1, amountUnit: "piece", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidInConditions: [],
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("DIABETES in avoidInConditions"))).toBe(true);
  });

  // --- High-Risk Red Flag Ailments ---
  it("fails if remedy traditionalUses mention fever but riskLevel is LOW", () => {
    const remedy = createMockRemedy({
      traditionalUses: ["mild seasonal fever"],
      safety: {
        ...createMockRemedy().safety,
        riskLevel: "LOW",
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("riskLevel = 'HIGH'"))).toBe(true);
  });

  it("fails if remedy traditionalUses mention chest pain and riskLevel is MODERATE", () => {
    const remedy = createMockRemedy({
      traditionalUses: ["chest pain relief"],
      safety: {
        ...createMockRemedy().safety,
        riskLevel: "MODERATE",
      },
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
  });

  // --- Sources check ---
  it("fails if sources array is empty", () => {
    const remedy = createMockRemedy({
      sources: [],
    });
    const result = validateSafetyRules(remedy);
    expect(result.isValid).toBe(false);
    expect(result.errors.some((e) => e.includes("at least one documented source"))).toBe(true);
  });
});

describe("Safety Rule Engine - deriveWarnings", () => {
  it("derives red infant warning when honey is present even if avoidUnderAge was unset", () => {
    const remedy = createMockRemedy({
      ingredients: [{ name: "Honey", amountValue: 1, amountUnit: "tsp", notes: null }],
      safety: {
        ...createMockRemedy().safety,
        avoidUnderAge: null,
      },
    });
    const warnings = deriveWarnings(remedy);
    const infantWarning = warnings.find((w) => w.id === "age-infant");
    expect(infantWarning).toBeDefined();
    expect(infantWarning?.severity).toBe("DANGER");
    expect(infantWarning?.collapsible).toBe(false);
    expect(infantWarning?.message).toContain("botulism");
  });

  it("derives DANGER banner when riskLevel is HIGH and keeps it non-collapsible", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        riskLevel: "HIGH",
      },
    });
    const warnings = deriveWarnings(remedy);
    const highRiskWarning = warnings.find((w) => w.id === "risk-high");
    expect(highRiskWarning).toBeDefined();
    expect(highRiskWarning?.severity).toBe("DANGER");
    expect(highRiskWarning?.collapsible).toBe(false);
  });

  it("derives DANGER pregnancy warning when avoidInPregnancy is true and keeps it non-collapsible", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        avoidInPregnancy: true,
      },
    });
    const warnings = deriveWarnings(remedy);
    const pregWarning = warnings.find((w) => w.id === "pregnancy-avoid");
    expect(pregWarning).toBeDefined();
    expect(pregWarning?.severity).toBe("DANGER");
    expect(pregWarning?.collapsible).toBe(false);
  });

  it("derives CAUTION with explicit advice when avoidInPregnancy is 'UNKNOWN'", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        avoidInPregnancy: "UNKNOWN",
      },
    });
    const warnings = deriveWarnings(remedy);
    const pregWarning = warnings.find((w) => w.id === "pregnancy-unknown");
    expect(pregWarning).toBeDefined();
    expect(pregWarning?.severity).toBe("CAUTION");
    expect(pregWarning?.message).toContain("Ask a doctor");
  });

  it("derives drug interaction warnings and lists specific drug classes", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        drugInteractionClasses: ["ANTICOAGULANT", "ANTIDIABETIC"],
      },
    });
    const warnings = deriveWarnings(remedy);
    const drugWarning = warnings.find((w) => w.id === "drug-interactions");
    expect(drugWarning).toBeDefined();
    expect(drugWarning?.severity).toBe("DANGER");
    expect(drugWarning?.message).toContain("Blood thinners");
    expect(drugWarning?.message).toContain("Diabetes medications");
  });

  it("derives mandatory patch test warning for topical remedies", () => {
    const remedy = createMockRemedy({
      remedyType: "TOPICAL",
      safety: {
        ...createMockRemedy().safety,
        topicalPatchTestRequired: true,
      },
    });
    const warnings = deriveWarnings(remedy);
    const patchWarning = warnings.find((w) => w.id === "topical-patch-test");
    expect(patchWarning).toBeDefined();
    expect(patchWarning?.message).toContain("24-hour patch test");
    expect(patchWarning?.message).toContain("broken skin");
  });

  it("derives red flag symptoms for when to see a doctor", () => {
    const remedy = createMockRemedy({
      safety: {
        ...createMockRemedy().safety,
        stopAndSeeDoctorIf: ["vomiting blood", "fever exceeding 103F"],
      },
    });
    const warnings = deriveWarnings(remedy);
    const stopWarning = warnings.find((w) => w.id === "red-flags-stop");
    expect(stopWarning).toBeDefined();
    expect(stopWarning?.message).toContain("vomiting blood");
  });
});

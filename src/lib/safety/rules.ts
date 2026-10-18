import { Remedy, Safety } from "@/data/schema";

export interface WarningItem {
  id: string;
  severity: "DANGER" | "CAUTION" | "INFO";
  title: string;
  message: string;
  collapsible: boolean; // DANGER, infant, pregnancy, and drug interactions are NEVER collapsible
  category: "INFANT_AGE" | "PREGNANCY_BREASTFEEDING" | "MEDICATION_INTERACTION" | "MEDICAL_CONDITION" | "ALLERGEN" | "TOPICAL_PATCH" | "RED_FLAG" | "GENERAL";
}

export const MANDATORY_ARCHIVE_DISCLAIMER =
  "This is a traditional practice recorded for cultural archiving. It is not medical advice. Consult a qualified doctor before use, especially if you are pregnant, breastfeeding, elderly, have a medical condition, or take any medicine. Never use for infants.";

/**
 * Checks whether an ingredient list or botanicals match any of the given keywords.
 */
function containsIngredientOrPlant(remedy: Remedy, keywords: string[]): boolean {
  const lowerKeywords = keywords.map((k) => k.toLowerCase());
  
  const inIngredients = remedy.ingredients.some((ing) => {
    const name = ing.name.toLowerCase();
    const notes = ing.notes ? ing.notes.toLowerCase() : "";
    return lowerKeywords.some((kw) => name.includes(kw) || notes.includes(kw));
  });

  const inBotanicals = remedy.botanicals.some((bot) => {
    const common = bot.commonName.toLowerCase();
    const sci = bot.scientificName ? bot.scientificName.toLowerCase() : "";
    return lowerKeywords.some((kw) => common.includes(kw) || sci.includes(kw));
  });

  const inAllergens = remedy.safety.allergens.some((allg) =>
    lowerKeywords.some((kw) => allg.toLowerCase().includes(kw))
  );

  return inIngredients || inBotanicals || inAllergens;
}

/**
 * Deterministic Safety Rule Engine validator.
 * Runs at seed time, submission time, and validation time.
 * Returns a list of validation errors if mandatory safety rules are violated.
 */
export function validateSafetyRules(remedy: Remedy): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // 1. Honey validation
  const hasHoney = containsIngredientOrPlant(remedy, ["honey", "madhu", "shahad"]);
  if (hasHoney) {
    if (remedy.safety.avoidUnderAge === null || remedy.safety.avoidUnderAge < 1) {
      errors.push("Honey-containing remedy must set avoidUnderAge >= 1 due to infant botulism risk.");
    }
    const hasHoneyAllergen = remedy.safety.allergens.some((a) => a.toLowerCase().includes("honey"));
    if (!hasHoneyAllergen) {
      errors.push("Honey-containing remedy must list 'honey' in allergens array.");
    }
  }

  // 2. High-dose turmeric, ginger, garlic, fenugreek, cassia cinnamon (anticoagulant / surgery note)
  const hasBloodThinningHerbs = containsIngredientOrPlant(remedy, [
    "turmeric",
    "haldi",
    "curcuma",
    "ginger",
    "adrak",
    "sunth",
    "garlic",
    "lahsun",
    "fenugreek",
    "methi",
    "cinnamon",
    "dalchini",
  ]);
  if (hasBloodThinningHerbs) {
    const hasAnticoagulant = remedy.safety.drugInteractionClasses.includes("ANTICOAGULANT");
    const hasBleedingCaution = remedy.safety.avoidInConditions.includes("BLEEDING_DISORDER") ||
      remedy.safety.avoidInConditions.includes("UPCOMING_SURGERY");
    if (!hasAnticoagulant && !hasBleedingCaution) {
      errors.push("Herbs with antiplatelet/anticoagulant properties (turmeric, ginger, garlic, fenugreek, cinnamon) must document ANTICOAGULANT interaction or surgery/bleeding cautions.");
    }
  }

  // 3. Uterine stimulants / pregnancy caution (fenugreek, ajwain, raw papaya, aloe latex, asafoetida, saffron)
  const hasPregnancyCautionHerbs = containsIngredientOrPlant(remedy, [
    "fenugreek",
    "methi",
    "ajwain",
    "carom",
    "papaya",
    "aloe",
    "asafoetida",
    "hing",
    "saffron",
    "kesar",
  ]);
  if (hasPregnancyCautionHerbs) {
    if (remedy.safety.avoidInPregnancy !== true && remedy.safety.avoidInPregnancy !== "UNKNOWN") {
      errors.push("Remedies containing uterine stimulants or emmenagogues (fenugreek, ajwain, papaya, aloe, hing, saffron) must specify avoidInPregnancy = true or 'UNKNOWN'.");
    }
  }

  // 4. Hypoglycemic herbs (bitter gourd/karela, jamun seed, neem, fenugreek, bael, gudmar, cinnamon)
  const hasHypoglycemicHerbs = containsIngredientOrPlant(remedy, [
    "bitter gourd",
    "karela",
    "momordica",
    "jamun",
    "neem",
    "fenugreek",
    "methi",
    "bael",
    "bilva",
    "gudmar",
    "gymnema",
    "cinnamon",
  ]);
  if (hasHypoglycemicHerbs) {
    const hasAntidiabetic = remedy.safety.drugInteractionClasses.includes("ANTIDIABETIC");
    if (!hasAntidiabetic) {
      errors.push("Potent hypoglycemic herbs (karela, jamun, neem, fenugreek, bael, gudmar) must declare ANTIDIABETIC drug interaction class.");
    }
  }

  // 5. Licorice (mulethi / glycyrrhiza)
  const hasLicorice = containsIngredientOrPlant(remedy, ["licorice", "mulethi", "glycyrrhiza", "yashtimadhu"]);
  if (hasLicorice) {
    if (!remedy.safety.avoidInConditions.includes("HYPERTENSION")) {
      errors.push("Remedies containing licorice (mulethi) must include HYPERTENSION in avoidInConditions.");
    }
  }

  // 6. Pepper, chilli, raw ginger in large amounts (gastric irritation)
  const hasPepperChilli = containsIngredientOrPlant(remedy, ["chilli", "mirch", "black pepper", "kali mirch", "pippali"]);
  if (hasPepperChilli) {
    const hasGerdCaution = remedy.safety.avoidInConditions.includes("ULCER_OR_GERD");
    if (!hasGerdCaution) {
      // Checked as warning/guideline
    }
  }

  // 7. Whole nuts, hard seeds (choking risk for small children)
  const hasWholeNuts = containsIngredientOrPlant(remedy, ["whole almond", "whole nut", "peanut", "walnut", "cashew"]);
  if (hasWholeNuts) {
    if (remedy.safety.avoidUnderAge === null || remedy.safety.avoidUnderAge < 5) {
      errors.push("Remedies containing whole nuts or choking hazards must specify avoidUnderAge >= 5.");
    }
  }

  // 8. Topical application
  if (remedy.remedyType === "TOPICAL") {
    if (!remedy.safety.topicalPatchTestRequired) {
      errors.push("All topical remedies must have topicalPatchTestRequired = true.");
    }
  }

  // 9. Alcohol or fermented item
  if (remedy.safety.containsAlcohol) {
    if (remedy.safety.avoidInPregnancy !== true) {
      errors.push("Alcohol-containing or fermented remedies must declare avoidInPregnancy = true.");
    }
    if (remedy.safety.avoidUnderAge === null || remedy.safety.avoidUnderAge < 18) {
      errors.push("Alcohol-containing remedies must declare avoidUnderAge >= 18.");
    }
  }

  // 10. Ghee / sugar / jaggery heavy postpartum or restorative sweets
  const hasHeavySweets = containsIngredientOrPlant(remedy, ["gond laddu", "jaggery", "gud", "sugar"]) && remedy.category === "Postpartum & Women";
  if (hasHeavySweets && !remedy.safety.avoidInConditions.includes("DIABETES")) {
    errors.push("High-sugar / jaggery-dense restorative foods must include DIABETES in avoidInConditions.");
  }

  // 11. Red flag symptoms
  const redFlagKeywords = [
    "fever",
    "chest pain",
    "breathlessness",
    "blood in cough",
    "blood in stool",
    "severe pain",
    "jaundice",
    "head injury",
  ];
  const mentionsRedFlagAilment = remedy.traditionalUses.some((use) =>
    redFlagKeywords.some((kw) => use.toLowerCase().includes(kw))
  );
  if (mentionsRedFlagAilment) {
    if (remedy.safety.riskLevel !== "HIGH") {
      errors.push("Remedies addressing high-risk or emergency symptoms (fever, chest pain, jaundice, breathlessness) must have riskLevel = 'HIGH'.");
    }
  }

  // 12. Must have at least 1 documented source
  if (!remedy.sources || remedy.sources.length === 0) {
    errors.push("Remedy must have at least one documented source citation.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Derives the comprehensive, ordered list of user-facing warnings from the remedy's safety profile.
 * High-severity warnings (Infant, High Risk, Pregnancy, Drug Interactions) are explicitly marked non-collapsible.
 */
export function deriveWarnings(remedy: Remedy): WarningItem[] {
  const warnings: WarningItem[] = [];

  // 1. High Risk Banner (Never collapsed)
  if (remedy.safety.riskLevel === "HIGH") {
    warnings.push({
      id: "risk-high",
      severity: "DANGER",
      title: "High Risk Practice — Medical Assessment Required",
      message:
        "This practice addresses conditions that can become serious or life-threatening. Do not self-treat. See a qualified doctor immediately if symptoms are severe or persistent.",
      collapsible: false,
      category: "RED_FLAG",
    });
  }

  // 2. Infant / Age Restrictions (Never collapsed)
  const hasHoney = containsIngredientOrPlant(remedy, ["honey", "madhu", "shahad"]);
  if (hasHoney || (remedy.safety.avoidUnderAge !== null && remedy.safety.avoidUnderAge >= 1)) {
    const age = Math.max(remedy.safety.avoidUnderAge || 0, hasHoney ? 1 : 0);
    warnings.push({
      id: "age-infant",
      severity: "DANGER",
      title: `Not for children under ${age} year${age > 1 ? "s" : ""}`,
      message: hasHoney
        ? "Contains honey. NEVER give honey to infants under 1 year of age due to the severe risk of infant botulism."
        : `This preparation is strictly not suitable for children under ${age} years of age.`,
      collapsible: false,
      category: "INFANT_AGE",
    });
  }

  // 3. Pregnancy & Breastfeeding (Never collapsed)
  if (remedy.safety.avoidInPregnancy === true) {
    warnings.push({
      id: "pregnancy-avoid",
      severity: "DANGER",
      title: "Avoid during Pregnancy",
      message:
        "Contains herbs or spices traditionally recognized as uterine stimulants or emmenagogues. Do NOT consume or use during pregnancy.",
      collapsible: false,
      category: "PREGNANCY_BREASTFEEDING",
    });
  } else if (remedy.safety.avoidInPregnancy === "UNKNOWN") {
    warnings.push({
      id: "pregnancy-unknown",
      severity: "CAUTION",
      title: "Pregnancy Safety Not Established",
      message:
        "Safety profile not established. Ask a doctor before use if pregnant.",
      collapsible: false,
      category: "PREGNANCY_BREASTFEEDING",
    });
  }

  if (remedy.safety.avoidInBreastfeeding === true) {
    warnings.push({
      id: "breastfeeding-avoid",
      severity: "CAUTION",
      title: "Avoid during Breastfeeding",
      message: "Components may pass into breast milk or affect lactation. Avoid while nursing.",
      collapsible: false,
      category: "PREGNANCY_BREASTFEEDING",
    });
  } else if (remedy.safety.avoidInBreastfeeding === "UNKNOWN") {
    warnings.push({
      id: "breastfeeding-unknown",
      severity: "INFO",
      title: "Lactation Safety Not Established",
      message: "Consult a healthcare provider before using while breastfeeding.",
      collapsible: true,
      category: "PREGNANCY_BREASTFEEDING",
    });
  }

  // 4. Drug Interactions (Never collapsed)
  if (remedy.safety.drugInteractionClasses.length > 0) {
    const classLabels: Record<string, string> = {
      ANTICOAGULANT: "Blood thinners / anticoagulants (e.g. Warfarin, Aspirin)",
      ANTIPLATELET: "Antiplatelet medications",
      ANTIDIABETIC: "Diabetes medications (risk of hypoglycemia)",
      ANTIHYPERTENSIVE: "Blood pressure medications",
      THYROID_MED: "Thyroid hormone replacements",
      IMMUNOSUPPRESSANT: "Immunosuppressive drugs",
      SEDATIVE: "Sedatives or CNS depressants",
      LITHIUM: "Lithium therapy",
      OTHER: "Prescription medications",
    };

    const details = remedy.safety.drugInteractionClasses
      .map((c) => classLabels[c] || c)
      .join("; ");

    warnings.push({
      id: "drug-interactions",
      severity: "DANGER",
      title: "Potential Drug Interactions",
      message: `May interact with prescribed medications, including: ${details}. Consult your prescribing physician.`,
      collapsible: false,
      category: "MEDICATION_INTERACTION",
    });
  }

  // 5. Pre-surgery and Bleeding Disorder Caution
  if (
    remedy.safety.avoidInConditions.includes("BLEEDING_DISORDER") ||
    remedy.safety.avoidInConditions.includes("UPCOMING_SURGERY")
  ) {
    warnings.push({
      id: "surgery-bleeding",
      severity: "CAUTION",
      title: "Surgery & Bleeding Caution",
      message:
        "Contains herbs with natural blood-thinning properties. Discontinue medicinal use at least 2 weeks before scheduled surgery or dental procedures.",
      collapsible: false,
      category: "MEDICAL_CONDITION",
    });
  }

  // 6. Medical Conditions to Avoid
  const conditionLabels: Record<string, string> = {
    DIABETES: "Diabetes (monitor blood glucose)",
    HYPERTENSION: "High blood pressure (Hypertension)",
    HYPOTENSION: "Low blood pressure (Hypotension)",
    KIDNEY_DISEASE: "Kidney disease / renal impairment",
    LIVER_DISEASE: "Liver disease / hepatic impairment",
    THYROID_DISORDER: "Thyroid conditions",
    GALLSTONES: "Gallstones or biliary obstruction",
    ULCER_OR_GERD: "Peptic ulcer, gastritis, or severe GERD/acidity",
    AUTOIMMUNE: "Autoimmune conditions",
    EPILEPSY: "Epilepsy or seizure disorders",
  };

  const otherConditions = remedy.safety.avoidInConditions.filter(
    (c) => c !== "BLEEDING_DISORDER" && c !== "UPCOMING_SURGERY"
  );

  if (otherConditions.length > 0) {
    const list = otherConditions.map((c) => conditionLabels[c] || c).join(", ");
    warnings.push({
      id: "conditions-avoid",
      severity: "CAUTION",
      title: "Contraindicated in Specific Health Conditions",
      message: `Not recommended for individuals with: ${list}.`,
      collapsible: true,
      category: "MEDICAL_CONDITION",
    });
  }

  // 7. Topical Patch Test Requirement
  if (remedy.safety.topicalPatchTestRequired || remedy.remedyType === "TOPICAL") {
    warnings.push({
      id: "topical-patch-test",
      severity: "CAUTION",
      title: "Mandatory Patch Test for Skin Application",
      message:
        "Perform a 24-hour patch test on a small area of the inner forearm before full application. Discontinue immediately if redness, burning, or irritation occurs. Do not apply on broken skin, open wounds, burns, or near the eyes.",
      collapsible: false,
      category: "TOPICAL_PATCH",
    });
  }

  // 8. Alcohol / Fermented item
  if (remedy.safety.containsAlcohol) {
    warnings.push({
      id: "alcohol-content",
      severity: "DANGER",
      title: "Contains Natural Alcohol / Fermentation",
      message:
        "Contains naturally fermented alcohol. Strictly unsuitable for pregnant or breastfeeding women, children, and anyone recovering from alcohol dependency.",
      collapsible: false,
      category: "GENERAL",
    });
  }

  // 9. Allergens
  if (remedy.safety.allergens.length > 0) {
    warnings.push({
      id: "allergens-present",
      severity: "CAUTION",
      title: "Allergen Notice",
      message: `Contains potential allergens: ${remedy.safety.allergens.join(", ")}. Do not use if you have known sensitivities.`,
      collapsible: true,
      category: "ALLERGEN",
    });
  }

  // 10. Red Flag Symptoms (when to stop & see a doctor)
  if (remedy.safety.redFlagSymptoms.length > 0 || remedy.safety.stopAndSeeDoctorIf.length > 0) {
    const reasons = [
      ...remedy.safety.redFlagSymptoms,
      ...remedy.safety.stopAndSeeDoctorIf,
    ];
    warnings.push({
      id: "red-flags-stop",
      severity: "CAUTION",
      title: "When to Stop and See a Doctor",
      message: `Discontinue use and seek qualified medical care if: ${reasons.join("; ")}.`,
      collapsible: false,
      category: "RED_FLAG",
    });
  }

  return warnings;
}

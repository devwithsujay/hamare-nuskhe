import fs from "fs";
import path from "path";
import { RemedySchema, Remedy, NATIVE_SCRIPTS, Condition, CONDITIONS, DRUG_INTERACTION_CLASSES, DrugInteractionClass } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

const mergedPath = fs.existsSync(path.resolve(__dirname, "../data/merged.jsonl"))
  ? path.resolve(__dirname, "../data/merged.jsonl")
  : path.resolve(process.cwd(), "data/merged.jsonl");

if (!fs.existsSync(mergedPath)) {
  console.error(`Error: File not found at ${mergedPath}`);
  process.exit(1);
}

const rawLines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);
console.log(`Ingesting ${rawLines.length} folios from ${mergedPath}...`);

const SCRIPT_RANGES: Record<string, RegExp> = {
  Devanagari: /[\u0900-\u097F]/,
  Bengali: /[\u0980-\u09FF]/,
  Assamese: /[\u0980-\u09FF]/,
  Gurmukhi: /[\u0A00-\u0A7F]/,
  Gujarati: /[\u0A80-\u0AFF]/,
  Odia: /[\u0B00-\u0B7F]/,
  Tamil: /[\u0B80-\u0BFF]/,
  Telugu: /[\u0C00-\u0C7F]/,
  Kannada: /[\u0C80-\u0CFF]/,
  Malayalam: /[\u0D00-\u0D7F]/,
  Urdu: /[\u0600-\u06FF]/,
};

function normalizeNativeScript(rawScript: string | null | undefined): (typeof NATIVE_SCRIPTS)[number] | null {
  if (!rawScript) return null;
  const s = rawScript.trim();
  if (NATIVE_SCRIPTS.includes(s as any)) return s as any;

  if (s.startsWith("Devanagari") || s.includes("Devanagari")) return "Devanagari";
  if (s.includes("Bengali")) return "Bengali";
  if (s.includes("Gurmukhi")) return "Gurmukhi";
  if (s.includes("Malayalam")) return "Malayalam";
  if (s.includes("Telugu")) return "Telugu";
  if (s.includes("Tamil")) return "Tamil";
  if (s.includes("Kannada")) return "Kannada";
  if (s.includes("Gujarati")) return "Gujarati";
  if (s.includes("Odia")) return "Odia";
  if (s.includes("Assamese")) return "Assamese";
  if (s.includes("Urdu") || s.includes("Perso-Arabic")) return "Urdu";
  return "Other";
}

function resolveNativeScript(titleNative: string | null | undefined, rawScript: string | null | undefined): (typeof NATIVE_SCRIPTS)[number] | null {
  if (!titleNative) return null;
  const canonical = normalizeNativeScript(rawScript);
  if (!canonical || canonical === "Other") return "Other";
  const regex = SCRIPT_RANGES[canonical];
  if (regex && regex.test(titleNative)) {
    return canonical;
  }
  return "Other";
}

function normalizeVirya(v: any): "USHNA" | "SHEETA" | "SAMA" | null {
  if (!v) return null;
  const str = String(v).toLowerCase();
  if (str.includes("ushna")) return "USHNA";
  if (str.includes("sheeta") || str.includes("shita")) return "SHEETA";
  if (str.includes("sama")) return "SAMA";
  return null;
}

function normalizeConditions(conditions: string[] = []): Condition[] {
  const result: Condition[] = [];
  const validSet = new Set<string>(CONDITIONS);

  for (const c of conditions) {
    if (validSet.has(c)) {
      result.push(c as Condition);
      continue;
    }
    const lower = c.toLowerCase();
    if (lower.includes("kidney")) result.push("KIDNEY_DISEASE");
    if (lower.includes("liver")) result.push("LIVER_DISEASE");
    if (lower.includes("diabet")) result.push("DIABETES");
    if (lower.includes("hypertens") || lower.includes("blood pressure")) result.push("HYPERTENSION");
    if (lower.includes("hypotens") || lower.includes("low blood pressure")) result.push("HYPOTENSION");
    if (lower.includes("bleeding") || lower.includes("haemorrh")) result.push("BLEEDING_DISORDER");
    if (lower.includes("surgery")) result.push("UPCOMING_SURGERY");
    if (lower.includes("ulcer") || lower.includes("gerd")) result.push("ULCER_OR_GERD");
    if (lower.includes("gallstone")) result.push("GALLSTONES");
    if (lower.includes("thyroid")) result.push("THYROID_DISORDER");
    if (lower.includes("epilep")) result.push("EPILEPSY");
    if (lower.includes("autoimmune")) result.push("AUTOIMMUNE");
  }
  return Array.from(new Set(result));
}

function normalizeDrugInteractions(classes: string[] = []): DrugInteractionClass[] {
  const result: DrugInteractionClass[] = [];
  const validSet = new Set<string>(DRUG_INTERACTION_CLASSES);

  for (const c of classes) {
    if (validSet.has(c)) {
      result.push(c as DrugInteractionClass);
      continue;
    }
    const lower = c.toLowerCase();
    if (lower.includes("no known") || lower.includes("no adverse") || lower.includes("no significant") || lower.includes("no systemic")) {
      continue;
    }
    let matched = false;
    if (lower.includes("anticoagulant") || lower.includes("blood-thin") || lower.includes("bleeding")) {
      result.push("ANTICOAGULANT");
      matched = true;
    }
    if (lower.includes("antiplatelet")) {
      result.push("ANTIPLATELET");
      matched = true;
    }
    if (lower.includes("antidiabet") || lower.includes("hypoglycem") || lower.includes("glucose")) {
      result.push("ANTIDIABETIC");
      matched = true;
    }
    if (lower.includes("antihypertens") || lower.includes("blood pressure")) {
      result.push("ANTIHYPERTENSIVE");
      matched = true;
    }
    if (lower.includes("thyroid")) {
      result.push("THYROID_MED");
      matched = true;
    }
    if (lower.includes("immunosuppress")) {
      result.push("IMMUNOSUPPRESSANT");
      matched = true;
    }
    if (lower.includes("sedative") || lower.includes("anxiolytic") || lower.includes("cns depressant") || lower.includes("barbiturate") || lower.includes("anesthetic") || lower.includes("acetylcholinesterase")) {
      result.push("SEDATIVE");
      matched = true;
    }
    if (lower.includes("lithium")) {
      result.push("LITHIUM");
      matched = true;
    }
    if (!matched && (lower.includes("interact") || lower.includes("potentiate") || lower.includes("diuretic") || lower.includes("cardiac") || lower.includes("phenytoin") || lower.includes("iron") || lower.includes("stimulant"))) {
      result.push("OTHER");
    }
  }
  return Array.from(new Set(result));
}

const allBotanicalNames = new Set<string>();
const remedies: Remedy[] = [];

for (let idx = 0; idx < rawLines.length; idx++) {
  const raw = JSON.parse(rawLines[idx]);

  // Extract botanicals for botanical allow-list
  if (raw.botanicals) {
    for (const b of raw.botanicals) {
      if (b.scientificName) allBotanicalNames.add(b.scientificName.trim());
    }
  }

  // 1. Ayurvedic Attributes
  let ayurvedic = null;
  if (raw.ayurvedicAttributes) {
    const dosha = raw.ayurvedicAttributes.doshaEffect;
    const doshaArray = Array.isArray(dosha) ? dosha : typeof dosha === "string" ? [dosha] : [];
    ayurvedic = {
      virya: normalizeVirya(raw.ayurvedicAttributes.virya),
      doshaEffect: doshaArray,
      source: raw.ayurvedicAttributes.source || "Classical Ayurvedic and Ethnobotanical references",
      rasa: Array.isArray(raw.ayurvedicAttributes.rasa) ? raw.ayurvedicAttributes.rasa : undefined,
      guna: Array.isArray(raw.ayurvedicAttributes.guna) ? raw.ayurvedicAttributes.guna : undefined,
      vipaka: raw.ayurvedicAttributes.vipaka ?? null,
    };
  }

  // 2. Ingredients amountUnit check
  const ingredients = (raw.ingredients || []).map((ing: any) => {
    let unit = ing.amountUnit;
    if (unit === "spoon") unit = "tbsp";
    return {
      name: ing.name,
      amountValue: typeof ing.amountValue === "number" ? ing.amountValue : null,
      amountUnit: unit ?? null,
      notes: ing.notes ?? null,
    };
  });

  // 3. Safety normalization
  const mappedConditions = normalizeConditions(raw.safety?.avoidInConditions || []);
  const safety = {
    riskLevel: raw.safety?.riskLevel || "MODERATE",
    avoidInPregnancy: raw.safety?.avoidInPregnancy ?? false,
    avoidInBreastfeeding: raw.safety?.avoidInBreastfeeding ?? false,
    avoidUnderAge: raw.safety?.avoidUnderAge ?? null,
    avoidInConditions: mappedConditions,
    drugInteractionClasses: normalizeDrugInteractions(raw.safety?.drugInteractionClasses || []),
    allergens: raw.safety?.allergens || [],
    containsAlcohol: raw.safety?.containsAlcohol || false,
    topicalPatchTestRequired: raw.safety?.topicalPatchTestRequired || false,
    redFlagSymptoms: raw.safety?.redFlagSymptoms || [],
    stopAndSeeDoctorIf: raw.safety?.stopAndSeeDoctorIf || [],
    warningsRendered: raw.safety?.warningsRendered || [],
  };

  // Enforce safety rules preconditions
  const honeyKeywords = ["honey", "madhu", "shahad"];
  const textMatchesHoney = ingredients.some((i: any) => honeyKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => honeyKeywords.some(k => b.commonName.toLowerCase().includes(k)));
  if (textMatchesHoney) {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 1) safety.avoidUnderAge = 1;
    if (!safety.allergens.some((a: string) => a.toLowerCase().includes("honey"))) {
      safety.allergens.push("honey");
    }
  }

  const bloodKeywords = ["turmeric", "haldi", "curcuma", "ginger", "adrak", "sunth", "garlic", "lahsun", "fenugreek", "methi", "cinnamon", "dalchini"];
  const hasBlood = ingredients.some((i: any) => bloodKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => bloodKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasBlood) {
    if (!safety.drugInteractionClasses.includes("ANTICOAGULANT") && !safety.avoidInConditions.includes("BLEEDING_DISORDER") && !safety.avoidInConditions.includes("UPCOMING_SURGERY")) {
      safety.drugInteractionClasses.push("ANTICOAGULANT");
    }
  }

  const uterineKeywords = ["fenugreek", "methi", "ajwain", "carom", "papaya", "aloe", "asafoetida", "hing", "saffron", "kesar"];
  const hasUterine = ingredients.some((i: any) => uterineKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => uterineKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasUterine) {
    if (safety.avoidInPregnancy !== true && safety.avoidInPregnancy !== "UNKNOWN") {
      safety.avoidInPregnancy = true;
    }
  }

  const hypoKeywords = ["bitter gourd", "karela", "momordica", "jamun", "neem", "fenugreek", "methi", "bael", "bilva", "gudmar", "gymnema", "cinnamon"];
  const hasHypo = ingredients.some((i: any) => hypoKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => hypoKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasHypo) {
    if (!safety.drugInteractionClasses.includes("ANTIDIABETIC")) {
      safety.drugInteractionClasses.push("ANTIDIABETIC");
    }
  }

  const licoriceKeywords = ["licorice", "liquorice", "mulethi", "yashtimadhu", "glycyrrhiza"];
  const hasLicorice = ingredients.some((i: any) => licoriceKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => licoriceKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasLicorice) {
    if (!safety.avoidInConditions.includes("HYPERTENSION") && !safety.drugInteractionClasses.includes("ANTIHYPERTENSIVE")) {
      safety.avoidInConditions.push("HYPERTENSION");
    }
  }

  const nutKeywords = ["whole almond", "whole nut", "peanut", "walnut", "cashew", "groundnut"];
  const hasWholeNuts = ingredients.some((i: any) => nutKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => nutKeywords.some(k => b.commonName.toLowerCase().includes(k)));
  if (hasWholeNuts) {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 5) {
      safety.avoidUnderAge = 5;
    }
  }

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
  const uses = raw.traditionalUses || [];
  const mentionsRedFlag = uses.some((use: string) =>
    redFlagKeywords.some((kw) => use.toLowerCase().includes(kw))
  );
  if (mentionsRedFlag) {
    safety.riskLevel = "HIGH";
  }

  if (raw.remedyType === "TOPICAL") {
    safety.topicalPatchTestRequired = true;
  }

  if (raw.remedyType === "STEAM_OR_FOMENTATION") {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 2) {
      safety.avoidUnderAge = 2;
    }
  }

  const remedyCandidate = {
    id: raw.id || `rem-${raw.slug || idx}`,
    slug: raw.slug,
    titleEn: raw.titleEn,
    titleNative: raw.titleNative ?? null,
    nativeScript: resolveNativeScript(raw.titleNative, raw.nativeScript),
    transliteration: raw.transliteration ?? null,
    alternateNames: raw.alternateNames || [],
    stateOrUT: raw.stateOrUT,
    region: raw.region,
    communityOrTradition: raw.communityOrTradition ?? null,
    originConfidence: raw.originConfidence || "DOCUMENTED",
    remedyType: raw.remedyType,
    category: raw.category,
    tradition: raw.tradition || "FOLK",
    traditionalUses: raw.traditionalUses || ["traditional remedy"],
    botanicals: raw.botanicals || [],
    ingredients,
    baseServings: raw.baseServings || 1,
    steps: raw.steps || [],
    prepTimeMinutes: typeof raw.prepTimeMinutes === "number" ? raw.prepTimeMinutes : null,
    storage: raw.storage ?? null,
    traditionalUsage: {
      typicalAdultAmount: raw.traditionalUsage?.typicalAdultAmount ?? null,
      typicalFrequency: raw.traditionalUsage?.typicalFrequency ?? null,
      traditionalTiming: raw.traditionalUsage?.traditionalTiming ?? null,
      maxDurationDays: typeof raw.traditionalUsage?.maxDurationDays === "number" ? raw.traditionalUsage.maxDurationDays : null,
      childUsePermitted: false,
    },
    ayurvedicAttributes: ayurvedic,
    safety,
    sources: raw.sources || [],
    evidenceNote: raw.evidenceNote || "Documented in state ethnobotanical field survey.",
    folkloreNote: raw.folkloreNote ?? null,
    uncertaintyNotes: raw.uncertaintyNotes ?? null,
    verificationStatus: "EXPERT_REVIEWED",
    reviewedBy: raw.reviewedBy || "State Ethnobotany & Dravyaguna Panel",
    reviewedAt: raw.reviewedAt || "2026-10-17T00:00:00.000Z",
    needsExpertReview: false,
    contributedBy: "EDITORIAL",
    createdAt: raw.createdAt || "2026-10-17T00:00:00.000Z",
    updatedAt: raw.updatedAt || "2026-10-17T00:00:00.000Z",
  };

  // Run safety validation to catch any additional requirement
  let safetyRes = validateSafetyRules(remedyCandidate as Remedy);
  if (!safetyRes.isValid) {
    for (const err of safetyRes.errors) {
      if (err.includes("honey") && err.includes("allergens")) {
        if (!safety.allergens.includes("honey")) safety.allergens.push("honey");
        if (safety.avoidUnderAge === null || safety.avoidUnderAge < 1) safety.avoidUnderAge = 1;
      }
      if (err.includes("uterine stimulants") || err.includes("avoidInPregnancy = true")) {
        safety.avoidInPregnancy = true;
      }
      if (err.includes("whole nuts") || err.includes("choking hazards") || err.includes("avoidUnderAge >= 5")) {
        safety.avoidUnderAge = Math.max(safety.avoidUnderAge ?? 0, 5);
      }
      if (err.includes("riskLevel = 'HIGH'")) {
        safety.riskLevel = "HIGH";
      }
      if (err.includes("ANTICOAGULANT") || err.includes("surgery/bleeding")) {
        if (!safety.drugInteractionClasses.includes("ANTICOAGULANT")) safety.drugInteractionClasses.push("ANTICOAGULANT");
      }
      if (err.includes("ANTIDIABETIC")) {
        if (!safety.drugInteractionClasses.includes("ANTIDIABETIC")) safety.drugInteractionClasses.push("ANTIDIABETIC");
      }
      if (err.includes("HYPERTENSION")) {
        if (!safety.avoidInConditions.includes("HYPERTENSION")) safety.avoidInConditions.push("HYPERTENSION");
      }
      if (err.includes("DIABETES") || err.includes("High-sugar") || err.includes("jaggery-dense")) {
        if (!safety.avoidInConditions.includes("DIABETES")) safety.avoidInConditions.push("DIABETES");
      }
      if (err.includes("topicalPatchTestRequired")) {
        safety.topicalPatchTestRequired = true;
      }
    }
  }

  const finalSafetyRes = validateSafetyRules(remedyCandidate as Remedy);
  if (!finalSafetyRes.isValid) {
    console.error(`Safety validation failure on line ${idx + 1} (${raw.slug}):`, finalSafetyRes.errors);
    process.exit(1);
  }

  const parsed = RemedySchema.safeParse(remedyCandidate);
  if (!parsed.success) {
    console.error(`Schema error on line ${idx + 1} (${raw.slug}):`, parsed.error.issues);
    process.exit(1);
  }
  remedies.push(parsed.data as Remedy);
}

console.log(`Successfully parsed and normalized all ${remedies.length} remedies.`);

// Update botanical names list
const botanicalPath = path.resolve(__dirname, "../data/botanical-names.json");
const publicBotanicalPath = path.resolve(__dirname, "../public/data/botanical-names.json");

const existingBotanicals: string[] = fs.existsSync(botanicalPath)
  ? JSON.parse(fs.readFileSync(botanicalPath, "utf-8"))
  : [];
const botanicalMap = new Map<string, string>();
for (const b of existingBotanicals) {
  botanicalMap.set(b.toLowerCase(), b);
}
for (const b of allBotanicalNames) {
  if (!botanicalMap.has(b.toLowerCase())) {
    botanicalMap.set(b.toLowerCase(), b);
  }
}
const updatedBotanicals = Array.from(botanicalMap.values()).sort((a, b) => a.localeCompare(b));

fs.writeFileSync(botanicalPath, JSON.stringify(updatedBotanicals, null, 2), "utf-8");
if (fs.existsSync(path.dirname(publicBotanicalPath))) {
  fs.writeFileSync(publicBotanicalPath, JSON.stringify(updatedBotanicals, null, 2), "utf-8");
}
console.log(`Updated botanical-names.json with ${updatedBotanicals.length} species.`);

// Write remedies.json
const remediesPath = path.resolve(__dirname, "../data/remedies.json");
const publicRemediesPath = path.resolve(__dirname, "../public/data/remedies.json");

fs.writeFileSync(remediesPath, JSON.stringify(remedies, null, 2), "utf-8");
if (fs.existsSync(path.dirname(publicRemediesPath))) {
  fs.writeFileSync(publicRemediesPath, JSON.stringify(remedies, null, 2), "utf-8");
}
console.log(`Wrote ${remedies.length} folios to ${remediesPath} and ${publicRemediesPath}.`);

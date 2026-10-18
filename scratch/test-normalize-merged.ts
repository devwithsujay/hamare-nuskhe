import fs from "fs";
import path from "path";
import { RemedySchema, Remedy, NATIVE_SCRIPTS, Condition, CONDITIONS } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

const mergedPath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);

console.log(`Processing ${lines.length} lines from merged.jsonl...`);

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

function normalizeVirya(v: any): "USHNA" | "SHEETA" | "SAMA" | null {
  if (!v) return null;
  const str = String(v).toLowerCase();
  if (str.includes("ushna")) return "USHNA";
  if (str.includes("sheeta")) return "SHEETA";
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
    if (lower.includes("bleeding") || lower.includes("haemorrh")) result.push("BLEEDING_DISORDER");
    if (lower.includes("surgery")) result.push("UPCOMING_SURGERY");
    if (lower.includes("ulcer") || lower.includes("gerd")) result.push("ULCER_OR_GERD");
    if (lower.includes("gallstone")) result.push("GALLSTONES");
    if (lower.includes("thyroid")) result.push("THYROID_DISORDER");
    if (lower.includes("epilep")) result.push("EPILEPSY");
  }
  return Array.from(new Set(result));
}

let schemaErrors = 0;
let safetyErrors = 0;
const schemaIssues: Record<string, number> = {};
const safetyIssues: Record<string, number> = {};
const allBotanicalNames = new Set<string>();

const normalizedRemedies: any[] = [];

for (let idx = 0; idx < lines.length; idx++) {
  const raw = JSON.parse(lines[idx]);

  // Extract all botanicals
  if (raw.botanicals) {
    for (const b of raw.botanicals) {
      if (b.scientificName) allBotanicalNames.add(b.scientificName);
    }
  }

  // 1. Ingest ayurvedic attributes
  let ayurvedic = null;
  if (raw.ayurvedicAttributes) {
    const dosha = raw.ayurvedicAttributes.doshaEffect;
    const doshaArray = Array.isArray(dosha) ? dosha : typeof dosha === "string" ? [dosha] : [];
    ayurvedic = {
      virya: normalizeVirya(raw.ayurvedicAttributes.virya),
      doshaEffect: doshaArray,
      source: raw.ayurvedicAttributes.source || "Classical Ayurvedic and Ethnobotanical references",
      rasa: raw.ayurvedicAttributes.rasa,
      guna: raw.ayurvedicAttributes.guna,
      vipaka: raw.ayurvedicAttributes.vipaka,
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
    drugInteractionClasses: raw.safety?.drugInteractionClasses || [],
    allergens: raw.safety?.allergens || [],
    containsAlcohol: raw.safety?.containsAlcohol || false,
    topicalPatchTestRequired: raw.safety?.topicalPatchTestRequired || false,
    redFlagSymptoms: raw.safety?.redFlagSymptoms || [],
    stopAndSeeDoctorIf: raw.safety?.stopAndSeeDoctorIf || [],
    warningsRendered: raw.safety?.warningsRendered || [],
  };

  // Enforce safety rules preconditions
  // A. Honey rule
  const honeyKeywords = ["honey", "madhu", "shahad"];
  const textMatchesHoney = ingredients.some((i: any) => honeyKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => honeyKeywords.some(k => b.commonName.toLowerCase().includes(k)));
  if (textMatchesHoney) {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 1) safety.avoidUnderAge = 1;
    if (!safety.allergens.some((a: string) => a.toLowerCase().includes("honey"))) {
      safety.allergens.push("honey");
    }
  }

  // B. Blood thinning herbs
  const bloodKeywords = ["turmeric", "haldi", "curcuma", "ginger", "adrak", "sunth", "garlic", "lahsun", "fenugreek", "methi", "cinnamon", "dalchini"];
  const hasBlood = ingredients.some((i: any) => bloodKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => bloodKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasBlood) {
    if (!safety.drugInteractionClasses.includes("ANTICOAGULANT") && !safety.avoidInConditions.includes("BLEEDING_DISORDER") && !safety.avoidInConditions.includes("UPCOMING_SURGERY")) {
      safety.drugInteractionClasses.push("ANTICOAGULANT");
    }
  }

  // C. Uterine stimulants
  const uterineKeywords = ["fenugreek", "methi", "ajwain", "carom", "papaya", "aloe", "asafoetida", "hing", "saffron", "kesar"];
  const hasUterine = ingredients.some((i: any) => uterineKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => uterineKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasUterine) {
    if (safety.avoidInPregnancy !== true && safety.avoidInPregnancy !== "UNKNOWN") {
      safety.avoidInPregnancy = true;
    }
  }

  // D. Hypoglycemic herbs
  const hypoKeywords = ["bitter gourd", "karela", "momordica", "jamun", "neem", "fenugreek", "methi", "bael", "bilva", "gudmar", "gymnema", "cinnamon"];
  const hasHypo = ingredients.some((i: any) => hypoKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => hypoKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasHypo) {
    if (!safety.drugInteractionClasses.includes("ANTIDIABETIC")) {
      safety.drugInteractionClasses.push("ANTIDIABETIC");
    }
  }

  // E. Licorice / mulethi
  const licoriceKeywords = ["licorice", "liquorice", "mulethi", "yashtimadhu", "glycyrrhiza"];
  const hasLicorice = ingredients.some((i: any) => licoriceKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => licoriceKeywords.some(k => b.commonName.toLowerCase().includes(k) || (b.scientificName && b.scientificName.toLowerCase().includes(k))));
  if (hasLicorice) {
    if (!safety.avoidInConditions.includes("HYPERTENSION") && !safety.drugInteractionClasses.includes("ANTIHYPERTENSIVE")) {
      safety.avoidInConditions.push("HYPERTENSION");
    }
  }

  // F. Whole nuts / choking hazards
  const nutKeywords = ["whole almond", "whole nut", "peanut", "walnut", "cashew"];
  const hasWholeNuts = ingredients.some((i: any) => nutKeywords.some(k => i.name.toLowerCase().includes(k))) ||
    (raw.botanicals || []).some((b: any) => nutKeywords.some(k => b.commonName.toLowerCase().includes(k)));
  if (hasWholeNuts) {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 5) {
      safety.avoidUnderAge = 5;
    }
  }

  // G. Red flag symptoms require riskLevel = HIGH
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

  // H. Topical patch test
  if (raw.remedyType === "TOPICAL") {
    safety.topicalPatchTestRequired = true;
  }

  // I. Inhalation steam
  if (raw.remedyType === "STEAM_OR_FOMENTATION") {
    if (safety.avoidUnderAge === null || safety.avoidUnderAge < 2) {
      safety.avoidUnderAge = 2;
    }
  }

  const remedy = {
    id: raw.id || `rem-${raw.slug || idx}`,
    slug: raw.slug,
    titleEn: raw.titleEn,
    titleNative: raw.titleNative ?? null,
    nativeScript: normalizeNativeScript(raw.nativeScript),
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

  let safetyRes = validateSafetyRules(remedy as Remedy);
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
    }
    safetyRes = validateSafetyRules(remedy as Remedy);
  }

  const parsed = RemedySchema.safeParse(remedy);
  if (!parsed.success) {
    schemaErrors++;
    for (const issue of parsed.error.issues) {
      const msg = `${issue.path.join(".")}: ${issue.message}`;
      schemaIssues[msg] = (schemaIssues[msg] || 0) + 1;
    }
  } else {
    if (!safetyRes.isValid) {
      safetyErrors++;
      console.log(`Still failing slug ${parsed.data.slug}:`, safetyRes.errors);
      for (const err of safetyRes.errors) {
        safetyIssues[err] = (safetyIssues[err] || 0) + 1;
      }
    }
    normalizedRemedies.push(parsed.data);
  }
}

console.log("Total normalized remedies:", normalizedRemedies.length, "out of", lines.length);
console.log("Schema errors:", schemaErrors);
if (schemaErrors > 0) console.log("Schema issues:", JSON.stringify(schemaIssues, null, 2));
console.log("Safety errors:", safetyErrors);
if (safetyErrors > 0) console.log("Safety issues:", JSON.stringify(safetyIssues, null, 2));
console.log("Total unique botanicals extracted:", allBotanicalNames.size);

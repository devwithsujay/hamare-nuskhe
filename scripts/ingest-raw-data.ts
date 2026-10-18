import fs from "fs";
import path from "path";
import { Remedy, RemedySchema } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

const rawDir = path.resolve(__dirname, "../../raw");
const dataDir = path.resolve(__dirname, "../data");
const remediesJsonPath = path.join(dataDir, "remedies.json");
const botanicalNamesPath = path.join(dataDir, "botanical-names.json");

function normalizeRemedy(raw: any): Remedy {
  const obj = { ...raw };

  // ID and moderation metadata
  obj.id = obj.id || `rem-${obj.slug}`;
  obj.reviewedBy = obj.reviewedBy ?? null;
  obj.reviewedAt = obj.reviewedAt ?? null;
  obj.contributedBy = obj.contributedBy ?? "EDITORIAL";
  obj.createdAt = obj.createdAt ?? "2026-10-17T00:00:00.000Z";
  obj.updatedAt = obj.updatedAt ?? "2026-10-17T00:00:00.000Z";

  // Normalize ingredients
  if (Array.isArray(obj.ingredients)) {
    obj.ingredients = obj.ingredients.map((ing: any) => {
      let unit = ing.amountUnit;
      if (unit === "spoon") unit = "tbsp";
      return {
        ...ing,
        amountUnit: unit,
      };
    });
  }

  // Safety object enforcement according to Section 5 Deterministic Safety Rules
  if (!obj.safety) {
    obj.safety = {
      riskLevel: "LOW",
      avoidInPregnancy: "UNKNOWN",
      avoidInBreastfeeding: "UNKNOWN",
      avoidUnderAge: null,
      avoidInConditions: [],
      drugInteractionClasses: [],
      allergens: [],
      containsAlcohol: false,
      topicalPatchTestRequired: false,
      redFlagSymptoms: [],
      stopAndSeeDoctorIf: [],
    };
  }

  const s = { ...obj.safety };
  s.allergens = Array.isArray(s.allergens) ? [...s.allergens] : [];
  s.avoidInConditions = Array.isArray(s.avoidInConditions) ? [...s.avoidInConditions] : [];
  s.drugInteractionClasses = Array.isArray(s.drugInteractionClasses) ? [...s.drugInteractionClasses] : [];
  s.stopAndSeeDoctorIf = Array.isArray(s.stopAndSeeDoctorIf) ? [...s.stopAndSeeDoctorIf] : [];
  s.redFlagSymptoms = Array.isArray(s.redFlagSymptoms) ? [...s.redFlagSymptoms] : [];

  // Helper keyword matcher
  const fullText = JSON.stringify(obj).toLowerCase();

  // 1. Honey infant botulism rule
  const hasHoney =
    fullText.includes("honey") || fullText.includes("madhu") || fullText.includes("shahad");
  if (hasHoney) {
    if (s.avoidUnderAge === null || s.avoidUnderAge < 1) {
      s.avoidUnderAge = 1;
    }
    const hasHoneyAllergen = s.allergens.some((a: string) => a.toLowerCase().includes("honey"));
    if (!hasHoneyAllergen) {
      s.allergens.push("honey");
    }
    const hasBotulismWarning = s.stopAndSeeDoctorIf.some((w: string) =>
      w.toLowerCase().includes("infant botulism")
    );
    if (!hasBotulismWarning) {
      s.stopAndSeeDoctorIf.unshift(
        "Never give honey to a child under 1 year: honey can carry Clostridium botulinum spores and cause infant botulism."
      );
    }
  }

  // 2. High risk / emergency symptoms (fever, chest pain, jaundice, breathlessness)
  const isEmergency =
    fullText.includes("fever") ||
    fullText.includes("chest pain") ||
    fullText.includes("jaundice") ||
    fullText.includes("breathlessness") ||
    fullText.includes("dyspnoea") ||
    fullText.includes("high fever") ||
    fullText.includes("typhoid") ||
    fullText.includes("malaria");
  if (isEmergency) {
    s.riskLevel = "HIGH";
  }

  // 3. Whole nuts / seeds choking hazard rule (peanut, walnut, cashew, almond)
  const hasWholeNuts =
    fullText.includes("whole nut") ||
    fullText.includes("peanut") ||
    fullText.includes("groundnut") ||
    fullText.includes("walnut") ||
    fullText.includes("cashew") ||
    fullText.includes("whole almond");
  if (hasWholeNuts) {
    if (s.avoidUnderAge === null || s.avoidUnderAge < 5) {
      s.avoidUnderAge = 5;
    }
  }

  // 4. Blood-thinning / anticoagulant herbs (turmeric, ginger, garlic, fenugreek, cinnamon)
  const hasBloodThinners =
    fullText.includes("turmeric") ||
    fullText.includes("haldi") ||
    fullText.includes("curcuma") ||
    fullText.includes("ginger") ||
    fullText.includes("adrak") ||
    fullText.includes("sunth") ||
    fullText.includes("garlic") ||
    fullText.includes("lahsun") ||
    fullText.includes("fenugreek") ||
    fullText.includes("methi") ||
    fullText.includes("cinnamon") ||
    fullText.includes("dalchini");
  if (hasBloodThinners) {
    if (!s.drugInteractionClasses.includes("ANTICOAGULANT")) {
      s.drugInteractionClasses.push("ANTICOAGULANT");
    }
    if (!s.avoidInConditions.includes("BLEEDING_DISORDER")) {
      s.avoidInConditions.push("BLEEDING_DISORDER");
    }
    if (!s.avoidInConditions.includes("UPCOMING_SURGERY")) {
      s.avoidInConditions.push("UPCOMING_SURGERY");
    }
  }

  // 5. Uterine stimulants / pregnancy caution (fenugreek, ajwain, papaya, aloe, hing, saffron)
  const hasUterineStimulants =
    fullText.includes("fenugreek") ||
    fullText.includes("methi") ||
    fullText.includes("ajwain") ||
    fullText.includes("carom") ||
    fullText.includes("papaya") ||
    fullText.includes("aloe") ||
    fullText.includes("asafoetida") ||
    fullText.includes("hing") ||
    fullText.includes("saffron") ||
    fullText.includes("kesar");
  if (hasUterineStimulants) {
    if (s.avoidInPregnancy === false) {
      s.avoidInPregnancy = true;
    }
  }

  // 6. Potent hypoglycemic herbs (karela, jamun, neem, fenugreek, bael, gudmar, cinnamon)
  const hasHypoglycemic =
    fullText.includes("karela") ||
    fullText.includes("bitter gourd") ||
    fullText.includes("momordica") ||
    fullText.includes("jamun") ||
    fullText.includes("syzygium cumini") ||
    fullText.includes("neem") ||
    fullText.includes("azadirachta") ||
    fullText.includes("fenugreek") ||
    fullText.includes("methi") ||
    fullText.includes("gudmar") ||
    fullText.includes("gymnema") ||
    fullText.includes("bael") ||
    fullText.includes("bilva") ||
    fullText.includes("aegle marmelos") ||
    fullText.includes("cinnamon");
  if (hasHypoglycemic) {
    if (!s.drugInteractionClasses.includes("ANTIDIABETIC")) {
      s.drugInteractionClasses.push("ANTIDIABETIC");
    }
  }

  // 7. Licorice (mulethi) hypertension rule
  const hasLicorice =
    fullText.includes("licorice") ||
    fullText.includes("mulethi") ||
    fullText.includes("glycyrrhiza") ||
    fullText.includes("yashtimadhu");
  if (hasLicorice) {
    if (!s.avoidInConditions.includes("HYPERTENSION")) {
      s.avoidInConditions.push("HYPERTENSION");
    }
  }

  // 8. Topical remedies require patch test
  if (obj.remedyType === "TOPICAL") {
    s.topicalPatchTestRequired = true;
  }

  obj.safety = s;

  // Validate with Zod
  const parsed = RemedySchema.parse(obj);
  return parsed;
}

export function ingestAll() {
  console.log("=== INGESTING ALL RAW STATE FOLIOS INTO HAMARE NUSKHE ===");

  // 1. Read existing remedies
  let existingRemedies: Remedy[] = [];
  if (fs.existsSync(remediesJsonPath)) {
    existingRemedies = JSON.parse(fs.readFileSync(remediesJsonPath, "utf-8"));
  }
  console.log(`Loaded ${existingRemedies.length} existing base remedies.`);

  const existingSlugMap = new Map<string, Remedy>();
  for (const r of existingRemedies) {
    existingSlugMap.set(r.slug, r);
  }

  // 2. Read and parse all raw .jsonl files
  const rawFiles = fs.readdirSync(rawDir).filter((f) => f.endsWith(".jsonl"));
  console.log(`Found ${rawFiles.length} state/UT files in raw directory.`);

  let rawCount = 0;
  let addedCount = 0;
  let updatedCount = 0;
  const allBotanicalNames = new Set<string>();

  // Collect botanical names from existing
  if (fs.existsSync(botanicalNamesPath)) {
    const existingBotanicals: string[] = JSON.parse(fs.readFileSync(botanicalNamesPath, "utf-8"));
    existingBotanicals.forEach((b) => allBotanicalNames.add(b.trim()));
  }

  for (const file of rawFiles) {
    const filePath = path.join(rawDir, file);
    const content = fs.readFileSync(filePath, "utf-8");
    const lines = content.split("\n").filter((l) => l.trim().length > 0);

    for (const line of lines) {
      rawCount++;
      const rawObj = JSON.parse(line);
      const normalized = normalizeRemedy(rawObj);

      // Verify safety rules
      const safetyCheck = validateSafetyRules(normalized);
      if (!safetyCheck.isValid) {
        console.warn(`[SAFETY WARN] ${normalized.slug}:`, safetyCheck.errors);
      }

      // Collect scientific names
      if (Array.isArray(normalized.botanicals)) {
        for (const bot of normalized.botanicals) {
          if (bot.scientificName && bot.scientificName.trim().length > 0) {
            allBotanicalNames.add(bot.scientificName.trim());
          }
        }
      }

      if (existingSlugMap.has(normalized.slug)) {
        existingSlugMap.set(normalized.slug, normalized);
        updatedCount++;
      } else {
        existingSlugMap.set(normalized.slug, normalized);
        addedCount++;
      }
    }
  }

  const mergedRemedies = Array.from(existingSlugMap.values());
  console.log(`Ingested: ${rawCount} raw entries (${addedCount} newly added, ${updatedCount} updated).`);
  console.log(`Total remedies in merged archive: ${mergedRemedies.length}`);

  // 3. Write data/botanical-names.json
  const sortedBotanicals = Array.from(allBotanicalNames).sort((a, b) => a.localeCompare(b));
  fs.writeFileSync(botanicalNamesPath, JSON.stringify(sortedBotanicals, null, 2), "utf-8");
  console.log(`Updated botanical registry at ${botanicalNamesPath} with ${sortedBotanicals.length} species.`);

  // 4. Write data/remedies.json
  fs.writeFileSync(remediesJsonPath, JSON.stringify(mergedRemedies, null, 2), "utf-8");
  console.log(`Saved ${mergedRemedies.length} remedies to ${remediesJsonPath}.`);

  console.log("=== INGESTION COMPLETE ===");
}

if (require.main === module) {
  ingestAll();
}

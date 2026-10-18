import fs from "fs";
import path from "path";
import { RemedySchema, Remedy } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

// Trigram calculation for title similarity
function getTrigrams(str: string): Set<string> {
  const s = "  " + str.toLowerCase() + "  ";
  const trigrams = new Set<string>();
  for (let i = 0; i < s.length - 2; i++) {
    trigrams.add(s.substring(i, i + 3));
  }
  return trigrams;
}

function trigramSimilarity(s1: string, s2: string): number {
  const tri1 = getTrigrams(s1);
  const tri2 = getTrigrams(s2);
  let intersection = 0;
  for (const t of tri1) {
    if (tri2.has(t)) intersection++;
  }
  const union = tri1.size + tri2.size - intersection;
  return union === 0 ? 1 : intersection / union;
}

// Unicode range verification
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

function checkUnicodeScript(nativeText: string, expectedScript: string): boolean {
  const regex = SCRIPT_RANGES[expectedScript];
  if (!regex) return true; // Other or unspecified
  return regex.test(nativeText);
}

function runValidation() {
  console.log("=== HAMARE NUSKHE: DATA PIPELINE VALIDATOR ===");
  const botanicalNamesPath = path.resolve(__dirname, "../data/botanical-names.json");
  const acceptedBotanicals: string[] = JSON.parse(
    fs.readFileSync(botanicalNamesPath, "utf-8")
  );
  const botanicalSet = new Set(acceptedBotanicals.map((b) => b.toLowerCase()));

  const remediesJsonPath = path.resolve(__dirname, "../data/remedies.json");
  if (!fs.existsSync(remediesJsonPath)) {
    console.error(`Error: Data file not found at ${remediesJsonPath}`);
    process.exit(1);
  }

  const rawData = JSON.parse(fs.readFileSync(remediesJsonPath, "utf-8"));
  if (!Array.isArray(rawData)) {
    console.error("Error: remedies.json must contain an array of remedies.");
    process.exit(1);
  }

  const slugs = new Set<string>();
  const titles: { slug: string; title: string }[] = [];
  let totalErrors = 0;

  rawData.forEach((entry, idx) => {
    const entryLabel = `Entry #${idx + 1} (${entry.slug || entry.titleEn || "unknown"})`;

    // 1. Zod schema validation
    const parsed = RemedySchema.safeParse(entry);
    if (!parsed.success) {
      console.error(`❌ [SCHEMA] ${entryLabel}:`);
      parsed.error.issues.forEach((issue) => {
        console.error(`   - ${issue.path.join(".")}: ${issue.message}`);
      });
      totalErrors++;
      return;
    }

    const remedy = parsed.data as Remedy;

    // 2. Duplicate slug check
    if (slugs.has(remedy.slug)) {
      console.error(`❌ [DUPLICATE SLUG] ${entryLabel}: Slug "${remedy.slug}" is already registered.`);
      totalErrors++;
    }
    slugs.add(remedy.slug);

    // 3. Near-duplicate title check
    for (const t of titles) {
      const sim = trigramSimilarity(remedy.titleEn, t.title);
      if (sim > 0.85 && remedy.slug !== t.slug) {
        console.error(`❌ [NEAR DUPLICATE] ${entryLabel}: Title "${remedy.titleEn}" is too similar to "${t.title}" (similarity: ${(sim * 100).toFixed(1)}%).`);
        totalErrors++;
      }
    }
    titles.push({ slug: remedy.slug, title: remedy.titleEn });

    // 4. Botanical allow-list check
    remedy.botanicals.forEach((bot) => {
      if (bot.scientificName) {
        if (!botanicalSet.has(bot.scientificName.toLowerCase())) {
          console.error(`❌ [BOTANICAL] ${entryLabel}: Scientific name "${bot.scientificName}" is not on the accepted POWO/IPNI allow-list in data/botanical-names.json.`);
          totalErrors++;
        }
      }
    });

    // 5. Unicode script match check
    if (remedy.titleNative && remedy.nativeScript) {
      const scriptMatches = checkUnicodeScript(remedy.titleNative, remedy.nativeScript);
      if (!scriptMatches) {
        console.error(`❌ [UNICODE SCRIPT] ${entryLabel}: Native title "${remedy.titleNative}" does not match declared script "${remedy.nativeScript}".`);
        totalErrors++;
      }
    }

    // 6. Safety rule engine check
    const safetyResult = validateSafetyRules(remedy);
    if (!safetyResult.isValid) {
      console.error(`❌ [SAFETY RULES] ${entryLabel}:`);
      safetyResult.errors.forEach((err) => {
        console.error(`   - ${err}`);
      });
      totalErrors += safetyResult.errors.length;
    }

    // 7. Check for sample placeholder in production dataset
    const hasSampleCitation = remedy.sources.some((s) => s.citation.includes("SAMPLE ENTRY - REPLACE"));
    if (hasSampleCitation) {
      console.error(`❌ [SAMPLE PLACEHOLDER] ${entryLabel}: Contains placeholder "SAMPLE ENTRY - REPLACE". Not permitted in production dataset.`);
      totalErrors++;
    }
  });

  console.log(`\nValidation complete. Validated ${rawData.length} remedies.`);
  if (totalErrors > 0) {
    console.error(`FAILED with ${totalErrors} issue(s). Build aborted.`);
    process.exit(1);
  } else {
    console.log(`PASSED: All entries satisfy Zod schema, safety rules, botanical allow-list, and Unicode script constraints.`);
  }
}

runValidation();

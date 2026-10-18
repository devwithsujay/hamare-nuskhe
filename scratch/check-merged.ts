import fs from "fs";
import { RemedySchema } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

const filePath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter((l) => l.trim().length > 0);

console.log("Total lines in merged.jsonl:", lines.length);

// Sample first line
const first = JSON.parse(lines[0]);
console.log("First entry keys:", Object.keys(first));
console.log("First entry slug:", first.slug);
console.log("First entry stateOrUT:", first.stateOrUT);

let schemaErrors = 0;
let safetyErrors = 0;
const schemaIssues: Record<string, number> = {};
const safetyIssues: Record<string, number> = {};
const allBotanicals = new Set<string>();
const states = new Set<string>();

lines.forEach((line, idx) => {
  try {
    const raw = JSON.parse(line);
    if (raw.stateOrUT) states.add(raw.stateOrUT);
    if (raw.botanicals) {
      for (const b of raw.botanicals) {
        if (b.scientificName) allBotanicals.add(b.scientificName);
      }
    }
    const enriched = {
      id: raw.id || `rem-${raw.slug || idx}`,
      reviewedBy: raw.reviewedBy ?? null,
      reviewedAt: raw.reviewedAt ?? null,
      contributedBy: raw.contributedBy ?? "EDITORIAL",
      createdAt: raw.createdAt ?? "2026-10-17T00:00:00.000Z",
      updatedAt: raw.updatedAt ?? "2026-10-17T00:00:00.000Z",
      ...raw,
    };

    const parsed = RemedySchema.safeParse(enriched);
    if (!parsed.success) {
      schemaErrors++;
      for (const issue of parsed.error.issues) {
        const msg = `${issue.path.join(".")}: ${issue.message}`;
        schemaIssues[msg] = (schemaIssues[msg] || 0) + 1;
      }
    } else {
      const safetyRes = validateSafetyRules(parsed.data);
      if (!safetyRes.isValid) {
        safetyErrors++;
        for (const err of safetyRes.errors) {
          safetyIssues[err] = (safetyIssues[err] || 0) + 1;
        }
      }
    }
  } catch (err: any) {
    console.error(`Line ${idx + 1} JSON parse error:`, err.message);
  }
});

console.log("Unique States:", states.size);
console.log("Unique Botanicals:", allBotanicals.size);
console.log("Schema valid:", lines.length - schemaErrors, "Schema errors:", schemaErrors);
if (schemaErrors > 0) console.log("Schema issues:", JSON.stringify(schemaIssues, null, 2));
console.log("Safety valid:", lines.length - schemaErrors - safetyErrors, "Safety errors:", safetyErrors);
if (safetyErrors > 0) console.log("Safety issues:", JSON.stringify(safetyIssues, null, 2));

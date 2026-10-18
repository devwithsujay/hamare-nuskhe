import fs from "fs";
import { RemedySchema } from "../src/data/schema";
import { validateSafetyRules } from "../src/lib/safety/rules";

const filePath = "c:/Users/sujay/Downloads/GDH/cleaned_remedies.jsonl";
const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter((l) => l.trim().length > 0);

let schemaErrors = 0;
let safetyErrors = 0;
const schemaIssues: Record<string, number> = {};
const safetyIssues: Record<string, number> = {};

for (const line of lines) {
  const raw = JSON.parse(line);
  const enriched = {
    id: raw.id || `rem-${raw.slug}`,
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
}

console.log("Total in cleaned_remedies.jsonl:", lines.length);
console.log("Schema valid:", lines.length - schemaErrors, "Schema errors:", schemaErrors);
if (schemaErrors > 0) console.log("Schema issues:", JSON.stringify(schemaIssues, null, 2));

console.log("Safety rule valid:", lines.length - schemaErrors - safetyErrors, "Safety errors:", safetyErrors);
if (safetyErrors > 0) console.log("Safety issues:", JSON.stringify(safetyIssues, null, 2));

import fs from "fs";
import path from "path";
import { RemedySchema } from "../src/data/schema";

const rawDir = path.resolve(__dirname, "../../raw");
const files = fs.readdirSync(rawDir).filter(f => f.endsWith(".jsonl"));

let total = 0;
let validCount = 0;
const errorTypes: Record<string, number> = {};
const samples: Record<string, any[]> = {};

for (const file of files) {
  const content = fs.readFileSync(path.join(rawDir, file), "utf-8");
  const lines = content.split("\n").filter(l => l.trim().length > 0);

  for (const line of lines) {
    total++;
    const obj = JSON.parse(line);

    // Normalize with standard default fields if missing
    const enriched = {
      id: obj.id || `rem-${obj.slug}`,
      reviewedBy: obj.reviewedBy ?? null,
      reviewedAt: obj.reviewedAt ?? null,
      contributedBy: obj.contributedBy ?? "EDITORIAL",
      createdAt: obj.createdAt ?? "2026-10-17T00:00:00.000Z",
      updatedAt: obj.updatedAt ?? "2026-10-17T00:00:00.000Z",
      ...obj,
    };

    const parsed = RemedySchema.safeParse(enriched);
    if (parsed.success) {
      validCount++;
    } else {
      for (const issue of parsed.error.issues) {
        const key = `${issue.path.join(".")}: ${issue.message}`;
        errorTypes[key] = (errorTypes[key] || 0) + 1;
        if (!samples[key]) samples[key] = [];
        if (samples[key].length < 2) samples[key].push({ slug: obj.slug, issue });
      }
    }
  }
}

console.log(`Validation results: ${validCount} / ${total} valid`);
if (Object.keys(errorTypes).length > 0) {
  console.log("Error breakdown:", JSON.stringify(errorTypes, null, 2));
  console.log("Sample errors:", JSON.stringify(samples, null, 2));
}

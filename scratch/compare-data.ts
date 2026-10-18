import fs from "fs";

const cleanedPath = "c:/Users/sujay/Downloads/GDH/cleaned_remedies.jsonl";
const mergedPath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";

const cleanedLines = fs.existsSync(cleanedPath) ? fs.readFileSync(cleanedPath, "utf-8").split("\n").filter(l => l.trim().length > 0) : [];
const mergedLines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);

console.log("cleaned_remedies.jsonl count:", cleanedLines.length);
console.log("merged.jsonl count:", mergedLines.length);

if (cleanedLines.length > 0) {
  const c0 = JSON.parse(cleanedLines[0]);
  const m0 = JSON.parse(mergedLines[0]);
  console.log("Cleaned 0 slug:", c0.slug);
  console.log("Merged 0 slug:", m0.slug);
  console.log("Cleaned 0 virya:", c0.ayurvedicAttributes?.virya);
  console.log("Merged 0 virya:", m0.ayurvedicAttributes?.virya);
  console.log("Cleaned 0 avoidInConditions:", c0.safety?.avoidInConditions);
  console.log("Merged 0 avoidInConditions:", m0.safety?.avoidInConditions);
  console.log("Cleaned 0 verificationStatus:", c0.verificationStatus);
  console.log("Merged 0 verificationStatus:", m0.verificationStatus);
}

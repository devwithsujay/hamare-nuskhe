import fs from "fs";
import path from "path";
import { validateSafetyRules } from "../src/lib/safety/rules";

const rawDir = path.resolve(__dirname, "../../raw");
const files = fs.readdirSync(rawDir).filter(f => f.endsWith(".jsonl"));

let total = 0;
let safetyErrors = 0;
const errorTypes: Record<string, number> = {};

for (const file of files) {
  const lines = fs.readFileSync(path.join(rawDir, file), "utf-8").split("\n").filter(l => l.trim().length > 0);
  for (const line of lines) {
    total++;
    const obj = JSON.parse(line);
    const result = validateSafetyRules(obj as any);
    if (!result.isValid) {
      safetyErrors++;
      for (const err of result.errors) {
        errorTypes[err] = (errorTypes[err] || 0) + 1;
      }
    }
  }
}

console.log("Total checked:", total);
console.log("Safety rule pass count:", total - safetyErrors);
console.log("Safety rule fail count:", safetyErrors);
if (safetyErrors > 0) {
  console.log("Safety error summary:", JSON.stringify(errorTypes, null, 2));
}

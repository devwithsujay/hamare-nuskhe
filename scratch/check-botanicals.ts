import fs from "fs";
import path from "path";

const botPath = "c:/Users/sujay/Downloads/GDH/hamare-nuskhe/data/botanical-names.json";
const currentBots: string[] = JSON.parse(fs.readFileSync(botPath, "utf-8"));
const currentSet = new Set(currentBots.map(b => b.toLowerCase()));

const mergedPath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);

const missing: string[] = [];
for (const line of lines) {
  const r = JSON.parse(line);
  if (r.botanicals) {
    for (const b of r.botanicals) {
      if (b.scientificName && !currentSet.has(b.scientificName.toLowerCase())) {
        missing.push(b.scientificName);
      }
    }
  }
}

console.log("Current botanicals count:", currentBots.length);
console.log("Missing botanicals from merged.jsonl:", missing.length);
if (missing.length > 0) {
  console.log("Sample missing:", Array.from(new Set(missing)).slice(0, 10));
}

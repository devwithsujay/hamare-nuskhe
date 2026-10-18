import fs from "fs";

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

const mergedPath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);

let hasIndicScript = 0;
let hasLatinOnly = 0;
let hasNoNative = 0;

for (const line of lines) {
  const r = JSON.parse(line);
  if (!r.titleNative) {
    hasNoNative++;
  } else {
    let matched = false;
    for (const [script, regex] of Object.entries(SCRIPT_RANGES)) {
      if (regex.test(r.titleNative)) {
        matched = true;
        break;
      }
    }
    if (matched) hasIndicScript++;
    else hasLatinOnly++;
  }
}

console.log("Has Indic script in titleNative:", hasIndicScript);
console.log("Has Latin only in titleNative:", hasLatinOnly);
console.log("Has no titleNative:", hasNoNative);

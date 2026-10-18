import fs from "fs";

const filePath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(filePath, "utf-8").split("\n").filter((l) => l.trim().length > 0);

const entry0 = JSON.parse(lines[0]);
console.log("Entry 0 ayurvedicAttributes:", entry0.ayurvedicAttributes);
console.log("Entry 0 safety.avoidInConditions:", entry0.safety?.avoidInConditions);
console.log("Entry 0 verificationStatus:", entry0.verificationStatus);
console.log("Entry 0 nativeScript:", entry0.nativeScript);

// Check distinct values of verificationStatus across merged.jsonl
const verifStatuses = new Set();
const nativeScripts = new Set();
const viryas = new Set();
const avoidConditions = new Set();

for (const line of lines) {
  const r = JSON.parse(line);
  verifStatuses.add(r.verificationStatus);
  nativeScripts.add(r.nativeScript);
  if (r.ayurvedicAttributes?.virya) viryas.add(r.ayurvedicAttributes.virya);
  if (r.safety?.avoidInConditions) {
    for (const c of r.safety.avoidInConditions) avoidConditions.add(c);
  }
}

console.log("All verificationStatus values:", Array.from(verifStatuses));
console.log("All nativeScript values:", Array.from(nativeScripts));
console.log("All virya values:", Array.from(viryas));
console.log("All avoidInConditions values:", Array.from(avoidConditions));

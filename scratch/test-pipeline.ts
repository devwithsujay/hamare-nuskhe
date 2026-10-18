import fs from "fs";

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

const mergedPath = "c:/Users/sujay/Downloads/GDH/merged.jsonl";
const lines = fs.readFileSync(mergedPath, "utf-8").split("\n").filter(l => l.trim().length > 0);

const slugs = new Set<string>();
const duplicateSlugs: string[] = [];
const titles: { slug: string; title: string }[] = [];
let nearDuplicates = 0;

lines.forEach((l, idx) => {
  const r = JSON.parse(l);
  if (slugs.has(r.slug)) {
    duplicateSlugs.push(r.slug);
  }
  slugs.add(r.slug);

  for (const t of titles) {
    const sim = trigramSimilarity(r.titleEn, t.title);
    if (sim > 0.85 && r.slug !== t.slug) {
      nearDuplicates++;
      if (nearDuplicates <= 5) {
        console.log(`Near duplicate: "${r.titleEn}" vs "${t.title}" (${(sim * 100).toFixed(1)}%)`);
      }
    }
  }
  titles.push({ slug: r.slug, title: r.titleEn });
});

console.log("Total entries:", lines.length);
console.log("Duplicate slugs:", duplicateSlugs.length);
console.log("Near duplicate titles (>85%):", nearDuplicates);

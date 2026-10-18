const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/components/RemedyActions.tsx");
let content = fs.readFileSync(filePath, "utf8");

content = content.replace(
  `text-[11px] font-semibold uppercase tracking-wider text-[#9C3820] border-b border-[#E7DEC8] dark:border-[#36332E] pb-2`,
  `text-xs font-bold uppercase tracking-wider text-[#9C3820] dark:text-[#F59E0B] border-b border-[#DFCFAF]/60 dark:border-[#38332A]/60 pb-2.5`
);

content = content.replace(
  `px-3 py-2.5 min-h-[44px] text-xs font-medium rounded-xl border transition-colors`,
  `px-3.5 py-3 min-h-[46px] text-sm font-semibold rounded-xl border transition-colors shadow-2xs`
);

content = content.replaceAll(
  `px-3 py-2.5 min-h-[44px] text-xs font-medium bg-[#F5F0E6] dark:bg-[#22201D] text-[#1C1917] dark:text-[#F5F0E6] border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#2D5A27] rounded-xl transition-colors`,
  `px-3.5 py-3 min-h-[46px] text-sm font-semibold bg-[#F5F0E6] dark:bg-[#22201D] text-[#1C1917] dark:text-[#F5F0E6] border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#2D5A27] rounded-xl transition-colors shadow-2xs`
);

content = content.replaceAll(
  `px-3 py-2.5 min-h-[44px] text-xs font-medium bg-[#F5F0E6] dark:bg-[#22201D] text-[#1C1917] dark:text-[#F5F0E6] border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#9C4129] rounded-xl transition-colors`,
  `px-3.5 py-3 min-h-[46px] text-sm font-semibold bg-[#F5F0E6] dark:bg-[#22201D] text-[#1C1917] dark:text-[#F5F0E6] border border-[#E7DEC8] dark:border-[#36332E] hover:border-[#9C4129] rounded-xl transition-colors shadow-2xs`
);

content = content.replaceAll(
  `py-2 min-h-[40px] text-[11px] font-mono border`,
  `py-2.5 min-h-[42px] text-xs font-mono font-bold border`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Updated RemedyActions typography!");

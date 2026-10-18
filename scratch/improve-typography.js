const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../src/app/remedy/[slug]/page.tsx");
let content = fs.readFileSync(filePath, "utf8");

// 1. Botanical Part and verified badge
content = content.replace(
  `text-[11px] text-[#44403C] dark:text-[#B8B2A7]`,
  `text-xs text-[#44403C] dark:text-[#B8B2A7] font-mono`
);
content = content.replace(
  `text-[10px] bg-[#E7DEC8]/60 dark:bg-[#36332E] px-1 py-0.2 rounded-[2px]`,
  `text-xs bg-[#E7DEC8]/60 dark:bg-[#36332E] px-2 py-0.5 rounded-full font-mono`
);

// 2. Traditional uses tags
content = content.replace(
  `className="text-xs bg-[#F5F0E6] dark:bg-[#22201D] border border-[#E7DEC8] dark:border-[#36332E] px-2.5 py-1 rounded-[2px] text-[#1C1917] dark:text-[#F5F0E6]"`,
  `className="text-sm bg-[#F5F0E6] dark:bg-[#22201D] border border-[#E7DEC8] dark:border-[#36332E] px-3.5 py-1.5 rounded-full text-[#1C1714] dark:text-[#F5F0E6] font-medium"`
);

// 3. Prep steps typography
content = content.replace(
  `className="flex items-start gap-3.5 text-sm leading-relaxed"`,
  `className="flex items-start gap-3.5 text-base leading-relaxed"`
);
content = content.replace(
  `w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`,
  `w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`
);

// 4. Dosage & Classical Profile cards
content = content.replace(
  `className="bg-[#FAF6ED] dark:bg-[#201D19] border border-[#DFCFAF]/70 dark:border-[#38332A] p-5 rounded-2xl text-xs shadow-xs"`,
  `className="bg-[#FAF6ED] dark:bg-[#201D19] border border-[#DFCFAF]/70 dark:border-[#38332A] p-5 sm:p-6 rounded-2xl text-sm shadow-xs"`
);
content = content.replace(
  `className="bg-[#FAF6ED] dark:bg-[#201D19] border border-[#DFCFAF]/70 dark:border-[#38332A] p-5 rounded-2xl text-xs shadow-xs flex flex-col justify-between"`,
  `className="bg-[#FAF6ED] dark:bg-[#201D19] border border-[#DFCFAF]/70 dark:border-[#38332A] p-5 sm:p-6 rounded-2xl text-sm shadow-xs flex flex-col justify-between"`
);
content = content.replace(
  `className="font-semibold uppercase tracking-wider text-[#9C3820] dark:text-[#F59E0B] text-[11px] mb-2 flex items-center gap-1.5"`,
  `className="font-bold uppercase tracking-wider text-[#9C3820] dark:text-[#F59E0B] text-xs mb-3 flex items-center gap-2"`
);
content = content.replace(
  `className="font-semibold uppercase tracking-wider text-[#285724] dark:text-[#5EA856] text-[11px] mb-2 flex items-center gap-1.5"`,
  `className="font-bold uppercase tracking-wider text-[#285724] dark:text-[#5EA856] text-xs mb-3 flex items-center gap-2"`
);
content = content.replace(
  `className="text-[10px] text-[#9B1C1C] dark:text-[#F87171] pt-1"`,
  `className="text-xs text-[#9B1C1C] dark:text-[#F87171] pt-2 font-medium"`
);
content = content.replace(
  `text-[11px] font-semibold bg-[#FEF3C7] dark:bg-[#3D2C0C] text-[#92400E] dark:text-[#FDE68A] px-2 py-0.5 rounded-[2px] border border-[#FDE68A]`,
  `text-xs font-semibold bg-[#FEF3C7] dark:bg-[#3D2C0C] text-[#92400E] dark:text-[#FDE68A] px-2.5 py-0.5 rounded-full border border-[#FDE68A]`
);
content = content.replace(
  `text-[11px] font-semibold bg-[#EFF6FF] dark:bg-[#1E293B] text-[#1E40AF] dark:text-[#93C5FD] px-2 py-0.5 rounded-[2px] border border-[#BFDBFE]`,
  `text-xs font-semibold bg-[#EFF6FF] dark:bg-[#1E293B] text-[#1E40AF] dark:text-[#93C5FD] px-2.5 py-0.5 rounded-full border border-[#BFDBFE]`
);
content = content.replace(
  `text-[11px] italic opacity-85 pt-1 border-t`,
  `text-xs italic opacity-85 pt-1.5 border-t`
);
content = content.replace(
  `text-[#4A3E34]/80 dark:text-[#BFB6A8]/80 italic text-[11px] leading-relaxed`,
  `text-[#4A3E34]/80 dark:text-[#BFB6A8]/80 italic text-xs leading-relaxed`
);

// 5. Grandmother's note
content = content.replace(
  `text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#9C3820]/10 text-[#9C3820] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]`,
  `text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#9C3820]/10 text-[#9C3820] dark:bg-[#F59E0B]/10 dark:text-[#F59E0B]`
);
content = content.replace(
  `text-xs text-[#A86518] font-serif italic`,
  `text-sm text-[#A86518] font-serif italic`
);
content = content.replace(
  `drop-cap text-sm sm:text-base text-[#1C1714] dark:text-[#F4ECE0] leading-relaxed font-serif`,
  `drop-cap text-base sm:text-lg text-[#1C1714] dark:text-[#F4ECE0] leading-relaxed font-serif`
);

// 6. Evidence note
content = content.replace(
  `className="bg-[#FAF6ED] dark:bg-[#1E1C1A] border border-[#DFCFAF]/70 dark:border-[#36332E] p-5 sm:p-6 rounded-2xl text-xs shadow-xs"`,
  `className="bg-[#FAF6ED] dark:bg-[#1E1C1A] border border-[#DFCFAF]/70 dark:border-[#36332E] p-5 sm:p-6 rounded-2xl text-sm shadow-xs"`
);
content = content.replace(
  `className="font-semibold text-xs uppercase tracking-wider text-[#44403C] dark:text-[#B8B2A7] mb-2"`,
  `className="font-bold text-xs uppercase tracking-wider text-[#44403C] dark:text-[#B8B2A7] mb-2.5"`
);

// 7. Sources
content = content.replace(
  `className="space-y-2.5 text-xs"`,
  `className="space-y-3 text-sm"`
);
content = content.replace(
  `text-[10px] bg-[#E7DEC8] dark:bg-[#36332E] px-1.5 py-0.5 rounded-[2px]`,
  `text-xs font-mono bg-[#E7DEC8] dark:bg-[#36332E] px-2 py-0.5 rounded-full`
);
content = content.replace(
  `text-[11px] text-[#44403C] dark:text-[#B8B2A7] mt-1`,
  `text-xs text-[#44403C] dark:text-[#B8B2A7] mt-1`
);
content = content.replace(
  `text-[#9C3820] underline underline-offset-2 text-[11px] mt-1 inline-block`,
  `text-[#9C3820] underline underline-offset-2 text-xs mt-1.5 inline-block font-medium`
);

// 8. Sign-off footer
content = content.replace(
  `className="border-t border-[#E7DEC8] dark:border-[#36332E] pt-4 text-xs text-[#44403C] dark:text-[#B8B2A7]"`,
  `className="border-t border-[#E7DEC8] dark:border-[#36332E] pt-4 text-sm text-[#44403C] dark:text-[#B8B2A7]"`
);

fs.writeFileSync(filePath, content, "utf8");
console.log("Successfully upgraded remedy page typography!");

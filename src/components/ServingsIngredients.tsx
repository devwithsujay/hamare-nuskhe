"use client";

import React, { useState } from "react";
import { Ingredient } from "@/data/schema";
import { Users } from "lucide-react";

interface Props {
  baseServings: number;
  ingredients: Ingredient[];
}

export default function ServingsIngredients({ baseServings, ingredients }: Props) {
  const [multiplier, setMultiplier] = useState<number>(1);

  // Format scaled amount neatly (e.g. 0.5 -> 1/2 or 0.5, avoid 0.3333333333)
  const formatAmount = (val: number | null): string => {
    if (val === null) return "";
    const scaled = val * multiplier;
    if (Number.isInteger(scaled)) return String(scaled);
    return scaled.toFixed(1).replace(/\.0$/, "");
  };

  return (
    <div className="bg-[#FAF6EE] dark:bg-[#1E1C1A] border border-[#D8CBB8] dark:border-[#38332A] p-6 sm:p-7 rounded-[3px] shadow-[inset_0_0_14px_rgba(216,203,184,0.12)] transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#D8CBB8]/80 dark:border-[#38332A] gap-3">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1C1917] dark:text-[#F4ECE0] flex items-center gap-2.5">
          <span>Ingredients &amp; Specimen Measurements</span>
          <span className="text-xs sm:text-sm font-mono font-normal text-[#5C5346] dark:text-[#B8B2A7]">
            ({ingredients.length} items cataloged)
          </span>
        </h3>

        {/* Servings Multiplier Controls (1, 2, 4) - Ledger Segmented Control */}
        <div className="flex items-center gap-2.5 text-xs sm:text-sm font-mono uppercase tracking-wider">
          <span className="text-[#5C5346] dark:text-[#B8B2A7] flex items-center gap-1.5 font-bold">
            <Users className="w-4 h-4 opacity-75" /> Servings:
          </span>
          <div className="flex items-center p-0.5 rounded-[2px] bg-[#F4EFE6] dark:bg-[#25221F] border border-[#D8CBB8] dark:border-[#38332A]">
            {[1, 2, 4].map((scale) => {
              const isActive = multiplier === scale;
              const count = baseServings * scale;
              return (
                <button
                  key={scale}
                  type="button"
                  onClick={() => setMultiplier(scale)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-mono rounded-[2px] transition-all font-bold cursor-pointer ${
                    isActive
                      ? "bg-[#9E2A2B] text-[#FAF6EE] shadow-xs"
                      : "text-[#5C5346] dark:text-[#B8B2A7] hover:text-[#9E2A2B]"
                  }`}
                  aria-label={`Scale ingredients for ${count} serving${count > 1 ? "s" : ""}`}
                >
                  {count} {scale === 1 ? "(base)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Ingredients Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-base sm:text-lg border-collapse">
          <thead>
            <tr className="border-b border-[#E7DEC8]/60 dark:border-[#36332E] text-xs sm:text-sm uppercase tracking-wider text-[#44403C] dark:text-[#B8B2A7]">
              <th className="py-3 pr-4 font-bold">Ingredient</th>
              <th className="py-3 px-4 font-bold text-right">Quantity</th>
              <th className="py-3 pl-4 font-bold">Preparation Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7DEC8]/40 dark:divide-[#36332E]/40 font-mono text-sm sm:text-base">
            {ingredients.map((ing, idx) => {
              const formattedAmt = formatAmount(ing.amountValue);
              const unit = ing.amountUnit === "to_taste" ? "to taste" : (ing.amountUnit || "");

              return (
                <tr
                  key={idx}
                  className="hover:bg-[#F5F0E6]/50 dark:hover:bg-[#22201D]/50 transition-colors"
                >
                  <td className="py-3.5 pr-4 font-sans font-medium text-[#1C1917] dark:text-[#F5F0E6] text-base sm:text-lg">
                    {ing.name}
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#9C4129] dark:text-[#F59E0B] font-bold whitespace-nowrap text-base sm:text-lg">
                    {ing.amountUnit === "to_taste" ? (
                      <span className="italic font-sans text-sm sm:text-base">to taste</span>
                    ) : formattedAmt ? (
                      `${formattedAmt} ${unit}`.trim()
                    ) : (
                      <span className="text-[#44403C]/60 dark:text-[#B8B2A7]/60">—</span>
                    )}
                  </td>
                  <td className="py-3.5 pl-4 font-sans text-sm sm:text-base text-[#44403C] dark:text-[#B8B2A7]">
                    {ing.notes || "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {multiplier > 1 && (
        <p className="mt-3.5 text-xs sm:text-sm text-[#9C3820] dark:text-[#F59E0B] italic">
          * Quantities scaled {multiplier}× for batch preparation. Simmer times remain approximately the same.
        </p>
      )}
    </div>
  );
}

import React from "react";

/**
 * Traditional Indian & Ayurvedic SVG Vector Motifs
 * Handcrafted vector assets celebrating Indian cultural heritage,
 * temple architecture, botanical iconography, and Ayurvedic philosophy.
 */

// 1. Traditional Brass Oil Lamp / Diya (दीप) - Symbol of Agni, life force, and wisdom
export function DiyaIcon({ className = "w-6 h-6", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Flame Outer */}
      <path
        d="M24 4C24 4 19 12 19 18C19 21.3 21.2 24 24 24C26.8 24 29 21.3 29 18C29 12 24 4 24 4Z"
        fill="#D97706"
      />
      {/* Flame Inner Core */}
      <path
        d="M24 10C24 10 21.5 14.5 21.5 18C21.5 19.7 22.6 21 24 21C25.4 21 26.5 19.7 26.5 18C26.5 14.5 24 10 24 10Z"
        fill="#FDE68A"
      />
      {/* Diya Base (Brass Bowl) */}
      <path
        d="M8 26C8 26 10 38 24 38C38 38 40 26 40 26C40 26 36 30 24 30C12 30 8 26 8 26Z"
        fill="#9C4129"
      />
      {/* Diya Lip */}
      <ellipse cx="24" cy="27" rx="16" ry="3.5" fill="#B45309" stroke="#E7DEC8" strokeWidth="0.75" />
      {/* Pedestal Stand */}
      <path
        d="M21 37H27V41H31V43H17V41H21V37Z"
        fill="#9C4129"
      />
      {/* Base Rim */}
      <path d="M15 43H33V44.5H15V43Z" fill="#78350F" />
    </svg>
  );
}

// 2. Ayurvedic Mortar & Pestle / Kharal (खरल) - The universal symbol of herbal medicine
export function KharalIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Mortar Stone Vessel */}
      <path
        d="M10 21C10 21 11 37 24 37C37 37 38 21 38 21C38 21 34 25 24 25C14 25 10 21 10 21Z"
        fill="#78350F"
      />
      {/* Mortar Rim */}
      <ellipse cx="24" cy="21" rx="14" ry="4" fill="#92400E" stroke="#D97706" strokeWidth="1" />
      {/* Inner Cavity */}
      <ellipse cx="24" cy="21" rx="11" ry="2.8" fill="#451A03" />
      {/* Pestle / Mudgar Handle angled */}
      <path
        d="M17 7L27 25L24 27L14 9C13.5 8 14 7 15 6.5C16 6 17 6.5 17 7Z"
        fill="#B45309"
        stroke="#E7DEC8"
        strokeWidth="0.75"
      />
      {/* Fresh Herb Sprig */}
      <path
        d="M27 18C29 16 34 16 35 18C36 20 33 22 30 21C28 20.5 27 18 27 18Z"
        fill="#2D5A27"
      />
      <path
        d="M30 19C32 17 37 18 36 21C35 24 31 23 29 21C29 20 30 19 30 19Z"
        fill="#4D7C0F"
      />
      {/* Mortar Base */}
      <path d="M19 36H29V39H19V36Z" fill="#451A03" />
      <path d="M16 39H32V41H16V39Z" fill="#78350F" />
    </svg>
  );
}

// 3. Sacred Lotus / Padma (पद्म) - Classical Mandala Motif
export function LotusMandalaIcon({ className = "w-6 h-6", color = "#9C4129" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Center Seed Pod */}
      <circle cx="24" cy="24" r="4.5" fill="#D97706" />
      <circle cx="24" cy="24" r="2" fill="#FEF3C7" />
      {/* 8 Cardinal Petals */}
      <path d="M24 7C22 12 22 17 24 19C26 17 26 12 24 7Z" fill={color} />
      <path d="M24 41C22 36 22 31 24 29C26 31 26 36 24 41Z" fill={color} />
      <path d="M7 24C12 22 17 22 19 24C17 26 12 26 7 24Z" fill={color} />
      <path d="M41 24C36 22 31 22 29 24C31 26 36 26 41 24Z" fill={color} />
      {/* 4 Diagonal Petals */}
      <path d="M12 12C15 16 17 18 19 19C18 17 16 15 12 12Z" fill={color} opacity="0.85" />
      <path d="M36 12C33 16 31 18 29 19C30 17 32 15 36 12Z" fill={color} opacity="0.85" />
      <path d="M12 36C15 32 17 30 19 29C18 31 16 33 12 36Z" fill={color} opacity="0.85" />
      <path d="M36 36C33 32 31 30 29 29C30 31 32 33 36 36Z" fill={color} opacity="0.85" />
      {/* Subtle outer ring */}
      <circle cx="24" cy="24" r="21" stroke="#D97706" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

// 4. Kalash / Auspicious Copper Pot (कलश)
export function KalashIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Coconut / Shrifal on top */}
      <ellipse cx="24" cy="11" rx="4.5" ry="5.5" fill="#78350F" />
      <path d="M24 5L24 7M22 6L23 8M26 6L25 8" stroke="#451A03" strokeWidth="1" strokeLinecap="round" />
      {/* Mango Leaves (Amra Pallav) */}
      <path d="M18 16C16 12 18 8 20 7C20 10 20 14 18 16Z" fill="#2D5A27" />
      <path d="M30 16C32 12 30 8 28 7C28 10 28 14 30 16Z" fill="#2D5A27" />
      <path d="M24 16C22 11 23 8 24 7C25 8 26 11 24 16Z" fill="#4D7C0F" />
      {/* Kalash Neck */}
      <path d="M19 16H29V19H19V16Z" fill="#B45309" stroke="#E7DEC8" strokeWidth="0.5" />
      {/* Kalash Belly (Copper Pot) */}
      <path
        d="M17 19C17 19 11 23 11 31C11 38 18 41 24 41C30 41 37 38 37 31C37 23 31 19 31 19H17Z"
        fill="#9C4129"
      />
      {/* Swastika / Auspicious mark on belly */}
      <circle cx="24" cy="30" r="3" fill="#D97706" opacity="0.9" />
      {/* Base */}
      <path d="M19 41H29V43H19V41Z" fill="#78350F" />
    </svg>
  );
}

// 5. Traditional Indian Temple / Saree Border Band (अलंकरण पट्टी)
export function IndianOrnamentalBand({ className = "w-full h-3" }: { className?: string }) {
  return (
    <div className={`overflow-hidden flex items-center ${className}`} aria-hidden="true">
      <svg width="100%" height="12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <pattern id="indian-border-repeat" x="0" y="0" width="24" height="12" patternUnits="userSpaceOnUse">
          {/* Diamond motif */}
          <polygon points="12,1 23,6 12,11 1,6" fill="none" stroke="#D97706" strokeWidth="0.8" />
          <polygon points="12,3 19,6 12,9 5,6" fill="#9C4129" opacity="0.65" />
          <circle cx="12" cy="6" r="1.5" fill="#D97706" />
          <circle cx="0" cy="6" r="1" fill="#2D5A27" />
          <circle cx="24" cy="6" r="1" fill="#2D5A27" />
          {/* Top/bottom guide rules */}
          <line x1="0" y1="0.5" x2="24" y2="0.5" stroke="#E7DEC8" strokeWidth="0.75" />
          <line x1="0" y1="11.5" x2="24" y2="11.5" stroke="#E7DEC8" strokeWidth="0.75" />
        </pattern>
        <rect width="100%" height="12" fill="url(#indian-border-repeat)" />
      </svg>
    </div>
  );
}

// 6. Traditional Manuscript Corner Bracket (पत्र-कोण)
export function ManuscriptCorner({ position = "tl", className = "w-5 h-5 text-[#9C4129]" }: { position?: "tl" | "tr" | "bl" | "br"; className?: string }) {
  const rotation = {
    tl: "rotate-0",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${rotation} pointer-events-none`}
      aria-hidden="true"
    >
      <path
        d="M2 12V2H12M4 8V4H8M2 2L9 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      <circle cx="3" cy="12" r="1.5" fill="currentColor" />
      <circle cx="6" cy="6" r="1.2" fill="#D97706" />
    </svg>
  );
}

// 7. Tridosha Visual Badges (Vata / Pitta / Kapha)
export function VataDoshaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Air & Space - Ethereal swirling wind */}
      <path
        d="M3 8C6 8 8 6 11 6C13.5 6 15 7.5 15 9.5C15 11.5 13 13 11 13H4"
        stroke="#4B6B94"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <path
        d="M2 14C5 14 7 12 10 12C13 12 15 13.5 15 15.5C15 17.5 13 19 11 19H3"
        stroke="#4B6B94"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      <circle cx="19" cy="9.5" r="1.5" fill="#4B6B94" />
      <circle cx="19" cy="15.5" r="1.5" fill="#4B6B94" />
    </svg>
  );
}

export function PittaDoshaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Fire & Water - Sacred Agni flame */}
      <path
        d="M12 2C12 2 8 8 8 13C8 17.4 11.6 21 16 21C20.4 21 24 17.4 24 13C24 8 20 2 20 2C20 2 17 6 16 9C15 7 12 2 12 2Z"
        fill="#D97706"
        transform="scale(0.8) translate(-1, 0)"
      />
      <path
        d="M12 9C12 9 9.5 13 9.5 16C9.5 18.5 11.5 20.5 14 20.5C16.5 20.5 18.5 18.5 18.5 16C18.5 13 16 9 16 9C16 9 14.5 11.5 14 13C13.5 12 12 9 12 9Z"
        fill="#FDE68A"
        transform="scale(0.8) translate(-1, 0)"
      />
    </svg>
  );
}

export function KaphaDoshaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Water & Earth - Grounding droplet & sprout */}
      <path
        d="M12 3C12 3 5 11 5 16C5 19.9 8.1 23 12 23C15.9 23 19 19.9 19 16C19 11 12 3 12 3Z"
        fill="#2D5A27"
        opacity="0.85"
      />
      <ellipse cx="12" cy="17" rx="3.5" ry="2" fill="#86EFAC" opacity="0.9" />
    </svg>
  );
}

// 8. Ornate Indian Botanical / Architectural Brass Divider (अलंकारिक काँस्य विभाजक)
export function HeritageOrnateDivider({ className = "my-6", color = "#B5945B" }: { className?: string; color?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 w-full opacity-85 select-none ${className}`} aria-hidden="true">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#B5945B]/60 to-[#B5945B]" />
      <svg width="72" height="18" viewBox="0 0 72 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        {/* Left Vine Spiral */}
        <path d="M4 9C10 3 14 3 20 9C16 11 12 11 8 9" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <circle cx="6" cy="7" r="1.5" fill={color} />
        {/* Central Auspicious Diamond Lotus */}
        <path d="M36 2L42 9L36 16L30 9L36 2Z" fill="none" stroke={color} strokeWidth="1.2" />
        <circle cx="36" cy="9" r="2.2" fill="#9E2A2B" />
        <circle cx="36" cy="9" r="0.8" fill="#FAF6EE" />
        {/* Petal accents */}
        <path d="M26 9H29M43 9H46" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        {/* Right Vine Spiral */}
        <path d="M68 9C62 3 58 3 52 9C56 11 60 11 64 9" stroke={color} strokeWidth="1" strokeLinecap="round" />
        <circle cx="66" cy="7" r="1.5" fill={color} />
      </svg>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#B5945B]/60 to-[#B5945B]" />
    </div>
  );
}

// 9. Ornamental Brass Corner Brackets (for Archival Charter & Herbarium Mounts)
export function BrassCornerBracket({ position = "tl", className = "w-4 h-4" }: { position?: "tl" | "tr" | "bl" | "br"; className?: string }) {
  const rotation = {
    tl: "rotate-0",
    tr: "rotate-90",
    br: "rotate-180",
    bl: "-rotate-90",
  }[position];

  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} ${rotation} pointer-events-none text-[#B5945B]`} aria-hidden="true">
      <path d="M2 14V2H14" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
      <path d="M4 10V4H10" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      <circle cx="3" cy="3" r="1.5" fill="#9E2A2B" />
      <circle cx="14" cy="3" r="1" fill="currentColor" />
      <circle cx="3" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

// 10. Archival Rubber Stamp Icon (मुहर)
export function ArchivalMoharStamp({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M7 3H13V6C13 7.6 11.8 9 10 9C8.2 9 7 7.6 7 6V3Z" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 14L4.5 10H15.5L17 14H3Z" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2" y="14" width="16" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" fill="currentColor" fillOpacity="0.1" />
    </svg>
  );
}

// 11. Antique Wooden & Brass Spice Box / Mortar & Pestle (संदूक / खलबत्ता) for Empty State
export function SandookIllustration({ className = "w-32 h-32" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {/* Outer Halo Glow */}
      <circle cx="80" cy="80" r="70" fill="#FAF6EE" stroke="#E2D9C8" strokeWidth="1" strokeDasharray="3 4" />
      {/* Shadow Base */}
      <ellipse cx="80" cy="124" rx="48" ry="8" fill="#5C5346" fillOpacity="0.1" />
      {/* Wooden Chest / Sandook Base */}
      <rect x="42" y="76" width="76" height="42" rx="2" fill="#FAF6EE" stroke="#B5945B" strokeWidth="1.8" />
      {/* Inner Panels */}
      <line x1="67" y1="76" x2="67" y2="118" stroke="#D8CBB8" strokeWidth="1" />
      <line x1="93" y1="76" x2="93" y2="118" stroke="#D8CBB8" strokeWidth="1" />
      {/* Brass Corner Reinforcements */}
      <path d="M42 86V76H52" stroke="#B5945B" strokeWidth="2.5" />
      <path d="M118 86V76H108" stroke="#B5945B" strokeWidth="2.5" />
      <path d="M42 108V118H52" stroke="#B5945B" strokeWidth="2.5" />
      <path d="M118 108V118H108" stroke="#B5945B" strokeWidth="2.5" />
      {/* Traditional Brass Latch & Lock (ताला) */}
      <rect x="74" y="88" width="12" height="14" rx="1.5" fill="#B5945B" stroke="#92400E" strokeWidth="1" />
      <circle cx="80" cy="93" r="1.5" fill="#1C1917" />
      <path d="M80 95V99" stroke="#1C1917" strokeWidth="1.2" strokeLinecap="round" />
      {/* Mortar & Pestle (खलबत्ता) hovering above */}
      <path d="M62 58C62 58 64 74 80 74C96 74 98 58 98 58C98 58 92 62 80 62C68 62 62 58 62 58Z" fill="#9E2A2B" stroke="#B5945B" strokeWidth="1.2" />
      <ellipse cx="80" cy="58" rx="18" ry="4.5" fill="#7A1D1E" stroke="#B5945B" strokeWidth="1" />
      {/* Angled Pestle */}
      <path d="M72 38L85 64L81 66L68 40C67.5 39 68 38 69.5 37.5C71 37 72 37.5 72 38Z" fill="#B5945B" stroke="#8C6C38" strokeWidth="1" />
      {/* Medicinal Herb Sprigs Emerging */}
      <path d="M86 52C90 46 96 48 97 54C94 56 89 55 86 52Z" fill="#2D4A3E" />
      <path d="M74 52C70 46 64 48 63 54C66 56 71 55 74 52Z" fill="#2D4A3E" />
      <circle cx="80" cy="50" r="1.5" fill="#D99B26" />
    </svg>
  );
}

// 12. Subtle Herbarium Watermarked Botanical Leaf
export function SpecimenLeafWatermark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${className} opacity-20 pointer-events-none`} aria-hidden="true">
      <path d="M16 3C16 3 8 9 8 18C8 23 12 28 16 29C20 28 24 23 24 18C24 9 16 3 16 3Z" stroke="#2D4A3E" strokeWidth="1.2" />
      <path d="M16 6V26M16 11L11 15M16 16L12 20M16 11L21 15M16 16L20 20" stroke="#2D4A3E" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

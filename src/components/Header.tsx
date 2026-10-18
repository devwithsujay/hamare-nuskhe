"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Bookmark, PlusCircle, Info, Moon, Sun, MapPin, Sprout } from "lucide-react";
import { DiyaIcon, LotusMandalaIcon, IndianOrnamentalBand } from "./IndianMotifs";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Header() {
  const pathname = usePathname();
  const { lang, toggleLanguage, t } = useLanguage();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [textSize, setTextSize] = useState<"sm" | "md" | "lg">("md");
  const [userState, setUserState] = useState<string | null>(null);
  const [breezeEnabled, setBreezeEnabled] = useState<boolean>(true);

  useEffect(() => {
    // Read persisted theme or system preference
    const savedTheme = localStorage.getItem("hn-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || (document.documentElement.classList.contains("dark") ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Read persisted text size
    const savedSize = localStorage.getItem("hn-text-size") as "sm" | "md" | "lg" | null;
    if (savedSize) {
      setTextSize(savedSize);
      document.documentElement.setAttribute("data-text-size", savedSize);
    }
    const savedState = localStorage.getItem("hn-user-state");
    if (savedState) {
      setUserState(savedState);
    }
    // Read botanical breeze preference
    const savedBreeze = localStorage.getItem("hn-botanical-breeze");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (savedBreeze !== null) {
      setBreezeEnabled(savedBreeze === "true");
    } else if (prefersReduced) {
      setBreezeEnabled(false);
    }

    const handleStateChange = (e: any) => {
      if (e.detail?.state) {
        setUserState(e.detail.state);
      }
    };
    window.addEventListener("hn-language-changed", handleStateChange);
    return () => window.removeEventListener("hn-language-changed", handleStateChange);
  }, []);

  const toggleBreeze = () => {
    const next = !breezeEnabled;
    setBreezeEnabled(next);
    localStorage.setItem("hn-botanical-breeze", String(next));
    window.dispatchEvent(new CustomEvent("hn-toggle-breeze", { detail: { enabled: next } }));
  };

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("hn-theme", nextTheme);
  };

  const changeTextSize = (size: "sm" | "md" | "lg") => {
    setTextSize(size);
    document.documentElement.setAttribute("data-text-size", size);
    localStorage.setItem("hn-text-size", size);
  };

  const navLinks = [
    { href: "/", label: t.navArchive, icon: BookOpen },
    { href: "/states", label: t.navStates, icon: MapPin },
    { href: "/plants", label: t.navPlants, icon: Sprout },
    { href: "/saved", label: t.navSaved, icon: Bookmark },
    { href: "/contribute", label: t.navContribute, icon: PlusCircle },
    { href: "/about", label: t.navAbout, icon: Info },
  ];

  return (
    <>
      <header className="border-b border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE]/92 dark:bg-[#161412]/92 backdrop-blur-md sticky top-0 z-40 transition-colors shadow-[0_1px_4px_rgba(45,38,30,0.04)]">
      {/* Traditional Indian Saree / Temple Border Stripe */}
      <div className="indian-temple-stripe" aria-hidden="true" />

      <div className="max-w-[1536px] w-full mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Archival Micro-bar */}
        <div className="flex items-center justify-between py-2 border-b border-[#D8CBB8]/60 dark:border-[#383229]/60 text-xs sm:text-sm text-[#5C5346] dark:text-[#C7BDB0] gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="font-mono text-xs uppercase font-bold tracking-[0.08em] px-2.5 py-1 rounded-[2px] border border-[#B5945B]/60 bg-[#D99B26]/10 text-[#9E2A2B] dark:text-[#D4B373] whitespace-nowrap">
              आयुर्वेद संग्रह
            </span>
            <span className="hidden md:inline font-mono text-xs tracking-[0.08em] uppercase text-[#5C5346]/90 dark:text-[#C7BDB0]/90 font-semibold truncate">
              National Ethnobotanical Ledger • 1,061 Folios
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Regional Location Picker */}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("hn-open-location-prompt"))}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] hover:border-[#9E2A2B] dark:hover:border-[#D4B373] text-xs sm:text-[13px] font-mono uppercase tracking-[0.05em] text-[#9E2A2B] dark:text-[#D4B373] font-bold transition-colors cursor-pointer"
              title="Change region preference"
            >
              <MapPin className="w-3.5 h-3.5 text-[#9E2A2B] shrink-0" />
              <span className="truncate max-w-[80px] sm:max-w-[140px]">
                {userState ? userState : "Region"}
              </span>
            </button>

            {/* Archival text size controls (hidden on small phones to save space) */}
            <div className="hidden sm:flex items-center border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] bg-[#FAF6EE] dark:bg-[#1F1C18] text-xs divide-x divide-[#D8CBB8] dark:divide-[#383229]">
              <button
                type="button"
                onClick={() => changeTextSize("sm")}
                aria-label="Small font size"
                className={`px-2.5 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                  textSize === "sm" ? "bg-[#9E2A2B] text-[#FAF6EE]" : "hover:text-[#9E2A2B]"
                }`}
              >
                A−
              </button>
              <button
                type="button"
                onClick={() => changeTextSize("md")}
                aria-label="Default font size"
                className={`px-2.5 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                  textSize === "md" ? "bg-[#9E2A2B] text-[#FAF6EE]" : "hover:text-[#9E2A2B]"
                }`}
              >
                A
              </button>
              <button
                type="button"
                onClick={() => changeTextSize("lg")}
                aria-label="Large font size"
                className={`px-2.5 py-1 font-mono text-xs font-bold transition-all cursor-pointer ${
                  textSize === "lg" ? "bg-[#9E2A2B] text-[#FAF6EE]" : "hover:text-[#9E2A2B]"
                }`}
              >
                A+
              </button>
            </div>

            {/* Interactive Botanical Breeze toggle pill */}
            <button
              type="button"
              onClick={toggleBreeze}
              aria-label={`Toggle falling leaves animation: currently ${breezeEnabled ? "on" : "off"}`}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-[2px] border text-xs sm:text-[13px] font-mono uppercase tracking-[0.05em] font-bold transition-all shadow-2xs cursor-pointer ${
                breezeEnabled
                  ? "border-[#2D4A3E] bg-[#2D4A3E]/12 dark:bg-[#2D4A3E]/25 text-[#2D4A3E] dark:text-[#66BB58]"
                  : "border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] text-[#5C5346] opacity-75 hover:opacity-100"
              }`}
              title="Toggle interactive falling neem & tulsi botanical breeze"
            >
              <span>🍃</span>
              <span className="hidden sm:inline">Breeze:</span>
              <span>{breezeEnabled ? "On" : "Off"}</span>
            </button>

            {/* Language toggle */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label="Toggle language between English and Hindi"
              className="px-2.5 py-1.5 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] hover:border-[#9E2A2B] text-xs sm:text-[13px] font-mono uppercase tracking-[0.05em] font-bold transition-colors cursor-pointer"
            >
              {lang === "en" ? "हिन्दी" : "Eng"}
            </button>

            {/* Theme toggle */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="p-1.5 rounded-[2px] border border-[#D8CBB8] dark:border-[#383229] bg-[#FAF6EE] dark:bg-[#1F1C18] hover:border-[#B5945B] transition-colors cursor-pointer"
            >
              {theme === "light" ? (
                <Moon className="w-4 h-4 text-[#5C5346]" />
              ) : (
                <Sun className="w-4 h-4 text-[#D4B373]" />
              )}
            </button>
          </div>
        </div>

        {/* Main Ledger Branding Header */}
        <div className="py-3 sm:py-3.5 flex items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            {/* Heritage Diya Mark with Brass Hairline Frame */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-[3px] bg-[#FAF6EE] dark:bg-[#1F1C18] border-2 border-[#B5945B]/70 dark:border-[#B5945B]/60 flex items-center justify-center p-1.5 sm:p-2 shadow-[inset_0_1px_3px_rgba(181,148,91,0.2)] flex-shrink-0 group-hover:border-[#9E2A2B] transition-colors duration-200 relative">
              <DiyaIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#9E2A2B]" />
            </div>

            <div className="min-w-0">
              <div className="flex items-baseline gap-2 sm:gap-2.5 flex-wrap sm:flex-nowrap">
                <span className="font-rozha text-xl sm:text-2xl lg:text-[27px] font-bold text-[#1C1917] dark:text-[#F4EFE6] tracking-tight group-hover:text-[#9E2A2B] transition-colors whitespace-nowrap">
                  हमारे नुस्खे
                </span>
                <span className="font-serif text-sm sm:text-base lg:text-[17px] font-normal text-[#5C5346] dark:text-[#C7BDB0] group-hover:text-[#9E2A2B] transition-colors tracking-tight whitespace-nowrap">
                  / Hamare Nuskhe
                </span>
              </div>
              <p className="text-xs text-[#9E2A2B] dark:text-[#D4B373] font-serif italic flex items-center gap-1.5 mt-0.5 truncate">
                <span className="font-bold shrink-0">आयुर्वेदोऽमृतानाम्</span>
                <span className="opacity-40 shrink-0">•</span>
                <span className="text-[#5C5346] dark:text-[#C7BDB0] not-italic font-sans text-xs truncate font-medium">
                  {t.brandSubtitle}
                </span>
              </p>
            </div>
          </Link>

          {/* Desktop Only Archival Ledger Navigation */}
          <nav className="hidden lg:flex items-center border border-[#D8CBB8] dark:border-[#383229] rounded-[2px] bg-[#FAF6EE] dark:bg-[#1F1C18] divide-x divide-[#D8CBB8] dark:divide-[#383229] shadow-[0_1px_2px_rgba(45,38,30,0.03)] flex-shrink-0">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono uppercase tracking-[0.05em] transition-all relative whitespace-nowrap font-bold ${
                    isActive
                      ? "bg-[#9E2A2B] text-[#FAF6EE] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]"
                      : "text-[#5C5346] dark:text-[#C7BDB0] hover:text-[#9E2A2B] dark:hover:text-[#D4B373] hover:bg-[#FAF6EE]/80 dark:hover:bg-[#25221D]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#FAF6EE]" : "text-[#B5945B]"}`} />
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D99B26]" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>

    {/* Mobile & Tablet Bottom Navigation Bar (Screens < 1024px) - Outside sticky header to pin to viewport bottom */}
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAF6EE]/96 dark:bg-[#161412]/96 backdrop-blur-md border-t border-[#D8CBB8] dark:border-[#383229] px-2 py-2 flex items-center justify-around shadow-[0_-2px_10px_rgba(45,38,30,0.08)] safe-bottom"
    >
      {navLinks.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`flex flex-col items-center justify-center gap-1 py-1 px-1.5 min-w-[52px] rounded-[2px] transition-colors ${
              isActive
                ? "text-[#9E2A2B] dark:text-[#D4B373] font-bold"
                : "text-[#5C5346] dark:text-[#C7BDB0] hover:text-[#9E2A2B]"
            }`}
          >
            <Icon className="w-4.5 h-4.5" />
            <span className="font-mono text-[10px] sm:text-xs uppercase tracking-wider leading-tight text-center truncate max-w-[64px] sm:max-w-none font-semibold">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  </>
);
}

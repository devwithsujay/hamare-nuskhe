"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { SupportedLang, TRANSLATIONS, TranslationDict } from "./translations";

interface LanguageContextType {
  lang: SupportedLang;
  setLanguage: (lang: SupportedLang) => void;
  toggleLanguage: () => void;
  t: TranslationDict;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: TRANSLATIONS.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<SupportedLang>("en");

  useEffect(() => {
    // Read persisted language on mount
    const savedLang = localStorage.getItem("hn-lang") as SupportedLang | null;
    if (savedLang && TRANSLATIONS[savedLang]) {
      setLang(savedLang);
      document.documentElement.setAttribute("lang", savedLang);
    }

    // Listen to external language change events (e.g. from location prompt)
    const handleExternalChange = (e: any) => {
      if (e.detail?.lang && TRANSLATIONS[e.detail.lang as SupportedLang]) {
        setLang(e.detail.lang as SupportedLang);
        document.documentElement.setAttribute("lang", e.detail.lang);
      }
    };
    window.addEventListener("hn-language-changed", handleExternalChange);
    return () => window.removeEventListener("hn-language-changed", handleExternalChange);
  }, []);

  const setLanguage = (newLang: SupportedLang) => {
    if (!TRANSLATIONS[newLang]) return;
    setLang(newLang);
    localStorage.setItem("hn-lang", newLang);
    document.documentElement.setAttribute("lang", newLang);

    // Broadcast change
    window.dispatchEvent(
      new CustomEvent("hn-language-changed", {
        detail: { lang: newLang },
      })
    );
  };

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "hi" : "en";
    setLanguage(nextLang);
  };

  const currentDict = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, toggleLanguage, t: currentDict }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

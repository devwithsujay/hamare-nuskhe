import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Lora,
  Rozha_One,
  IBM_Plex_Mono,
  Noto_Serif_Devanagari,
  Playfair_Display,
  Inter,
} from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600"],
  display: "swap",
});

const rozhaOne = Rozha_One({
  subsets: ["latin", "devanagari"],
  variable: "--font-rozha",
  weight: ["400"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["400", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

import OfflineIndicator from "@/components/OfflineIndicator";
import LocationLanguagePrompt from "@/components/LocationLanguagePrompt";
import BotanicalBreeze from "@/components/BotanicalBreeze";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
  title: "हमारे नुस्खे / Hamare Nuskhe — Home remedies from across India",
  description:
    "A sourced, safety-first archive of traditional Indian home remedies (nuskhe). Recorded for cultural archiving, with botanical binomials, provenance, and safety contraindications.",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-text-size="md"
      suppressHydrationWarning
      className={`${cormorant.variable} ${lora.variable} ${rozhaOne.variable} ${ibmPlexMono.variable} ${playfair.variable} ${inter.variable} ${notoDevanagari.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("hn-theme")||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.setAttribute("data-theme",t);if(t==="dark"){document.documentElement.classList.add("dark");}else{document.documentElement.classList.remove("dark");}var s=localStorage.getItem("hn-text-size");if(s){document.documentElement.setAttribute("data-text-size",s);}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col selection:bg-[#D99B26]/20 selection:text-[#9E2A2B] bg-[#F4EFE6] dark:bg-[#161412] text-[#1C1917] dark:text-[#F4EFE6] transition-colors duration-200"
      >
        <LanguageProvider>
          <BotanicalBreeze />
          <OfflineIndicator />
          <LocationLanguagePrompt />
          {/* Accessible Skip Link */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1C1917] focus:text-[#FDFBF7] focus:ring-2 focus:ring-[#9C4129] text-sm"
          >
            Skip to main content
          </a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

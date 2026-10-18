"use client";

import React, { useState, useEffect } from "react";
import { WifiOff, CheckCircle2 } from "lucide-react";

export default function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const [swRegistered, setSwRegistered] = useState(false);

  useEffect(() => {
    // Check initial online status
    if (typeof window !== "undefined") {
      setIsOffline(!window.navigator.onLine);

      const handleOnline = () => setIsOffline(false);
      const handleOffline = () => setIsOffline(true);

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);

      // In development / localhost, proactively unregister service workers and purge caches
      // to ensure developers and testers always see fresh data and live HMR changes.
      const isLocalhost =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

      if (isLocalhost) {
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            for (const reg of registrations) {
              reg.unregister();
            }
          });
        }
        if ("caches" in window) {
          caches.keys().then((keys) => {
            for (const key of keys) {
              caches.delete(key);
            }
          });
        }
      } else if ("serviceWorker" in navigator) {
        // Register Service Worker in production
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => {
            setSwRegistered(true);
            reg.update(); // Check for sw updates
          })
          .catch((err) => console.warn("[SW] Registration error:", err));
      }

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  if (!isOffline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[#2B200E] border-b border-[#D97706] text-[#FDE68A] text-xs py-1.5 px-4 text-center sticky top-0 z-50 flex items-center justify-center gap-2 shadow-sm font-sans"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#F59E0B]" />
      <span>
        <strong>Offline Mode:</strong> Viewing archived local copy • ऑफ़लाइन (सहेजी गई प्रति सक्रिय)
      </span>
    </div>
  );
}

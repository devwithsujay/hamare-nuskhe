"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Flame } from "lucide-react";

export interface CookingModeModalProps {
  titleEn: string;
  steps: string[];
  isOpen: boolean;
  onClose: () => void;
}

export function CookingModeModal({ titleEn, steps, isOpen, onClose }: CookingModeModalProps): React.JSX.Element | null {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [wakeLockActive, setWakeLockActive] = useState<boolean>(false);

  // Screen Wake Lock to keep phone screen awake during kitchen preparation
  useEffect(() => {
    let wakeLockSentinel: any = null;

    async function requestWakeLock() {
      if (typeof navigator !== "undefined" && "wakeLock" in navigator && isOpen) {
        try {
          wakeLockSentinel = await (navigator as any).wakeLock.request("screen");
          setWakeLockActive(true);
          wakeLockSentinel.addEventListener("release", () => {
            setWakeLockActive(false);
          });
        } catch (err) {
          console.log("Wake Lock not acquired:", err);
        }
      }
    }

    if (isOpen) {
      requestWakeLock();
    }

    return () => {
      if (wakeLockSentinel) {
        wakeLockSentinel.release().catch(() => {});
      }
      setWakeLockActive(false);
    };
  }, [isOpen]);

  // Keyboard navigation: Left/Right arrows, Space, Escape to exit
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentStep((prev) => Math.max(0, prev - 1));
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, steps.length, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#121110]/95 backdrop-blur-2xl text-[#FDFBF7] flex flex-col justify-between p-6 sm:p-12 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#36332E]/60 pb-4 max-w-4xl mx-auto w-full">
        <div>
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#E07A5F]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#B8B2A7]">
              Step-by-Step Cooking Mode
            </span>
            {wakeLockActive && (
              <span className="text-[10px] bg-[#2D5A27]/40 text-[#5BA852] px-2.5 py-0.5 rounded-full border border-[#5BA852]/40 font-mono">
                Screen Awake
              </span>
            )}
          </div>
          <h2 className="font-serif text-lg sm:text-xl font-bold mt-1 text-[#F5F0E6]">
            {titleEn}
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] transition-colors"
          aria-label="Exit cooking mode"
        >
          <X className="w-5 h-5 text-[#B8B2A7]" />
        </button>
      </div>

      {/* Main Focus Step Area (Large 28px+ typography for kitchen reading from a distance) */}
      <div className="max-w-3xl mx-auto w-full my-auto py-10 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] font-mono text-xs uppercase text-[#E07A5F] tracking-wider mb-6">
          <span>Step {currentStep + 1} of {steps.length}</span>
        </div>

        <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#FDFBF7] leading-relaxed tracking-tight">
          {steps[currentStep]}
        </p>

        {/* Apple Segmented Progress Bar */}
        <div className="w-full bg-white/[0.08] h-2 rounded-full mt-10 overflow-hidden p-0.5">
          <div
            className="bg-gradient-to-r from-[#E07A5F] to-[#F59E0B] h-full rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Navigation Controls Bar */}
      <div className="flex items-center justify-between border-t border-[#36332E]/60 pt-6 max-w-4xl mx-auto w-full">
        <button
          type="button"
          onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-25 disabled:pointer-events-none transition-all text-sm font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Step</span>
        </button>

        <span className="text-xs font-mono text-[#B8B2A7]">
          {currentStep + 1} / {steps.length}
        </span>

        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#9C4129] to-[#C85232] text-white font-semibold rounded-full shadow-md hover:brightness-110 active:scale-95 transition-all text-sm"
          >
            <span>Next Step</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#2D5A27] text-white font-semibold rounded-full shadow-md hover:bg-[#386F30] active:scale-95 transition-all text-sm"
          >
            <span>Complete Folio</span>
          </button>
        )}
      </div>
    </div>
  );
}

export interface CookingModeTriggerProps {
  titleEn: string;
  steps: string[];
}

export function CookingModeTrigger({ titleEn, steps }: CookingModeTriggerProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-gradient-to-b from-[#FDFBF7] to-[#F5EFE3] dark:from-[#25221E] dark:to-[#1B1917] text-[#9C4129] dark:text-[#E07A5F] border border-[#DFCFAF] dark:border-[#3D372E] hover:border-[#9C4129] rounded-full shadow-xs hover:shadow-sm active:scale-95 transition-all"
        aria-label="Open step-by-step cooking mode"
      >
        <Flame className="w-3.5 h-3.5 text-[#9C4129] dark:text-[#E07A5F]" />
        <span>Step-by-Step Cooking Mode</span>
      </button>

      <CookingModeModal
        titleEn={titleEn}
        steps={steps}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}

export default CookingModeModal;

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BusinessIntelligence } from "@/app/api/phase0/extract/route";

const EXTRACTION_STEPS = [
  "Fetching your website...",
  "Analysing brand identity...",
  "Mapping your tech stack...",
  "Identifying marketing gaps...",
  "Building your business profile...",
];

interface Props {
  onComplete: (intelligence: BusinessIntelligence) => void;
  onSkip: () => void;
}

export function UrlIntake({ onComplete, onSkip }: Props) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<"idle" | "extracting" | "done" | "error">("idle");
  const [stepIndex, setStepIndex] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus("extracting");
    setStepIndex(0);

    // Cycle through progress messages while extracting
    const interval = setInterval(() => {
      setStepIndex((i) => Math.min(i + 1, EXTRACTION_STEPS.length - 1));
    }, 2500);

    try {
      const resp = await fetch("/api/phase0/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      clearInterval(interval);

      if (!resp.ok) throw new Error("Extraction failed");
      const data = await resp.json();
      setStatus("done");
      onComplete(data.intelligence as BusinessIntelligence);
    } catch {
      clearInterval(interval);
      setErrorMsg("Could not analyse this URL. You can still proceed with the consultation.");
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg text-center"
      >
        <h1 className="text-2xl font-semibold text-neutral-100 mb-2">
          Free Business Intelligence Report
        </h1>
        <p className="text-neutral-400 text-sm mb-8">
          Enter your website URL. We will analyse your brand, tech stack, and marketing gaps
          before your consultation — so the conversation skips the basics.
        </p>

        <AnimatePresence mode="wait">
          {status === "idle" || status === "error" ? (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="yourwebsite.com"
                  className="flex-1 bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3 text-neutral-100 placeholder-neutral-600 text-sm focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-3 bg-[var(--accent-blue)] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  Analyse
                </button>
              </div>

              {status === "error" && (
                <p className="text-amber-400 text-xs">{errorMsg}</p>
              )}

              <button
                type="button"
                onClick={onSkip}
                className="text-neutral-600 text-xs hover:text-neutral-400 transition-colors"
              >
                Skip — start the consultation directly
              </button>
            </motion.form>
          ) : (
            <motion.div
              key="extracting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Spinner */}
              <div className="flex justify-center">
                <motion.div
                  className="w-10 h-10 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Step label */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={stepIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="text-neutral-400 text-sm"
                >
                  {EXTRACTION_STEPS[stepIndex]}
                </motion.p>
              </AnimatePresence>

              {/* Step dots */}
              <div className="flex justify-center gap-2">
                {EXTRACTION_STEPS.map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i <= stepIndex ? "bg-[var(--accent-blue)]" : "bg-neutral-700"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

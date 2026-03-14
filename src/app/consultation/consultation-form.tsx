"use client";

import { useState } from "react";
import { RevealOnScroll } from "@/components/motion";

type Step = "intake" | "processing" | "result";

interface IntakeData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
}

interface ScopeResult {
  summary: string;
  deliverables: string[];
  complexity: "Low" | "Medium" | "High";
  estimatedWeeks: string;
  priceRange: string;
}

const projectTypes = [
  "AI Agent System",
  "Web Application",
  "Automation Pipeline",
  "E-commerce",
  "API Integration",
  "Other",
];

const timelines = [
  "1-2 weeks",
  "2-4 weeks",
  "1-2 months",
  "3+ months",
  "Flexible",
];

const budgets = [
  "Under $2,000",
  "$2,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000+",
  "Let's discuss",
];

export function ConsultationForm() {
  const [step, setStep] = useState<Step>("intake");
  const [form, setForm] = useState<IntakeData>({
    name: "",
    email: "",
    projectType: "",
    description: "",
    timeline: "",
    budget: "",
  });
  const [result, setResult] = useState<ScopeResult | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setError("");

    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Failed to process consultation");
      }

      const data = await res.json();
      setResult(data);
      setStep("result");
    } catch {
      setError("Something went wrong. Please try again or email craigdanielk@gmail.com directly.");
      setStep("intake");
    }
  };

  const update = (field: keyof IntakeData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isComplete =
    form.name && form.email && form.projectType && form.description && form.timeline;

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          Get a Quote
        </h1>
        <p className="text-lg text-neutral-400 mb-12 max-w-2xl">
          Describe what you need. AI analyses your requirements and produces a
          scope assessment with deliverables and pricing.
        </p>
      </RevealOnScroll>

      {step === "intake" && (
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 rounded-lg bg-red-950/30 border border-red-900 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Project Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update("projectType", type)}
                  className={`px-4 py-3 rounded-lg border text-sm text-left transition-colors ${
                    form.projectType === type
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow)] text-neutral-100"
                      : "border-[var(--border)] bg-[var(--surface-elevated)] text-neutral-400 hover:border-neutral-500"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              What do you need built?
            </label>
            <textarea
              required
              rows={5}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors resize-none"
              placeholder="Describe your project — what problem it solves, who uses it, key features..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Timeline
              </label>
              <div className="space-y-2">
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => update("timeline", t)}
                    className={`block w-full px-4 py-2.5 rounded-lg border text-sm text-left transition-colors ${
                      form.timeline === t
                        ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow)] text-neutral-100"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Budget (optional)
              </label>
              <div className="space-y-2">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => update("budget", b)}
                    className={`block w-full px-4 py-2.5 rounded-lg border text-sm text-left transition-colors ${
                      form.budget === b
                        ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow)] text-neutral-100"
                        : "border-[var(--border)] bg-[var(--surface-elevated)] text-neutral-400 hover:border-neutral-500"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isComplete}
            className="w-full py-3 text-base font-medium rounded-lg bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Analyse & Get Quote
          </button>
        </form>
      )}

      {step === "processing" && (
        <div className="text-center py-20">
          <div className="inline-block w-8 h-8 border-2 border-[var(--accent-blue)] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-lg text-neutral-300">Analysing your requirements...</p>
          <p className="text-sm text-neutral-500 mt-2">This usually takes 10-15 seconds.</p>
        </div>
      )}

      {step === "result" && result && (
        <div className="space-y-8">
          <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-neutral-100">Scope Assessment</h2>
              <span className={`text-xs font-mono px-3 py-1 rounded ${
                result.complexity === "Low"
                  ? "bg-green-950/30 text-green-400 border border-green-800"
                  : result.complexity === "Medium"
                  ? "bg-yellow-950/30 text-yellow-400 border border-yellow-800"
                  : "bg-red-950/30 text-red-400 border border-red-800"
              }`}>
                {result.complexity} Complexity
              </span>
            </div>
            <p className="text-base text-neutral-300 leading-relaxed">{result.summary}</p>
          </div>

          <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
            <h3 className="text-xl font-semibold text-neutral-100 mb-4">Deliverables</h3>
            <ul className="space-y-2">
              {result.deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-neutral-300">
                  <span className="text-[var(--accent-green)] mt-1">&#x2713;</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
              <p className="text-sm text-neutral-500 mb-1">Estimated Timeline</p>
              <p className="text-2xl font-bold text-neutral-100">{result.estimatedWeeks}</p>
            </div>
            <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
              <p className="text-sm text-neutral-500 mb-1">Price Range</p>
              <p className="text-2xl font-bold text-neutral-100">{result.priceRange}</p>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-[var(--accent-blue-glow)] border border-[var(--accent-blue)]/30 text-center">
            <p className="text-base text-neutral-200 mb-2">
              Want to proceed? Let&apos;s discuss the details.
            </p>
            <a
              href={`mailto:craigdanielk@gmail.com?subject=Consultation: ${form.projectType}&body=Hi Craig,%0A%0A${encodeURIComponent(form.description)}`}
              className="inline-block mt-2 px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
            >
              Email Craig
            </a>
          </div>

          <button
            onClick={() => {
              setStep("intake");
              setResult(null);
              setForm({ name: "", email: "", projectType: "", description: "", timeline: "", budget: "" });
            }}
            className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            &larr; Start a new consultation
          </button>
        </div>
      )}
    </div>
  );
}

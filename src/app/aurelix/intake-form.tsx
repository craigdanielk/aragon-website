"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RevealOnScroll } from "@/components/motion";

const INDUSTRY_PRESETS = [
  { value: "ecommerce", label: "E-commerce (General)" },
  { value: "sporting-goods", label: "Sporting Goods" },
  { value: "health-wellness", label: "Health & Wellness" },
  { value: "fashion-apparel", label: "Fashion & Apparel" },
  { value: "beauty-cosmetics", label: "Beauty & Cosmetics" },
  { value: "home-lifestyle", label: "Home & Lifestyle" },
  { value: "artisan-food", label: "Artisan Food" },
  { value: "jewelry-watches", label: "Jewelry & Watches" },
  { value: "outdoor-adventure", label: "Outdoor & Adventure" },
  { value: "pet-products", label: "Pet Products" },
  { value: "sports-fitness", label: "Sports & Fitness" },
  { value: "saas", label: "SaaS" },
  { value: "professional-services", label: "Professional Services" },
  { value: "real-estate", label: "Real Estate" },
  { value: "restaurants-cafes", label: "Restaurants & Cafes" },
  { value: "hotels-hospitality", label: "Hotels & Hospitality" },
  { value: "education", label: "Education" },
  { value: "medical-dental", label: "Medical & Dental" },
  { value: "creative-studios", label: "Creative Studios" },
  { value: "construction-trades", label: "Construction & Trades" },
  { value: "nonprofits-social", label: "Nonprofits & Social" },
  { value: "events-venues", label: "Events & Venues" },
];

const FEATURES = [
  { id: "ecommerce", label: "E-commerce / Shop" },
  { id: "blog", label: "Blog" },
  { id: "contact-form", label: "Contact Form" },
  { id: "auth", label: "Authentication / Login" },
  { id: "admin-panel", label: "Admin Panel" },
  { id: "product-catalog", label: "Product Catalog" },
];

interface FormData {
  target_url: string;
  api_key: string;
  admin_login: string;
  industry_preset: string;
  design_references: string;
  required_features: string[];
  nice_to_have: string;
  client_name: string;
  client_email: string;
}

export function IntakeForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormData>({
    target_url: "",
    api_key: "",
    admin_login: "",
    industry_preset: "ecommerce",
    design_references: "",
    required_features: [],
    nice_to_have: "",
    client_name: "",
    client_email: "",
  });

  const update = (field: keyof FormData, value: string | string[]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (featureId: string) => {
    setForm((prev) => ({
      ...prev,
      required_features: prev.required_features.includes(featureId)
        ? prev.required_features.filter((f) => f !== featureId)
        : [...prev.required_features, featureId],
    }));
  };

  const isComplete = form.target_url && form.client_name && form.client_email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Parse design references from newline/comma-separated text
      const designRefs = form.design_references
        .split(/[,\n]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const res = await fetch("/api/aurelix/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          design_references: designRefs,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      const data = await res.json();
      router.push(`/aurelix/status?id=${data.brief_id}`);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] text-neutral-100 text-base focus:outline-none focus:border-[var(--accent-blue)] transition-colors";
  const labelClass = "block text-sm font-medium text-neutral-300 mb-2";
  const optionalBadge = (
    <span className="text-xs text-neutral-500 font-normal ml-2">optional</span>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <RevealOnScroll>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
          Aurelix Web Builder
        </h1>
        <p className="text-lg text-neutral-400 mb-12 max-w-2xl">
          Submit your site details and our AI pipeline will generate a custom
          website tailored to your industry. You&apos;ll get a live preview URL
          when it&apos;s ready.
        </p>
      </RevealOnScroll>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && (
          <div className="p-4 rounded-lg bg-red-950/30 border border-red-900 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Client Info */}
        <fieldset className="space-y-6">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Your Details
          </legend>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={form.client_name}
                onChange={(e) => update("client_name", e.target.value)}
                className={inputClass}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className={labelClass}>
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={form.client_email}
                onChange={(e) => update("client_email", e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </fieldset>

        {/* Target Site */}
        <fieldset className="space-y-6">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Target Site
          </legend>
          <div>
            <label className={labelClass}>
              Target URL <span className="text-red-400">*</span>
            </label>
            <input
              type="url"
              required
              value={form.target_url}
              onChange={(e) => update("target_url", e.target.value)}
              className={inputClass}
              placeholder="https://your-store.myshopify.com"
            />
            <p className="text-xs text-neutral-500 mt-1">
              The Shopify store or website URL to build from
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>
                API Key {optionalBadge}
              </label>
              <input
                type="text"
                value={form.api_key}
                onChange={(e) => update("api_key", e.target.value)}
                className={inputClass}
                placeholder="shpat_xxxxx"
              />
            </div>
            <div>
              <label className={labelClass}>
                Admin Login URL {optionalBadge}
              </label>
              <input
                type="text"
                value={form.admin_login}
                onChange={(e) => update("admin_login", e.target.value)}
                className={inputClass}
                placeholder="https://store.myshopify.com/admin"
              />
            </div>
          </div>
        </fieldset>

        {/* Industry Preset */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Industry Preset
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {INDUSTRY_PRESETS.map((preset) => (
              <button
                key={preset.value}
                type="button"
                onClick={() => update("industry_preset", preset.value)}
                className={`px-4 py-3 rounded-lg border text-sm text-left transition-colors ${
                  form.industry_preset === preset.value
                    ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow)] text-neutral-100"
                    : "border-[var(--border)] bg-[var(--surface-elevated)] text-neutral-400 hover:border-neutral-500"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Design References */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Design References {optionalBadge}
          </legend>
          <textarea
            rows={3}
            value={form.design_references}
            onChange={(e) => update("design_references", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Paste URLs of sites you like, one per line&#10;https://example-store.com&#10;https://another-reference.com"
          />
          <p className="text-xs text-neutral-500">
            URLs of websites whose design or layout you admire
          </p>
        </fieldset>

        {/* Required Features */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Required Features
          </legend>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {FEATURES.map((feature) => {
              const selected = form.required_features.includes(feature.id);
              return (
                <button
                  key={feature.id}
                  type="button"
                  onClick={() => toggleFeature(feature.id)}
                  className={`px-4 py-3 rounded-lg border text-sm text-left transition-colors flex items-center gap-3 ${
                    selected
                      ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow)] text-neutral-100"
                      : "border-[var(--border)] bg-[var(--surface-elevated)] text-neutral-400 hover:border-neutral-500"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded border flex items-center justify-center text-xs ${
                      selected
                        ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white"
                        : "border-neutral-600"
                    }`}
                  >
                    {selected ? "\u2713" : ""}
                  </span>
                  {feature.label}
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Nice to Have */}
        <fieldset className="space-y-4">
          <legend className="text-lg font-semibold text-neutral-200 mb-4">
            Nice to Have {optionalBadge}
          </legend>
          <textarea
            rows={3}
            value={form.nice_to_have}
            onChange={(e) => update("nice_to_have", e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder="Any additional features, integrations, or notes..."
          />
        </fieldset>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isComplete || submitting}
          className="w-full py-3 text-base font-medium rounded-lg bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-3">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit Build Request"
          )}
        </button>
      </form>
    </div>
  );
}

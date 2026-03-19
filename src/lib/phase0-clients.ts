import type { BusinessIntelligence } from "@/app/api/phase0/extract/route";

export interface Phase0Client {
  domain: string;
  intelligence: BusinessIntelligence & {
    compliance?: string;
    target_personas?: string[];
  };
}

export const PHASE0_CLIENTS: Phase0Client[] = [
  {
    domain: "trenddigital.io",
    intelligence: {
      url: "https://trenddigital.io",
      brand: {
        name: "Trend Digital",
        tagline: "Regulated crypto-to-fiat infrastructure for institutional operators",
        colors: [],
        fonts: [],
        voice: "institutional, credible, precise — never salesy",
        socialLinks: {},
      },
      business: {
        industry: "Regulated crypto-to-fiat infrastructure",
        productsServices: [
          "OTC desk",
          "Payment gateway API",
          "Stablecoin settlement",
          "Fiat payouts",
        ],
        targetAudience: "Payments CFO, PSP/Aggregator CTO, High-Risk Operator",
        pricingModel: "custom",
        companySize: "medium",
        location: "Global",
      },
      techStack: {
        platform: "Custom",
        analytics: [],
        marketing: [],
        payments: [],
        hosting: "Unknown",
      },
      seo: {
        title: "Trend Digital — Regulated Crypto-to-Fiat Infrastructure",
        description:
          "Institutional crypto-to-fiat rails — OTC desk, payment gateway API, stablecoin settlement, and fiat payouts for regulated operators.",
        hasBlog: false,
        hasEmailCapture: false,
        hasSocialProof: false,
        primaryCta: "Get in touch",
        gaps: [],
      },
      competitors: [],
      summary:
        "Trend Digital provides regulated crypto-to-fiat infrastructure for institutional clients including an OTC desk, payment gateway API, stablecoin settlement rails, and fiat payout services. The company operates under AFSL (execution-only, no investment advice) and holds MSB licence C100000577. Primary buyers are Payments CFOs, PSP/Aggregator CTOs, and High-Risk Operators requiring compliant settlement infrastructure.",
      compliance:
        "AFSL execution-only — no investment advice. MSB C100000577. All communications must reflect compliance-grade positioning.",
      target_personas: [
        "Payments CFO",
        "PSP/Aggregator CTO",
        "High-Risk Operator",
      ],
    },
  },
];

export function findClientByDomain(input: string): Phase0Client | undefined {
  const normalised = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  return PHASE0_CLIENTS.find((c) => normalised === c.domain || normalised.endsWith(`.${c.domain}`));
}

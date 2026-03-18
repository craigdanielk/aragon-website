import { NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export interface BusinessIntelligence {
  url: string;
  brand: {
    name: string;
    tagline: string;
    colors: string[];
    fonts: string[];
    voice: string;
    socialLinks: Record<string, string>;
  };
  business: {
    industry: string;
    productsServices: string[];
    targetAudience: string;
    pricingModel: string;
    companySize: string;
    location: string;
  };
  techStack: {
    platform: string;
    analytics: string[];
    marketing: string[];
    payments: string[];
    hosting: string;
  };
  seo: {
    title: string;
    description: string;
    hasBlog: boolean;
    hasEmailCapture: boolean;
    hasSocialProof: boolean;
    primaryCta: string;
    gaps: string[];
  };
  competitors: Array<{
    name: string;
    positioning: string;
  }>;
  summary: string;
}

function extractMeta(html: string, tag: string, attr: string = "content"): string {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${tag}["'][^>]+${attr}=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+${attr}=["']([^"']+)["'][^>]+name=["']${tag}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return "";
}

function extractOg(html: string, property: string): string {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']og:${property}["'][^>]+content=["']([^"']+)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:${property}["']`, "i"),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1];
  }
  return "";
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim() : "";
}

function extractH1(html: string): string {
  const m = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
  return m ? m[1].trim() : "";
}

function detectSocialLinks(html: string): Record<string, string> {
  const links: Record<string, string> = {};
  const patterns: Record<string, RegExp> = {
    instagram: /href=["'](https?:\/\/(?:www\.)?instagram\.com\/[^"']+)["']/i,
    linkedin: /href=["'](https?:\/\/(?:www\.)?linkedin\.com\/[^"']+)["']/i,
    twitter: /href=["'](https?:\/\/(?:www\.)?(?:twitter|x)\.com\/[^"']+)["']/i,
    facebook: /href=["'](https?:\/\/(?:www\.)?facebook\.com\/[^"']+)["']/i,
    youtube: /href=["'](https?:\/\/(?:www\.)?youtube\.com\/[^"']+)["']/i,
  };
  for (const [platform, re] of Object.entries(patterns)) {
    const m = html.match(re);
    if (m) links[platform] = m[1];
  }
  return links;
}

function detectTechStack(html: string): BusinessIntelligence["techStack"] {
  const lower = html.toLowerCase();
  const platform =
    lower.includes("shopify") ? "Shopify" :
    lower.includes("wordpress") || lower.includes("wp-content") ? "WordPress" :
    lower.includes("webflow") ? "Webflow" :
    lower.includes("squarespace") ? "Squarespace" :
    lower.includes("wix") ? "Wix" :
    lower.includes("next") && lower.includes("vercel") ? "Next.js / Vercel" :
    lower.includes("next") ? "Next.js" :
    "Custom";

  const analytics = [
    lower.includes("googletagmanager") || lower.includes("gtag") ? "Google Analytics" : null,
    lower.includes("hotjar") ? "Hotjar" : null,
    lower.includes("mixpanel") ? "Mixpanel" : null,
    lower.includes("segment") ? "Segment" : null,
  ].filter(Boolean) as string[];

  const marketing = [
    lower.includes("klaviyo") ? "Klaviyo" : null,
    lower.includes("mailchimp") ? "Mailchimp" : null,
    lower.includes("hubspot") ? "HubSpot" : null,
    lower.includes("intercom") ? "Intercom" : null,
    lower.includes("drift") ? "Drift" : null,
    lower.includes("zendesk") ? "Zendesk" : null,
  ].filter(Boolean) as string[];

  const payments = [
    lower.includes("stripe") ? "Stripe" : null,
    lower.includes("paypal") ? "PayPal" : null,
    lower.includes("afterpay") ? "Afterpay" : null,
    lower.includes("klarna") ? "Klarna" : null,
  ].filter(Boolean) as string[];

  const hosting =
    lower.includes("vercel") ? "Vercel" :
    lower.includes("cloudflare") ? "Cloudflare" :
    lower.includes("netlify") ? "Netlify" :
    lower.includes("amazonaws") || lower.includes("aws") ? "AWS" :
    "Unknown";

  return { platform, analytics, marketing, payments, hosting };
}

async function analyzeWithAnthropic(
  htmlSnippet: string,
  meta: { title: string; description: string; h1: string; url: string }
): Promise<Omit<BusinessIntelligence, "url" | "techStack" | "seo">> {
  if (!ANTHROPIC_API_KEY) throw new Error("No Anthropic API key");

  const prompt = `You are a business intelligence analyst. Analyze this website's HTML and metadata to extract structured information.

URL: ${meta.url}
Title: ${meta.title}
Meta Description: ${meta.description}
H1: ${meta.h1}

HTML excerpt (first 8000 chars):
${htmlSnippet.slice(0, 8000)}

Return a JSON object with this exact structure (no markdown, just raw JSON):
{
  "brand": {
    "name": "company name",
    "tagline": "value proposition from hero section",
    "colors": ["primary color description"],
    "fonts": ["font families detected"],
    "voice": "formal/casual/technical/friendly description"
  },
  "business": {
    "industry": "industry classification",
    "productsServices": ["product or service 1", "product or service 2"],
    "targetAudience": "description of who they serve",
    "pricingModel": "free/subscription/per-unit/custom/unknown",
    "companySize": "startup/small/medium/enterprise/unknown",
    "location": "location or 'Global' or 'Unknown'"
  },
  "competitors": [
    {"name": "Competitor 1", "positioning": "how they differ"},
    {"name": "Competitor 2", "positioning": "how they differ"},
    {"name": "Competitor 3", "positioning": "how they differ"}
  ],
  "summary": "2-3 sentence business summary for use in consultation context"
}`;

  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!resp.ok) throw new Error(`Anthropic API error: ${resp.status}`);
  const data = await resp.json();
  const text = data.content?.[0]?.text ?? "{}";

  try {
    return JSON.parse(text.replace(/^```json\n?|\n?```$/g, "").trim());
  } catch {
    return {
      brand: { name: meta.title, tagline: meta.description, colors: [], fonts: [], voice: "unknown", socialLinks: {} },
      business: { industry: "Unknown", productsServices: [], targetAudience: "Unknown", pricingModel: "unknown", companySize: "unknown", location: "Unknown" },
      competitors: [],
      summary: `Business at ${meta.url}: ${meta.description}`,
    };
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawUrl: string = body.url ?? "";

    if (!rawUrl) {
      return NextResponse.json({ error: "URL required" }, { status: 400 });
    }

    // Normalise URL
    const url = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;

    // Fetch HTML with timeout
    let html = "";
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const resp = await fetch(url, {
        signal: controller.signal,
        headers: { "User-Agent": "Mozilla/5.0 (compatible; ARAGONBot/1.0)" },
      });
      clearTimeout(timeout);
      html = await resp.text();
    } catch {
      // Graceful fallback — still attempt LLM analysis with just the URL
      html = "";
    }

    const meta = {
      url,
      title: extractTitle(html) || extractOg(html, "title") || new URL(url).hostname,
      description: extractMeta(html, "description") || extractOg(html, "description") || "",
      h1: extractH1(html),
    };

    const socialLinks = detectSocialLinks(html);
    const techStack = detectTechStack(html);

    const hasEmailCapture = /input[^>]+type=["']email["']/i.test(html);
    const hasBlog = /href=["'][^"']*\/(blog|articles|posts|journal|news)/i.test(html);
    const hasSocialProof = /(testimonial|review|trust|★|rating)/i.test(html);
    const ctaMatch = html.match(/<(?:a|button)[^>]+>([^<]{5,40})<\/(?:a|button)>/i);
    const primaryCta = ctaMatch ? ctaMatch[1].trim() : "";

    const seoGaps: string[] = [];
    if (!meta.description) seoGaps.push("No meta description");
    if (!hasEmailCapture) seoGaps.push("No email capture detected");
    if (!hasBlog) seoGaps.push("No blog or content section detected");
    if (!hasSocialProof) seoGaps.push("No social proof detected");

    const seo = {
      title: meta.title,
      description: meta.description,
      hasBlog,
      hasEmailCapture,
      hasSocialProof,
      primaryCta,
      gaps: seoGaps,
    };

    // LLM analysis
    let llmData: Omit<BusinessIntelligence, "url" | "techStack" | "seo">;
    try {
      llmData = await analyzeWithAnthropic(html, meta);
    } catch {
      llmData = {
        brand: { name: meta.title, tagline: meta.description, colors: [], fonts: [], voice: "unknown", socialLinks: {} },
        business: { industry: "Unknown", productsServices: [], targetAudience: "Unknown", pricingModel: "unknown", companySize: "unknown", location: "Unknown" },
        competitors: [],
        summary: `Business at ${url}`,
      };
    }

    const intelligence: BusinessIntelligence = {
      url,
      brand: { ...llmData.brand, socialLinks },
      business: llmData.business,
      techStack,
      seo,
      competitors: llmData.competitors ?? [],
      summary: llmData.summary ?? "",
    };

    return NextResponse.json({ intelligence });
  } catch (err) {
    console.error("Extract error:", err);
    return NextResponse.json({ error: "Extraction failed" }, { status: 500 });
  }
}

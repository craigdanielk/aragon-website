import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Server-side only: cost multiplier for pricing (never exposed to client)
const PRICING_MULTIPLIER = 3;

// Base hourly rate in USD
const BASE_HOURLY_RATE = 50;

interface IntakeData {
  name: string;
  email: string;
  projectType: string;
  description: string;
  timeline: string;
  budget: string;
}

export async function POST(request: Request) {
  try {
    const body: IntakeData = await request.json();

    if (!body.name || !body.email || !body.projectType || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      // Fallback: generate a reasonable scope without AI
      const fallback = generateFallbackScope(body);
      await persistConsultation(body, fallback);
      return NextResponse.json(fallback);
    }

    const prompt = `You are a technical project scoping assistant. Analyse the following project request and provide a structured scope assessment.

Project Type: ${body.projectType}
Description: ${body.description}
Timeline: ${body.timeline}
Budget: ${body.budget || "Not specified"}

Respond with ONLY valid JSON in this exact format (no markdown, no code blocks):
{
  "summary": "2-3 sentence summary of what will be built and the approach",
  "deliverables": ["deliverable 1", "deliverable 2", "deliverable 3", "deliverable 4"],
  "complexity": "Low" | "Medium" | "High",
  "estimatedHours": number (total hours estimate)
}

Be realistic and specific. Base estimates on actual development work, not AI hype.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      console.error("Anthropic API error:", response.status);
      const fallback = generateFallbackScope(body);
      await persistConsultation(body, fallback);
      return NextResponse.json(fallback);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text;

    if (!text) {
      const fallback = generateFallbackScope(body);
      await persistConsultation(body, fallback);
      return NextResponse.json(fallback);
    }

    const parsed = JSON.parse(text);
    const hourlyRate = BASE_HOURLY_RATE * PRICING_MULTIPLIER;
    const hours = parsed.estimatedHours || 40;
    const minPrice = Math.round(hours * hourlyRate * 0.8);
    const maxPrice = Math.round(hours * hourlyRate * 1.2);

    const result = {
      summary: parsed.summary,
      deliverables: parsed.deliverables,
      complexity: parsed.complexity,
      estimatedWeeks: `${Math.ceil(hours / 40)}-${Math.ceil(hours / 30)} weeks`,
      priceRange: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`,
    };

    // Persist to Supabase (non-blocking — don't fail the response if DB is down)
    await persistConsultation(body, result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

function generateFallbackScope(body: IntakeData) {
  const complexityMap: Record<string, "Low" | "Medium" | "High"> = {
    "AI Agent System": "High",
    "Web Application": "Medium",
    "Automation Pipeline": "Medium",
    "E-commerce": "Medium",
    "API Integration": "Low",
    Other: "Medium",
  };

  const hoursMap: Record<string, number> = {
    "AI Agent System": 80,
    "Web Application": 60,
    "Automation Pipeline": 50,
    "E-commerce": 70,
    "API Integration": 30,
    Other: 50,
  };

  const complexity = complexityMap[body.projectType] || "Medium";
  const hours = hoursMap[body.projectType] || 50;
  const hourlyRate = BASE_HOURLY_RATE * PRICING_MULTIPLIER;
  const minPrice = Math.round(hours * hourlyRate * 0.8);
  const maxPrice = Math.round(hours * hourlyRate * 1.2);

  return {
    summary: `A ${complexity.toLowerCase()}-complexity ${body.projectType.toLowerCase()} project. Based on the description provided, this involves core feature development, testing, and deployment.`,
    deliverables: [
      "Requirements specification and architecture plan",
      "Core feature implementation with tests",
      "Deployment to production environment",
      "Documentation and handoff",
    ],
    complexity,
    estimatedWeeks: `${Math.ceil(hours / 40)}-${Math.ceil(hours / 30)} weeks`,
    priceRange: `$${minPrice.toLocaleString()} - $${maxPrice.toLocaleString()}`,
  };
}

async function persistConsultation(
  body: IntakeData,
  result: { summary: string; deliverables: string[]; complexity: string; estimatedWeeks: string; priceRange: string }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.log("Consultation intake (no Supabase):", {
        email: body.email,
        name: body.name,
        projectType: body.projectType,
      });
      return;
    }

    const { error } = await supabase.from("phase0_intakes").insert({
      business_name: body.name,
      contact_email: body.email,
      conversation_history: [
        {
          role: "user",
          content: `Project Type: ${body.projectType}\nDescription: ${body.description}\nTimeline: ${body.timeline}\nBudget: ${body.budget || "Not specified"}`,
        },
        {
          role: "assistant",
          content: `Summary: ${result.summary}\nDeliverables: ${result.deliverables.join(", ")}\nComplexity: ${result.complexity}\nEstimated: ${result.estimatedWeeks}\nPrice: ${result.priceRange}`,
        },
      ],
      proposal: result,
      status: "new",
    });

    if (error) {
      console.error("Failed to persist consultation:", error);
    }
  } catch (err) {
    console.error("Consultation persistence error:", err);
  }
}

import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.target_url) {
      return NextResponse.json(
        { error: "target_url is required" },
        { status: 400 }
      );
    }

    if (!body.client_name || !body.client_email) {
      return NextResponse.json(
        { error: "client_name and client_email are required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json(
        { error: "Database unavailable" },
        { status: 503 }
      );
    }

    const briefName = `BRIEF::aurelix-intake::${new Date().toISOString().slice(0, 10)}::${body.client_name.toLowerCase().replace(/\s+/g, "-")}`;

    const payload = {
      target_url: body.target_url,
      api_key: body.api_key || null,
      admin_login: body.admin_login || null,
      industry_preset: body.industry_preset || "ecommerce",
      design_references: body.design_references || [],
      required_features: body.required_features || [],
      nice_to_have: body.nice_to_have || "",
      client_name: body.client_name,
      client_email: body.client_email,
    };

    const briefData = {
      name: briefName,
      priority: "P1",
      status: "QUEUED",
      triggered_by: "aurelix-intake-ui",
      blocked_by: [],
      summary: `Aurelix web build for ${body.client_name} — ${body.industry_preset || "ecommerce"} preset, target: ${body.target_url}`,
      payload,
    };

    const { data, error } = await supabase
      .from("briefs")
      .insert(briefData)
      .select("id, name, status")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to submit intake" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      brief_id: data.id,
      brief_name: data.name,
      status: data.status,
    });
  } catch (error) {
    console.error("Aurelix submit error:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}

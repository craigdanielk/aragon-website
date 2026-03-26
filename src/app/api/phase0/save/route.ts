import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

interface SaveRequest {
  businessName: string;
  contactEmail: string;
  conversationHistory: Array<{ role: string; content: string }>;
  apqcMap: Record<string, unknown> | null;
  gaps: Record<string, unknown> | null;
  proposal: Record<string, unknown> | null;
}

export async function POST(request: Request) {
  try {
    const body: SaveRequest = await request.json();

    if (!body.contactEmail || !body.conversationHistory) {
      return NextResponse.json(
        { error: "Email and conversation history required" },
        { status: 400 }
      );
    }

    const supabase = getSupabaseClient();

    if (!supabase) {
      // If Supabase is not configured, log and return success anyway
      console.log("Phase0 intake (no Supabase):", {
        businessName: body.businessName,
        contactEmail: body.contactEmail,
        messageCount: body.conversationHistory.length,
      });
      return NextResponse.json({ saved: true, id: null });
    }

    const { data, error } = await supabase
      .from("phase0_intakes")
      .insert({
        business_name: body.businessName || null,
        contact_email: body.contactEmail,
        conversation_history: body.conversationHistory,
        apqc_map: body.apqcMap || null,
        gaps: body.gaps || null,
        proposal: body.proposal || null,
        status: "new",
        updated_at: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: "Failed to save intake" },
        { status: 500 }
      );
    }

    // Send notification email to Craig (simple fetch to a webhook or log)
    console.log(
      `[Phase0 Notification] New intake from ${body.contactEmail} — ${body.businessName || "Unknown business"}`
    );

    return NextResponse.json({ saved: true, id: data.id });
  } catch (error) {
    console.error("Phase0 save error:", error);
    return NextResponse.json(
      { error: "Failed to save" },
      { status: 500 }
    );
  }
}

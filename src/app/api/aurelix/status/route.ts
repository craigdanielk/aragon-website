import { NextRequest, NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const briefId = request.nextUrl.searchParams.get("id");

    if (!briefId) {
      return NextResponse.json(
        { error: "Missing brief id parameter" },
        { status: 400 }
      );
    }

    const supabase = getPublicSupabaseClient();

    const { data, error } = await supabase
      .from("briefs")
      .select("id, name, status, summary, payload, completed_at")
      .eq("id", briefId)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Brief not found" },
        { status: 404 }
      );
    }

    const response: Record<string, unknown> = {
      id: data.id,
      name: data.name,
      status: data.status,
      summary: data.summary,
    };

    // Include preview URL if completed and available in payload
    if (data.status === "COMPLETED" && data.payload) {
      const payload = typeof data.payload === "string"
        ? JSON.parse(data.payload)
        : data.payload;
      response.preview_url = payload?.preview_url || payload?.deployed_url || null;
      response.completed_at = data.completed_at;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("Aurelix status error:", error);
    return NextResponse.json(
      { error: "Failed to fetch status" },
      { status: 500 }
    );
  }
}

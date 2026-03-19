import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getPublicSupabaseClient();

    const { data, error } = await supabase
      .from("briefs")
      .select("name, priority, status, summary, completed_at")
      .eq("status", "COMPLETED")
      .order("completed_at", { ascending: false })
      .limit(20);

    if (error) {
      throw error;
    }

    return NextResponse.json({ briefs: data ?? [] });
  } catch (error) {
    console.error("Briefs API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch briefs" },
      { status: 500 }
    );
  }
}

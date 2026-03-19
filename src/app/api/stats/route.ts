import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getPublicSupabaseClient();

    const [completedRes, failedRes, artifactsRes, agentsRes] =
      await Promise.all([
        supabase
          .from("briefs")
          .select("*", { count: "exact", head: true })
          .eq("status", "COMPLETED"),
        supabase
          .from("briefs")
          .select("*", { count: "exact", head: true })
          .eq("status", "FAILED"),
        supabase
          .from("artifacts")
          .select("*", { count: "exact", head: true }),
        supabase.from("artifacts").select("agent"),
      ]);

    const completedBriefs = completedRes.count ?? 0;
    const failedBriefs = failedRes.count ?? 0;
    const totalArtifacts = artifactsRes.count ?? 0;

    const total = completedBriefs + failedBriefs;
    const successRate = total > 0 ? Math.round((completedBriefs / total) * 100) : 0;

    const uniqueAgents = new Set(
      (agentsRes.data ?? []).map((row) => row.agent)
    );
    const activeAgents = uniqueAgents.size;

    return NextResponse.json({
      completedBriefs,
      totalArtifacts,
      successRate,
      activeAgents,
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}

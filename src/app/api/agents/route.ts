import { NextResponse } from "next/server";
import { getPublicSupabaseClient } from "@/lib/supabase-public";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = getPublicSupabaseClient();

    const { data, error } = await supabase
      .from("artifacts")
      .select("agent, created_at");

    if (error) {
      throw error;
    }

    // Group by agent: count artifacts and find last active time
    const agentMap = new Map<
      string,
      { count: number; lastActive: string }
    >();

    for (const row of data ?? []) {
      const existing = agentMap.get(row.agent);
      if (existing) {
        existing.count += 1;
        if (row.created_at > existing.lastActive) {
          existing.lastActive = row.created_at;
        }
      } else {
        agentMap.set(row.agent, {
          count: 1,
          lastActive: row.created_at,
        });
      }
    }

    const agents = Array.from(agentMap.entries())
      .map(([agent, info]) => ({
        agent,
        artifactCount: info.count,
        lastActive: info.lastActive,
      }))
      .sort((a, b) => b.artifactCount - a.artifactCount);

    return NextResponse.json({ agents });
  } catch (error) {
    console.error("Agents API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch agents" },
      { status: 500 }
    );
  }
}

"use client";

import { useEffect, useState } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase-public";
import type { Workflow } from "@/lib/workflows";

interface WorkflowStats {
  totalRuns: number;
  successRate: number;
  avgExecutionTime: string;
  lastRun: string;
  totalArtifacts: number;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

async function fetchWorkflowStats(workflow: Workflow): Promise<WorkflowStats> {
  const supabase = getPublicSupabaseClient();
  const agentNames = workflow.agents.map((a) => a.name);

  try {
    // Fetch briefs matching the workflow pattern
    const { data: briefs } = await supabase
      .from("briefs")
      .select("id, status, created_at, completed_at")
      .ilike("name", `%${workflow.briefPattern}%`);

    // Fetch artifacts from workflow agents
    const { data: artifacts } = await supabase
      .from("artifacts")
      .select("id")
      .in("agent_name", agentNames);

    const completedBriefs = briefs?.filter((b) => b.status === "COMPLETED") ?? [];
    const failedBriefs = briefs?.filter((b) => b.status === "FAILED") ?? [];
    const totalFinished = completedBriefs.length + failedBriefs.length;

    // Calculate average execution time from briefs that have both timestamps
    const durations = completedBriefs
      .filter((b) => b.completed_at && b.created_at)
      .map((b) => new Date(b.completed_at).getTime() - new Date(b.created_at).getTime());

    const avgMs = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    let avgExecutionTime = "—";
    if (avgMs > 0) {
      const avgSec = Math.floor(avgMs / 1000);
      if (avgSec < 60) avgExecutionTime = `${avgSec}s`;
      else if (avgSec < 3600) avgExecutionTime = `${Math.floor(avgSec / 60)}m ${avgSec % 60}s`;
      else avgExecutionTime = `${Math.floor(avgSec / 3600)}h ${Math.floor((avgSec % 3600) / 60)}m`;
    }

    // Find last run
    const sortedBriefs = [...(briefs ?? [])].sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const lastRun = sortedBriefs[0]?.created_at
      ? formatRelativeTime(sortedBriefs[0].created_at)
      : "—";

    return {
      totalRuns: completedBriefs.length,
      successRate: totalFinished > 0 ? Math.round((completedBriefs.length / totalFinished) * 100) : 0,
      avgExecutionTime,
      lastRun,
      totalArtifacts: artifacts?.length ?? 0,
    };
  } catch {
    // Return zeroed stats on error — page still renders
    return {
      totalRuns: 0,
      successRate: 0,
      avgExecutionTime: "—",
      lastRun: "—",
      totalArtifacts: 0,
    };
  }
}

export function WorkflowStatsCard({ workflow }: { workflow: Workflow }) {
  const [stats, setStats] = useState<WorkflowStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkflowStats(workflow).then((s) => {
      setStats(s);
      setLoading(false);
    });
  }, [workflow]);

  const statItems = stats
    ? [
        { label: "Runs Completed", value: stats.totalRuns.toLocaleString() },
        { label: "Success Rate", value: `${stats.successRate}%` },
        { label: "Avg Execution", value: stats.avgExecutionTime },
        { label: "Last Run", value: stats.lastRun },
        { label: "Artifacts Produced", value: stats.totalArtifacts.toLocaleString() },
      ]
    : [];

  if (loading) {
    return (
      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider mb-4">
          Live Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-8 bg-neutral-800 rounded mb-2" />
              <div className="h-3 bg-neutral-800 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
        <h3 className="text-sm font-mono text-neutral-500 uppercase tracking-wider">
          Live Stats
        </h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {statItems.map((item) => (
          <div key={item.label}>
            <p className="text-2xl font-bold text-[var(--accent-green)] font-mono">
              {item.value}
            </p>
            <p className="text-xs text-neutral-500 mt-1">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Compact stats for the workflow index card */
export function WorkflowStatsCompact({ workflow }: { workflow: Workflow }) {
  const [stats, setStats] = useState<WorkflowStats | null>(null);

  useEffect(() => {
    fetchWorkflowStats(workflow).then(setStats);
  }, [workflow]);

  if (!stats) {
    return (
      <div className="flex gap-4 animate-pulse">
        <div className="h-4 bg-neutral-800 rounded w-16" />
        <div className="h-4 bg-neutral-800 rounded w-12" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-xs font-mono">
      <span className="text-[var(--accent-green)]">{stats.totalRuns} runs</span>
      <span className="text-neutral-600">|</span>
      <span className="text-neutral-400">{stats.successRate}% success</span>
      <span className="text-neutral-600">|</span>
      <span className="text-neutral-500">{stats.totalArtifacts} artifacts</span>
    </div>
  );
}

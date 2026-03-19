"use client";

import { useEffect, useState } from "react";
import { getPublicSupabaseClient } from "@/lib/supabase-public";
import { RevealOnScroll } from "@/components/motion";

interface GlobalStats {
  workflowsExecuted: number;
  artifactsProduced: number;
  agentsOperational: number;
}

async function fetchGlobalStats(): Promise<GlobalStats> {
  const supabase = getPublicSupabaseClient();

  try {
    const [briefsResult, artifactsResult] = await Promise.all([
      supabase
        .from("briefs")
        .select("id", { count: "exact", head: true })
        .eq("status", "COMPLETED"),
      supabase
        .from("artifacts")
        .select("id", { count: "exact", head: true }),
    ]);

    return {
      workflowsExecuted: briefsResult.count ?? 0,
      artifactsProduced: artifactsResult.count ?? 0,
      agentsOperational: 14,
    };
  } catch {
    return {
      workflowsExecuted: 0,
      artifactsProduced: 0,
      agentsOperational: 14,
    };
  }
}

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (value === 0) return;
    const duration = 1200;
    const steps = 40;
    const stepTime = duration / steps;
    let current = 0;
    const increment = value / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayed(value);
        clearInterval(timer);
      } else {
        setDisplayed(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <p className="text-4xl md:text-5xl font-bold text-[var(--accent-green)] font-mono tabular-nums">
        {displayed.toLocaleString()}
      </p>
      <p className="text-sm text-neutral-500 mt-2 font-mono uppercase tracking-wider">
        {label}
      </p>
    </div>
  );
}

export function LiveStats() {
  const [stats, setStats] = useState<GlobalStats | null>(null);

  useEffect(() => {
    fetchGlobalStats().then(setStats);
  }, []);

  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <RevealOnScroll>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse" />
            <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
              Live from Production
            </span>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-3 gap-8">
          {stats ? (
            <>
              <RevealOnScroll delay={0}>
                <AnimatedCounter
                  value={stats.workflowsExecuted}
                  label="Workflows Executed"
                />
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <AnimatedCounter
                  value={stats.artifactsProduced}
                  label="Artifacts Produced"
                />
              </RevealOnScroll>
              <RevealOnScroll delay={0.2}>
                <AnimatedCounter
                  value={stats.agentsOperational}
                  label="Agents Operational"
                />
              </RevealOnScroll>
            </>
          ) : (
            <>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="text-center animate-pulse">
                  <div className="h-12 bg-neutral-800 rounded w-24 mx-auto mb-2" />
                  <div className="h-4 bg-neutral-800 rounded w-32 mx-auto" />
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

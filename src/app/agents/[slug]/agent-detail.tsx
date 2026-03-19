"use client";

import Link from "next/link";
import { RevealOnScroll } from "@/components/motion";
import { getAgentByName } from "@/lib/agents";
import type { Agent } from "@/lib/agents";
import { useEffect, useState } from "react";

function AgentIcon({ name, color }: { name: string; color: string }) {
  const letter = name.charAt(0);
  return (
    <svg
      width="72"
      height="72"
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="34" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="36" cy="36" r="28" fill={color} fillOpacity="0.12" />
      <text
        x="36"
        y="36"
        textAnchor="middle"
        dominantBaseline="central"
        fill={color}
        fontSize="28"
        fontWeight="700"
        fontFamily="monospace"
      >
        {letter}
      </text>
    </svg>
  );
}

function StatusBadge({ status }: { status: Agent["status"] }) {
  const styles = {
    operational:
      "bg-[var(--accent-green-glow)] text-[var(--accent-green)] border-[var(--accent-green)]/20",
    beta: "bg-yellow-500/10 text-yellow-400 border-yellow-400/20",
    stub: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  };
  const labels = {
    operational: "Operational",
    beta: "Beta",
    stub: "Stub",
  };
  return (
    <span
      className={`text-xs font-mono px-2 py-0.5 rounded border ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function ConnectionLink({ name }: { name: string }) {
  const agent = getAgentByName(name);
  if (!agent) {
    return (
      <span className="text-xs font-mono px-2 py-1 rounded bg-[var(--surface)] text-neutral-400 border border-[var(--border)]">
        {name}
      </span>
    );
  }
  return (
    <Link
      href={`/agents/${agent.slug}`}
      className="text-xs font-mono px-2 py-1 rounded bg-[var(--surface)] border border-[var(--border)] transition-colors hover:border-neutral-500"
      style={{ color: agent.color }}
    >
      {name}
    </Link>
  );
}

interface ArtifactPost {
  id: string;
  title: string;
  created_at: string;
  brief_id: string;
}

function RecentArtifacts({ agentName }: { agentName: string }) {
  const [posts, setPosts] = useState<ArtifactPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const SUPABASE_URL = "https://wwimngjmnuuitowujnif.supabase.co";
    const SUPABASE_KEY = "sb_publishable_htgX411WISV2i6fzvRw9-w_V-q9Nn4H";

    async function fetchArtifacts() {
      try {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/artifacts?agent=eq.${agentName}&order=created_at.desc&limit=5&select=id,title,created_at,brief_id`,
          {
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
            },
          }
        );
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch {
        // Silently fail — artifacts are supplemental
      } finally {
        setLoading(false);
      }
    }

    fetchArtifacts();
  }, [agentName]);

  if (loading) {
    return (
      <div className="text-sm text-neutral-500 font-mono animate-pulse">
        Loading artifacts...
      </div>
    );
  }

  if (posts.length === 0) return null;

  return (
    <div>
      <h3 className="text-lg font-bold text-neutral-100 mb-4 font-mono">
        Recent Artifacts
      </h3>
      <div className="space-y-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-3 rounded bg-[var(--surface)] border border-[var(--border)] text-sm"
          >
            <p className="text-neutral-200 font-medium">{post.title}</p>
            <div className="flex gap-3 mt-1 text-xs text-neutral-500 font-mono">
              <span>{new Date(post.created_at).toLocaleDateString()}</span>
              {post.brief_id && <span>BRIEF: {post.brief_id}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AgentDetail({ agent }: { agent: Agent }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Back link */}
      <RevealOnScroll>
        <Link
          href="/agents"
          className="text-sm text-neutral-500 hover:text-neutral-300 transition-colors font-mono mb-8 inline-block"
        >
          &larr; All Agents
        </Link>

        {/* Header */}
        <div className="flex items-start gap-5 mb-8">
          <AgentIcon name={agent.name} color={agent.color} />
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 font-mono">
                {agent.name}
              </h1>
              <StatusBadge status={agent.status} />
            </div>
            <p className="text-lg text-neutral-400">{agent.role}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-base text-neutral-300 leading-relaxed mb-12 max-w-3xl">
          {agent.description}
        </p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Capabilities */}
        <RevealOnScroll delay={0.1}>
          <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
            <h3 className="text-lg font-bold text-neutral-100 mb-4 font-mono">
              Capabilities
            </h3>
            <ul className="space-y-2">
              {agent.capabilities.map((cap) => (
                <li
                  key={cap}
                  className="text-sm text-neutral-400 flex items-start gap-2"
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ backgroundColor: agent.color }}
                  />
                  {cap}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        {/* Connections */}
        <RevealOnScroll delay={0.2}>
          <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)]">
            <h3 className="text-lg font-bold text-neutral-100 mb-4 font-mono">
              Connections
            </h3>

            {agent.calls.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-wider">
                  Calls
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.calls.map((name) => (
                    <ConnectionLink key={name} name={name} />
                  ))}
                </div>
              </div>
            )}

            {agent.called_by.length > 0 && (
              <div>
                <p className="text-xs text-neutral-500 font-mono mb-2 uppercase tracking-wider">
                  Called By
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.called_by.map((name) => (
                    <ConnectionLink key={name} name={name} />
                  ))}
                </div>
              </div>
            )}

            {agent.calls.length === 0 && agent.called_by.length === 0 && (
              <p className="text-sm text-neutral-500">No direct connections.</p>
            )}
          </div>
        </RevealOnScroll>
      </div>

      {/* Soul */}
      <RevealOnScroll delay={0.3}>
        <div className="p-6 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] mb-12">
          <h3 className="text-lg font-bold text-neutral-100 mb-4 font-mono">
            Soul
          </h3>
          <blockquote
            className="text-sm text-neutral-300 leading-relaxed italic border-l-2 pl-4"
            style={{ borderColor: agent.color }}
          >
            {agent.soul}
          </blockquote>
        </div>
      </RevealOnScroll>

      {/* Recent Artifacts from Supabase */}
      <RevealOnScroll delay={0.4}>
        <RecentArtifacts agentName={agent.name} />
      </RevealOnScroll>
    </div>
  );
}

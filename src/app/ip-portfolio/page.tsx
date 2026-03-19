import type { Metadata } from "next";
import Link from "next/link";
import { getPrivateRepos } from "@/lib/repo-tags";

export const metadata: Metadata = {
  title: "IP Portfolio — ARAGON",
  description: "Internal IP portfolio — proprietary repositories and their monetisation scores.",
};

export const revalidate = 3600;

const SCORE_KEYS = [
  { key: "uniqueness", label: "Uniqueness", short: "U" },
  { key: "market_demand", label: "Market Demand", short: "D" },
  { key: "build_completeness", label: "Completeness", short: "B" },
  { key: "system_leverage", label: "Leverage", short: "L" },
  { key: "revenue_potential", label: "Revenue", short: "R" },
  { key: "maintenance_cost", label: "Maintenance", short: "M" },
] as const;

function ScoreBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = Math.min(100, (value / max) * 100);
  const color =
    value >= 7 ? "bg-emerald-500" : value >= 4 ? "bg-yellow-500" : "bg-red-500/70";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-mono text-neutral-500 w-4 text-right">{value}</span>
    </div>
  );
}

function ScoreGrid({ scores }: { scores: Record<string, number> }) {
  if (!Object.keys(scores).length) return null;
  const total = Object.values(scores).reduce((a, b) => a + b, 0);
  return (
    <div className="mt-3 pt-3 border-t border-neutral-800">
      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 mb-2">
        {SCORE_KEYS.map(({ key, label }) => (
          <div key={key}>
            <div className="flex justify-between mb-0.5">
              <span className="text-xs font-mono text-neutral-600">{label}</span>
            </div>
            <ScoreBar value={scores[key] ?? 0} />
          </div>
        ))}
      </div>
      <div className="text-right text-xs font-mono text-neutral-500 mt-1">
        Total: <span className="text-neutral-300">{total}</span>
        <span className="text-neutral-700">/60</span>
      </div>
    </div>
  );
}

function GitHubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function IpPortfolioPage() {
  const repos = await getPrivateRepos();

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-4">
        <span className="text-xs font-mono text-amber-500/70 border border-amber-500/20 px-2 py-0.5 rounded mb-4 inline-block">
          Internal · Not indexed
        </span>
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          IP Portfolio
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-6">
          Proprietary repositories scored against the 6-dimension monetisation
          matrix. Not public — shown here for internal tracking.
        </p>
        <div className="flex gap-6 text-sm font-mono text-neutral-500">
          <span>
            <span className="text-amber-400 font-semibold">{repos.length}</span>{" "}
            repositories
          </span>
        </div>
      </div>

      {/* Score legend */}
      <div className="mb-10 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
        <p className="text-xs font-mono text-neutral-500 mb-2">Score dimensions (0–10 each, 60 max):</p>
        <div className="flex flex-wrap gap-3 text-xs font-mono text-neutral-600">
          {SCORE_KEYS.map(({ short, label }) => (
            <span key={short}>
              <span className="text-neutral-400">{short}</span> = {label}
            </span>
          ))}
        </div>
      </div>

      {/* Repos grid */}
      {repos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo) => {
            const total = Object.values(repo.scoreData).reduce(
              (a: number, b: number) => a + b,
              0
            );
            return (
              <div
                key={repo.name}
                className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] flex flex-col"
              >
                {/* Name + score */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-bold text-neutral-100 font-mono">
                    {repo.name}
                  </h3>
                  {total > 0 && (
                    <span className="shrink-0 text-xs font-mono text-neutral-500">
                      <span className="text-neutral-300">{total}</span>/60
                    </span>
                  )}
                </div>

                {/* Description */}
                {repo.description && (
                  <p className="text-xs text-neutral-400 leading-relaxed mb-2 line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {/* Language */}
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-neutral-600">{repo.language || "—"}</span>
                  {repo.githubUrl && (
                    <Link
                      href={repo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-neutral-600 hover:text-[var(--accent-green)] transition-colors"
                    >
                      <GitHubIcon />
                      Repo
                    </Link>
                  )}
                </div>

                {/* Score breakdown */}
                <ScoreGrid scores={repo.scoreData} />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-neutral-600 font-mono text-sm">
          No IP-tagged repositories yet. Run{" "}
          <code className="text-neutral-500">python -m recon ip-tag --sync</code> to
          populate from the repo scorer.
        </p>
      )}

      <div className="mt-16 pt-8 border-t border-neutral-800">
        <p className="text-xs font-mono text-neutral-600">
          Data sourced from{" "}
          <code className="text-neutral-500">recon/ip_tagger.py --sync</code>.
          Classifications persist in Supabase artifacts table.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { getPublicRepos, TAG_LABELS, TAG_COLORS } from "@/lib/repo-tags";

export const metadata: Metadata = {
  title: "Open Source — ARAGON",
  description:
    "Open source projects by Craig Kunte. AI infrastructure, automation pipelines, and developer tools — all source-available.",
};

export const revalidate = 3600; // Refresh from Supabase hourly

const LANG_COLORS: Record<string, string> = {
  Python: "text-blue-400",
  TypeScript: "text-cyan-400",
  JavaScript: "text-yellow-400",
  Bash: "text-green-400",
  Go: "text-sky-400",
};

function LicenseBadge({ license }: { license: string }) {
  if (!license) return null;
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono px-1.5 py-0.5 rounded border border-neutral-700 text-neutral-500">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
      </svg>
      {license}
    </span>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default async function OpenSourcePage() {
  const repos = await getPublicRepos();

  const openSource = repos.filter((r) => r.tag === "open-source");
  const licensed = repos.filter((r) => r.tag === "licensed-open-source");

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-neutral-100 mb-4">
          Open Source
        </h1>
        <p className="text-lg text-neutral-400 max-w-2xl mb-6">
          Source-available projects from the ARAGON ecosystem. AI pipelines,
          agent infrastructure, and developer tools — built in public.
        </p>
        <div className="flex gap-6 text-sm font-mono text-neutral-500">
          <span>
            <span className="text-emerald-400 font-semibold">{openSource.length}</span>{" "}
            open source
          </span>
          {licensed.length > 0 && (
            <span>
              <span className="text-blue-400 font-semibold">{licensed.length}</span>{" "}
              licensed
            </span>
          )}
          <span>
            <span className="text-neutral-300 font-semibold">{repos.length}</span>{" "}
            total
          </span>
        </div>
      </div>

      {/* Open Source repos */}
      {openSource.length > 0 && (
        <section className="mb-14">
          <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-5">
            Open Source
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {openSource.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {/* Licensed repos */}
      {licensed.length > 0 && (
        <section>
          <h2 className="text-xs font-mono text-neutral-500 uppercase tracking-widest mb-5">
            Licensed
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {licensed.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        </section>
      )}

      {repos.length === 0 && (
        <p className="text-neutral-600 font-mono text-sm">
          No repositories tagged yet. Run{" "}
          <code className="text-neutral-400">python -m recon ip-tag --sync</code> to
          classify repos.
        </p>
      )}

      {/* Footer note */}
      <div className="mt-16 pt-8 border-t border-neutral-800">
        <p className="text-xs font-mono text-neutral-600">
          Classifications maintained via{" "}
          <code className="text-neutral-500">python -m recon ip-tag</code>.
          Score data from the 6-dimension monetisation matrix.
        </p>
      </div>
    </div>
  );
}

function RepoCard({
  repo,
}: {
  repo: Awaited<ReturnType<typeof getPublicRepos>>[number];
}) {
  const langColor = LANG_COLORS[repo.language] ?? "text-neutral-500";

  return (
    <div className="p-5 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border)] hover:border-neutral-600 transition-colors flex flex-col gap-3">
      {/* Name + tag */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-bold text-neutral-100 font-mono leading-tight">
          {repo.name}
        </h3>
        <span
          className={`shrink-0 text-xs font-mono px-1.5 py-0.5 rounded border ${TAG_COLORS[repo.tag]}`}
        >
          {TAG_LABELS[repo.tag]}
        </span>
      </div>

      {/* Description */}
      {repo.description && (
        <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2">
          {repo.description}
        </p>
      )}

      {/* Meta row */}
      <div className="flex items-center justify-between mt-auto pt-1">
        <div className="flex items-center gap-3 text-xs font-mono">
          {repo.language && (
            <span className={langColor}>{repo.language}</span>
          )}
          {repo.stars > 0 && (
            <span className="text-neutral-600">★ {repo.stars}</span>
          )}
          <LicenseBadge license={repo.license} />
        </div>

        {repo.githubUrl && (
          <Link
            href={repo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-500 hover:text-[var(--accent-green)] transition-colors"
          >
            <GitHubIcon />
            View
          </Link>
        )}
      </div>
    </div>
  );
}

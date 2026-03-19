/**
 * Repo IP tag data — sourced from Supabase artifacts table (artifact_type='repo_ip_tag').
 * Falls back to static data derived from portfolio.ts if Supabase is unavailable.
 */

import { getPublicSupabaseClient } from "./supabase-public";
import { portfolioRepos } from "./portfolio";

export type RepoTag = "open-source" | "licensed-open-source" | "ip-private";

export interface TaggedRepo {
  name: string;
  description: string;
  tag: RepoTag;
  githubUrl: string;
  language: string;
  stars: number;
  license: string;
  scoreData: Record<string, number>;
}

const TAG_LABELS: Record<RepoTag, string> = {
  "open-source": "Open Source",
  "licensed-open-source": "Licensed",
  "ip-private": "IP Portfolio",
};

const TAG_COLORS: Record<RepoTag, string> = {
  "open-source": "bg-emerald-900/40 text-emerald-400 border-emerald-500/20",
  "licensed-open-source": "bg-blue-900/40 text-blue-400 border-blue-500/20",
  "ip-private": "bg-amber-900/40 text-amber-400 border-amber-500/20",
};

export { TAG_LABELS, TAG_COLORS };

/** Fallback: treat all portfolio repos as open-source showcase items. */
function staticFallback(): TaggedRepo[] {
  return portfolioRepos.map((r) => ({
    name: r.name,
    description: r.description,
    tag: "open-source" as RepoTag,
    githubUrl: r.github,
    language: r.techStack[0] ?? "",
    stars: 0,
    license: "MIT",
    scoreData: {},
  }));
}

/** Fetch tagged repos from Supabase artifacts table. */
async function fetchFromSupabase(): Promise<TaggedRepo[]> {
  const client = getPublicSupabaseClient();
  const { data, error } = await client
    .from("artifacts")
    .select("title,status,notes,location,payload")
    .eq("artifact_type", "repo_ip_tag")
    .order("title");

  if (error || !data) return [];

  return data.map((row) => {
    const p = (row.payload as Record<string, unknown>) ?? {};
    return {
      name: row.title ?? "",
      description: (row.notes as string) ?? "",
      tag: (row.status as RepoTag) ?? "open-source",
      githubUrl: (row.location as string) ?? (p.github_url as string) ?? "",
      language: (p.language as string) ?? "",
      stars: (p.stars as number) ?? 0,
      license: (p.license as string) ?? "",
      scoreData: (p.score_data as Record<string, number>) ?? {},
    };
  });
}

/** Get all repos tagged as open-source or licensed-open-source. */
export async function getPublicRepos(): Promise<TaggedRepo[]> {
  try {
    const rows = await fetchFromSupabase();
    if (rows.length > 0) {
      return rows.filter(
        (r) => r.tag === "open-source" || r.tag === "licensed-open-source"
      );
    }
  } catch {
    // fallthrough to static
  }
  return staticFallback();
}

/** Get all repos tagged as ip-private (for the portfolio page). */
export async function getPrivateRepos(): Promise<TaggedRepo[]> {
  try {
    const rows = await fetchFromSupabase();
    if (rows.length > 0) {
      return rows.filter((r) => r.tag === "ip-private");
    }
  } catch {
    // fallthrough
  }
  // Static fallback: use all portfolio repos as IP examples
  return staticFallback().map((r) => ({ ...r, tag: "ip-private" as RepoTag }));
}

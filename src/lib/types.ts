export interface PostMeta {
  title: string;
  date: string;
  slug: string;
  section: "blog" | "conversations";
  pillar?:
    | "build-log"
    | "pattern-library"
    | "cost-breakdown"
    | "tool-autopsy"
    | "reference-stack"
    | "conversations";
  excerpt: string;
  tags: string[];
  win?: boolean;
  status: "draft" | "published";
  readingTime?: string;
}

export interface Post {
  meta: PostMeta;
  content: string;
}

export const PILLARS = [
  { id: "build-log", label: "Build Log" },
  { id: "pattern-library", label: "Pattern Library" },
  { id: "cost-breakdown", label: "Cost Breakdown" },
  { id: "tool-autopsy", label: "Tool Autopsy" },
  { id: "reference-stack", label: "Reference Stack" },
] as const;

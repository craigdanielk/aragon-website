import Link from "next/link";
import type { PostMeta } from "@/lib/types";

interface PostCardProps {
  post: PostMeta;
}

const pillarLabels: Record<string, string> = {
  "build-log": "Build Log",
  "pattern-library": "Pattern Library",
  "cost-breakdown": "Cost Breakdown",
  "tool-autopsy": "Tool Autopsy",
  "reference-stack": "Reference Stack",
  conversations: "Conversations",
};

export function PostCard({ post }: PostCardProps) {
  const href =
    post.section === "blog"
      ? `/blog/${post.slug}`
      : `/conversations/${post.slug}`;

  return (
    <article className="group py-6 border-b border-neutral-800/50 last:border-0">
      <Link href={href} className="block">
        <div className="flex items-center gap-3 mb-2">
          <time className="text-xs font-mono text-neutral-600">{post.date}</time>
          {post.pillar && (
            <span className="text-xs font-mono text-neutral-500 bg-neutral-900 px-2 py-0.5 rounded">
              {pillarLabels[post.pillar] || post.pillar}
            </span>
          )}
          {post.win && (
            <span className="text-xs font-mono text-emerald-600">
              win
            </span>
          )}
          {post.readingTime && (
            <span className="text-xs font-mono text-neutral-600">
              {post.readingTime}
            </span>
          )}
        </div>
        <h2 className="text-lg text-neutral-200 group-hover:text-neutral-50 transition-colors leading-tight">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="mt-2 text-sm text-neutral-500 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </Link>
    </article>
  );
}

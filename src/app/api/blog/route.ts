import { NextResponse } from "next/server";
import { getBlogPosts } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = getBlogPosts();

    // Return top 10, strip full content — only frontmatter fields
    const result = posts.slice(0, 10).map((post) => ({
      title: post.meta.title,
      slug: post.meta.slug,
      date: post.meta.date,
      excerpt: post.meta.excerpt,
      tags: post.meta.tags,
      readingTime: post.meta.readingTime,
    }));

    return NextResponse.json({ posts: result });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

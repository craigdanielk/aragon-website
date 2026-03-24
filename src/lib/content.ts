import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { PostMeta, Post } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

function getPostsFromDir(section: "blog" | "conversations"): Post[] {
  const dir = path.join(CONTENT_DIR, section);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filePath = path.join(dir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      const meta: PostMeta = {
        title: data.title || "",
        date: data.date || "",
        slug: data.slug || filename.replace(/\.mdx$/, ""),
        section,
        pillar: data.pillar,
        excerpt: data.excerpt || "",
        tags: data.tags || [],
        win: data.win || false,
        status: data.status || "published",
        readingTime: stats.text,
        heroImage: data.heroImage,
        ogImage: data.ogImage,
      };

      return { meta, content };
    })
    .filter((p) => p.meta.status === "published")
    .sort(
      (a, b) =>
        new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
}

export function getBlogPosts(): Post[] {
  return getPostsFromDir("blog");
}

export function getConversationPosts(): Post[] {
  return getPostsFromDir("conversations");
}

export function getPostBySlug(
  section: "blog" | "conversations",
  slug: string
): Post | null {
  const posts = getPostsFromDir(section);
  return posts.find((p) => p.meta.slug === slug) || null;
}

export function getAllPosts(): Post[] {
  return [...getBlogPosts(), ...getConversationPosts()].sort(
    (a, b) =>
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
  );
}

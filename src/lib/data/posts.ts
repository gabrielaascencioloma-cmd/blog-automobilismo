import readingTime from "reading-time";
import { prisma } from "@/lib/db";
import type { Post as DbPost } from "@prisma/client";
import type { CategorySlug } from "@/lib/categories";

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: CategorySlug;
  cover?: string;
  coverType: "IMAGE" | "VIDEO";
  readingMinutes: number;
  views: number;
}

export interface Post extends PostSummary {
  contentHtml: string;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ");
}

function toSummary(post: DbPost): PostSummary {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.publishAt.toISOString().slice(0, 10),
    category: post.category,
    cover: post.coverUrl ?? undefined,
    coverType: post.coverType,
    readingMinutes: Math.max(1, Math.round(readingTime(stripHtml(post.contentHtml)).minutes)),
    views: post.views,
  };
}

function publicWhere() {
  return {
    status: "PUBLISHED" as const,
    publishAt: { lte: new Date() },
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const posts = await prisma.post.findMany({
    where: publicWhere(),
    orderBy: { publishAt: "desc" },
  });
  return posts.map(toSummary);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = await prisma.post.findFirst({ where: { slug, ...publicWhere() } });
  if (!post) return null;
  return { ...toSummary(post), contentHtml: post.contentHtml };
}

import readingTime from "reading-time";
import { prisma } from "@/lib/db";
import type { Post as DbPost } from "@prisma/client";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { MENU_TOPICS, postMatchesTopic } from "@/lib/menu";

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: CategorySlug;
  subcategory?: string;
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
    subcategory: post.subcategory ?? undefined,
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

export interface MenuPost {
  slug: string;
  title: string;
  cover: string;
  views: number;
}

export interface MenuHighlights {
  byTopic: Record<string, MenuPost[]>;
  // Mais lidos do blog todo, para temas que ainda não têm post.
  overall: MenuPost[];
}

// Os mais lidos de cada tema do menu (consulta leve, sem o corpo dos posts).
export async function getMenuHighlights(perTopic = 2): Promise<MenuHighlights> {
  const rows = await prisma.post.findMany({
    where: publicWhere(),
    orderBy: [{ views: "desc" }, { publishAt: "desc" }],
    select: { slug: true, title: true, excerpt: true, subcategory: true, category: true, coverUrl: true, views: true },
  });

  const toMenuPost = (r: (typeof rows)[number]): MenuPost => ({
    slug: r.slug,
    title: r.title,
    cover: r.coverUrl ?? CATEGORIES[r.category]?.coverImage ?? "",
    views: r.views,
  });

  const byTopic: Record<string, MenuPost[]> = {};
  for (const topic of MENU_TOPICS) {
    byTopic[topic.slug] = rows.filter((r) => postMatchesTopic(r, topic)).slice(0, perTopic).map(toMenuPost);
  }

  return { byTopic, overall: rows.slice(0, perTopic).map(toMenuPost) };
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

interface SeedPost {
  title: string;
  slug?: string;
  excerpt: string;
  category: string;
  subcategory?: string;
  contentHtml: string;
  coverUrl?: string;
  publishAt: string; // ISO string (UTC-3 assumed)
}

function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function uniqueSlug(base: string): Promise<string> {
  const b = slugify(base) || "post";
  let slug = b;
  let n = 2;
  while (await prisma.post.findFirst({ where: { slug } })) {
    slug = `${b}-${n}`;
    n++;
  }
  return slug;
}

export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token || token !== process.env.SEED_TOKEN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts: SeedPost[] = await req.json();

  const created = [];
  for (const p of posts) {
    const slug = await uniqueSlug(p.slug || p.title);
    const post = await prisma.post.create({
      data: {
        slug,
        title: p.title,
        excerpt: p.excerpt,
        category: p.category as any,
        subcategory: p.subcategory ?? null,
        contentHtml: p.contentHtml,
        coverUrl: p.coverUrl ?? null,
        coverType: "IMAGE",
        status: "PUBLISHED",
        publishAt: new Date(p.publishAt),
      },
    });
    created.push({ id: post.id, slug: post.slug });
  }

  return NextResponse.json({ ok: true, created: created.length, posts: created });
}

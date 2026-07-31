"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slugify";
import type { CategorySlug } from "@/lib/categories";

export interface PostFormState {
  error?: string;
}

async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const baseSlug = slugify(base) || "post";
  let slug = baseSlug;
  let n = 2;
  while (
    await prisma.post.findFirst({
      where: { slug, ...(ignoreId ? { NOT: { id: ignoreId } } : {}) },
    })
  ) {
    slug = `${baseSlug}-${n}`;
    n += 1;
  }
  return slug;
}

function parsePublishing(formData: FormData) {
  const publishing = String(formData.get("publishing"));
  if (publishing === "draft") {
    return { status: "DRAFT" as const, publishAt: new Date() };
  }
  if (publishing === "schedule") {
    const scheduledFor = String(formData.get("scheduledFor"));
    return { status: "PUBLISHED" as const, publishAt: new Date(scheduledFor) };
  }
  return { status: "PUBLISHED" as const, publishAt: new Date() };
}

export async function createPost(
  _prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category")) as CategorySlug;
  const contentHtml = String(formData.get("contentHtml") ?? "");
  const coverUrl = String(formData.get("coverUrl") ?? "") || null;
  const coverType = (String(formData.get("coverType") ?? "IMAGE")) as "IMAGE" | "VIDEO";

  if (!title || !excerpt || !category) {
    return { error: "Preencha título, resumo e categoria." };
  }

  const { status, publishAt } = parsePublishing(formData);
  const slug = await uniqueSlug(title);

  await prisma.post.create({
    data: { slug, title, excerpt, category, contentHtml, coverUrl, coverType, status, publishAt },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  redirect("/admin/posts");
}

export async function updatePost(
  postId: string,
  _prevState: PostFormState | undefined,
  formData: FormData
): Promise<PostFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const category = String(formData.get("category")) as CategorySlug;
  const contentHtml = String(formData.get("contentHtml") ?? "");
  const coverUrl = String(formData.get("coverUrl") ?? "") || null;
  const coverType = (String(formData.get("coverType") ?? "IMAGE")) as "IMAGE" | "VIDEO";

  if (!title || !excerpt || !category) {
    return { error: "Preencha título, resumo e categoria." };
  }

  const existing = await prisma.post.findUniqueOrThrow({ where: { id: postId } });
  const { status, publishAt } = parsePublishing(formData);
  const slug =
    title === existing.title ? existing.slug : await uniqueSlug(title, postId);

  await prisma.post.update({
    where: { id: postId },
    data: { slug, title, excerpt, category, contentHtml, coverUrl, coverType, status, publishAt },
  });

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  redirect("/admin/posts");
}

export async function deletePost(postId: string) {
  const post = await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
}

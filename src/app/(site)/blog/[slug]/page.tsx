import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { getAllPosts, getPostBySlug } from "@/lib/data/posts";
import { CATEGORIES } from "@/lib/categories";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PhotoCover } from "@/components/PhotoCover";
import { PostCard } from "@/components/PostCard";
import { formatDate } from "@/lib/format";
import { ViewTracker } from "./ViewTracker";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const related = allPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 2);

  const coverSrc = post.cover ?? CATEGORIES[post.category].coverImage;

  return (
    <article>
      <ViewTracker slug={post.slug} />
      <div className="relative h-72 w-full sm:h-96">
        {post.coverType === "VIDEO" ? (
          <video
            src={coverSrc}
            controls
            preload="metadata"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <PhotoCover src={coverSrc} alt={post.title} priority />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-transparent" />
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end">
          <div className="pointer-events-auto mx-auto w-full max-w-3xl px-6 pb-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-cream/80 transition-colors hover:text-cream"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar para o blog
            </Link>
            <div className="mt-4">
              <CategoryBadge category={post.category} size="md" />
            </div>
            <h1 className="font-display mt-4 text-3xl font-extrabold leading-tight text-cream sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-cream/75">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {post.readingMinutes} min de leitura
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-12">
        <div
          className="prose-article"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

      {related.length > 0 && (
        <div className="bg-cream-warm">
          <div className="mx-auto max-w-6xl px-6 py-14">
            <h2 className="font-display text-xl font-extrabold text-ink">
              Continue lendo
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

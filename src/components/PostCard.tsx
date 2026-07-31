import Link from "next/link";
import { Clock } from "lucide-react";
import type { PostSummary } from "@/lib/data/posts";
import { CATEGORIES } from "@/lib/categories";
import { CategoryBadge } from "./CategoryBadge";
import { PhotoCover } from "./PhotoCover";
import { formatDate } from "@/lib/format";

export function PostCard({
  post,
  featured = false,
}: {
  post: PostSummary;
  featured?: boolean;
}) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-surface shadow-sm transition-all hover:shadow-lg hover:shadow-ink/10 ${
        featured ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      <div className={`relative ${featured ? "h-56 md:w-1/2" : "h-48 w-full"}`}>
        <PhotoCover
          src={post.cover ?? CATEGORIES[post.category].coverImage}
          alt={post.title}
        />
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/55 to-transparent" />
        <CategoryBadge
          category={post.category}
          linked={false}
          className="absolute left-4 top-4"
        />
      </div>
      <div className={`flex flex-1 flex-col gap-3 p-6 ${featured ? "md:p-8 md:justify-center" : ""}`}>
        <h3
          className={`font-display font-bold leading-snug text-ink ${
            featured ? "text-2xl md:text-3xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className={`text-ink-soft ${featured ? "text-base" : "text-sm"} line-clamp-3`}>
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-ink-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {post.readingMinutes} min de leitura
          </span>
        </div>
      </div>
    </Link>
  );
}

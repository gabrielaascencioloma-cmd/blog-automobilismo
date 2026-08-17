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
      className="group flex flex-col overflow-hidden rounded-xl border border-border-subtle bg-surface transition-shadow hover:shadow-md"
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-60" : "h-48"}`}>
        <PhotoCover
          src={post.cover ?? CATEGORIES[post.category].coverImage}
          alt={post.title}
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <CategoryBadge category={post.category} linked={false} />
        <h3
          className={`font-display font-black uppercase leading-tight text-ink transition-colors group-hover:text-red line-clamp-2 ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-border-subtle pt-3 text-xs text-ink-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min
          </span>
        </div>
      </div>
    </Link>
  );
}

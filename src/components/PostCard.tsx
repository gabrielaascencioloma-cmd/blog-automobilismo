import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface transition-all duration-300 hover:border-red/30 hover:bg-surface-2 ${
        featured ? "min-h-[340px]" : "min-h-[220px]"
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-56" : "h-44"}`}>
        <PhotoCover
          src={post.cover ?? CATEGORIES[post.category].coverImage}
          alt={post.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <CategoryBadge
          category={post.category}
          linked={false}
          className="absolute left-4 top-4"
        />
        <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-white/0 transition-all duration-200 group-hover:text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3
          className={`font-display font-black uppercase leading-tight text-ink transition-colors group-hover:text-white ${
            featured ? "text-xl sm:text-2xl" : "text-base"
          }`}
        >
          {post.title}
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 pt-2 text-xs text-ink-faint">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingMinutes} min
          </span>
        </div>
      </div>

      {/* Red accent line on hover */}
      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-red transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

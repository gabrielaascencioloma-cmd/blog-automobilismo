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
      className={`group flex flex-col overflow-hidden rounded-xl bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-64 md:h-[380px]" : "h-48 md:h-52"}`}>
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
          <PhotoCover
            src={post.cover ?? CATEGORIES[post.category].coverImage}
            alt={post.title}
          />
        </div>
      </div>

      {/* Content */}
      <div className={`flex flex-1 flex-col gap-3 ${featured ? "p-6 md:p-8" : "p-5"}`}>
        <CategoryBadge category={post.category} linked={false} />
        <h3
          className={`font-display font-black uppercase leading-[1.15] text-ink transition-colors group-hover:text-red line-clamp-3 ${
            featured ? "text-2xl md:text-3xl lg:text-4xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className={`line-clamp-2 leading-relaxed text-ink-soft ${featured ? "text-base md:text-lg mt-2" : "text-sm"}`}>
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

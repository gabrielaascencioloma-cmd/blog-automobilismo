import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";

export function CategoryBadge({
  category,
  size = "sm",
  linked = true,
  className,
}: {
  category: CategorySlug;
  size?: "sm" | "md";
  linked?: boolean;
  className?: string;
}) {
  const def = CATEGORIES[category];
  const textClasses = `font-semibold uppercase tracking-[0.14em] text-cream [text-shadow:0_1px_4px_rgba(0,0,0,0.6)] ${
    size === "sm" ? "text-[11px]" : "text-xs"
  }`;

  if (!linked) {
    return <span className={`self-start ${textClasses} ${className ?? ""}`}>{def.label}</span>;
  }

  return (
    <Link
      href={`/blog?categoria=${def.slug}`}
      className={`self-start transition-opacity hover:opacity-75 ${textClasses} ${className ?? ""}`}
    >
      {def.label}
    </Link>
  );
}

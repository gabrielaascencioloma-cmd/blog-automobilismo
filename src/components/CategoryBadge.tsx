import Link from "next/link";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";

const PILL: Record<CategorySlug, string> = {
  manutencao: "bg-red/10 text-red",
  dicas:      "bg-blue-100 text-blue-700",
  alertas:    "bg-amber-100 text-amber-700",
  novidades:  "bg-emerald-100 text-emerald-700",
};

export function CategoryBadge({
  category,
  linked = true,
  className,
}: {
  category: CategorySlug;
  size?: "sm" | "md";
  linked?: boolean;
  className?: string;
}) {
  const def = CATEGORIES[category];
  const base = `self-start inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] ${PILL[category]} ${className ?? ""}`;

  if (!linked) return <span className={base}>{def.label}</span>;

  return (
    <Link href={`/blog?categoria=${def.slug}`} className={`${base} transition-opacity hover:opacity-75`}>
      {def.label}
    </Link>
  );
}

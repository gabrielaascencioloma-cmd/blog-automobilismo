import Link from "next/link";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className ?? ""}`}
    >
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border ${
          inverted ? "border-cream/30" : "border-ink/20"
        }`}
      >
        <span className="h-2 w-2 rounded-full bg-gold" />
      </span>
      <span
        className={`font-display text-lg font-extrabold uppercase tracking-tight ${
          inverted ? "text-cream" : "text-ink"
        }`}
      >
        Carro em Dia
      </span>
    </Link>
  );
}

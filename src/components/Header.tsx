import Link from "next/link";
import { Logo } from "./Logo";
import { CATEGORY_LIST } from "@/lib/categories";

const NAV_LINKS = [
  { href: "/blog", label: "Blog" },
  ...CATEGORY_LIST.map((c) => ({
    href: `/blog?categoria=${c.slug}`,
    label: c.label,
  })),
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo inverted />
        <nav className="hidden items-center gap-7 text-sm font-medium text-cream/70 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-cream"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/blog"
          className="hidden rounded-full bg-gold px-4 py-2 text-sm font-semibold text-cream transition-colors hover:bg-gold-dark sm:inline-flex"
        >
          Ler os posts
        </Link>
      </div>
    </header>
  );
}

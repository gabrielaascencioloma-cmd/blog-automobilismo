import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { CATEGORY_LIST } from "@/lib/categories";

const NAV_LINKS = [
  { href: "/seu-carro", label: "Seu Carro" },
  { href: "/blog?categoria=manutencao", label: "Manutenção" },
  { href: "/blog?categoria=dicas", label: "Dicas" },
  { href: "/blog?categoria=alertas", label: "Alertas" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-page/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-7 text-sm font-medium text-ink-soft md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/blog"
            className="hidden rounded-full bg-red px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-dark sm:inline-flex"
          >
            Ler os posts
          </Link>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { CATEGORY_LIST } from "@/lib/categories";
import { Search } from "lucide-react";

const NAV_LINKS = [
  { href: "/seu-carro", label: "Seu Carro" },
  { href: "/blog?categoria=manutencao", label: "Manutenção" },
  { href: "/blog?categoria=dicas", label: "Dicas" },
  { href: "/blog?categoria=alertas", label: "Alertas" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo inverted compact />

        <nav className="hidden items-center gap-7 text-sm font-medium text-white md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white/70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form action="/blog" method="get" className="hidden items-center sm:inline-flex">
            <input
              type="search"
              name="q"
              placeholder="Pesquise por palavra-chave..."
              className="w-40 rounded-l-full border border-r-0 border-white/20 bg-white/10 py-2 pl-4 pr-2 text-xs text-white placeholder-white/40 outline-none transition-all focus:w-52 focus:border-white/40 focus:bg-white/15"
            />
            <button
              type="submit"
              className="rounded-r-full bg-red px-3 py-2 text-white transition-colors hover:bg-red-dark"
              aria-label="Pesquisar"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}

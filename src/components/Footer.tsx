import Link from "next/link";
import { Camera, Play, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { CATEGORY_LIST } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-ink-soft">
            Manutenção, dicas e alertas para quem depende do carro todos os
            dias — sem enrolação e sem jargão de oficina.
          </p>
          <div className="mt-5 flex gap-3">
            {[Camera, Play, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-ink-soft transition-colors hover:border-red hover:text-red"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-ink">Categorias</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            {CATEGORY_LIST.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/blog?categoria=${c.slug}`}
                  className="transition-colors hover:text-red"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-ink">Site</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-soft">
            <li><Link href="/" className="transition-colors hover:text-red">Início</Link></li>
            <li><Link href="/blog" className="transition-colors hover:text-red">Todos os posts</Link></li>
            <li><Link href="/sobre" className="transition-colors hover:text-red">Sobre o blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-ink">Receba novidades</h4>
          <p className="mt-4 text-sm text-ink-soft">
            Um resumo por e-mail quando sair conteúdo novo. Sem spam.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full min-w-0 rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-red px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-red-dark"
            >
              OK
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-border-subtle px-6 py-5 text-center text-xs text-ink-faint">
        © {new Date().getFullYear()} Carro em Dia. Todos os direitos reservados.
      </div>
    </footer>
  );
}

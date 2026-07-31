import Link from "next/link";
import { Camera, Play, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { CATEGORY_LIST } from "@/lib/categories";

export function Footer() {
  return (
    <footer className="bg-teal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo inverted />
          <p className="mt-4 max-w-xs text-sm text-cream/70">
            Manutenção, dicas e alertas para quem depende do carro todos os
            dias — sem enrolação e sem jargão de oficina.
          </p>
          <div className="mt-5 flex gap-3">
            {[Camera, Play, MessageCircle].map((Icon, i) => (
              <span
                key={i}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/25 text-cream/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Icon className="h-4 w-4" />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-cream">Categorias</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            {CATEGORY_LIST.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/blog?categoria=${c.slug}`}
                  className="transition-colors hover:text-gold"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-cream">Site</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
            <li>
              <Link href="/" className="transition-colors hover:text-gold">
                Início
              </Link>
            </li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-gold">
                Todos os posts
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="transition-colors hover:text-gold">
                Sobre o blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-cream">Receba novidades</h4>
          <p className="mt-4 text-sm text-cream/70">
            Um resumo por e-mail quando sair conteúdo novo. Sem spam.
          </p>
          <form className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full min-w-0 rounded-lg border border-cream/25 bg-transparent px-3 py-2 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-lg bg-gold px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-cream"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-cream/10 px-6 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} Carro em Dia. Todos os direitos reservados.
      </div>
    </footer>
  );
}

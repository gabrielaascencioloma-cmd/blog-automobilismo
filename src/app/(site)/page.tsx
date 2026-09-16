import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { PostCard } from "@/components/PostCard";

const TICKER_ITEMS = [
  "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS", "NOVIDADES",
  "OLHA O CARRO", "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS",
  "NOVIDADES", "OLHA O CARRO",
];

export default async function Home() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col">

      {/* ── Ticker ─────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-border-subtle bg-red py-2.5">
        <div className="marquee-track">
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, i) => (
            <span key={i} className="mx-1 inline-flex items-center gap-4">
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                {item}
              </span>
              <svg className="h-3 w-3 opacity-40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
                <circle cx="12" cy="12" r="3.5" stroke="white" strokeWidth="2"/>
                <line x1="12" y1="2" x2="12" y2="8.5" stroke="white" strokeWidth="1.5"/>
                <line x1="12" y1="15.5" x2="12" y2="22" stroke="white" strokeWidth="1.5"/>
                <line x1="2" y1="12" x2="8.5" y2="12" stroke="white" strokeWidth="1.5"/>
                <line x1="15.5" y1="12" x2="22" y2="12" stroke="white" strokeWidth="1.5"/>
                <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" stroke="white" strokeWidth="1.5"/>
                <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" stroke="white" strokeWidth="1.5"/>
                <line x1="19.07" y1="4.93" x2="14.83" y2="9.17" stroke="white" strokeWidth="1.5"/>
                <line x1="9.17" y1="14.83" x2="4.93" y2="19.07" stroke="white" strokeWidth="1.5"/>
              </svg>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────── */}
      <section className="relative h-[65vh] min-h-[460px] max-h-[700px] overflow-hidden">
        <Image
          src="/photos/hero.jpg"
          alt="Seu carro merece atenção"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
        <div className="relative flex h-full items-end pb-14 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <h1 className="font-display text-4xl font-black uppercase leading-[0.9] text-white sm:text-5xl lg:text-6xl">
              Seu carro merece<br />
              atenção.<br />
              <span className="text-red">A gente te ajuda.</span>
            </h1>
            <Link
              href="/blog"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
            >
              Explorar artigos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Últimos Artigos ───────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between border-b-2 border-ink pb-3">
          <h2 className="font-display text-sm font-black uppercase tracking-[0.15em] text-ink">
            ✦ Últimos artigos
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-red hover:underline"
          >
            Todos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Card grande à esquerda */}
          {featured && <PostCard post={featured} featured />}

          {/* 2×2 pequenos à direita */}
          <div className="grid grid-cols-2 gap-6">
            {rest.slice(0, 4).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Image
          src="/photos/hero-cta.jpg"
          alt=""
          fill
          className="object-cover object-center"
          aria-hidden
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display mx-auto max-w-lg text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
            Carro parado é<br />dinheiro parado.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm text-white/60">
            Novos posts toda semana. Comece pelos mais lidos.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
          >
            Explorar o blog <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ── Mais Conteúdo ─────────────────────────────── */}
      {rest.length > 4 && (
        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="mb-8 flex items-center justify-between border-b-2 border-ink pb-3">
            <h2 className="font-display text-sm font-black uppercase tracking-[0.15em] text-ink">
              + Mais conteúdo
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.slice(4, 10).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Wrench, ListChecks, TriangleAlert, CalendarClock } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORY_LIST } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";

const CATEGORY_ICONS = {
  manutencao: Wrench,
  dicas: ListChecks,
  alertas: TriangleAlert,
  novidades: CalendarClock,
} as const;

const TICKER_ITEMS = [
  "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS", "NOVIDADES",
  "CARRO EM DIA", "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS",
  "NOVIDADES", "CARRO EM DIA",
];

export default async function Home() {
  const posts = await getAllPosts();


  return (
    <div className="flex flex-col">

      {/* ── Ticker ─────────────────────────────────────── */}
      <div className="overflow-hidden border-b border-border-subtle bg-red py-2.5">
        <div className="marquee-track">
          {/* Base items duplicated to guarantee width > 100vw on large screens */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS]
            .concat([...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS])
            .map((item, i) => (
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

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border-subtle bg-surface flex items-center">
        {/* Background image — full coverage */}
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src="/photos/Hero V2.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_25%]"
          />
          {/* Left gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/75 via-35% to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="py-10 md:w-[48%] md:py-12 lg:py-14">
            <span className="inline-block rounded-md bg-red px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-white">
              Carro em Dia
            </span>

            <h1 className="mt-5 font-display text-4xl font-black italic uppercase leading-[1.05] tracking-tighter text-ink sm:text-5xl lg:text-[4rem]">
              O blog que
              <br className="hidden sm:inline" />{" "}
              aproxima você do seu
              <br className="hidden sm:inline" />{" "}
              <span className="text-red">carro</span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Conteúdo confiável e prático para você entender
              manutenção, cuidados, tecnologia e segurança
              sem complicação.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
              >
                Descobrir conteúdos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#categorias"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 bg-white/70 px-6 py-3 text-sm font-bold text-ink backdrop-blur-sm transition-all hover:border-ink hover:bg-ink hover:text-white"
              >
                Explorar categorias <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Category pills */}
            <div className="mt-8 flex flex-wrap gap-2">
              {CATEGORY_LIST.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog?categoria=${cat.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-ink-soft backdrop-blur-sm transition-colors hover:border-red/40 hover:text-red"
                  >
                    <Icon className="h-3.5 w-3.5 text-red" />
                    {cat.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Grid de posts ─────────────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-12">

        {/* Cabeçalho editorial */}
        <div className="mb-8 flex items-center justify-between border-b-2 border-ink pb-3">
          <h2 className="font-display text-sm font-black uppercase tracking-[0.15em] text-ink">
            Últimos artigos
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold text-red hover:underline"
          >
            Ver todos <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* 3 colunas iguais */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post, i) => (
            <PostCard key={post.slug} post={post} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* ── Categorias ────────────────────────────────── */}
      <section id="categorias" className="scroll-mt-20 border-t border-border-subtle bg-surface-2">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="mb-8 border-b-2 border-ink pb-3">
            <h2 className="font-display text-sm font-black uppercase tracking-[0.15em] text-ink">
              Navegue por categoria
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_LIST.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/blog?categoria=${cat.slug}`}
                  className="group flex items-start gap-4 rounded-xl border border-border-subtle bg-surface p-5 transition-all hover:border-red/30 hover:shadow-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red/10 text-red">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-black uppercase text-ink group-hover:text-red transition-colors">
                      {cat.label}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-border-subtle">
        {/* Section Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/photos/img.webp"
            alt="Fundo da seção"
            fill
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl bg-red/60 backdrop-blur-md px-8 py-12 text-center shadow-2xl border border-red/20">
            <h2 className="font-display mx-auto max-w-lg text-3xl font-black uppercase leading-tight text-white sm:text-4xl">
              Carro parado é<br />dinheiro parado.
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-white/70">
              Novos posts toda semana. Comece pelos mais lidos.
            </p>
            <Link
              href="/blog"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-red transition-colors hover:bg-white/90"
            >
              Explorar o blog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

import Link from "next/link";
import { ArrowRight, Wrench, ListChecks, TriangleAlert, CalendarClock, DollarSign, FileText } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORY_LIST } from "@/lib/categories";
import { EditorialGrid, MixedSection, MosaicSection, TrendingStrip } from "@/components/home/sections";
import { TopicTiles } from "@/components/home/TopicTiles";
import { LeadCtaBand } from "@/components/home/LeadCtaBand";
import { InfiniteSections } from "@/components/home/InfiniteSections";

const CATEGORY_ICONS = {
  manutencao: Wrench,
  dicas: ListChecks,
  alertas: TriangleAlert,
  novidades: CalendarClock,
  financeiro: DollarSign,
  burocracia: FileText,
  seguranca: Wrench,
  comparativos: ListChecks,
  protecao: CalendarClock,
} as const;

const TICKER_ITEMS = [
  "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS", "NOVIDADES",
  "MEU CARRO PROTEGIDO", "MANUTENÇÃO", "DICAS PRÁTICAS", "ALERTAS",
  "NOVIDADES", "MEU CARRO PROTEGIDO",
];

// Reconstrói a home a cada 5 min para que posts agendados entrem no horário.
export const revalidate = 300;

export default async function Home() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 5);
  const editorial = posts.slice(5, 9);
  const mixed = posts.slice(9, 15);
  const rest = posts.slice(15);
  const mostRead = [...posts].filter((p) => p.views > 0).sort((a, b) => b.views - a.views).slice(0, 4);


  return (
    <div className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface flex items-center min-h-[480px]">
        {/* Background image — full coverage */}
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/photos/Hero V2.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
          />
          {/* Dark overlay on mobile for readability, left-side only on desktop */}
          <div className="absolute inset-0 bg-black/50 md:bg-transparent" />
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-black/60 via-black/30 via-50% to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
          <div className="py-12 md:w-[50%] md:py-14 lg:py-16">
            <h1 className="font-display text-3xl font-black italic uppercase leading-[1] tracking-tighter text-white sm:text-4xl lg:text-5xl">
              <span className="hero-line">Seu carro merece</span>
              <span className="hero-line">atenção.</span>
              <span className="hero-line">A gente te ajuda.</span>
            </h1>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Dicas de manutenção, alertas importantes, novidades do
              mercado e tudo que você precisa saber pra cuidar bem
              do seu carro. Explicado de forma simples e direta.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="btn-3d inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold"
              >
                Descobrir conteúdos <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Category pills — compactos, alinhados à largura do H1 */}
            <div className="mt-6 flex flex-wrap gap-2">
              {CATEGORY_LIST.slice(0, 3).map((cat, i) => {
                const Icon = CATEGORY_ICONS[cat.slug];
                return (
                  <Link
                    key={cat.slug}
                    href={`/blog?categoria=${cat.slug}`}
                    className="hero-line btn-3d-light group inline-flex items-center gap-2 rounded-full px-5 py-2.5"
                    style={{ animationDelay: `${0.5 + i * 0.12}s` }}
                  >
                    <Icon className="h-4 w-4 text-red" />
                    <span className="text-[13px] font-bold text-ink group-hover:text-red">
                      {cat.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

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

      {/* ── Ritmo da home: quente → morno → quente… ─────── */}
      {/* QUENTE: o que acabou de sair */}
      <MosaicSection posts={latest} eyebrow="Acabou de sair" title="Em alta agora" />

      {/* MORNO: ranking dos mais lidos */}
      <TrendingStrip posts={mostRead} />

      {/* MORNO: atalhos por assunto */}
      <TopicTiles posts={posts} />

      {/* QUENTE: grade editorial */}
      <EditorialGrid posts={editorial} eyebrow="Fresquinhos" title="Últimas do blog" />

      {/* PAUSA: chamada para a avaliação gratuita */}
      <LeadCtaBand />

      {/* MISTA: destaque + lista + cards */}
      <MixedSection posts={mixed} eyebrow="Para ler com calma" title="Guias e explicações" />

      {/* Depois disso, novos blocos entram conforme a pessoa rola */}
      <InfiniteSections posts={rest} />

    </div>
  );
}

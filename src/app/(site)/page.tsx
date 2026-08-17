import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Wrench, ListChecks, TriangleAlert, CalendarClock } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORIES, CATEGORY_LIST } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";
import { PhotoCover } from "@/components/PhotoCover";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate } from "@/lib/format";

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
  const [featured, second, ...rest] = posts;

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

      {/* ── Destaque principal ────────────────────────── */}
      {featured && (
        <section className="border-b border-border-subtle bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <PhotoCover
                  src={featured.cover ?? CATEGORIES[featured.category].coverImage}
                  alt={featured.title}
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div>
                <CategoryBadge category={featured.category} linked={false} />
                <h2 className="mt-3 font-display text-2xl font-black uppercase leading-tight text-ink transition-colors group-hover:text-red sm:text-3xl lg:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-ink-faint">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  <span aria-hidden>·</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {featured.readingMinutes} min de leitura
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-red">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

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
          {second && <PostCard post={second} featured />}
          {rest.slice(0, 5).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── Categorias ────────────────────────────────── */}
      <section className="border-t border-border-subtle bg-surface-2">
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
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-2xl bg-red px-8 py-12 text-center">
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

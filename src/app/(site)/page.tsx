import Link from "next/link";
import { ArrowRight, Wrench, ListChecks, TriangleAlert, CalendarClock, ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORIES } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";
import { PhotoCover } from "@/components/PhotoCover";

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

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-end">
        <PhotoCover
          src="/photos/hero.jpg"
          alt="Carro popular estacionado em uma rua ao entardecer"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 sm:pb-24">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            — Blog automotivo
          </p>
          <h1 className="font-display max-w-4xl text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-[0.88] tracking-tight text-white">
            CARRO<br />EM DIA
          </h1>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">
            Manutenção, dicas práticas e alertas para quem depende do carro todos os dias.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
            >
              Ver últimos posts
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white/80 transition-colors hover:bg-white/10"
            >
              Sobre o blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Ticker ───────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-border-subtle bg-red py-3">
        <div className="marquee-track">
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, i) => (
            <span key={i} className="mx-1 inline-flex items-center gap-4">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white">
                {item}
              </span>
              <span className="text-white/40 text-xs">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Latest Posts — bento grid ─────────────────────── */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red">
              Últimos posts
            </p>
            <h2 className="font-display text-3xl font-black uppercase text-ink">
              Direto ao ponto
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft transition-colors hover:text-ink"
          >
            Ver todos
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bento: 1 grande + 4 menores */}
        <div className="grid items-stretch gap-4 lg:grid-cols-3">
          {featured && (
            <div className="flex lg:col-span-2">
              <PostCard post={featured} featured />
            </div>
          )}
          <div className="flex flex-col gap-4">
            {second && <PostCard post={second} />}
            {rest[0] && <PostCard post={rest[0]} />}
          </div>
        </div>

        {rest.slice(1, 3).length > 0 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {rest.slice(1, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>

      {/* ── Categories ───────────────────────────────────── */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10">
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-red">
              Categorias
            </p>
            <h2 className="font-display text-3xl font-black uppercase text-ink">
              Sobre o que a gente escreve
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(CATEGORIES).map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/blog?categoria=${cat.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition-all duration-300 hover:border-red/40 hover:bg-surface-2"
                >
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red/10 text-red">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-black uppercase text-ink">
                    {cat.label}
                  </h3>
                  <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                    {cat.description}
                  </p>
                  <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-ink-faint transition-all group-hover:text-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="border-t border-border-subtle">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-red px-10 py-14 text-center">
            <h2 className="font-display mx-auto max-w-xl text-4xl font-black uppercase leading-tight text-white sm:text-5xl">
              Carro parado é<br />dinheiro parado.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
              Novos posts toda semana. Comece pelos mais lidos.
            </p>
            <Link
              href="/blog"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-red transition-colors hover:bg-white/90"
            >
              Explorar o blog
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

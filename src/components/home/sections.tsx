// Seções da home. Alternam blocos "quentes" (visuais, cards grandes)
// com blocos "mornos" (listas compactas) para manter o ritmo de leitura.
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, Eye } from "lucide-react";
import type { PostSummary } from "@/lib/data/posts";
import { CATEGORIES } from "@/lib/categories";
import { formatDate } from "@/lib/format";
import { CategoryBadge } from "@/components/CategoryBadge";

export function coverOf(post: PostSummary) {
  return post.cover ?? CATEGORIES[post.category].coverImage;
}

/* ── Peças ─────────────────────────────────────────────── */

export function SectionHeader({
  eyebrow,
  title,
  href = "/blog",
  linkLabel = "Ver todos",
}: {
  eyebrow?: string;
  title: string;
  href?: string | null;
  linkLabel?: string;
}) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <div>
        {eyebrow && (
          <p className="mb-2 font-nav text-[11px] font-bold uppercase tracking-[0.22em] text-red">{eyebrow}</p>
        )}
        <div className="flex items-center gap-3">
          <span className="h-6 w-1.5 rounded-full bg-red" aria-hidden="true" />
          <h2 className="font-display text-2xl font-black uppercase tracking-[0.06em] text-ink md:text-3xl">
            {title}
          </h2>
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="btn-3d-light hidden shrink-0 items-center gap-1 rounded-full px-4 py-2 text-xs font-bold !text-red sm:inline-flex"
        >
          {linkLabel} <ArrowUpRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

function Meta({ post, light = false }: { post: PostSummary; light?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 text-xs ${light ? "text-white/70" : "text-ink-faint"}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3 w-3" />
        {post.readingMinutes} min
      </span>
    </div>
  );
}

// Card com a foto ocupando tudo e o texto por cima.
export function OverlayCard({
  post,
  size = "md",
  className = "",
}: {
  post: PostSummary;
  size?: "xl" | "lg" | "md";
  className?: string;
}) {
  const title =
    size === "xl" ? "text-2xl md:text-4xl" : size === "lg" ? "text-xl md:text-2xl" : "text-[15px] md:text-base";
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group relative isolate flex min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl bg-ink shadow-[0_20px_40px_-24px_rgba(0,0,0,0.6)] ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={coverOf(post)}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/35 to-black/0" />
      <div className={size === "xl" ? "p-6 md:p-8" : "p-5"}>
        <CategoryBadge category={post.category} linked={false} className="mb-3 !bg-white/90 backdrop-blur" />
        <h3
          className={`font-display font-black uppercase leading-[1.08] text-white transition-colors group-hover:text-white/85 ${title} ${
            "line-clamp-3"
          }`}
        >
          {post.title}
        </h3>
        {size === "xl" && <p className="mt-3 line-clamp-2 max-w-xl text-sm text-white/75 md:text-base">{post.excerpt}</p>}
        <div className="mt-3">
          <Meta post={post} light />
        </div>
      </div>
    </Link>
  );
}

// Linha compacta: miniatura + texto.
export function CompactRow({ post, rank }: { post: PostSummary; rank?: number }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex items-center gap-4">
      <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-ink sm:h-24 sm:w-28">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={coverOf(post)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {rank !== undefined && (
          <span className="absolute -right-0 -top-0 flex h-7 w-7 items-center justify-center rounded-bl-xl bg-red font-nav text-xs font-bold text-white">
            {rank}
          </span>
        )}
      </div>
      <div className="min-w-0">
        <p className="font-nav text-[10px] font-bold uppercase tracking-[0.16em] text-red">
          {CATEGORIES[post.category].label}
        </p>
        <h3 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-ink transition-colors group-hover:text-red">
          {post.title}
        </h3>
        <time dateTime={post.date} className="mt-1.5 block text-xs text-ink-faint">
          {new Date(`${post.date}T00:00:00`).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
        </time>
      </div>
    </Link>
  );
}

/* ── Seções ───────────────────────────────────────────── */

// QUENTE — 1 grande + 4 menores com o texto sobre a foto.
export function MosaicSection({ posts, eyebrow, title }: { posts: PostSummary[]; eyebrow?: string; title: string }) {
  if (posts.length === 0) return null;
  const [main, ...rest] = posts;
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
        <OverlayCard post={main} size="xl" className="min-h-[380px] md:col-span-2 lg:row-span-2 lg:min-h-[520px]" />
        {rest.slice(0, 4).map((post) => (
          <OverlayCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

// MORNA — ranking numerado dos mais lidos, em faixa branca.
export function TrendingStrip({ posts }: { posts: PostSummary[] }) {
  if (posts.length < 3) return null;
  return (
    <section className="border-y border-border-subtle bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <SectionHeader eyebrow="O que todo mundo está lendo" title="Mais lidos" />
        <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((post, i) => (
            <CompactRow key={post.slug} post={post} rank={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// QUENTE/EDITORIAL — grade de 4 colunas com resumo e "Ler mais".
export function EditorialGrid({ posts, eyebrow, title }: { posts: PostSummary[]; eyebrow?: string; title: string }) {
  if (posts.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div
        className="grid overflow-hidden rounded-2xl border border-border-subtle bg-white sm:grid-cols-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        // Com menos de 4 posts, cada coluna mantém a largura normal (sem foto gigante).
        style={
          {
            "--cols": Math.min(posts.length, 4),
            maxWidth: posts.length < 4 ? `${posts.length * 288}px` : undefined,
          } as React.CSSProperties
        }
      >
        {posts.slice(0, 4).map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col border-border-subtle p-5 transition-colors hover:bg-surface-2 [&:not(:last-child)]:border-b sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverOf(post)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 font-nav text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                {CATEGORIES[post.category].label}
              </span>
            </div>
            <h3 className="mt-4 line-clamp-3 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-red">
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 font-nav text-[11px] font-bold uppercase tracking-[0.16em] text-ink underline decoration-red decoration-2 underline-offset-4 group-hover:text-red">
              Ler mais <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// MISTA — destaque alto + lista compacta + dois cards empilhados.
export function MixedSection({ posts, eyebrow, title }: { posts: PostSummary[]; eyebrow?: string; title: string }) {
  if (posts.length < 3) return null;
  const [main, ...rest] = posts;
  const list = rest.slice(0, 3);
  const side = rest.slice(3, 5);
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr_1fr]">
        <OverlayCard post={main} size="lg" className="min-h-[420px]" />
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-5 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.35)]">
          {list.map((post) => (
            <CompactRow key={post.slug} post={post} />
          ))}
        </div>
        {side.length > 0 && (
          <div className="grid gap-6">
            {side.map((post) => (
              <OverlayCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// MORNA — "Populares" em lista ao lado de dois destaques verticais.
export function PopularSplit({
  popular,
  features,
  title,
}: {
  popular: PostSummary[];
  features: PostSummary[];
  title: string;
}) {
  if (popular.length === 0 && features.length === 0) return null;
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
        <div>
          <SectionHeader title={title} href={null} />
          <div className="space-y-5">
            {popular.slice(0, 4).map((post, i) => (
              <CompactRow key={post.slug} post={post} rank={i + 1} />
            ))}
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.slice(0, 2).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={coverOf(post)}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-ink px-2 py-1 font-nav text-[10px] font-bold uppercase tracking-[0.14em] text-white">
                  {CATEGORIES[post.category].label}
                </span>
              </div>
              <h3 className="mt-4 line-clamp-2 text-xl font-bold leading-snug text-ink group-hover:text-red">
                {post.title}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-ink-soft">{post.excerpt}</p>
              {post.views > 0 && (
                <span className="mt-2 inline-flex items-center gap-1 text-xs text-ink-faint">
                  <Eye className="h-3.5 w-3.5" /> {post.views.toLocaleString("pt-BR")} leituras
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { CalendarClock, Eye, FileEdit, FileText, Layers, Pencil, Plus, Search, ExternalLink, X } from "lucide-react";
import type { Post } from "@prisma/client";
import { CATEGORIES } from "@/lib/categories";
import { DeletePostButton } from "./DeletePostButton";
import { PeriodFilter } from "./PeriodFilter";
import { FilterCard, PageHeader, PageShell, Panel, btnGlow } from "./premium";
import { formatPublishDate, resolvePeriod } from "../lib/period";
import { CATEGORY_COLORS } from "../dashboard/colors";

type StatusKey = "todos" | "publicados" | "agendados" | "rascunhos";

export type PostsParams = { periodo?: string; de?: string; ate?: string; status?: string; q?: string };

const CATEGORY_KEYS = Object.keys(CATEGORIES);
const categoryColor = (slug: string) => CATEGORY_COLORS[Math.max(CATEGORY_KEYS.indexOf(slug), 0) % CATEGORY_COLORS.length];

function statusOf(post: Post, now: Date): Exclude<StatusKey, "todos"> {
  if (post.status === "DRAFT") return "rascunhos";
  return post.publishAt > now ? "agendados" : "publicados";
}

const STATUS_STYLE: Record<Exclude<StatusKey, "todos">, { text: string; pill: string; dot: string }> = {
  publicados: {
    text: "Publicado",
    pill: "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20",
    dot: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]",
  },
  agendados: {
    text: "Agendado",
    pill: "bg-amber-500/10 text-amber-300 ring-amber-400/20",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]",
  },
  rascunhos: { text: "Rascunho", pill: "bg-white/[0.05] text-zinc-400 ring-white/10", dot: "bg-zinc-400" },
};

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function PostsView({
  allPosts,
  params,
  basePath = "/admin/posts",
}: {
  allPosts: Post[];
  params: PostsParams;
  basePath?: string;
}) {
  const now = new Date();
  const status: StatusKey = (["publicados", "agendados", "rascunhos"] as const).includes(params.status as never)
    ? (params.status as StatusKey)
    : "todos";
  const q = (params.q ?? "").trim();

  // Período (filtro da Keylle): só publicados/agendados dentro dele, do mais recente ao mais antigo.
  const period = resolvePeriod(params);
  const inPeriod = period
    ? allPosts
        .filter((p) => p.status === "PUBLISHED" && p.publishAt >= period.start && p.publishAt <= period.end)
        .sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime())
    : allPosts;
  const searched = q ? inPeriod.filter((p) => normalize(`${p.title} ${p.slug}`).includes(normalize(q))) : inPeriod;

  const counts = {
    todos: searched.length,
    publicados: searched.filter((p) => statusOf(p, now) === "publicados").length,
    agendados: searched.filter((p) => statusOf(p, now) === "agendados").length,
    rascunhos: searched.filter((p) => statusOf(p, now) === "rascunhos").length,
  };
  const posts = status === "todos" ? searched : searched.filter((p) => statusOf(p, now) === status);
  const maxViews = Math.max(...posts.map((p) => p.views), 1);

  const href = (patch: Partial<PostsParams>) => {
    const merged = { periodo: params.periodo, de: params.de, ate: params.ate, status: params.status, q: params.q, ...patch };
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) sp.set(k, v);
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Conteúdo"
        title="Posts"
        subtitle={
          <>
            {allPosts.length} no total
            {period && <span className="text-emerald-400"> · {inPeriod.length} em {period.label}</span>}
            {q && <span className="text-sky-300"> · busca: “{q}”</span>}
          </>
        }
        actions={
          <>
            <PeriodFilter
              periodo={period ? (params.periodo ?? "") : ""}
              de={params.de ?? ""}
              ate={params.ate ?? ""}
              basePath={basePath}
              keep={{ status: params.status, q: params.q }}
            />
            <Link href="/admin/posts/new" className={btnGlow}>
              <Plus className="h-4 w-4" /> Novo post
            </Link>
          </>
        }
      />

      {/* Filtros por status */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 2xl:gap-4">
        <FilterCard href={href({ status: undefined })} active={status === "todos"} label="Todos" count={counts.todos} icon={Layers} tone="text-zinc-200" ring="from-white/50 to-white/10" delay={40} />
        <FilterCard href={href({ status: "publicados" })} active={status === "publicados"} label="Publicados" count={counts.publicados} icon={FileText} tone="text-emerald-300" ring="from-emerald-300 to-emerald-700/30" delay={90} />
        <FilterCard href={href({ status: "agendados" })} active={status === "agendados"} label="Agendados" count={counts.agendados} icon={CalendarClock} tone="text-amber-300" ring="from-amber-300 to-amber-700/30" delay={140} />
        <FilterCard href={href({ status: "rascunhos" })} active={status === "rascunhos"} label="Rascunhos" count={counts.rascunhos} icon={FileEdit} tone="text-zinc-300" ring="from-zinc-300 to-zinc-600/30" delay={190} />
      </div>

      <Panel className="mt-4" delay={240}>
        {/* Busca */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-4 2xl:px-6">
          <form action={basePath} method="get" className="relative w-full max-w-md">
            {params.periodo && <input type="hidden" name="periodo" value={params.periodo} />}
            {params.de && <input type="hidden" name="de" value={params.de} />}
            {params.ate && <input type="hidden" name="ate" value={params.ate} />}
            {params.status && <input type="hidden" name="status" value={params.status} />}
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Buscar por título ou endereço…"
              className="h-11 w-full rounded-xl border border-white/10 bg-black/30 pl-10 pr-10 text-sm text-zinc-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
            {q && (
              <a href={href({ q: undefined })} title="Limpar busca" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="h-4 w-4" />
              </a>
            )}
          </form>
          <p className="text-xs text-zinc-500">
            {posts.length} {posts.length === 1 ? "post" : "posts"}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
              <Search className="h-5 w-5 text-zinc-500" />
            </span>
            <p className="mt-4 text-sm text-zinc-300">Nenhum post encontrado.</p>
            <p className="mt-1 text-xs text-zinc-500">Tente outro filtro, período ou termo de busca.</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {posts.map((post) => {
              const st = statusOf(post, now);
              const style = STATUS_STYLE[st];
              const cover = post.coverUrl ?? CATEGORIES[post.category]?.coverImage;
              const color = categoryColor(post.category);
              return (
                <li key={post.id} className="group relative transition-colors hover:bg-white/[0.025]">
                  <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="grid grid-cols-[4.5rem_1fr] items-center gap-4 px-5 py-4 md:grid-cols-[5.5rem_minmax(0,1fr)_8rem_11rem_8rem_auto] 2xl:px-6">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-black ring-1 ring-white/10"
                    >
                      {cover && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cover} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      )}
                    </Link>

                    <div className="min-w-0">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="line-clamp-2 text-[15px] font-medium leading-snug text-zinc-100 transition-colors hover:text-emerald-300"
                      >
                        {post.title}
                      </Link>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <span className="inline-flex items-center gap-1.5 text-zinc-400">
                          <span className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                          {CATEGORIES[post.category]?.label ?? post.category}
                        </span>
                        <span className="truncate text-zinc-600">/blog/{post.slug}</span>
                      </div>
                      {/* No celular: status e data aqui embaixo */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
                        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${style.pill}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} /> {style.text}
                        </span>
                        {post.status !== "DRAFT" && <span className="text-[11px] text-zinc-500">{formatPublishDate(post.publishAt)}</span>}
                      </div>
                    </div>

                    <span className={`hidden w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 md:inline-flex ${style.pill}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
                      {style.text}
                    </span>

                    <span className="hidden text-xs md:block">
                      {post.status === "DRAFT" ? (
                        <span className="text-zinc-600">—</span>
                      ) : (
                        <span className={st === "agendados" ? "text-amber-200" : "text-zinc-300"}>{formatPublishDate(post.publishAt)}</span>
                      )}
                    </span>

                    <div className="hidden md:block">
                      <span className="flex items-center gap-1.5 text-sm font-semibold tabular-nums text-white">
                        <Eye className="h-3.5 w-3.5 text-zinc-500" />
                        {post.views > 0 ? post.views.toLocaleString("pt-BR") : <span className="font-normal text-zinc-600">—</span>}
                      </span>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className="bar-fill h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-300"
                          style={{ width: `${Math.round((post.views / maxViews) * 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-end gap-1 md:col-span-1 md:opacity-40 md:transition-opacity md:group-hover:opacity-100">
                      {st === "publicados" && (
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver no blog"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Editar
                      </Link>
                      <DeletePostButton postId={post.id} />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Panel>
    </PageShell>
  );
}

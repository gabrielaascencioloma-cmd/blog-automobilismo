import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Eye, FileText, Pencil, CalendarClock, ExternalLink, Plus } from "lucide-react";
import { getDashboardStats } from "@/lib/data/analytics";
import { CATEGORIES } from "@/lib/categories";
import { card, btnPrimary, btnGhost, pageHeader, pageTitle, pageSubtitle } from "../components/ui";

export const metadata: Metadata = { title: "Dashboard · Admin" };

function categoryLabel(slug: string) {
  return CATEGORIES[slug as keyof typeof CATEGORIES]?.label ?? slug;
}

function StatCard({
  label,
  hint,
  value,
  sub,
  icon: Icon,
  href,
  linkLabel,
}: {
  label: string;
  hint: string;
  value: number;
  sub?: string;
  icon: React.ElementType;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className={`${card} flex flex-col p-5`}>
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] ring-1 ring-white/[0.06]">
          <Icon className="h-[18px] w-[18px] text-zinc-300" />
        </span>
        <div>
          <p className="text-sm font-semibold text-zinc-100">{label}</p>
          <p className="text-xs text-zinc-500">{hint}</p>
        </div>
      </div>
      <p className="mt-5 text-3xl font-bold tracking-tight text-white">{value.toLocaleString("pt-BR")}</p>
      {sub && <p className="mt-1 text-xs font-medium text-emerald-400">{sub}</p>}
      <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
        {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const maxMonth = Math.max(...stats.monthlyGrowth.map((m) => m.count), 1);
  const maxViews = Math.max(...stats.topPosts.map((p) => p.views), 1);
  const categories = Object.values(CATEGORIES);

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <div className={pageHeader}>
        <div>
          <h1 className={pageTitle}>Visão geral</h1>
          <p className={pageSubtitle}>Resumo do blog Meu Carro Protegido</p>
        </div>
        <div className="flex gap-2">
          <a
            href="https://vercel.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
            className={btnGhost}
          >
            <ExternalLink className="h-4 w-4" /> Vercel Analytics
          </a>
          <Link href="/admin/posts/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Novo post
          </Link>
        </div>
      </div>

      {/* Cards de números */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative flex flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-5 shadow-lg shadow-emerald-900/30">
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
              <Eye className="h-[18px] w-[18px] text-white" />
            </span>
            <div>
              <p className="text-sm font-semibold text-white">Visualizações</p>
              <p className="text-xs text-emerald-50/80">Leituras de todos os posts</p>
            </div>
          </div>
          <p className="relative mt-5 text-3xl font-bold tracking-tight text-white">
            {stats.totalViews.toLocaleString("pt-BR")}
          </p>
          <Link
            href="#mais-lidos"
            className="relative mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-white/90 transition-colors hover:text-white"
          >
            Ver mais lidos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <StatCard
          label="Publicados"
          hint="No ar agora"
          value={stats.publishedPosts}
          sub={`${stats.totalPosts} posts no total`}
          icon={FileText}
          href="/admin/posts"
          linkLabel="Ver posts"
        />
        <StatCard
          label="Agendados"
          hint="Com data futura"
          value={stats.scheduledPosts}
          icon={CalendarClock}
          href="/admin/posts"
          linkLabel="Ver agenda"
        />
        <StatCard
          label="Rascunhos"
          hint="Aguardando publicação"
          value={stats.draftPosts}
          icon={Pencil}
          href="/admin/posts"
          linkLabel="Revisar"
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        {/* Posts por mês */}
        <div className={`${card} p-6 lg:col-span-2`}>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Posts publicados</h2>
              <p className="mt-0.5 text-xs text-zinc-500">Últimos 6 meses</p>
            </div>
            <p className="text-2xl font-bold text-white">
              {stats.monthlyGrowth.reduce((s, m) => s + m.count, 0)}
            </p>
          </div>
          <div className="mt-6 flex h-48 items-end gap-3 border-b border-white/[0.06] pb-1 sm:gap-5">
            {stats.monthlyGrowth.map((m) => (
              <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <span className="text-xs font-semibold text-zinc-300">{m.count > 0 ? m.count : ""}</span>
                <div
                  className={`w-full max-w-14 rounded-t-lg ${m.count === 0 ? "bg-white/[0.06]" : "bg-emerald-500"}`}
                  style={{ height: `${Math.max(6, Math.round((m.count / maxMonth) * 150))}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3 sm:gap-5">
            {stats.monthlyGrowth.map((m) => (
              <span key={m.month} className="flex-1 text-center text-[11px] capitalize text-zinc-500">
                {m.month.replace(/\.? de /, "/")}
              </span>
            ))}
          </div>
        </div>

        {/* Por categoria */}
        <div className={`${card} p-6`}>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-zinc-500" />
            <h2 className="text-base font-semibold text-white">Por categoria</h2>
          </div>
          <div className="mt-6 space-y-4">
            {categories.map((cat) => {
              const count = stats.postsByCategory.find((c) => c.category === cat.slug)?.count ?? 0;
              const pct = Math.round((count / (stats.publishedPosts || 1)) * 100);
              return (
                <div key={cat.slug}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="text-zinc-300">{cat.label}</span>
                    <span className="text-xs text-zinc-500">
                      {count} post{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mais lidos */}
      <div id="mais-lidos" className={`${card} mt-4 scroll-mt-6`}>
        <div className="flex items-center justify-between px-6 py-5">
          <h2 className="text-base font-semibold text-white">Artigos mais lidos</h2>
          <Link href="/admin/posts" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
            Ver todos <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {stats.topPosts.length === 0 ? (
          <div className="border-t border-white/[0.06] px-6 py-12 text-center text-sm text-zinc-500">
            Nenhuma leitura registrada ainda. Os números aparecem aqui conforme o blog recebe visitas.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-y border-white/[0.06] text-xs text-zinc-500">
                <tr>
                  <th className="px-6 py-3 font-medium">#</th>
                  <th className="px-3 py-3 font-medium">Artigo</th>
                  <th className="hidden px-3 py-3 font-medium md:table-cell">Categoria</th>
                  <th className="hidden px-3 py-3 font-medium sm:table-cell">Publicado</th>
                  <th className="px-3 py-3 text-right font-medium">Leituras</th>
                  <th className="w-10 px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {stats.topPosts.map((post, i) => (
                  <tr key={post.slug} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 font-semibold text-zinc-600">{i + 1}</td>
                    <td className="max-w-xs px-3 py-4">
                      <p className="truncate font-medium text-zinc-100">{post.title}</p>
                      <div className="mt-2 h-1 w-full max-w-[180px] rounded-full bg-white/[0.06]">
                        <div
                          className="h-1 rounded-full bg-emerald-500"
                          style={{ width: `${Math.round((post.views / maxViews) * 100)}%` }}
                        />
                      </div>
                    </td>
                    <td className="hidden px-3 py-4 text-zinc-400 md:table-cell">{categoryLabel(post.category)}</td>
                    <td className="hidden px-3 py-4 text-zinc-400 sm:table-cell">
                      {post.publishAt.toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-3 py-4 text-right font-semibold text-white">
                      {post.views.toLocaleString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/posts/${post.id}/edit`}
                        title="Editar"
                        className="inline-flex text-zinc-500 transition-colors hover:text-white"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

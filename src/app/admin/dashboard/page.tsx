import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Eye, FileText, TrendingUp, ExternalLink, Pencil } from "lucide-react";
import { getDashboardStats } from "@/lib/data/analytics";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = { title: "Dashboard · Admin" };

const CATEGORY_LABELS: Record<string, string> = {
  manutencao: "Manutenção",
  dicas: "Dicas",
  alertas: "Alertas",
  novidades: "Novidades",
};

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 p-5">
      <div className="flex items-start justify-between">
        <p className="text-sm text-slate-400">{label}</p>
        <span className={`rounded-lg p-2 ${accent ?? "bg-slate-700"}`}>
          <Icon className="h-4 w-4 text-slate-300" />
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value.toLocaleString("pt-BR")}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const maxMonth = Math.max(...stats.monthlyGrowth.map((m) => m.count), 1);
  const maxViews = Math.max(...stats.topPosts.map((p) => p.views), 1);

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-400">
            Performance do blog Olha o Carro
          </p>
        </div>
        <a
          href="https://vercel.com/lomapv/blog-automobilismo/analytics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-600 hover:text-white"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Vercel Analytics
        </a>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Visualizações totais"
          value={stats.totalViews}
          sub="Leituras registradas no banco"
          icon={Eye}
          accent="bg-blue-900/50"
        />
        <StatCard
          label="Posts publicados"
          value={stats.publishedPosts}
          sub={`${stats.scheduledPosts} agendados`}
          icon={FileText}
          accent="bg-emerald-900/50"
        />
        <StatCard
          label="Rascunhos"
          value={stats.draftPosts}
          sub="Aguardando publicação"
          icon={Pencil}
          accent="bg-amber-900/50"
        />
        <StatCard
          label="Total de posts"
          value={stats.totalPosts}
          sub="Todos os status"
          icon={BarChart3}
          accent="bg-violet-900/50"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Monthly growth chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-700 bg-slate-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Posts publicados por mês
            </h2>
          </div>
          <div className="flex items-end gap-3 h-36">
            {stats.monthlyGrowth.map((m) => (
              <div key={m.month} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-xs font-bold text-white">{m.count > 0 ? m.count : ""}</span>
                <div
                  className="w-full rounded-t-md bg-blue-500 transition-all"
                  style={{
                    height: `${Math.max(4, Math.round((m.count / maxMonth) * 120))}px`,
                    opacity: m.count === 0 ? 0.25 : 1,
                    backgroundColor: m.count === 0 ? undefined : undefined,
                  }}
                />
                <span className="text-[10px] text-slate-500 capitalize">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts by category */}
        <div className="rounded-xl border border-slate-700 bg-slate-800 p-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Por categoria
            </h2>
          </div>
          <div className="space-y-3">
            {Object.keys(CATEGORY_LABELS).map((cat) => {
              const found = stats.postsByCategory.find((c) => c.category === cat);
              const count = found?.count ?? 0;
              const total = stats.publishedPosts || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={cat}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-slate-300">{CATEGORY_LABELS[cat]}</span>
                    <span className="text-slate-500">{count} post{count !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-700">
                    <div
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top posts by views */}
      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800">
        <div className="flex items-center justify-between border-b border-slate-700 px-6 py-4">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
              Artigos mais lidos
            </h2>
          </div>
          <Link
            href="/admin/posts"
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            Ver todos →
          </Link>
        </div>

        {stats.topPosts.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            Nenhuma visualização registrada ainda. As leituras aparecem aqui conforme o blog
            recebe visitas.
          </div>
        ) : (
          <div className="divide-y divide-slate-700/60">
            {stats.topPosts.map((post, i) => (
              <div key={post.slug} className="flex items-center gap-4 px-6 py-4">
                <span className="w-5 shrink-0 text-right text-sm font-bold text-slate-600">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-slate-200">{post.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500 capitalize">
                    {CATEGORY_LABELS[post.category] ?? post.category} ·{" "}
                    {post.publishAt.toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-white">
                    {post.views.toLocaleString("pt-BR")}
                  </p>
                  <p className="text-xs text-slate-500">views</p>
                </div>
                <div className="w-20 shrink-0">
                  <div className="h-1.5 w-full rounded-full bg-slate-700">
                    <div
                      className="h-1.5 rounded-full bg-blue-500"
                      style={{ width: `${Math.round((post.views / maxViews) * 100)}%` }}
                    />
                  </div>
                </div>
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-slate-500 hover:text-slate-300 transition-colors"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Vercel Analytics info */}
      <div className="mt-6 rounded-xl border border-slate-700 bg-slate-800/50 p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Vercel Analytics ativo</p>
            <p className="mt-1 text-xs text-slate-400 max-w-xl">
              O rastreamento de visitantes reais (sessões únicas, origem do tráfego, dispositivos,
              Web Vitals) está ativo via Vercel Analytics. Os dados completos ficam no painel da
              Vercel, acessível pelo botão acima.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

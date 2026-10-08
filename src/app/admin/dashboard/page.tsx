import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  CalendarDays,
  Eye,
  FileText,
  Pencil,
  Plus,
  Users,
  ExternalLink,
  BarChart3,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { getDashboardStats } from "@/lib/data/analytics";
import { CATEGORIES } from "@/lib/categories";
import { btnGhost } from "../components/ui";
import { IconTile, Panel, PanelTitle, btnGlow } from "../components/premium";
import { ActivityCalendar, AreaSpark, Bars3D, CountUp, Donut3D, MiniBars } from "./charts";
import { CATEGORY_COLORS } from "./colors";

export const metadata: Metadata = { title: "Dashboard · Admin" };
export const dynamic = "force-dynamic";

const TZ = "America/Sao_Paulo";

function categoryLabel(slug: string) {
  return CATEGORIES[slug as keyof typeof CATEGORIES]?.label ?? slug;
}

function categoryCover(slug: string) {
  return CATEGORIES[slug as keyof typeof CATEGORIES]?.coverImage ?? "";
}

function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}

function Kpi({
  label,
  hint,
  value,
  foot,
  chart,
  icon,
  tone,
  glow,
  href,
  linkLabel,
  delay,
}: {
  label: string;
  hint: string;
  value: number;
  foot?: React.ReactNode;
  chart?: React.ReactNode;
  icon: React.ElementType;
  tone: string;
  glow: string;
  href: string;
  linkLabel: string;
  delay: number;
}) {
  return (
    <Panel glow={glow} delay={delay}>
      <div className="flex h-full flex-col p-5 2xl:p-6">
        <div className="flex items-center gap-3">
          <IconTile icon={icon} tone={tone} />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">{label}</p>
            <p className="truncate text-xs text-zinc-500">{hint}</p>
          </div>
        </div>
        <div className="mt-5 flex items-end justify-between gap-3">
          <p className="text-4xl font-semibold tabular-nums tracking-tight text-white 2xl:text-5xl">
            <CountUp value={value} />
          </p>
          {chart && <div className="w-24 shrink-0 2xl:w-28">{chart}</div>}
        </div>
        <div className="mt-2 min-h-5 text-xs">{foot}</div>
        <Link
          href={href}
          className="group mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          {linkLabel} <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </Panel>
  );
}

function greeting() {
  const hour = Number(new Intl.DateTimeFormat("pt-BR", { timeZone: TZ, hour: "numeric", hour12: false }).format(new Date()));
  if (hour < 5) return "Boa madrugada";
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const today = new Date().toLocaleDateString("pt-BR", { timeZone: TZ, weekday: "long", day: "numeric", month: "long" });
  const updatedAt = new Date().toLocaleTimeString("pt-BR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  const yearPosts = stats.monthlyGrowth.reduce((s, m) => s + m.count, 0);
  const thisMonth = stats.monthlyGrowth[stats.monthlyGrowth.length - 1]?.count ?? 0;
  const lastMonth = stats.monthlyGrowth[stats.monthlyGrowth.length - 2]?.count ?? 0;
  const maxViews = Math.max(...stats.topPosts.map((p) => p.views), 1);
  const leads14 = stats.leads.daily.reduce((a, b) => a + b, 0);

  const segments = Object.values(CATEGORIES)
    .map((cat, i) => ({
      label: cat.label,
      value: stats.postsByCategory.find((c) => c.category === cat.slug)?.count ?? 0,
      color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    }))
    .sort((a, b) => b.value - a.value);
  const podium = stats.topPosts.slice(0, 3);
  const rest = stats.topPosts.slice(3);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Atmosfera de fundo */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-400/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[24rem] w-[40rem] rounded-full bg-sky-500/[0.04] blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[2200px] px-5 py-8 lg:px-8 2xl:px-12 2xl:py-10">
        {/* Cabeçalho */}
        <div className="dash-in mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">{today}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-0.5 text-[11px] font-medium text-emerald-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="live-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                Ao vivo · {updatedAt}
              </span>
            </div>
            <h1 className="mt-2 bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent 2xl:text-4xl">
              {greeting()} 👋
            </h1>
            <p className="mt-1 text-sm text-zinc-500">Tudo o que está acontecendo no Meu Carro Protegido.</p>
          </div>
          <div className="flex gap-2">
            <a href="https://vercel.com/dashboard" target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <ExternalLink className="h-4 w-4" /> Vercel Analytics
            </a>
            <Link
              href="/admin/posts/new"
              className={btnGlow}
            >
              <Plus className="h-4 w-4" /> Novo post
            </Link>
          </div>
        </div>

        {/* Números */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 2xl:gap-5">
          {/* Destaque: visualizações + curva do acervo */}
          <div
            className="dash-in relative overflow-hidden rounded-[22px] bg-gradient-to-br from-emerald-300 via-emerald-600 to-teal-900 p-px shadow-[0_30px_70px_-25px_rgba(16,185,129,0.7)] sm:col-span-2 lg:row-span-2 2xl:row-span-1"
            style={{ animationDelay: "60ms" }}
          >
            <div className="relative h-full overflow-hidden rounded-[21px] bg-gradient-to-br from-emerald-500 via-emerald-700 to-[#063b2c]">
              <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/15" />
              <div className="pointer-events-none absolute -right-4 -top-4 h-40 w-40 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute right-6 top-6 h-16 w-16 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-emerald-300/30 blur-3xl" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              {/* curva de crescimento do acervo, no fundo do card */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] min-h-20 opacity-90">
                <AreaSpark values={stats.monthlyGrowth.map((m) => m.cumulative)} id="acervo" />
              </div>

              <div className="relative flex h-full flex-col p-6 2xl:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/20">
                    <Eye className="h-5 w-5 text-white" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Visualizações</p>
                    <p className="text-xs text-emerald-50/75">Leituras de todos os posts</p>
                  </div>
                </div>
                <p className="mt-6 text-5xl font-semibold tabular-nums tracking-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)] 2xl:text-6xl">
                  <CountUp value={stats.totalViews} />
                </p>
                <p className="mt-2 text-sm text-emerald-50/85">
                  média de{" "}
                  <strong className="font-semibold text-white">
                    <CountUp value={stats.avgViews} decimals={1} />
                  </strong>{" "}
                  por post publicado
                </p>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-10">
                  <Link
                    href="#mais-lidos"
                    className="group inline-flex w-fit items-center gap-1.5 rounded-full bg-black/20 px-3.5 py-1.5 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur transition-colors hover:bg-black/30"
                  >
                    Ver mais lidos <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <p className="rounded-full bg-black/20 px-3 py-1 text-xs text-white/85 ring-1 ring-white/15 backdrop-blur">
                    Acervo: <strong className="text-white">{fmt(stats.publishedPosts)}</strong> posts em 12 meses
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Kpi
            label="Publicados"
            hint="No ar agora"
            value={stats.publishedPosts}
            icon={FileText}
            tone="text-emerald-300"
            glow="bg-emerald-500/15"
            chart={<MiniBars values={stats.monthlyGrowth.map((m) => m.count)} color="#34d399" />}
            foot={<span className="text-zinc-500">{fmt(stats.totalPosts)} posts no total</span>}
            href="/admin/posts"
            linkLabel="Ver posts"
            delay={120}
          />
          <Kpi
            label="Agendados"
            hint="Com data futura"
            value={stats.scheduledPosts}
            icon={CalendarClock}
            tone="text-amber-300"
            glow="bg-amber-400/15"
            foot={
              stats.upcoming[0] ? (
                <span className="text-zinc-500">
                  próximo em{" "}
                  <span className="text-amber-300">
                    {stats.upcoming[0].publishAt.toLocaleDateString("pt-BR", { timeZone: TZ, day: "2-digit", month: "short" })}
                  </span>
                </span>
              ) : (
                <span className="text-zinc-600">nada agendado</span>
              )
            }
            href="/admin/posts"
            linkLabel="Ver agenda"
            delay={180}
          />
          <Kpi
            label="Leads"
            hint="Avaliação gratuita"
            value={stats.leads.total}
            icon={Users}
            tone="text-sky-300"
            glow="bg-sky-400/15"
            chart={<MiniBars values={stats.leads.daily} color="#38bdf8" />}
            foot={
              <span className={leads14 > 0 ? "text-sky-300" : "text-zinc-600"}>
                +{stats.leads.last7Days} em 7 dias · {leads14} em 14
              </span>
            }
            href="/admin/leads"
            linkLabel="Ver leads"
            delay={240}
          />
          <Kpi
            label="Rascunhos"
            hint="Aguardando publicação"
            value={stats.draftPosts}
            icon={Pencil}
            tone="text-zinc-300"
            glow="bg-white/[0.06]"
            href="/admin/posts"
            linkLabel="Revisar"
            delay={300}
          />
        </div>

        {/* Gráficos */}
        <div className="mt-4 grid gap-4 xl:grid-cols-12 2xl:mt-5 2xl:gap-5">
          <Panel className="xl:col-span-8" glow="bg-emerald-500/10" delay={360}>
            <div className="p-6 2xl:p-7">
              <PanelTitle
                icon={TrendingUp}
                tone="text-emerald-300"
                title="Posts publicados"
                sub="Últimos 12 meses · passe o mouse nas barras"
                right={
                  <div className="flex gap-6 text-right">
                    <div>
                      <p className="text-3xl font-semibold tabular-nums text-white">
                        <CountUp value={yearPosts} />
                      </p>
                      <p className="text-xs text-zinc-500">no período</p>
                    </div>
                    <div>
                      <p className="text-3xl font-semibold tabular-nums text-emerald-300">
                        <CountUp value={thisMonth} />
                      </p>
                      <p className="text-xs text-zinc-500">
                        este mês
                        {lastMonth > 0 && (
                          <span className={thisMonth >= lastMonth ? " text-emerald-400" : " text-rose-400"}>
                            {" "}
                            {thisMonth >= lastMonth ? "▲" : "▼"} {Math.abs(Math.round(((thisMonth - lastMonth) / lastMonth) * 100))}%
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                }
              />
              <div className="mt-5">
                <Bars3D data={stats.monthlyGrowth} />
              </div>
            </div>
          </Panel>

          <Panel className="xl:col-span-4" glow="bg-teal-400/10" delay={420}>
            <div className="flex h-full flex-col p-6 2xl:p-7">
              <PanelTitle icon={BarChart3} tone="text-teal-300" title="Por categoria" sub="Passe o mouse para destacar" />
              <div className="mt-6 flex flex-1 items-center">
                <Donut3D segments={segments} total={stats.publishedPosts} />
              </div>
            </div>
          </Panel>
        </div>

        {/* Mais lidos + agendados */}
        <div className="mt-4 grid gap-4 xl:grid-cols-12 2xl:mt-5 2xl:gap-5">
          <Panel className="scroll-mt-6 xl:col-span-8" glow="bg-amber-400/[0.07]" delay={480}>
            <div id="mais-lidos" className="p-6 2xl:p-7">
              <PanelTitle
                icon={Trophy}
                tone="text-amber-300"
                title="Artigos mais lidos"
                sub="Ranking por leituras"
                right={
                  <Link href="/admin/posts" className="inline-flex items-center gap-1 text-sm text-zinc-400 hover:text-white">
                    Ver todos <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                }
              />

              {stats.topPosts.length === 0 ? (
                <p className="py-12 text-center text-sm text-zinc-500">
                  Nenhuma leitura registrada ainda. Os números aparecem conforme o blog recebe visitas.
                </p>
              ) : (
                <>
                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {podium.map((post, i) => {
                      const medal =
                        i === 0
                          ? { ring: "from-amber-200 via-amber-400/60 to-amber-700/20", chip: "bg-gradient-to-b from-amber-200 to-amber-500 text-amber-950", label: "Ouro" }
                          : i === 1
                            ? { ring: "from-zinc-100 via-zinc-400/50 to-zinc-600/10", chip: "bg-gradient-to-b from-zinc-100 to-zinc-400 text-zinc-900", label: "Prata" }
                            : { ring: "from-orange-300 via-orange-500/50 to-orange-800/10", chip: "bg-gradient-to-b from-orange-300 to-orange-600 text-orange-950", label: "Bronze" };
                      return (
                        <Link
                          key={post.id}
                          href={`/admin/posts/${post.id}/edit`}
                          className={`group relative overflow-hidden rounded-2xl bg-gradient-to-b p-px transition-transform hover:-translate-y-1 ${medal.ring}`}
                        >
                          <div className="relative h-full overflow-hidden rounded-[15px] bg-[#16171c]">
                            <div className="relative h-28 overflow-hidden">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.coverUrl ?? categoryCover(post.category)}
                                alt=""
                                className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#16171c] via-[#16171c]/40 to-transparent" />
                              <span
                                className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_6px_14px_-4px_rgba(0,0,0,0.8)] ${medal.chip}`}
                                title={medal.label}
                              >
                                {i + 1}
                              </span>
                            </div>
                            <div className="relative -mt-6 p-4 pt-0">
                              <p className="text-2xl font-semibold tabular-nums text-white">
                                <CountUp value={post.views} />
                                <span className="ml-1 text-xs font-normal text-zinc-500">leituras</span>
                              </p>
                              <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-zinc-100 group-hover:text-white">
                                {post.title}
                              </p>
                              <p className="mt-2 text-xs text-zinc-500">{categoryLabel(post.category)}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {rest.length > 0 && (
                    <ul className="mt-4 divide-y divide-white/[0.05]">
                      {rest.map((post, i) => (
                        <li key={post.id}>
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="group grid grid-cols-[2rem_1fr_auto] items-center gap-4 rounded-xl px-2 py-3 transition-colors hover:bg-white/[0.03] md:grid-cols-[2rem_1fr_9rem_8rem_auto]"
                          >
                            <span className="text-sm font-semibold text-zinc-600">{i + 4}</span>
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium text-zinc-200 group-hover:text-white">{post.title}</p>
                              <div className="mt-2 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/[0.06]">
                                <div
                                  className="bar-fill h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-300"
                                  style={{ width: `${Math.round((post.views / maxViews) * 100)}%` }}
                                />
                              </div>
                            </div>
                            <span className="hidden text-sm text-zinc-500 md:block">{categoryLabel(post.category)}</span>
                            <span className="hidden text-sm text-zinc-500 md:block">
                              {post.publishAt.toLocaleDateString("pt-BR", { timeZone: TZ })}
                            </span>
                            <span className="flex items-center gap-3 text-sm font-semibold tabular-nums text-white">
                              {fmt(post.views)}
                              <Pencil className="h-3.5 w-3.5 text-zinc-600 group-hover:text-zinc-300" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </Panel>

          <Panel className="xl:col-span-4" glow="bg-amber-400/10" delay={540}>
            <div className="p-6 2xl:p-7">
              <PanelTitle icon={CalendarClock} tone="text-amber-300" title="Próximos agendados" sub="Entram no ar sozinhos" />
              {stats.upcoming.length === 0 ? (
                <p className="mt-6 text-sm text-zinc-500">Nenhum post agendado.</p>
              ) : (
                <ol className="relative mt-6 space-y-4 border-l border-dashed border-white/10 pl-5">
                  {stats.upcoming.map((post, i) => (
                    <li key={post.id} className="relative">
                      <span
                        className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ${
                          i === 0 ? "bg-amber-300 shadow-[0_0_14px_rgba(251,191,36,1)]" : "bg-amber-500/60"
                        }`}
                      />
                      <Link href={`/admin/posts/${post.id}/edit`} className="group block rounded-xl p-2 -m-2 transition-colors hover:bg-white/[0.03]">
                        <p className="text-xs font-medium text-amber-300/90">
                          {post.publishAt.toLocaleString("pt-BR", { timeZone: TZ, weekday: "short", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </p>
                        <p className="mt-0.5 line-clamp-2 text-sm text-zinc-200 group-hover:text-white">{post.title}</p>
                        <p className="mt-1 text-[11px] text-zinc-600">{categoryLabel(post.category)}</p>
                      </Link>
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </Panel>
        </div>

        {/* Calendário + leads */}
        <div className="mt-4 grid gap-4 xl:grid-cols-12 2xl:mt-5 2xl:gap-5">
          <Panel className="xl:col-span-8" glow="bg-emerald-500/[0.08]" delay={600}>
            <div className="p-6 [--cell:12px] sm:[--cell:15px] 2xl:p-7 2xl:[--cell:18px]">
              <PanelTitle
                icon={CalendarDays}
                tone="text-emerald-300"
                title="Calendário de publicações"
                sub="12 semanas para trás e 4 para frente"
              />
              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[420px]">
                  <ActivityCalendar days={stats.activity} />
                </div>
              </div>
            </div>
          </Panel>

          <Panel className="xl:col-span-4" glow="bg-sky-400/10" delay={660}>
            <div className="p-6 2xl:p-7">
              <PanelTitle
                icon={Users}
                tone="text-sky-300"
                title="Leads recentes"
                sub={`${fmt(stats.leads.cotacao)} querem cotar · ${fmt(stats.leads.verificacao)} já têm proteção`}
                right={
                  <Link href="/admin/leads" className="text-zinc-500 hover:text-white" title="Ver leads">
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                }
              />
              {stats.leads.recent.length === 0 ? (
                <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center">
                  <Users className="h-6 w-6 text-zinc-600" />
                  <p className="mt-2 text-sm text-zinc-500">Nenhum lead ainda.</p>
                  <p className="text-xs text-zinc-600">Eles chegam pelo pop-up de avaliação gratuita.</p>
                </div>
              ) : (
                <ul className="mt-5 space-y-2">
                  {stats.leads.recent.map((lead) => (
                    <li key={lead.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-3 py-2.5 ring-1 ring-white/[0.04]">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold uppercase ${
                          lead.tipo === "cotacao" ? "bg-emerald-500/15 text-emerald-300" : "bg-sky-500/15 text-sky-300"
                        }`}
                      >
                        {(lead.nome ?? "?").charAt(0)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-zinc-200">{lead.nome ?? "Sem nome"}</p>
                        <p className="text-xs text-zinc-500">
                          {lead.tipo === "cotacao" ? "Quer cotar" : "Já tem proteção"}
                          {lead.placa ? ` · ${lead.placa}` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-zinc-600">
                        {lead.createdAt.toLocaleDateString("pt-BR", { timeZone: TZ, day: "2-digit", month: "short" })}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

import { Users, ShieldCheck, Calculator, Search, X, MessageCircle, Clock, Download } from "lucide-react";
import { prisma } from "@/lib/db";
import { ExportControls } from "@/components/ExportControls";
import { PageHeader, PageShell, Panel } from "../components/premium";
import { CountUp, MiniBars } from "../dashboard/charts";

export const dynamic = "force-dynamic";

const TZ = "America/Sao_Paulo";
const DAY = 24 * 60 * 60 * 1000;

function formatBR(date: Date) {
  return date.toLocaleString("pt-BR", { timeZone: TZ, day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function timeAgo(date: Date, now: Date) {
  const min = Math.round((now.getTime() - date.getTime()) / 60000);
  if (min < 1) return "agora";
  if (min < 60) return `há ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `há ${h} h`;
  const d = Math.round(h / 24);
  if (d === 1) return "ontem";
  if (d < 30) return `há ${d} dias`;
  return date.toLocaleDateString("pt-BR", { timeZone: TZ, day: "2-digit", month: "short" });
}

const dayKey = (date: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date);

function normalize(text: string) {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Placa no padrão Mercosul.
function Plate({ value }: { value: string }) {
  return (
    <span className="inline-flex w-[88px] flex-col overflow-hidden rounded-[5px] border border-zinc-300 bg-white shadow-[0_4px_10px_-4px_rgba(0,0,0,0.8)]">
      <span className="bg-gradient-to-b from-[#2050b0] to-[#163a85] py-[1px] text-center text-[6.5px] font-bold uppercase tracking-[0.3em] text-white">
        Brasil
      </span>
      <span className="py-0.5 text-center font-mono text-[13px] font-bold uppercase tracking-[0.1em] text-zinc-900">{value}</span>
    </span>
  );
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ tipo?: string; q?: string }>;
}) {
  const params = await searchParams;
  const now = new Date();
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const tipo = params.tipo === "cotacao" || params.tipo === "verificacao" ? params.tipo : undefined;
  const q = (params.q ?? "").trim();

  const total = leads.length;
  const cotacoes = leads.filter((l) => l.tipo === "cotacao").length;
  const verificacoes = leads.filter((l) => l.tipo === "verificacao").length;
  const last7 = leads.filter((l) => l.createdAt.getTime() >= now.getTime() - 7 * DAY).length;

  const daily: number[] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(new Date(now.getTime() - i * DAY));
    daily.push(leads.filter((l) => dayKey(l.createdAt) === key).length);
  }

  const searched = q
    ? leads.filter((l) => normalize(`${l.nome ?? ""} ${l.placa ?? ""} ${l.telefone ?? ""} ${l.protecaoAtual ?? ""}`).includes(normalize(q)))
    : leads;
  const list = tipo ? searched.filter((l) => l.tipo === tipo) : searched;

  const href = (patch: { tipo?: string; q?: string }) => {
    const merged = { tipo, q: q || undefined, ...patch };
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries(merged)) if (v) sp.set(k, v);
    const qs = sp.toString();
    return qs ? `/admin/leads?${qs}` : "/admin/leads";
  };

  return (
    <PageShell>
      <PageHeader
        eyebrow="Avaliação gratuita"
        title="Leads"
        subtitle="Contatos que chegaram pelo pop-up do blog."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 2xl:gap-5">
        {/* Destaque */}
        <div
          className="dash-in relative overflow-hidden rounded-[22px] bg-gradient-to-br from-sky-300 via-sky-600 to-indigo-900 p-px shadow-[0_30px_70px_-25px_rgba(56,189,248,0.55)]"
          style={{ animationDelay: "40ms" }}
        >
          <div className="relative h-full overflow-hidden rounded-[21px] bg-gradient-to-br from-sky-500 via-sky-700 to-[#0b1f4a] p-6">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/20">
                <Users className="h-5 w-5 text-white" />
              </span>
              <div>
                <p className="text-sm font-semibold text-white">Leads no total</p>
                <p className="text-xs text-sky-50/75">Desde o início</p>
              </div>
            </div>
            <div className="relative mt-5 flex items-end justify-between gap-3">
              <p className="text-5xl font-semibold tabular-nums tracking-tight text-white">
                <CountUp value={total} />
              </p>
              <div className="w-28">
                <MiniBars values={daily} color="#ffffff" />
              </div>
            </div>
            <p className="relative mt-2 text-xs text-sky-50/80">leads por dia nas últimas 2 semanas</p>
          </div>
        </div>

        {[
          { label: "Querem cotar", value: cotacoes, icon: Calculator, tone: "text-emerald-300", glow: "bg-emerald-500/15", hint: "Ainda sem proteção" },
          { label: "Já têm proteção", value: verificacoes, icon: ShieldCheck, tone: "text-sky-300", glow: "bg-sky-400/15", hint: "Querem comparar" },
          { label: "Últimos 7 dias", value: last7, icon: Clock, tone: "text-amber-300", glow: "bg-amber-400/15", hint: "Chegaram nesta semana" },
        ].map((k, i) => (
          <Panel key={k.label} glow={k.glow} delay={100 + i * 60}>
            <div className="flex h-full flex-col p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/10">
                  <k.icon className={`h-5 w-5 ${k.tone}`} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{k.label}</p>
                  <p className="text-xs text-zinc-500">{k.hint}</p>
                </div>
              </div>
              <p className="mt-5 text-4xl font-semibold tabular-nums tracking-tight text-white">
                <CountUp value={k.value} />
              </p>
              {total > 0 && i < 2 && (
                <p className="mt-1 text-xs text-zinc-500">{Math.round((k.value / total) * 100)}% do total</p>
              )}
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="mt-4" delay={300}>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 2xl:px-6">
          <div className="flex flex-wrap items-center gap-3">
            {/* Abas por tipo */}
            <div className="inline-flex rounded-full border border-white/10 bg-black/30 p-1 text-xs font-medium shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
              {[
                { key: undefined, label: `Todos · ${total}` },
                { key: "cotacao", label: `Querem cotar · ${cotacoes}` },
                { key: "verificacao", label: `Já têm proteção · ${verificacoes}` },
              ].map((t) => (
                <a
                  key={t.label}
                  href={href({ tipo: t.key })}
                  className={`rounded-full px-3.5 py-1.5 transition-all ${
                    tipo === t.key
                      ? "bg-gradient-to-b from-emerald-400 to-emerald-600 text-[#03140d] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_14px_-4px_rgba(16,185,129,0.8)]"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </a>
              ))}
            </div>
            {/* Busca */}
            <form action="/admin/leads" method="get" className="relative w-full sm:w-72">
              {tipo && <input type="hidden" name="tipo" value={tipo} />}
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="search"
                name="q"
                defaultValue={q}
                placeholder="Nome, placa, telefone…"
                className="h-10 w-full rounded-xl border border-white/10 bg-black/30 pl-10 pr-9 text-sm text-zinc-100 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] placeholder:text-zinc-600 focus:border-emerald-500/60 focus:outline-none"
              />
              {q && (
                <a href={href({ q: undefined })} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white" title="Limpar busca">
                  <X className="h-4 w-4" />
                </a>
              )}
            </form>
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Download className="h-3.5 w-3.5" />
            <ExportControls />
          </div>
        </div>

        {list.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-16 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.04] ring-1 ring-white/10">
              <Users className="h-5 w-5 text-zinc-500" />
            </span>
            <p className="mt-4 text-sm text-zinc-300">{total === 0 ? "Nenhum lead ainda." : "Nenhum lead com esse filtro."}</p>
            <p className="mt-1 text-xs text-zinc-500">Os leads chegam pelo pop-up de avaliação gratuita do blog.</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/[0.05]">
            {list.map((lead) => {
              const cotacao = lead.tipo === "cotacao";
              const phone = lead.telefone?.replace(/\D/g, "");
              return (
                <li key={lead.id} className="group relative transition-colors hover:bg-white/[0.025]">
                  <span className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-emerald-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 lg:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_7rem_minmax(0,1fr)_11rem] 2xl:px-6">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl text-sm font-bold uppercase ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] ${
                        cotacao ? "bg-gradient-to-br from-emerald-400/30 to-emerald-700/20 text-emerald-200" : "bg-gradient-to-br from-sky-400/30 to-sky-700/20 text-sky-200"
                      }`}
                    >
                      {(lead.nome ?? "?").charAt(0)}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-medium text-zinc-100">{lead.nome ?? "Sem nome"}</p>
                      <span
                        className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${
                          cotacao ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20" : "bg-sky-500/10 text-sky-300 ring-sky-400/20"
                        }`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${cotacao ? "bg-emerald-400" : "bg-sky-400"}`} />
                        {cotacao ? "Quer cotar" : "Já tem proteção"}
                      </span>
                    </div>

                    <div className="hidden min-w-0 lg:block">
                      <p className="text-xs text-zinc-500">Proteção atual</p>
                      <p className="truncate text-sm text-zinc-300">{lead.protecaoAtual ?? "—"}</p>
                    </div>

                    <div className="hidden lg:block">{lead.placa ? <Plate value={lead.placa} /> : <span className="text-zinc-600">—</span>}</div>

                    <div className="hidden min-w-0 lg:block">
                      <p className="text-sm text-zinc-300">{timeAgo(lead.createdAt, now)}</p>
                      <p className="truncate text-xs text-zinc-600">{formatBR(lead.createdAt)}</p>
                    </div>

                    {phone ? (
                      <a
                        href={`https://wa.me/55${phone}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 justify-self-end rounded-xl bg-gradient-to-b from-[#2fe57a] to-[#16a34a] px-3.5 py-2 text-xs font-semibold text-[#04210f] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_8px_20px_-8px_rgba(34,197,94,0.8)] transition-all hover:brightness-110"
                        title={lead.telefone ?? ""}
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">{lead.telefone}</span>
                      </a>
                    ) : (
                      <span className="justify-self-end text-xs text-zinc-600">sem telefone</span>
                    )}

                    {/* Celular: placa e data embaixo */}
                    <div className="col-span-3 flex flex-wrap items-center gap-3 lg:hidden">
                      {lead.placa && <Plate value={lead.placa} />}
                      {lead.protecaoAtual && <span className="text-xs text-zinc-400">{lead.protecaoAtual}</span>}
                      <span className="text-xs text-zinc-500">{timeAgo(lead.createdAt, now)}</span>
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

import { Users, ShieldCheck, Calculator } from "lucide-react";
import { prisma } from "@/lib/db";
import { ExportControls } from "@/components/ExportControls";
import { card, pageHeader, pageTitle, pageSubtitle } from "../components/ui";

export const dynamic = "force-dynamic";

const TZ = "America/Sao_Paulo";

function formatBR(date: Date) {
  return date.toLocaleString("pt-BR", {
    timeZone: TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MiniStat({ label, value, icon: Icon, highlight }: { label: string; value: number; icon: React.ElementType; highlight?: boolean }) {
  return (
    <div
      className={
        highlight
          ? "flex items-center gap-4 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 p-5"
          : `${card} flex items-center gap-4 p-5`
      }
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${highlight ? "bg-white/15" : "bg-white/[0.05] ring-1 ring-white/[0.06]"}`}>
        <Icon className={`h-[18px] w-[18px] ${highlight ? "text-white" : "text-zinc-300"}`} />
      </span>
      <div>
        <p className={`text-2xl font-bold ${highlight ? "text-white" : "text-white"}`}>{value.toLocaleString("pt-BR")}</p>
        <p className={`text-xs ${highlight ? "text-emerald-50/80" : "text-zinc-500"}`}>{label}</p>
      </div>
    </div>
  );
}

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const total = leads.length;
  const cotacoes = leads.filter((l) => l.tipo === "cotacao").length;
  const verificacoes = leads.filter((l) => l.tipo === "verificacao").length;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <div className={pageHeader}>
        <div>
          <h1 className={pageTitle}>Leads Loma</h1>
          <p className={pageSubtitle}>Contatos que chegaram pela avaliação gratuita do blog</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniStat label="Leads no total" value={total} icon={Users} highlight />
        <MiniStat label="Querem cotar" value={cotacoes} icon={Calculator} />
        <MiniStat label="Já têm proteção" value={verificacoes} icon={ShieldCheck} />
      </div>

      <div className={`${card} mt-4 overflow-hidden`}>
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.06] px-6 py-5">
          <h2 className="text-base font-semibold text-white">Todos os leads</h2>
          <ExportControls />
        </div>

        {leads.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">Nenhum lead ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/[0.06] text-xs text-zinc-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">#</th>
                  <th className="px-3 py-3.5 font-medium">Tipo</th>
                  <th className="px-3 py-3.5 font-medium">Nome</th>
                  <th className="px-3 py-3.5 font-medium">WhatsApp</th>
                  <th className="px-3 py-3.5 font-medium">Placa</th>
                  <th className="px-3 py-3.5 font-medium">Proteção atual</th>
                  <th className="px-6 py-3.5 font-medium">Data (BRT)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {leads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-white/[0.02]">
                    <td className="px-6 py-4 text-zinc-600">{lead.id}</td>
                    <td className="px-3 py-4">
                      {lead.tipo === "cotacao" ? (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Quer cotar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-sky-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-sky-400" /> Já tem proteção
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-4 font-medium text-zinc-100">{lead.nome ?? "—"}</td>
                    <td className="px-3 py-4">
                      {lead.telefone ? (
                        <a
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="whitespace-nowrap text-emerald-400 hover:underline"
                        >
                          {lead.telefone}
                        </a>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-4">
                      {lead.placa ? (
                        <span className="rounded-md bg-white/[0.06] px-2 py-0.5 font-mono text-xs font-semibold text-zinc-200">
                          {lead.placa}
                        </span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-zinc-300">{lead.protecaoAtual ?? "—"}</td>
                    <td className="whitespace-nowrap px-6 py-4 text-zinc-500">{formatBR(lead.createdAt)}</td>
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

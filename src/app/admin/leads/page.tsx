import { prisma } from "@/lib/db";
import { ExportControls } from "@/components/ExportControls";

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

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  const total = leads.length;
  const cotacoes = leads.filter((l) => l.tipo === "cotacao").length;
  const verificacoes = leads.filter((l) => l.tipo === "verificacao").length;

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-8">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads — Avaliação gratuita</h1>
            <p className="mt-1 text-sm text-gray-500">
              {total} lead{total !== 1 ? "s" : ""} · {cotacoes} quer{cotacoes !== 1 ? "em" : ""} cotar · {verificacoes} já tem proteção
            </p>
          </div>
        </div>
        <ExportControls />
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-500">Nenhum lead ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">#</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Tipo</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Nome</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">WhatsApp</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Placa</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Proteção atual</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Data (BRT)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400">{lead.id}</td>
                  <td className="px-4 py-3">
                    {lead.tipo === "cotacao" ? (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                        Quer cotar
                      </span>
                    ) : (
                      <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-600">
                        Já tem proteção
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{lead.nome ?? "—"}</td>
                  <td className="px-4 py-3">
                    {lead.telefone ? (
                      <a
                        href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {lead.telefone}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    {lead.placa ? (
                      <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700">
                        {lead.placa}
                      </span>
                    ) : "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{lead.protecaoAtual ?? "—"}</td>
                  <td className="px-4 py-3 text-gray-400">{formatBR(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

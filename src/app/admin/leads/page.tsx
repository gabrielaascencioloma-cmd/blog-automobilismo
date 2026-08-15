import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads — Loma Bem Protegido</h1>
          <p className="mt-1 text-sm text-gray-500">{leads.length} lead{leads.length !== 1 ? "s" : ""} captado{leads.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-500">Nenhum lead ainda. O popup vai gerar os primeiros.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">#</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Nome</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">WhatsApp</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Placa</th>
                <th className="px-5 py-3 text-left font-semibold text-gray-600">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-5 py-3 text-gray-400">{lead.id}</td>
                  <td className="px-5 py-3 font-medium text-gray-900">{lead.nome}</td>
                  <td className="px-5 py-3">
                    <a
                      href={`https://wa.me/55${lead.telefone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {lead.telefone}
                    </a>
                  </td>
                  <td className="px-5 py-3">
                    <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-xs font-semibold text-gray-700">
                      {lead.placa}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-gray-400">
                    {formatDate(lead.createdAt.toISOString())}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

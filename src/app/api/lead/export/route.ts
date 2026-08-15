import { prisma } from "@/lib/db";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });

  const tz = "America/Sao_Paulo";
  const rows = [
    ["#", "Tipo", "Nome", "WhatsApp", "Placa", "Proteção atual", "Data"],
    ...leads.map((l) => [
      l.id,
      l.tipo === "cotacao" ? "Quer cotar" : "Já tem proteção",
      l.nome ?? "",
      l.telefone ?? "",
      l.placa ?? "",
      l.protecaoAtual ?? "",
      l.createdAt.toLocaleString("pt-BR", { timeZone: tz }),
    ]),
  ];

  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-loma-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

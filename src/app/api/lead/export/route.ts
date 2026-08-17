import { prisma } from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const de = searchParams.get("de");
  const ate = searchParams.get("ate");

  const where: Record<string, unknown> = {};
  if (de || ate) {
    const gte = de ? new Date(`${de}T00:00:00-03:00`) : undefined;
    const lte = ate ? new Date(`${ate}T23:59:59-03:00`) : undefined;
    where.createdAt = { ...(gte ? { gte } : {}), ...(lte ? { lte } : {}) };
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

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

  const suffix = de || ate
    ? `_${de ?? "inicio"}_ate_${ate ?? "hoje"}`
    : `_${new Date().toISOString().slice(0, 10)}`;

  return new Response("﻿" + csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-loma${suffix}.csv"`,
    },
  });
}

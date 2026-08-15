import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();
  const { tipo, nome, telefone, placa, protecaoAtual } = body;

  const lead = await prisma.lead.create({
    data: {
      tipo: tipo ?? "cotacao",
      nome: nome ? String(nome).trim() : null,
      telefone: telefone ? String(telefone).trim() : null,
      placa: placa ? String(placa).trim().toUpperCase() : null,
      protecaoAtual: protecaoAtual ? String(protecaoAtual).trim() : null,
    },
  });

  return NextResponse.json({ ok: true, id: lead.id });
}

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(leads);
}

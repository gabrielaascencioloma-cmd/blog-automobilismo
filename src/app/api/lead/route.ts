import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { nome, telefone, placa } = await req.json();

  if (!nome || !telefone || !placa) {
    return NextResponse.json({ error: "Campos obrigatórios" }, { status: 400 });
  }

  const lead = await prisma.lead.create({
    data: {
      nome: String(nome).trim(),
      telefone: String(telefone).trim(),
      placa: String(placa).trim().toUpperCase(),
    },
  });

  return NextResponse.json({ ok: true, id: lead.id });
}

export async function GET() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(leads);
}

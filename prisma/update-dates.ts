import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updates = [
  { slug: "correia-dentada-quando-trocar",                       date: "2026-07-10" },
  { slug: "motor-de-arranque-com-defeito-sintomas-e-custo",      date: "2026-07-14" },
  { slug: "pneu-de-moto-hora-certa-de-trocar",                   date: "2026-07-18" },
  { slug: "pastilha-de-freio-vida-util-e-quando-trocar",         date: "2026-07-22" },
  { slug: "bateria-de-carro-fraca-como-testar-e-quando-trocar",  date: "2026-07-26" },
  { slug: "lavagem-a-seco-passo-a-passo",                        date: "2026-07-30" },
  { slug: "motor-do-carro-superaquecendo-o-que-fazer",           date: "2026-08-03" },
  { slug: "autopecas-original-paralela-ou-remanufaturada",       date: "2026-08-07" },
  { slug: "pneu-de-carro-hora-certa-de-trocar",                  date: "2026-08-12" },
];

async function main() {
  for (const u of updates) {
    await prisma.post.update({ where: { slug: u.slug }, data: { publishAt: new Date(u.date) } });
    console.log(u.date, "—", u.slug);
  }
  console.log("\nFeito.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

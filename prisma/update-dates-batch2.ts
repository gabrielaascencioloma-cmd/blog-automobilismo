import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Terças e Sextas a partir de 18/08/2026
// IPVA e Licenciamento mantidos em dezembro (sazonais)
const updates = [
  { slug: "barulho-no-motor-quando-acelera",             date: "2026-08-18" }, // Ter
  { slug: "disco-de-freio-com-vibracao",                 date: "2026-08-21" }, // Sex
  { slug: "vela-de-ignicao-com-defeito-sintomas",        date: "2026-08-25" }, // Ter
  { slug: "radiador-furado-ou-entupido-causas-e-conserto",date: "2026-08-28" }, // Sex
  { slug: "higienizacao-interna-do-carro",               date: "2026-09-01" }, // Ter
  { slug: "calibragem-de-pneu-guia-completo",            date: "2026-09-04" }, // Sex
  { slug: "limpador-de-parabrisa-quando-trocar",         date: "2026-09-08" }, // Ter
  { slug: "terminal-de-direcao-desgastado-sintomas",     date: "2026-09-11" }, // Sex
  { slug: "polimento-de-carro-como-fazer-em-casa",       date: "2026-09-15" }, // Ter
  { slug: "freio-de-moto-disco-ou-tambor",               date: "2026-09-18" }, // Sex
  { slug: "farol-queimado-como-trocar-e-multa",          date: "2026-09-22" }, // Ter
  { slug: "amortecedor-ruim-como-identificar",           date: "2026-09-25" }, // Sex
  { slug: "escapamento-soltando-fumaca-o-que-significa", date: "2026-09-29" }, // Ter
  { slug: "onde-comprar-pecas-de-carro-baratas",         date: "2026-10-02" }, // Sex
  { slug: "corrente-de-moto-como-regular-e-lubrificar",  date: "2026-10-06" }, // Ter
  { slug: "gasolina-ou-etanol-qual-compensa",            date: "2026-10-09" }, // Sex
  { slug: "ar-condicionado-carro-nao-gela-o-que-fazer",  date: "2026-10-13" }, // Ter
  { slug: "troca-de-oleo-de-moto-frequencia-e-custo",    date: "2026-10-16" }, // Sex
  { slug: "gnv-vale-a-pena-conta-os-reais",              date: "2026-10-20" }, // Ter
  { slug: "app-gasolina-mais-barata-perto-de-voce",      date: "2026-10-23" }, // Sex
  { slug: "carro-eletrico-gasta-menos-em-manutencao",    date: "2026-10-27" }, // Ter
  { slug: "ipva-2027-tudo-que-voce-precisa-saber",       date: "2026-12-01" }, // Ter (sazonal — pesquisa cresce em dez)
  { slug: "licenciamento-2027-passo-a-passo",            date: "2026-12-05" }, // Sex (sazonal)
];

async function main() {
  for (const u of updates) {
    await prisma.post.update({ where: { slug: u.slug }, data: { publishAt: new Date(u.date) } });
    console.log(u.date, "—", u.slug);
  }
  console.log("\nFeito.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

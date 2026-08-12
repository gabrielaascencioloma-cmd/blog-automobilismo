import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const covers = [
  {
    slug: "correia-dentada-quando-trocar",
    url: "https://pikaso.cdnpk.net/private/production/5150166435/render.jpg?token=exp=1786924800~hmac=c983184f1294b5d35f8fdf88c52a6ae4e2d1c4c5e8fc0cfe9fb596a62e75f098",
    filename: "cover-correia-dentada.jpg",
  },
  {
    slug: "motor-de-arranque-com-defeito-sintomas-e-custo",
    url: "https://pikaso.cdnpk.net/private/production/5150169821/render.jpg?token=exp=1786924800~hmac=1caf090395cec3eb77efbc70dd139c3e9874beda53692ed16bfb5e50bd18c3af",
    filename: "cover-motor-arranque.jpg",
  },
  {
    slug: "pneu-de-moto-hora-certa-de-trocar",
    url: "https://pikaso.cdnpk.net/private/production/5150168930/render.jpg?token=exp=1786924800~hmac=214e23d2c2d6a2565e1285bea4afab2a99602ad1c7f741be5126ff93936f814a",
    filename: "cover-pneu-moto.jpg",
  },
  {
    slug: "pastilha-de-freio-vida-util-e-quando-trocar",
    url: "https://pikaso.cdnpk.net/private/production/5150169512/render.jpg?token=exp=1786924800~hmac=21a2922a98db4b231f16579f830a9e6aeed261d95c4bc7417f2402b10d011494",
    filename: "cover-pastilha-freio.jpg",
  },
  {
    slug: "bateria-de-carro-fraca-como-testar-e-quando-trocar",
    url: "https://pikaso.cdnpk.net/private/production/5150168966/render.jpg?token=exp=1786924800~hmac=2e596e323de56c42a0f6dbc9b846485d32a93463da0ada842ca9b817777b0799",
    filename: "cover-bateria-carro.jpg",
  },
  {
    slug: "lavagem-a-seco-passo-a-passo",
    url: "https://pikaso.cdnpk.net/private/production/5150169290/render.jpg?token=exp=1786924800~hmac=bd3fe5cc0a6080e216a76bfee7fd3d8cbceab91296ae04bcab27d84b05cbbd92",
    filename: "cover-lavagem-seco.jpg",
  },
  {
    slug: "motor-do-carro-superaquecendo-o-que-fazer",
    url: "https://pikaso.cdnpk.net/private/production/5150171301/render.jpg?token=exp=1786924800~hmac=965655094127ea9ca6a48f89a97307d738203f3ea37b010630e6e1839a9f5561",
    filename: "cover-motor-superaquecendo.jpg",
  },
  {
    slug: "autopecas-original-paralela-ou-remanufaturada",
    url: "https://pikaso.cdnpk.net/private/production/5150171516/render.jpg?token=exp=1786924800~hmac=bd85d89b9649a7e8d264613f20d5c7b15cd0df596f87af7852ad5aa7d0bd1bd4",
    filename: "cover-autopecas.jpg",
  },
  {
    slug: "pneu-de-carro-hora-certa-de-trocar",
    url: "https://pikaso.cdnpk.net/private/production/5150186716/render.jpg?token=exp=1786924800~hmac=b98ccd1ad3da4510a3e9d5715ea85c551841e9c1c853763b7509751201d9c966",
    filename: "cover-pneu-carro.jpg",
  },
];

async function main() {
  for (const cover of covers) {
    process.stdout.write(`Baixando ${cover.filename}... `);
    const res = await fetch(cover.url);
    if (!res.ok) throw new Error(`Falha ao baixar ${cover.filename}: ${res.status}`);
    const buffer = await res.arrayBuffer();

    process.stdout.write(`upload... `);
    const blob = await put(cover.filename, Buffer.from(buffer), {
      access: "public",
      contentType: "image/jpeg",
    });

    await prisma.post.update({
      where: { slug: cover.slug },
      data: { coverUrl: blob.url, coverType: "IMAGE" },
    });

    console.log(`✅ ${blob.url}`);
  }
  console.log("\nTodas as capas vinculadas.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

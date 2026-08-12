import { writeFileSync } from "fs";
import { join } from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const covers = [
  { slug: "barulho-no-motor-quando-acelera", filename: "cover-barulho-motor.jpg", url: "https://pikaso.cdnpk.net/private/production/5150481740/render.jpg?token=exp=1786924800~hmac=5695b1e999121f6e31a816006b535081c984aa92f909b280a74c63f118d63adb" },
  { slug: "disco-de-freio-com-vibracao", filename: "cover-disco-freio.jpg", url: "https://pikaso.cdnpk.net/private/production/5150480639/render.jpg?token=exp=1786924800~hmac=797478c2c0184bf5a29c4f77e481d6ab102127793846fc2c21e6b644a68e2cfb" },
  { slug: "vela-de-ignicao-com-defeito-sintomas", filename: "cover-vela-ignicao.jpg", url: "https://pikaso.cdnpk.net/private/production/5150482671/render.jpg?token=exp=1786924800~hmac=492e1d40aa9e4228ce535a11d1fd3ce640530b306d7f1937fdb101485e58a001" },
  { slug: "radiador-furado-ou-entupido-causas-e-conserto", filename: "cover-radiador.jpg", url: "https://pikaso.cdnpk.net/private/production/5150482268/render.jpg?token=exp=1786924800~hmac=807b7d9a1ad508554e9b4de490afd22dd521bbc72c9a8b1ca7b177d8f22fb38b" },
  { slug: "higienizacao-interna-do-carro", filename: "cover-higienizacao.jpg", url: "https://pikaso.cdnpk.net/private/production/5150484447/render.jpg?token=exp=1786924800~hmac=03f72730f363114f128eb48ce2bf4d2907142b0201e7c36d15e53e09862084f3" },
  { slug: "calibragem-de-pneu-guia-completo", filename: "cover-calibragem-pneu.jpg", url: "https://pikaso.cdnpk.net/private/production/5150481202/render.jpg?token=exp=1786924800~hmac=ccd73bb35332eb33c61fb40d9b1cc7bf39e558a8ba45c8f41967ea0a9637a3dc" },
  { slug: "limpador-de-parabrisa-quando-trocar", filename: "cover-limpador-parabrisa.jpg", url: "https://pikaso.cdnpk.net/private/production/5150482684/render.jpg?token=exp=1786924800~hmac=bab03b603c71be42473b18d1f52d4caab4b5b1a91ff87705f7a017ba73fdf7e0" },
  { slug: "terminal-de-direcao-desgastado-sintomas", filename: "cover-terminal-direcao.jpg", url: "https://pikaso.cdnpk.net/private/production/5150489645/render.jpg?token=exp=1786924800~hmac=c6eadeb70b13fff6a027f153071559294cce972aef8523cb8be0f8c0e1d0e4b0" },
  { slug: "polimento-de-carro-como-fazer-em-casa", filename: "cover-polimento.jpg", url: "https://pikaso.cdnpk.net/private/production/5150496365/render.jpg?token=exp=1786924800~hmac=d07bc12bbc5f68727d8ea2a749e95c353be5f3775604d3c9c1dfb74d82a58066" },
  { slug: "freio-de-moto-disco-ou-tambor", filename: "cover-freio-moto.jpg", url: "https://pikaso.cdnpk.net/private/production/5150499352/render.jpg?token=exp=1786924800~hmac=06f9f467ae16928f6135fafc4107907e9a1beda02b0dd54d3caa0a2e9640c5d9" },
  { slug: "farol-queimado-como-trocar-e-multa", filename: "cover-farol-queimado.jpg", url: "https://pikaso.cdnpk.net/private/production/5150500047/render.jpg?token=exp=1786924800~hmac=e2baf37946ee6284ede3dbb72236c2db789b1fe43649c5e11bcf4bd48abc471d" },
  { slug: "amortecedor-ruim-como-identificar", filename: "cover-amortecedor.jpg", url: "https://pikaso.cdnpk.net/private/production/5150499132/render.jpg?token=exp=1786924800~hmac=6b920d72eded19d33b27eda9ff4de636e510fbcceaad04b533ef1366c6e0d54b" },
  { slug: "escapamento-soltando-fumaca-o-que-significa", filename: "cover-escapamento-fumaca.jpg", url: "https://pikaso.cdnpk.net/private/production/5150501811/render.jpg?token=exp=1786924800~hmac=bc8607169be6a80de12b68b285fd25b8b415d0d5996d1a56fafeaec8c9d13cea" },
  { slug: "onde-comprar-pecas-de-carro-baratas", filename: "cover-pecas-baratas.jpg", url: "https://pikaso.cdnpk.net/private/production/5150499486/render.jpg?token=exp=1786924800~hmac=069ded7d1382256557dbca4af31b2209f55082139bfff991505dc4b18f5fb4f6" },
  { slug: "corrente-de-moto-como-regular-e-lubrificar", filename: "cover-corrente-moto.jpg", url: "https://pikaso.cdnpk.net/private/production/5150502093/render.jpg?token=exp=1786924800~hmac=ac86e0757bf4a3fd9b691de6d6ac6e6182e02adc2dcdefa222e8402620806427" },
  { slug: "gasolina-ou-etanol-qual-compensa", filename: "cover-gasolina-etanol.jpg", url: "https://pikaso.cdnpk.net/private/production/5150503370/render.jpg?token=exp=1786924800~hmac=e65d87c4f22a89501abf907cc640738d47335891e8f742954e750497361f1b8a" },
  { slug: "ar-condicionado-carro-nao-gela-o-que-fazer", filename: "cover-ar-condicionado.jpg", url: "https://pikaso.cdnpk.net/private/production/5150505602/render.jpg?token=exp=1786924800~hmac=1bc119e28b13b31e4bc3e464cfd7d863685f9460de603ba31bcd2314479412f9" },
  { slug: "troca-de-oleo-de-moto-frequencia-e-custo", filename: "cover-oleo-moto.jpg", url: "https://pikaso.cdnpk.net/private/production/5150510812/render.jpg?token=exp=1786924800~hmac=da93d7c9803b312c88f237d63ba4ec0444a69841970f540f07c4277562407c61" },
  { slug: "ipva-2027-tudo-que-voce-precisa-saber", filename: "cover-ipva-2027.jpg", url: "https://pikaso.cdnpk.net/private/production/5150510798/render.jpg?token=exp=1786924800~hmac=23545e58a79c312a63107baa29e6d955b91b00ef12f415b46e7dc4cad7becf8a" },
  { slug: "gnv-vale-a-pena-conta-os-reais", filename: "cover-gnv.jpg", url: "https://pikaso.cdnpk.net/private/production/5150509411/render.jpg?token=exp=1786924800~hmac=d384139594d09629f2badeadc6dba16a0fb5d94a117c9a6d935ad25635da5ee4" },
  { slug: "app-gasolina-mais-barata-perto-de-voce", filename: "cover-app-gasolina.jpg", url: "https://pikaso.cdnpk.net/private/production/5150509851/render.jpg?token=exp=1786924800~hmac=a4647ca467e1fead82b192900aa942c22fb38949b59e12b6dc66bb6f92689029" },
  { slug: "carro-eletrico-gasta-menos-em-manutencao", filename: "cover-carro-eletrico.jpg", url: "https://pikaso.cdnpk.net/private/production/5150511226/render.jpg?token=exp=1786924800~hmac=c0c0f69aebecb70097aa100d7eba75b7ef4e5d54a7f1507b2e8ff2f29b2848a5" },
  { slug: "licenciamento-2027-passo-a-passo", filename: "cover-licenciamento-2027.jpg", url: "https://pikaso.cdnpk.net/private/production/5150513373/render.jpg?token=exp=1786924800~hmac=d627980953d9b3c932c70d721365967599301fa47c417867d47db8b254e4f057" },
];

const photosDir = join(process.cwd(), "public", "photos");

async function main() {
  for (const cover of covers) {
    process.stdout.write(`⬇  ${cover.filename}... `);
    const res = await fetch(cover.url);
    if (!res.ok) throw new Error(`HTTP ${res.status} ao baixar ${cover.filename}`);
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(join(photosDir, cover.filename), buf);

    const publicPath = `/photos/${cover.filename}`;
    await prisma.post.update({
      where: { slug: cover.slug },
      data: { coverUrl: publicPath, coverType: "IMAGE" },
    });
    console.log(`✅  salvo + DB atualizado`);
  }
  console.log("\nPronto. Agora faça: git add public/photos && git commit && git push");
}

main().catch(console.error).finally(() => prisma.$disconnect());

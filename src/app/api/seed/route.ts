import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

async function slug(title: string): Promise<string> {
  const base = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  let s = base;
  let n = 2;
  while (await prisma.post.findFirst({ where: { slug: s } })) {
    s = `${base}-${n++}`;
  }
  return s;
}

const POSTS = [
  {
    category: "financeiro" as const,
    coverUrl: "/photos/financeiro.jpg",
    title: "Financiamento de carro: como funciona, quando vale a pena e o que analisar antes de assinar",
    excerpt: "Tudo sobre financiamento de veículo: como os juros são cobrados, diferença entre CDC e leasing, quando vale a pena e o que olhar antes de fechar o contrato.",
    contentHtml: `<h2>O que é financiamento de carro</h2><p>No financiamento, o banco paga o carro para você e você devolve em parcelas mensais com juros. O carro fica alienado ao credor até a quitação.</p><h2>CDC ou leasing</h2><p><strong>CDC:</strong> você compra o carro, o documento fica no seu nome com anotação de alienação fiduciária. É o modelo mais comum no Brasil.</p><p><strong>Leasing:</strong> você aluga o carro com opção de compra ao final. Hoje é raro em carros populares.</p><h2>Como os juros funcionam</h2><p>O financiamento usa juros compostos com sistema Price (parcelas fixas). Se a taxa é 1,5% ao mês e você financia R$ 40.000 em 48 meses, vai pagar cerca de R$ 56.000 no total — 40% a mais.</p><h2>Quando vale a pena financiar</h2><ul><li>Quando você não tem o dinheiro total e precisa do carro agora</li><li>Quando a taxa do financiamento é menor que o rendimento do seu investimento</li><li>Quando dar entrada maior reduz a taxa significativamente</li></ul><h2>O que analisar antes de assinar</h2><ol><li><strong>CET (Custo Efetivo Total):</strong> inclui juros + seguros + tarifas. É o número real.</li><li><strong>Taxa mensal vs. anual:</strong> compare sempre a taxa mensal entre ofertas.</li><li><strong>Valor total pago:</strong> some todas as parcelas e compare com o preço à vista.</li></ol><h2>Dicas para taxa menor</h2><ul><li>Dar entrada de pelo menos 30%</li><li>Ter nome limpo e score alto</li><li>Simular em vários bancos e fintechs</li><li>Negociar com o gerente — as taxas têm margem</li></ul>`,
  },
  {
    category: "financeiro" as const,
    coverUrl: "/photos/financeiro.jpg",
    title: "Consórcio de carro: como funciona, quanto custa e quando vale mais que o financiamento",
    excerpt: "Entenda como o consórcio de veículo funciona, quanto você paga ao todo, quando é contemplado e quando faz mais sentido que um financiamento.",
    contentHtml: `<h2>O que é consórcio</h2><p>Consórcio é um grupo de pessoas que se juntam para comprar bens. Cada um paga uma parcela mensal. Todo mês, um ou mais são contemplados por sorteio ou lance e recebem a carta de crédito.</p><h2>Quanto custa</h2><p>A parcela inclui fração do bem + taxa de administração (geralmente 15% a 25% ao longo do grupo) + seguro. Não há juros, mas as taxas têm custo parecido com financiamento.</p><p>Exemplo: consórcio de R$ 50.000 com taxa de 20% em 60 meses → você pagará R$ 60.000 no total.</p><h2>Formas de ser contemplado</h2><ul><li><strong>Sorteio:</strong> aleatório, pode demorar todo o prazo</li><li><strong>Lance:</strong> você oferece percentual do crédito antecipado. Quem oferecer mais é contemplado</li></ul><h2>Quando o consórcio faz sentido</h2><ul><li>Quando não precisa do carro imediatamente</li><li>Quando quer evitar juros compostos</li><li>Quando pode fazer lance razoável para contemplação antecipada</li></ul><h2>Riscos do consórcio</h2><ul><li>Ser contemplado só no fim do grupo</li><li>Carta de crédito defasada se os carros subirem muito</li><li>Encerramento do grupo pela administradora</li></ul><h2>Como escolher</h2><p>Use apenas administradoras autorizadas pelo Banco Central (consulte bacen.gov.br). Taxas mensais muito abaixo do mercado são sinal de alerta.</p>`,
  },
  {
    category: "financeiro" as const,
    coverUrl: "/photos/financeiro.jpg",
    title: "Quanto custa manter um carro popular: conta completa mês a mês",
    excerpt: "Veja a conta real de manter um carro como Onix, HB20 ou Gol: combustível, seguro, manutenção, IPVA, licenciamento e depreciação no mesmo cálculo.",
    contentHtml: `<h2>Por que calcular o custo real</h2><p>A maioria das pessoas sabe quanto paga de parcela, mas não sabe quanto o carro custa de verdade. A conta completa inclui custos fixos, variáveis e o invisível: a depreciação.</p><h2>Custos fixos mensais estimados (SP)</h2><ul><li>IPVA (Onix 2022, ~R$ 55k FIPE): R$ 183/mês</li><li>Licenciamento: R$ 10/mês</li><li>Seguro auto: R$ 180 a R$ 350/mês</li><li>Manutenção preventiva diluída: R$ 120 a R$ 200/mês</li></ul><h2>Custos variáveis (1.000 km/mês)</h2><ul><li>Combustível (gasolina R$ 6/L, 12 km/L): R$ 500</li><li>Estacionamento: R$ 0 a R$ 400</li><li>Lavagem: R$ 40 a R$ 80</li></ul><h2>Depreciação: o custo invisível</h2><p>Um Onix 2022 comprado por R$ 70.000 pode valer R$ 55.000 dois anos depois — R$ 15.000 de perda, ou R$ 625/mês. Esse valor não aparece no extrato, mas sai do patrimônio.</p><h2>Conta total sem parcela de financiamento</h2><ul><li>Mínimo: R$ 1.033/mês</li><li>Médio: R$ 1.500 a R$ 1.800/mês</li><li>Com parcela de R$ 800: R$ 2.300 a R$ 2.600/mês</li></ul><h2>Como reduzir</h2><ul><li>GNV reduz gasto com combustível em 60%</li><li>Comparar ao menos 3 seguradoras</li><li>Seguir a agenda de manutenção do fabricante evita reparos caros</li></ul>`,
  },
  {
    category: "financeiro" as const,
    coverUrl: "/photos/financeiro.jpg",
    title: "Seguro de carro: franquia, coberturas, exclusões e como acionar na prática",
    excerpt: "O que o seguro auto cobre de verdade, o que a franquia significa, quais são as exclusões mais comuns e como não ser pego de surpresa na hora do sinistro.",
    contentHtml: `<h2>O que o seguro auto cobre</h2><ul><li><strong>Casco:</strong> colisão, capotamento, roubo, furto, incêndio, granizo, enchente</li><li><strong>RCF (Responsabilidade Civil):</strong> danos materiais e corporais que você cause a terceiros</li><li><strong>APP:</strong> indenização em caso de morte ou invalidez dos ocupantes</li></ul><h2>O que é a franquia</h2><p>Valor que você paga do próprio bolso em caso de sinistro. Dano de R$ 5.000 com franquia de R$ 2.000 → seguro paga R$ 3.000, você paga R$ 2.000. Franquia maior = prêmio menor.</p><h2>O que o seguro NÃO cobre</h2><ul><li>Desgaste normal (pneu, freios)</li><li>Condutor sem CNH válida</li><li>Uso para finalidades não declaradas (ex.: Uber sem cobertura específica)</li><li>Danos mecânicos não causados por acidente</li><li>Multas de trânsito</li></ul><h2>Como o preço é calculado</h2><p>Perfil do condutor (idade, estado civil, histórico de sinistros), CEP de guarda, modelo e ano do carro, quilometragem e uso. Simule em pelo menos 3 seguradoras.</p><h2>Como acionar na prática</h2><ol><li>Ligue para a central (24h) imediatamente</li><li>Informe data, hora, local e tipo do sinistro</li><li>Aguarde guincho ou vistoriador</li><li>Acompanhe pelo app ou central</li><li>Aprovado o reparo, leve ao credenciado</li></ol>`,
  },
  {
    category: "financeiro" as const,
    coverUrl: "/photos/financeiro.jpg",
    title: "Gasolina ou etanol: como calcular qual compensa hoje e o que muda por modelo",
    excerpt: "A conta rápida para saber qual combustível compensa para o seu carro — com a fórmula que funciona em qualquer bomba e o que muda nos carros turbo.",
    contentHtml: `<h2>Por que a escolha muda o tempo todo</h2><p>O preço do etanol e da gasolina varia semanalmente e por região. Não existe resposta fixa — existe um cálculo simples que você faz na bomba.</p><h2>A fórmula</h2><p>Divida o preço do etanol pelo preço da gasolina:</p><ul><li>Resultado abaixo de 0,70: etanol compensa</li><li>Resultado acima de 0,70: gasolina compensa</li></ul><p><strong>Exemplo:</strong> gasolina R$ 6,20, etanol R$ 4,10 → 4,10 ÷ 6,20 = 0,66 → etanol compensa.</p><h2>Por que 70%?</h2><p>Motores flex consomem cerca de 30% mais etanol que gasolina para percorrer a mesma distância. Se o etanol custa menos de 70% da gasolina, você compensa o maior consumo com o menor preço.</p><h2>O 70% vale para todo carro?</h2><ul><li>Carros com injeção direta (Onix 1.0 turbo, HB20 1.0 turbo): podem ter eficiência ligeiramente diferente — consulte o manual</li><li>Carros mais antigos (pré-2010): use 68% como referência mais segura</li></ul><h2>GNV: quando compensa mais que os dois</h2><p>Se você roda mais de 2.000 km/mês, o GNV começa a compensar. O kit custa de R$ 3.500 a R$ 5.000, mas o metro cúbico sai por volta de 60% menos que um litro de gasolina em consumo equivalente. Payback em 18 a 30 meses dependendo da quilometragem.</p>`,
  },
  {
    category: "burocracia" as const,
    coverUrl: "/photos/burocracia.jpg",
    title: "Como transferir um carro: documentos, prazo e quanto custa em 2025",
    excerpt: "Guia completo para transferência de veículo: quais documentos reunir, onde pagar as taxas, prazo legal e o que acontece se você atrasar.",
    contentHtml: `<h2>Quando a transferência é obrigatória</h2><p>Todo comprador de veículo usado tem 30 dias para transferir o carro para o próprio nome. Quem vende e não comunica fica responsável por multas e crimes cometidos com o veículo após a venda.</p><h2>Documentos necessários</h2><p><strong>Do vendedor:</strong> CRV preenchido e assinado no verso, documento com foto e comprovante de quitação de débitos.</p><p><strong>Do comprador:</strong> documento com foto, CPF e comprovante de residência atualizado.</p><h2>Passo a passo</h2><ol><li>Quitar todos os débitos (IPVA, multas, licenciamento) no Detran do estado</li><li>Realizar vistoria se exigida pelo estado</li><li>Pagar a taxa de transferência (R$ 100 a R$ 250 conforme o estado)</li><li>Comparecer ao Detran ou fazer online — em SP o SIVEI permite transferência digital</li><li>Aguardar o novo CRV (5 a 15 dias úteis)</li></ol><h2>O que acontece sem transferência no prazo</h2><p>Multas chegam no nome do vendedor. O comprador fica impedido de licenciar e pode ter o veículo apreendido em fiscalização. O vendedor pode registrar comunicação de venda no Detran — gratuito e online — para se proteger a partir da data de entrega.</p>`,
  },
  {
    category: "burocracia" as const,
    coverUrl: "/photos/burocracia.jpg",
    title: "IPVA 2025: como calcular, quando pagar e o que acontece se atrasar",
    excerpt: "Como o IPVA é calculado pela tabela FIPE, calendário de vencimentos, desconto para pagamento à vista e as consequências do atraso.",
    contentHtml: `<h2>O que é o IPVA</h2><p>Imposto estadual cobrado anualmente de todo proprietário de veículo motorizado. O valor arrecadado vai 50% para o estado e 50% para o município onde o carro está registrado.</p><h2>Como é calculado</h2><p>Valor FIPE de janeiro × alíquota do estado. Alíquotas mais comuns: São Paulo 4%, Minas Gerais 4%, Rio de Janeiro 4%, Paraná 3,5%. Exemplo: Onix FIPE R$ 55.000 em SP → R$ 2.200 de IPVA.</p><h2>Desconto à vista</h2><p>A maioria dos estados oferece 3% a 10% de desconto na primeira data. Em SP é 3%. Vale muito a pena pagar à vista se você tiver o valor disponível.</p><h2>Calendário (São Paulo)</h2><p>O vencimento é pelo dígito final da placa: 1 = janeiro, 2 = fevereiro, 3 = março, e assim por diante até 0 = outubro. Verifique o calendário exato no site do Detran do seu estado.</p><h2>O que acontece com o atraso</h2><ul><li>Multa de 0,33% ao dia + juros Selic</li><li>Impossibilidade de fazer o licenciamento anual</li><li>Veículo pode ser retido em fiscalização</li><li>Inscrição em dívida ativa estadual com cobrança judicial</li></ul>`,
  },
  {
    category: "burocracia" as const,
    coverUrl: "/photos/burocracia.jpg",
    title: "Licenciamento do carro: o que é, quanto custa e como regularizar se estiver vencido",
    excerpt: "O que é o CRLV, quanto custa o licenciamento anual, quais débitos precisam estar quitados e o que fazer se o seu licenciamento estiver vencido.",
    contentHtml: `<h2>O que é o licenciamento</h2><p>O licenciamento é a renovação anual do CRLV (Certificado de Registro e Licenciamento de Veículo), o documento que autoriza a circulação em vias públicas. Sem CRLV válido, o carro é apreendido em qualquer fiscalização.</p><h2>O que precisa estar quitado</h2><ul><li>IPVA do ano atual (ou em dia no parcelamento)</li><li>Multas de trânsito sem recurso pendente</li><li>Vistoria aprovada (em estados que exigem)</li></ul><h2>Quanto custa</h2><p>Além do IPVA, há taxa administrativa estadual entre R$ 70 e R$ 180. Em SP fica em torno de R$ 120. O CRLV-e (eletrônico) já está disponível no app Detran Digital de vários estados — mesmo valor legal que o físico.</p><h2>Como regularizar se estiver vencido</h2><ol><li>Verificar todos os débitos no site do Detran</li><li>Pagar IPVA em atraso com multa de 0,33% ao dia</li><li>Quitar todas as multas pendentes</li><li>O CRLV é emitido automaticamente após compensação (2 a 3 dias úteis)</li></ol><h2>Multa por circular sem licenciamento</h2><p>Infração gravíssima: R$ 293,47 e retenção do veículo. Se rebocado ao pátio, há diária de apreensão — que pode superar o valor de todas as multas em poucos dias.</p>`,
  },
  {
    category: "burocracia" as const,
    coverUrl: "/photos/burocracia.jpg",
    title: "Multa de trânsito: como consultar, prazo para pagar e quando vale recorrer",
    excerpt: "Como consultar multas pelo CPF ou placa, prazo para pagamento com 20% de desconto, como funciona o recurso e quando ele realmente compensa.",
    contentHtml: `<h2>Como consultar suas multas</h2><ul><li>Site do Detran do seu estado: por placa ou RENAVAM</li><li>App Carteira Digital de Trânsito (CDT): consolida infrações federais e estaduais</li><li>Portal do Senatran: multas de rodovias federais</li></ul><p>A notificação chega pelo Correios no endereço do CRV. Se você mudou de endereço sem atualizar, pode perder prazos sem saber.</p><h2>Prazo com desconto</h2><p>30 dias após a notificação de autuação para pagar com 20% de desconto. Depois paga o valor cheio. Não pagar envia a multa à dívida ativa e bloqueia o licenciamento.</p><h2>Como recorrer</h2><p><strong>Defesa Prévia:</strong> antes da multa ser definitiva, em até 30 dias após o aviso de infração. Se aceita, cancela a multa antes do lançamento.</p><p><strong>Recurso à JARI:</strong> após a notificação de penalidade, em até 30 dias. Negado, ainda cabe recurso ao Cetran (estadual) ou Contran (federal).</p><h2>Quando vale recorrer</h2><ul><li>Erro de identificação do veículo ou do condutor</li><li>Falha no equipamento (radar sem certificado atualizado)</li><li>Sinalização ausente ou inadequada no local</li></ul><p>Recorrer só para ganhar tempo não compensa: recurso negado = perde o desconto de 20% e os pontos são computados normalmente.</p><h2>Pontos na CNH</h2><p>Leve: 3 pts | Média: 4 pts | Grave: 5 pts | Gravíssima: 7 pts. Acumulando 20 pontos em 12 meses a CNH é suspensa por no mínimo 6 meses.</p>`,
  },
  {
    category: "burocracia" as const,
    coverUrl: "/photos/burocracia.jpg",
    title: "Recall de carro: como saber se o seu tem, o que a montadora deve fazer e seus direitos",
    excerpt: "Como consultar recall pelo chassi, o que a montadora é obrigada a reparar gratuitamente, quando você tem direito a carro reserva e o que acontece se ignorar.",
    contentHtml: `<h2>O que é recall</h2><p>Convocação oficial de uma montadora para corrigir defeito de fabricação que representa risco à segurança. É obrigatório e gratuito — a montadora paga peças e mão de obra, independente da idade do veículo ou validade da garantia.</p><h2>Como consultar</h2><p>Acesse o site do Senatran e consulte pelo número do chassi (VIN). O VIN fica impresso na lateral do painel, visível pelo canto inferior do para-brisa do motorista. A consulta é gratuita e imediata.</p><h2>Seus direitos no recall</h2><ul><li><strong>Reparo gratuito:</strong> a montadora paga tudo, sem exceção</li><li><strong>Prazo razoável:</strong> se não houver peça, a montadora deve informar o prazo e oferecer alternativa</li><li><strong>Carro reserva:</strong> se o reparo demorar mais de 30 dias, você tem direito a veículo substituto pelo mesmo período (CDC)</li><li><strong>Indenização:</strong> se o defeito causou acidente ou dano, a montadora pode ser acionada judicialmente</li></ul><h2>O que acontece se ignorar o recall</h2><p>Se o defeito causar acidente e for provado que o recall não foi feito, a seguradora ou proteção veicular pode recusar a indenização. Você assume responsabilidade civil por danos a terceiros. Recalls ignorados também comprometem a venda do veículo — concessionárias recusam carro com recall aberto para financiamento.</p>`,
  },
];

export async function POST(req: NextRequest) {
  try {
    const token = process.env.SEED_TOKEN;
    if (!token) return NextResponse.json({ error: "not configured" }, { status: 503 });

    const body = await req.json().catch(() => ({})) as { token?: string };
    if (body.token !== token) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const results = [];
    for (const post of POSTS) {
      const existing = await prisma.post.findFirst({ where: { title: post.title } });
      if (existing) {
        results.push({ title: post.title.slice(0, 55), status: "já existe" });
        continue;
      }
      const s = await slug(post.title);
      const created = await prisma.post.create({
        data: { slug: s, title: post.title, excerpt: post.excerpt, category: post.category, contentHtml: post.contentHtml, coverUrl: post.coverUrl, coverType: "IMAGE", status: "PUBLISHED", publishAt: new Date() },
      });
      results.push({ title: created.title.slice(0, 55), id: created.id, status: "criado" });
    }
    return NextResponse.json({ ok: true, total: results.length, results });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

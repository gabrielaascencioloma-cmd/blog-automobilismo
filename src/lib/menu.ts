export interface Subtopic {
  slug: string;
  label: string;
  scope: string;
  keywords: string[];
}

export interface Topic {
  slug: string;
  label: string;
  subtopics: Subtopic[];
}

export const MENU_TOPICS: Topic[] = [
  {
    slug: "manutencao",
    label: "Manutenção",
    subtopics: [
      {
        slug: "motor-e-oleo",
        label: "Motor e Óleo",
        scope: "Troca, viscosidade, consumo de óleo",
        keywords: ["oleo", "motor", "viscosidade", "correia", "vela", "radiador", "escapamento"],
      },
      {
        slug: "pneus-e-rodas",
        label: "Pneus e Rodas",
        scope: "Calibragem, rodízio, alinhamento",
        keywords: ["pneu", "roda", "calibragem", "calibrar", "rodizio", "alinhamento", "balanceamento", "amortecedor", "suspensao"],
      },
      {
        slug: "freios",
        label: "Freios",
        scope: "Pastilha, disco, ruído",
        keywords: ["freio", "pastilha", "disco"],
      },
      {
        slug: "eletrica-e-bateria",
        label: "Elétrica e Bateria",
        scope: "\"Carro não pega\", alternador",
        keywords: ["bateria", "alternador", "motor de arranque", "nao pega", "farol", "lampada", "pane eletrica"],
      },
      {
        slug: "revisao-e-garantia",
        label: "Revisão e Garantia",
        scope: "Plano de revisão, o que perde garantia",
        keywords: ["revisao", "garantia", "preventiva", "corretiva"],
      },
    ],
  },
  {
    slug: "financiamento",
    label: "Financiamento",
    subtopics: [
      {
        slug: "simulacao-e-parcelas",
        label: "Simulação e Parcelas",
        scope: "Quanto cabe no orçamento",
        keywords: ["simulacao", "simular", "parcela", "orcamento", "financiamento"],
      },
      {
        slug: "taxas-de-juros",
        label: "Taxas de Juros",
        scope: "Como comparar, CET",
        keywords: ["juros", "taxa de juros", "cet", "custo efetivo"],
      },
      {
        slug: "cdc-consorcio-leasing",
        label: "CDC x Consórcio x Leasing",
        scope: "Qual modelo serve a qual perfil",
        keywords: ["cdc", "consorcio", "leasing"],
      },
      {
        slug: "score-e-aprovacao",
        label: "Score e Aprovação",
        scope: "Entrada, negativado, como melhorar",
        keywords: ["score", "aprovacao", "credito aprovado", "negativado", "nome sujo"],
      },
      {
        slug: "quitacao-e-portabilidade",
        label: "Quitação e Portabilidade",
        scope: "Antecipar, trocar de banco",
        keywords: ["quitacao", "quitar", "portabilidade", "antecipar parcela"],
      },
    ],
  },
  {
    slug: "documentos",
    label: "Documentos",
    subtopics: [
      {
        slug: "crlv-e-licenciamento",
        label: "CRLV e Licenciamento",
        scope: "Calendário, como emitir",
        keywords: ["crlv", "licenciamento", "documento do carro", "documentos"],
      },
      {
        slug: "ipva",
        label: "IPVA",
        scope: "Tabela por estado, isenção, parcelamento",
        keywords: ["ipva"],
      },
      {
        slug: "multas-e-recursos",
        label: "Multas e Recursos",
        scope: "Como recorrer, prazos",
        keywords: ["multa", "recurso", "recorrer", "infracao"],
      },
      {
        slug: "cnh",
        label: "CNH",
        scope: "Renovação, categorias, suspensão",
        keywords: ["cnh", "habilitacao", "carteira de motorista"],
      },
      {
        slug: "transferencia",
        label: "Transferência",
        scope: "Compra e venda, prazo, ATPV-e",
        keywords: ["transferencia", "atpv", "compra e venda", "vender o carro"],
      },
    ],
  },
  {
    slug: "seguranca",
    label: "Segurança",
    subtopics: [
      {
        slug: "direcao-defensiva",
        label: "Direção Defensiva",
        scope: "Comportamento, distância, antecipação",
        keywords: ["direcao defensiva", "distancia de seguranca", "dirigir com seguranca"],
      },
      {
        slug: "itens-de-seguranca",
        label: "Itens de Segurança",
        scope: "Airbag, ABS, teste de colisão",
        keywords: ["airbag", "abs", "teste de colisao", "crash test", "itens de seguranca"],
      },
      {
        slug: "cadeirinha-e-criancas",
        label: "Cadeirinha e Crianças",
        scope: "Lei, idade, instalação",
        keywords: ["cadeirinha", "crianca", "bebe conforto", "assento de elevacao"],
      },
      {
        slug: "chuva-e-estrada",
        label: "Chuva e Estrada",
        scope: "Aquaplanagem, neblina, viagem",
        keywords: ["chuva", "aquaplanagem", "neblina", "viagem", "estrada", "limpador"],
      },
      {
        slug: "prevencao-de-roubo",
        label: "Prevenção de Roubo",
        scope: "Rotina, estacionamento, regiões",
        keywords: ["roubo", "furto", "estacionamento", "rastreador"],
      },
    ],
  },
  {
    slug: "comparativos",
    label: "Comparativos",
    subtopics: [
      {
        slug: "seguro-x-protecao-veicular",
        label: "Seguro x Proteção Veicular",
        scope: "A comparação de maior intenção comercial",
        keywords: ["seguro"],
      },
      {
        slug: "gasolina-etanol-gnv",
        label: "Gasolina x Etanol x GNV",
        scope: "Conta real, regra dos 70%",
        keywords: ["gasolina", "etanol", "gnv", "combustivel"],
      },
      {
        slug: "novo-x-seminovo",
        label: "Novo x Seminovo",
        scope: "Depreciação, garantia, custo",
        keywords: ["seminovo", "carro usado", "zero km", "0 km", "depreciacao"],
      },
      {
        slug: "automatico-x-manual",
        label: "Automático x Manual",
        scope: "Manutenção, consumo, revenda",
        keywords: ["automatico", "cambio manual", "cambio", "cvt"],
      },
      {
        slug: "modelo-x-modelo",
        label: "Modelo x Modelo",
        scope: "Onix x HB20, Kwid x Mobi",
        keywords: ["onix", "hb20", "kwid", "mobi", "gol", "tracker", "compass", "creta"],
      },
    ],
  },
  {
    slug: "protecao-veicular",
    label: "Proteção Veicular",
    subtopics: [
      {
        slug: "como-funciona",
        label: "Como Funciona",
        scope: "O modelo associativo explicado",
        keywords: ["protecao veicular", "associacao", "associativo", "associativa"],
      },
      {
        slug: "o-que-cobre",
        label: "O Que Cobre e o Que Não Cobre",
        scope: "A dúvida número 1 do público",
        keywords: ["cobertura", "o que cobre", "nao cobre"],
      },
      {
        slug: "custos-e-mensalidade",
        label: "Custos e Mensalidade",
        scope: "Rateio, adesão, cota",
        keywords: ["mensalidade", "rateio", "adesao", "cota de participacao"],
      },
      {
        slug: "sinistro",
        label: "Sinistro: o Que Fazer",
        scope: "Passo a passo depois da batida",
        keywords: ["sinistro", "batida", "bateu o carro", "acidente"],
      },
      {
        slug: "roubo-e-furto",
        label: "Roubo e Furto",
        scope: "Acionamento, prazos, indenização",
        keywords: ["roubo", "furto", "indenizacao"],
      },
    ],
  },
];

export function topicHref(topic: Topic, subtopic?: Subtopic): string {
  const base = `/blog?topico=${topic.slug}`;
  return subtopic ? `${base}&sub=${subtopic.slug}` : base;
}

export function findTopic(slug: string | undefined): Topic | undefined {
  return MENU_TOPICS.find((t) => t.slug === slug);
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

// Whole-word match (plural allowed) so short terms like "abs" don't hit "absurdo".
export function matchesKeywords(text: string, keywords: string[]): boolean {
  const haystack = normalize(text);
  return keywords.some((keyword) => {
    const escaped = normalize(keyword).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(^|[^a-z0-9])${escaped}(e?s)?(?![a-z0-9])`).test(haystack);
  });
}

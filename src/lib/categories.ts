export type CategorySlug = "manutencao" | "dicas" | "alertas" | "novidades" | "financeiro" | "burocracia" | "seguranca" | "comparativos" | "protecao";

export interface CategoryDef {
  slug: CategorySlug;
  label: string;
  description: string;
  coverImage: string;
}

export const CATEGORIES: Record<CategorySlug, CategoryDef> = {
  manutencao: {
    slug: "manutencao",
    label: "Manutenção",
    description: "Revisões, peças e o que fazer antes que o problema fique caro.",
    coverImage: "/photos/manutencao.jpg",
  },
  dicas: {
    slug: "dicas",
    label: "Dicas",
    description: "Listas práticas para economizar tempo, combustível e dor de cabeça.",
    coverImage: "/photos/dicas.jpg",
  },
  alertas: {
    slug: "alertas",
    label: "Alertas",
    description: "Aumentos, riscos e mudanças que todo motorista devia acompanhar.",
    coverImage: "/photos/alertas.jpg",
  },
  novidades: {
    slug: "novidades",
    label: "Novidades",
    description: "Prazos, documentos e lembretes que ficam fáceis de esquecer.",
    coverImage: "/photos/novidades.jpg",
  },
  financeiro: {
    slug: "financeiro",
    label: "Financeiro",
    description: "Custos, financiamento, consórcio e tudo que envolve dinheiro e carro.",
    coverImage: "/photos/financeiro.jpg",
  },
  burocracia: {
    slug: "burocracia",
    label: "Documentação",
    description: "Transferência, vistoria, recall, multas e toda a papelada do veículo.",
    coverImage: "/photos/burocracia.jpg",
  },
  seguranca: {
    slug: "seguranca",
    label: "Segurança",
    description: "Dicas de direção segura, equipamentos e prevenção de acidentes.",
    coverImage: "/photos/seguranca.jpg",
  },
  comparativos: {
    slug: "comparativos",
    label: "Comparativos",
    description: "Side a side entre modelos, combustíveis e opções do mercado.",
    coverImage: "/photos/comparativos.jpg",
  },
  protecao: {
    slug: "protecao",
    label: "Proteção Veicular",
    description: "Como funciona a proteção veicular, o que protege e quanto custa.",
    coverImage: "/photos/protecao.jpg",
  },
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

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
    description: "Direção segura, prevenção e cuidados com o veículo.",
    coverImage: "/photos/alertas.jpg",
  },
  comparativos: {
    slug: "comparativos",
    label: "Comparativos",
    description: "Comparações práticas para decidir com mais clareza.",
    coverImage: "/photos/dicas.jpg",
  },
  protecao: {
    slug: "protecao",
    label: "Proteção Veicular",
    description: "Como funciona a proteção veicular e o que avaliar antes de contratar.",
    coverImage: "/photos/novidades.jpg",
  },
};

// Categorias criadas só para casar com os tópicos do menu. Ficam fora das listas públicas
// (filtros do blog, rodapé, sobre) para não aparecerem vazias.
const MENU_ONLY: CategorySlug[] = ["seguranca", "comparativos", "protecao"];

export const CATEGORY_LIST = Object.values(CATEGORIES).filter((c) => !MENU_ONLY.includes(c.slug));

// Seletor de categoria no admin: os 6 tópicos do menu do blog.
export const ADMIN_CATEGORY_OPTIONS: { slug: CategorySlug; label: string }[] = [
  { slug: "manutencao", label: "Manutenção" },
  { slug: "financeiro", label: "Financiamento" },
  { slug: "burocracia", label: "Documentos" },
  { slug: "seguranca", label: "Segurança" },
  { slug: "comparativos", label: "Comparativos" },
  { slug: "protecao", label: "Proteção Veicular" },
];

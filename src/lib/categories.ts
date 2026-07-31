export type CategorySlug = "manutencao" | "dicas" | "alertas" | "novidades";

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
};

export const CATEGORY_LIST = Object.values(CATEGORIES);

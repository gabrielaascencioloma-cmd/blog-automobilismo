import type { Metadata } from "next";
import { Wrench, ListChecks, TriangleAlert, CalendarClock } from "lucide-react";
import { CATEGORIES } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Sobre",
  description: "De onde vem o Carro em Dia e o que você encontra por aqui.",
};

const CATEGORY_ICONS = {
  manutencao: Wrench,
  dicas: ListChecks,
  alertas: TriangleAlert,
  novidades: CalendarClock,
} as const;

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
          Um blog para quem depende do carro, não para quem coleciona carro.
        </h1>
        <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
          <p>
            O <strong className="text-ink">Carro em Dia</strong> nasceu de uma
            constatação simples: a maioria do conteúdo sobre carros no Brasil
            fala de carro esportivo, lançamento e review de performance — e
            pouca coisa fala com quem usa o carro popular para trabalhar,
            levar os filhos à escola e resolver a vida todos os dias.
          </p>
          <p>
            Aqui o foco é prático. Sem jargão técnico desnecessário, sem
            conteúdo patrocinado disfarçado de dica e sem alarmismo. Cada post
            existe para responder uma pergunta real de quem tem carro: o que
            revisar, o que evitar, o que está mudando de preço e o que fazer
            a respeito — incluindo, de vez em quando, seguro e proteção
            veicular, sempre que fizer sentido dentro do assunto do post.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {Object.values(CATEGORIES).map((cat) => {
            const Icon = CATEGORY_ICONS[cat.slug];
            return (
              <div key={cat.slug} className="rounded-2xl bg-surface p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal text-cream">
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <h3 className="font-display mt-3 text-base font-bold text-ink">
                  {cat.label}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{cat.description}</p>
              </div>
            );
          })}
        </div>
    </div>
  );
}

import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seu Carro — Carro em Dia",
  description: "Guias de manutenção e dicas específicas para os carros populares mais vendidos do Brasil.",
};

const MODELOS = [
  { nome: "Chevrolet Onix", slug: "onix", descricao: "O mais vendido do Brasil. Motores 1.0 e 1.0 turbo." },
  { nome: "Hyundai HB20", slug: "hb20", descricao: "Motor 1.0 e 1.6. Forte no interior e nas cidades." },
  { nome: "VW Gol", slug: "gol", descricao: "Clássico popular com motor 1.0. Manutenção acessível." },
  { nome: "Fiat Uno / Mobi", slug: "uno-mobi", descricao: "Compacto urbano com motor 1.0 FIRE e EVO." },
  { nome: "Renault Kwid", slug: "kwid", descricao: "Menor custo de manutenção entre os compactos." },
  { nome: "Hyundai Creta", slug: "creta", descricao: "SUV com motor 1.0 turbo. Cada vez mais popular." },
  { nome: "Jeep Compass", slug: "compass", descricao: "SUV médio mais vendido. Motor 1.3 turbo e diesel." },
  { nome: "Chevrolet Tracker", slug: "tracker", descricao: "SUV compacto com motor 1.2 e 1.0 turbo." },
];

export default function SeuCarroPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-14">
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-red">Guias por modelo</span>
        <h1 className="mt-2 text-4xl font-extrabold uppercase leading-tight text-ink sm:text-5xl">
          Seu Carro
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-ink-soft">
          Manutenção, custos, dicas e alertas específicos para o seu modelo — sem precisar filtrar conteúdo
          que não é do seu carro.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MODELOS.map((modelo) => (
          <div
            key={modelo.slug}
            className="group rounded-xl border border-border-subtle bg-surface p-6 transition-shadow hover:shadow-md"
          >
            <h2 className="text-lg font-bold text-ink">{modelo.nome}</h2>
            <p className="mt-1 text-sm text-ink-soft">{modelo.descricao}</p>
            <span className="mt-4 inline-block text-xs font-semibold text-ink-faint">Em breve</span>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-xl bg-ink px-8 py-10 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-red">Enquanto isso</p>
        <h2 className="mt-2 text-2xl font-extrabold uppercase text-white">
          Veja todos os artigos de manutenção
        </h2>
        <p className="mt-3 text-sm text-white/60">
          Dicas e alertas que se aplicam à maioria dos carros populares.
        </p>
        <Link
          href="/blog?categoria=manutencao"
          className="mt-6 inline-block rounded-full bg-red px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
        >
          Ver artigos de manutenção
        </Link>
      </div>
    </main>
  );
}

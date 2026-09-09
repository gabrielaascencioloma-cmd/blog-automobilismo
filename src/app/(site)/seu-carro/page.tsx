import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seu Carro — Olha o Carro",
  description: "Guias de manutenção e dicas específicas para os carros populares mais vendidos do Brasil.",
};

const MODELOS = [
  {
    nome: "Chevrolet Onix",
    descricao: "O mais vendido do Brasil. Motores 1.0 e 1.0 turbo.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "onix-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-chevrolet-onix" },
    ],
  },
  {
    nome: "Hyundai HB20",
    descricao: "Motor 1.0 e 1.6. Forte no interior e nas cidades.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "hb20-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-hyundai-hb20" },
    ],
  },
  {
    nome: "VW Gol",
    descricao: "Clássico popular com motor 1.0. Manutenção acessível.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "vw-gol-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-vw-gol" },
    ],
  },
  {
    nome: "Fiat Mobi",
    descricao: "Compacto urbano com motor 1.0 FIRE e EVO.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "fiat-mobi-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-fiat-mobi" },
    ],
  },
  {
    nome: "Renault Kwid",
    descricao: "Menor custo de manutenção entre os compactos.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "kwid-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-renault-kwid" },
    ],
  },
  {
    nome: "Hyundai Creta",
    descricao: "SUV com motor 1.0 turbo. Cada vez mais popular.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "creta-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-hyundai-creta" },
    ],
  },
  {
    nome: "Jeep Compass",
    descricao: "SUV médio mais vendido. Motor 1.3 turbo e diesel.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "compass-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-jeep-compass" },
    ],
  },
  {
    nome: "Chevrolet Tracker",
    descricao: "SUV compacto com motor 1.2 e 1.0 turbo.",
    posts: [
      { label: "Benefícios e pontos de atenção", slug: "tracker-beneficios-e-pontos-de-atencao" },
      { label: "Problemas que os donos reclamam", slug: "problemas-do-chevrolet-tracker" },
    ],
  },
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
            key={modelo.nome}
            className="rounded-xl border border-border-subtle bg-surface p-6"
          >
            <h2 className="text-lg font-bold text-ink">{modelo.nome}</h2>
            <p className="mt-1 text-sm text-ink-soft">{modelo.descricao}</p>
            <ul className="mt-4 space-y-2">
              {modelo.posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red hover:underline"
                  >
                    <ArrowRight className="h-3.5 w-3.5 shrink-0" />
                    {post.label}
                  </Link>
                </li>
              ))}
            </ul>
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

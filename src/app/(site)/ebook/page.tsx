"use client";

import { useState } from "react";
import { Download, CheckCircle, BookOpen, Wrench, DollarSign, Shield, AlertTriangle } from "lucide-react";

// ⬇️ ATUALIZAR com a URL do Vercel Blob após upload do PDF
const EBOOK_PDF_URL = process.env.NEXT_PUBLIC_EBOOK_PDF_URL ?? "#sem-pdf";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const CHAPTERS = [
  { icon: Wrench, text: "Revisão preventiva: o que verificar e quando" },
  { icon: DollarSign, text: "Quanto custa manter um carro popular por ano" },
  { icon: AlertTriangle, text: "Os 7 sinais que o carro dá antes de pifar" },
  { icon: Shield, text: "Pneus, freios e óleo: guia de substituição" },
  { icon: BookOpen, text: "Checklist completo para não esquecer nada" },
];

export default function EbookPage() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!nome.trim()) { setError("Informe seu nome."); return; }
    const digits = telefone.replace(/\D/g, "");
    if (digits.length < 10) { setError("Telefone incompleto."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "ebook", nome: nome.trim(), telefone: digits }),
      });
      if (!res.ok) throw new Error("erro");
      setDone(true);
    } catch {
      setError("Algo deu errado. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-page">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-ink py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-10"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span className="inline-block rounded-full bg-red/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-red mb-6">
            Ebook gratuito
          </span>
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Bê-á-bá da<br />
            <span className="text-red">Manutenção</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
            Tudo que você precisa saber para não cair de surpresa quando o carro resolver te dar um susto.
            Guia prático para donos de carros populares.
          </p>

          {/* Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-400" /> 100% gratuito</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-400" /> Download imediato</span>
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-green-400" /> Sem spam</span>
          </div>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">

          {/* Left — O que você vai aprender */}
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-red">O que tem no ebook</p>
            <h2 className="font-display text-2xl font-black uppercase text-ink sm:text-3xl">
              Pare de ser pego de surpresa
            </h2>
            <p className="mt-3 text-ink-soft leading-relaxed">
              Um carro mal cuidado custa de 3 a 5 vezes mais em consertos do que um carro com manutenção em dia.
              Este guia te dá o mapa completo — sem enrolação.
            </p>

            <ul className="mt-8 space-y-4">
              {CHAPTERS.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red/10">
                    <Icon className="h-4 w-4 text-red" />
                  </span>
                  <span className="text-sm leading-relaxed text-ink">{text}</span>
                </li>
              ))}
            </ul>

            {/* Mockup do ebook */}
            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-5 shadow-sm">
              <div className="flex h-20 w-14 shrink-0 items-center justify-center rounded-lg bg-red shadow-lg">
                <BookOpen className="h-7 w-7 text-white" />
              </div>
              <div>
                <p className="font-display text-sm font-black uppercase text-ink">Bê-á-bá da Manutenção</p>
                <p className="mt-0.5 text-xs text-ink-faint">Guia completo · PDF · Gratuito</p>
              </div>
            </div>
          </div>

          {/* Right — Formulário */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm">
            {!done ? (
              <>
                <h3 className="font-display text-xl font-black uppercase text-ink">
                  Baixar agora
                </h3>
                <p className="mt-1 text-sm text-ink-soft">
                  Preencha abaixo e o download começa na hora.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="nome" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                      Seu nome
                    </label>
                    <input
                      id="nome"
                      type="text"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Ex: João Silva"
                      autoComplete="name"
                      className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                    />
                  </div>

                  <div>
                    <label htmlFor="tel" className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                      WhatsApp / Telefone
                    </label>
                    <input
                      id="tel"
                      type="tel"
                      value={telefone}
                      onChange={(e) => setTelefone(formatPhone(e.target.value))}
                      placeholder="(11) 99999-9999"
                      autoComplete="tel"
                      inputMode="numeric"
                      className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                    />
                  </div>

                  {error && (
                    <p className="rounded-lg bg-red/10 px-3 py-2 text-xs font-semibold text-red">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-60"
                  >
                    {loading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {loading ? "Aguarde…" : "Quero o ebook grátis"}
                  </button>

                  <p className="text-center text-[11px] text-ink-faint">
                    Seus dados ficam só com a gente. Sem spam, prometemos.
                  </p>
                </form>
              </>
            ) : (
              /* Estado de sucesso — download liberado */
              <div className="flex flex-col items-center py-4 text-center">
                <CheckCircle className="h-14 w-14 text-green-500" />
                <h3 className="font-display mt-4 text-xl font-black uppercase text-ink">
                  Pronto, {nome.split(" ")[0]}!
                </h3>
                <p className="mt-2 text-sm text-ink-soft leading-relaxed">
                  Seu ebook está pronto para download.
                  Clique no botão abaixo para baixar agora.
                </p>
                <a
                  href={EBOOK_PDF_URL}
                  download="beaba-da-manutencao.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 rounded-lg bg-red px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-dark"
                >
                  <Download className="h-4 w-4" />
                  Baixar PDF agora
                </a>
                <p className="mt-4 text-xs text-ink-faint">
                  Caso o download não inicie, clique com o botão direito e salve o link.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Social proof / rodapé ── */}
      <section className="border-t border-border-subtle bg-surface-2 py-10">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm text-ink-soft">
            <span className="font-bold text-ink">Meu Carro Protegido</span> — conteúdo prático para quem depende do carro todo dia.
          </p>
        </div>
      </section>
    </div>
  );
}

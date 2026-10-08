"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, CheckCircle, ArrowRight, Wrench, BookOpen, ShieldAlert } from "lucide-react";
import Link from "next/link";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatPlaca(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 7);
}

const BENEFICIOS = [
  "Proteção contra furto e roubo",
  "Cobertura para vidros e faróis",
  "Carro reserva em caso de sinistro",
  "Assistência 24h em todo o Brasil",
];

export default function CotacaoPage() {
  const [form, setForm] = useState({ nome: "", telefone: "", placa: "", modelo: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [utmSource, setUtmSource] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("utm_source");
    if (src) setUtmSource(src);
  }, []);

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome.";
    if (form.telefone.replace(/\D/g, "").length < 10) e.telefone = "Telefone incompleto.";
    if (!form.modelo.trim()) e.modelo = "Informe o modelo do veículo.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo: "ark",
          nome: form.nome.trim(),
          telefone: form.telefone.replace(/\D/g, ""),
          placa: form.placa || null,
          modelo: form.modelo.trim(),
          utmSource: utmSource || null,
        }),
      });
      setDone(true);
    } catch {
      setErrors({ geral: "Algo deu errado. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  function setField(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((er) => ({ ...er, [field]: "" }));
  }

  if (done) {
    return (
      <div className="bg-page">
        {/* Confirmação */}
        <section className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h2 className="font-display mt-5 text-2xl font-black uppercase text-ink sm:text-3xl">
            Recebemos seu pedido!
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-ink-soft leading-relaxed">
            Nossa equipe vai entrar em contato em breve pelo WhatsApp para apresentar as opções de proteção para o seu carro.
          </p>
        </section>

        {/* Enquanto aguarda */}
        <section className="border-t border-border-subtle bg-surface px-6 py-12">
          <div className="mx-auto max-w-4xl">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-red mb-2">Enquanto aguarda</p>
            <h3 className="font-display text-center text-2xl font-black uppercase text-ink mb-8">
              Conteúdo que pode te ajudar
            </h3>

            <div className="grid gap-4 sm:grid-cols-3">
              {/* Ebook */}
              <Link
                href="/ebook"
                className="group flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-2 p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red/10">
                  <BookOpen className="h-5 w-5 text-red" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-red">E-book grátis</p>
                  <p className="font-display mt-1 text-base font-black uppercase text-ink leading-tight">
                    Bê-á-bá da Manutenção
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Guia completo para você não cair em roubada na oficina.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-red group-hover:gap-2 transition-all">
                  Baixar grátis <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* Manutenção */}
              <Link
                href="/blog?categoria=manutencao"
                className="group flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-2 p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red/10">
                  <Wrench className="h-5 w-5 text-red" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-red">Manutenção</p>
                  <p className="font-display mt-1 text-base font-black uppercase text-ink leading-tight">
                    Cuide bem do seu carro
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    Dicas práticas para manter o carro funcionando e evitar surpresas na estrada.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-red group-hover:gap-2 transition-all">
                  Ver artigos <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>

              {/* Proteção e segurança */}
              <Link
                href="/blog?categoria=protecao"
                className="group flex flex-col gap-3 rounded-2xl border border-border-subtle bg-surface-2 p-6 transition-shadow hover:shadow-md"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red/10">
                  <ShieldAlert className="h-5 w-5 text-red" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-red">Proteção Veicular</p>
                  <p className="font-display mt-1 text-base font-black uppercase text-ink leading-tight">
                    Entenda sua proteção
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">
                    O que cobre, o que não cobre e o que você precisa saber antes de contratar.
                  </p>
                </div>
                <span className="mt-auto inline-flex items-center gap-1 text-xs font-bold text-red group-hover:gap-2 transition-all">
                  Ver artigos <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-page">

      {/* ── Hero ── */}
      <section className="bg-[#0f0f0f] py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span className="inline-block rounded-full bg-red/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-red mb-5">
            Proteção Veicular
          </span>
          <h1 className="font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-white sm:text-5xl">
            Proteja seu carro.<br />
            <span className="text-red">Sem burocracia.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/70">
            Preencha o formulário e receba em minutos as melhores opções de proteção para o seu veículo. Sem enrolação.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">

          {/* Left — benefícios */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-red mb-2">O que você recebe</p>
            <h2 className="font-display text-2xl font-black uppercase text-ink sm:text-3xl">
              Proteção completa para o seu dia a dia
            </h2>
            <p className="mt-3 leading-relaxed text-ink-soft">
              Proteção veicular com cobertura real para quem usa o carro todo dia. Sem letra miúda, sem surpresa na hora do sinistro.
            </p>

            <ul className="mt-8 space-y-4">
              {BENEFICIOS.map((b) => (
                <li key={b} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red/10">
                    <ShieldCheck className="h-4 w-4 text-red" />
                  </span>
                  <span className="text-sm text-ink">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-border-subtle bg-surface p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-faint">Parceiro oficial</p>
              <p className="font-display mt-1 text-lg font-black uppercase text-ink">Meu Carro Protegido</p>
              <p className="mt-1 text-sm text-ink-soft">Cotação gratuita · Sem compromisso · Resposta em minutos</p>
            </div>
          </div>

          {/* Right — formulário */}
          <div className="rounded-2xl border border-border-subtle bg-surface p-8 shadow-sm">
            <h3 className="font-display text-xl font-black uppercase text-ink">
              Quero minha cotação
            </h3>
            <p className="mt-1 text-sm text-ink-soft">Preencha abaixo. Nossa equipe entra em contato via WhatsApp.</p>

            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">

              {/* Nome */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                  Nome completo
                </label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={(e) => setField("nome", e.target.value)}
                  placeholder="Ex: João Silva"
                  autoComplete="name"
                  className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                />
                {errors.nome && <p className="mt-1 text-xs text-red">{errors.nome}</p>}
              </div>

              {/* Telefone */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => setField("telefone", formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  autoComplete="tel"
                  inputMode="numeric"
                  className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                />
                {errors.telefone && <p className="mt-1 text-xs text-red">{errors.telefone}</p>}
              </div>

              {/* Modelo */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                  Modelo do veículo
                </label>
                <input
                  type="text"
                  value={form.modelo}
                  onChange={(e) => setField("modelo", e.target.value)}
                  placeholder="Ex: Chevrolet Onix 2022"
                  className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                />
                {errors.modelo && <p className="mt-1 text-xs text-red">{errors.modelo}</p>}
              </div>

              {/* Placa */}
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-ink">
                  Placa <span className="font-normal normal-case text-ink-faint">(opcional)</span>
                </label>
                <input
                  type="text"
                  value={form.placa}
                  onChange={(e) => setField("placa", formatPlaca(e.target.value))}
                  placeholder="ABC1D23"
                  maxLength={7}
                  className="w-full rounded-lg border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus:border-red focus:outline-none focus:ring-1 focus:ring-red"
                />
              </div>

              {errors.geral && (
                <p className="rounded-full bg-red/10 px-3 py-2 text-xs font-semibold text-red">{errors.geral}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-60"
              >
                {loading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                {loading ? "Enviando…" : "Quero minha cotação grátis"}
              </button>

              <p className="text-center text-[11px] text-ink-faint">
                Seus dados ficam só com a gente. Sem spam.
              </p>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

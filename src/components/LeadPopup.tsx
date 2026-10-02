"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, ChevronRight } from "lucide-react";

type Step = "hidden" | "question" | "verificacao" | "form" | "success";

const PROTECOES = [
  "Porto Seguro",
  "Proauto",
  "Loma",
  "Suhai",
  "Bradesco Seguros",
  "Álamo",
];

export function LeadPopup() {
  const [step, setStep] = useState<Step>("hidden");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", placa: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [protecao, setProtecao] = useState("");
  const [outraProtecao, setOutraProtecao] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("lead_shown")) return;
    const t = setTimeout(() => setStep("question"), 30000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (step === "hidden") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [step]);

  function dismiss() {
    sessionStorage.setItem("lead_shown", "1");
    setStep("hidden");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.telefone.trim()) e.telefone = "Informe seu telefone";
    if (!form.placa.trim()) e.placa = "Informe a placa";
    return e;
  }

  async function handleSubmitCotacao(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "cotacao", ...form }),
      });
      setStep("success");
      setTimeout(dismiss, 3000);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitVerificacao() {
    const prot = protecao || outraProtecao.trim();
    if (!prot) return;
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "verificacao", protecaoAtual: prot }),
      });
      setStep("success");
      setTimeout(dismiss, 3000);
    } finally {
      setLoading(false);
    }
  }

  if (step === "hidden") return null;

  const podeConfirmar = !loading && (!!protecao || !!outraProtecao.trim());

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && dismiss()}
      role="dialog"
      aria-modal="true"
      aria-label="Avaliação gratuita"
    >
    <div className="lead-pop flex w-full max-w-md flex-col overflow-hidden rounded-3xl border border-white/60 bg-surface shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
      style={{ maxHeight: "calc(100vh - 2rem)" }}>

      {/* Header fixo */}
      <div className="flex flex-shrink-0 items-center gap-2.5 border-b border-border-subtle px-6 py-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-red/10">
          <ShieldCheck className="h-4 w-4 text-red" />
        </span>
        <span className="font-nav text-xs font-bold uppercase tracking-widest text-ink-soft">
          Avaliação gratuita
        </span>
        <button
          onClick={dismiss}
          aria-label="Fechar"
          className="ml-auto rounded-full p-1.5 text-ink-faint transition-colors hover:bg-black/5 hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Conteúdo scrollável */}
      <div className="overflow-y-auto">

        {/* Etapa 1 — pergunta inicial */}
        {step === "question" && (
          <div className="px-6 py-7">
            <p className="font-display text-2xl font-black uppercase leading-tight text-ink">
              Seu carro tem proteção?
            </p>
            <p className="mt-2 text-sm text-ink-soft">Responda em segundos e receba uma avaliação gratuita.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <button
                onClick={() => setStep("verificacao")}
                className="btn-3d-light w-full rounded-full px-4 py-3.5 text-sm font-semibold"
              >
                Sim, já tenho proteção
              </button>
              <button
                onClick={() => setStep("form")}
                className="btn-3d flex w-full items-center justify-center gap-1 rounded-full px-4 py-3.5 text-sm font-bold"
              >
                Não tenho — quero cotar
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Etapa Sim — qual proteção tem */}
        {step === "verificacao" && (
          <div className="px-6 py-6">
            <p className="font-display text-2xl font-black uppercase leading-tight text-ink">
              Você tem seguro/proteção pronto?
            </p>
            <p className="mb-4 mt-2 text-sm text-ink-soft">Selecione sua proteção atual</p>
            <div className="flex flex-col gap-1.5">
              {PROTECOES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { setProtecao(p); setOutraProtecao(""); }}
                  className={`w-full rounded-xl border px-4 py-2.5 text-left text-sm font-semibold transition-colors ${
                    protecao === p
                      ? "border-red bg-red/10 text-ink"
                      : "border-border-subtle text-ink-soft hover:border-red/30 hover:text-ink"
                  }`}
                >
                  {p}
                </button>
              ))}
              <input
                type="text"
                placeholder="Outra — qual?"
                value={outraProtecao}
                onChange={(e) => { setOutraProtecao(e.target.value); setProtecao(""); }}
                className="mt-1 w-full rounded-xl border border-border-subtle bg-surface-2 px-4 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition-colors focus:border-red/50"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmitVerificacao}
              disabled={!podeConfirmar}
              className="btn-3d mt-4 w-full rounded-full px-4 py-3.5 text-sm font-bold"
            >
              {loading ? "Enviando..." : "Confirmar →"}
            </button>
          </div>
        )}

        {/* Etapa Não — formulário cotação */}
        {step === "form" && (
          <form onSubmit={handleSubmitCotacao} className="px-6 py-7">
            <p className="mb-5 font-display text-2xl font-black uppercase leading-tight text-ink">
              Receba sua cotação gratuita
            </p>
            {[
              { id: "nome", label: "Nome", placeholder: "Seu nome", type: "text" },
              { id: "telefone", label: "WhatsApp", placeholder: "(11) 99999-9999", type: "tel" },
              { id: "placa", label: "Placa", placeholder: "ABC1234", type: "text" },
            ].map(({ id, label, placeholder, type }) => (
              <div key={id} className="mb-4">
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-ink-soft">
                  {label}
                </label>
                <input
                  type={type}
                  placeholder={placeholder}
                  value={form[id as keyof typeof form]}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, [id]: e.target.value }));
                    setErrors((er) => ({ ...er, [id]: "" }));
                  }}
                  className="w-full rounded-xl border border-border-subtle bg-surface-2 px-4 py-3 text-sm text-ink placeholder-ink-faint outline-none transition-colors focus:border-red/50"
                />
                {errors[id] && (
                  <p className="mt-1 text-xs text-red-bright">{errors[id]}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className="btn-3d mt-2 w-full rounded-full px-4 py-3.5 text-sm font-bold"
            >
              {loading ? "Enviando..." : "Quero minha cotação →"}
            </button>
          </form>
        )}

        {/* Sucesso */}
        {step === "success" && (
          <div className="px-6 py-10 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-red" />
            <p className="font-display text-xl font-black uppercase text-ink">Recebemos sua resposta!</p>
            <p className="mt-2 text-sm text-ink-soft">Obrigado pela informação.</p>
          </div>
        )}

      </div>
    </div>
    </div>
  );
}

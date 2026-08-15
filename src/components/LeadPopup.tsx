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

  return (
    <div className="fixed bottom-6 right-6 z-[100] w-[300px] rounded-2xl border border-border-subtle bg-surface shadow-2xl">
      <button
        onClick={dismiss}
        aria-label="Fechar"
        className="absolute right-3 top-3 rounded-full p-1 text-ink-faint transition-colors hover:text-ink"
      >
        <X className="h-3.5 w-3.5" />
      </button>

      <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
        <ShieldCheck className="h-4 w-4 text-red" />
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-soft">
          Proteção veicular
        </span>
      </div>

      {/* Etapa 1 — pergunta inicial */}
      {step === "question" && (
        <div className="px-4 py-5">
          <p className="text-sm font-bold leading-snug text-ink">
            Seu carro tem proteção?
          </p>
          <p className="mt-1 text-xs text-ink-soft">Responda em segundos</p>
          <div className="mt-4 flex flex-col gap-2">
            <button
              onClick={() => setStep("verificacao")}
              className="w-full rounded-xl border border-border-subtle px-3 py-2.5 text-xs font-semibold text-ink-soft transition-colors hover:border-red/30 hover:text-ink"
            >
              Sim, já tenho proteção
            </button>
            <button
              onClick={() => setStep("form")}
              className="flex w-full items-center justify-center gap-1 rounded-xl bg-red px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-dark"
            >
              Não tenho — quero cotar
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Etapa Sim — qual proteção tem */}
      {step === "verificacao" && (
        <div className="px-4 py-5">
          <p className="text-sm font-bold leading-snug text-ink">
            Você tem seguro/proteção pronto?
          </p>
          <p className="mt-1 mb-3 text-xs text-ink-soft">Selecione sua proteção atual</p>
          <div className="flex flex-col gap-1.5">
            {PROTECOES.map((p) => (
              <button
                key={p}
                onClick={() => { setProtecao(p); setOutraProtecao(""); }}
                className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-semibold transition-colors ${
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
              className="mt-1 w-full rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 text-xs text-ink placeholder-ink-faint outline-none transition-colors focus:border-red/50"
            />
          </div>
          <button
            onClick={handleSubmitVerificacao}
            disabled={loading || (!protecao && !outraProtecao.trim())}
            className="mt-3 w-full rounded-xl bg-red px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-40"
          >
            {loading ? "Enviando..." : "Confirmar →"}
          </button>
        </div>
      )}

      {/* Etapa Não — formulário cotação */}
      {step === "form" && (
        <form onSubmit={handleSubmitCotacao} className="px-4 py-5">
          <p className="mb-4 text-sm font-bold text-ink">
            Receba sua cotação gratuita
          </p>
          {[
            { id: "nome", label: "Nome", placeholder: "Seu nome", type: "text" },
            { id: "telefone", label: "WhatsApp", placeholder: "(11) 99999-9999", type: "tel" },
            { id: "placa", label: "Placa", placeholder: "ABC1234", type: "text" },
          ].map(({ id, label, placeholder, type }) => (
            <div key={id} className="mb-3">
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-ink-soft">
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
                className="w-full rounded-lg border border-border-subtle bg-surface-2 px-3 py-2 text-xs text-ink placeholder-ink-faint outline-none transition-colors focus:border-red/50"
              />
              {errors[id] && (
                <p className="mt-0.5 text-[10px] text-red-bright">{errors[id]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full rounded-xl bg-red px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Quero minha cotação →"}
          </button>
        </form>
      )}

      {/* Sucesso */}
      {step === "success" && (
        <div className="px-4 py-6 text-center">
          <ShieldCheck className="mx-auto mb-2 h-7 w-7 text-red" />
          <p className="text-sm font-bold text-ink">Recebemos sua resposta!</p>
          <p className="mt-1 text-xs text-ink-soft">
            Obrigado pela informação.
          </p>
        </div>
      )}
    </div>
  );
}

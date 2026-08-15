"use client";

import { useEffect, useState } from "react";
import { X, ShieldCheck, ChevronRight } from "lucide-react";

type Step = "hidden" | "question" | "form" | "success";

export function LeadPopup() {
  const [step, setStep] = useState<Step>("hidden");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ nome: "", telefone: "", placa: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (sessionStorage.getItem("loma_lead_shown")) return;
    const t = setTimeout(() => setStep("question"), 9000);
    return () => clearTimeout(t);
  }, []);

  function dismiss() {
    sessionStorage.setItem("loma_lead_shown", "1");
    setStep("hidden");
  }

  function handleSim() {
    dismiss();
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Informe seu nome";
    if (!form.telefone.trim()) e.telefone = "Informe seu telefone";
    if (!form.placa.trim()) e.placa = "Informe a placa do veículo";
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
        body: JSON.stringify(form),
      });
      setStep("success");
      setTimeout(dismiss, 3500);
    } finally {
      setLoading(false);
    }
  }

  if (step === "hidden") return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={dismiss}
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-2xl border border-border-subtle bg-surface-2 shadow-2xl">
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Fechar"
          className="absolute right-4 top-4 rounded-full p-1 text-ink-faint transition-colors hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header vermelho */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-red px-6 py-4">
          <ShieldCheck className="h-6 w-6 text-white/80" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
              Loma Bem Protegido
            </p>
            <p className="text-sm font-bold text-white">
              Proteção veicular sem complicação
            </p>
          </div>
        </div>

        {/* Step 1 — pergunta */}
        {step === "question" && (
          <div className="px-6 py-7">
            <p className="text-center text-lg font-bold text-ink">
              Seu carro tem seguro ou proteção?
            </p>
            <p className="mt-1 text-center text-sm text-ink-soft">
              Responda rápido e veja se você está protegido
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleSim}
                className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-3 text-sm font-semibold text-ink transition-colors hover:border-red/40 hover:bg-surface-2"
              >
                Sim, já tenho proteção
              </button>
              <button
                onClick={() => setStep("form")}
                className="w-full rounded-xl bg-red px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
              >
                Não tenho — quero cotar agora
                <ChevronRight className="ml-1 inline h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — formulário */}
        {step === "form" && (
          <form onSubmit={handleSubmit} className="px-6 py-7">
            <p className="mb-5 text-center text-base font-bold text-ink">
              Preencha para receber sua cotação gratuita
            </p>

            {[
              { id: "nome", label: "Nome completo", placeholder: "Seu nome", type: "text" },
              { id: "telefone", label: "WhatsApp / Telefone", placeholder: "(11) 99999-9999", type: "tel" },
              { id: "placa", label: "Placa do veículo", placeholder: "ABC1234", type: "text" },
            ].map(({ id, label, placeholder, type }) => (
              <div key={id} className="mb-4">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-ink-soft">
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
                  className="w-full rounded-lg border border-border-subtle bg-surface px-4 py-2.5 text-sm text-ink placeholder-ink-faint outline-none transition-colors focus:border-red/60"
                />
                {errors[id] && (
                  <p className="mt-1 text-xs text-red-bright">{errors[id]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-red px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Quero minha cotação →"}
            </button>
            <p className="mt-3 text-center text-xs text-ink-faint">
              Um consultor da Loma vai entrar em contato com você
            </p>
          </form>
        )}

        {/* Sucesso */}
        {step === "success" && (
          <div className="px-6 py-10 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-red" />
            <p className="text-lg font-bold text-ink">Recebemos seu pedido!</p>
            <p className="mt-1 text-sm text-ink-soft">
              Um consultor da Loma vai entrar em contato em breve.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

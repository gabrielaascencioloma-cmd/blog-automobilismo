"use client";

import { ShieldCheck, ArrowRight } from "lucide-react";
import { OPEN_LEAD_POPUP_EVENT } from "@/components/LeadPopup";

// MORNA — pausa na rolagem com a chamada para a avaliação gratuita.
export function LeadCtaBand() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-6">
      <div className="relative isolate flex flex-col items-start gap-6 overflow-hidden rounded-3xl bg-[#0f0f10] p-8 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:flex-row md:items-center md:p-10">
        <div className="pointer-events-none absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-red/30 blur-[90px]" />
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/[0.07] ring-1 ring-white/10">
          <ShieldCheck className="h-7 w-7 text-red-bright" />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-2xl font-black uppercase leading-tight md:text-3xl">
            Carro parado é dinheiro parado.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/65 md:text-base">
            Descubra em segundos se o seu carro está bem protegido. A avaliação é gratuita e sem compromisso.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.dispatchEvent(new Event(OPEN_LEAD_POPUP_EVENT))}
          className="btn-3d inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold"
        >
          Avaliação gratuita <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

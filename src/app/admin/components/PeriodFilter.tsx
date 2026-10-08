"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { X } from "lucide-react";
import { PERIOD_OPTIONS } from "../lib/period";
import { PeriodSelect } from "./PeriodSelect";

const field =
  "h-10 rounded-xl border border-white/10 bg-[#101114] px-3 text-sm text-zinc-100 transition-colors focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 [color-scheme:dark]";

export function PeriodFilter({
  periodo,
  de,
  ate,
  basePath = "/admin/posts",
  keep = {},
}: {
  periodo: string;
  de: string;
  ate: string;
  basePath?: string;
  // Outros filtros da página (status, busca…) que devem continuar ao trocar o período.
  keep?: Record<string, string | undefined>;
}) {
  const router = useRouter();
  const [mode, setMode] = useState(periodo);
  const [from, setFrom] = useState(de);
  const [to, setTo] = useState(ate);

  function go(params: Record<string, string>) {
    const merged: Record<string, string> = {};
    for (const [k, v] of Object.entries(keep)) if (v) merged[k] = v;
    const q = new URLSearchParams({ ...merged, ...params }).toString();
    router.push(q ? `${basePath}?${q}` : basePath);
  }

  function onModeChange(value: string) {
    setMode(value);
    // Os períodos prontos aplicam na hora; o personalizado espera as datas.
    if (value !== "custom") go(value ? { periodo: value } : {});
  }

  function applyCustom() {
    const p: Record<string, string> = { periodo: "custom" };
    if (from) p.de = from;
    if (to) p.ate = to;
    go(p);
  }

  function clear() {
    setMode("");
    setFrom("");
    setTo("");
    go({});
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <PeriodSelect
        value={mode}
        onChange={onModeChange}
        options={[{ value: "", label: "Todo o período" }, ...PERIOD_OPTIONS]}
      />

      {mode === "custom" && (
        <>
          <input
            type="date"
            aria-label="Data inicial"
            value={from}
            max={to || undefined}
            onChange={(e) => setFrom(e.target.value)}
            className={field}
          />
          <span className="text-xs text-zinc-500">até</span>
          <input
            type="date"
            aria-label="Data final"
            value={to}
            min={from || undefined}
            onChange={(e) => setTo(e.target.value)}
            className={field}
          />
          <button
            type="button"
            onClick={applyCustom}
            disabled={!from && !to}
            className="h-10 rounded-xl bg-emerald-500 px-4 text-sm font-semibold text-[#06140e] transition-colors hover:bg-emerald-400 disabled:opacity-50"
          >
            Aplicar
          </button>
        </>
      )}

      {periodo && (
        <button
          type="button"
          onClick={clear}
          title="Limpar filtro"
          className="inline-flex h-10 items-center gap-1.5 rounded-xl px-3 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <X className="h-3.5 w-3.5" /> Limpar
        </button>
      )}
    </div>
  );
}

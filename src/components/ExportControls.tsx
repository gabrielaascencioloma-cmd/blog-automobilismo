"use client";

import { useState } from "react";
import { Download } from "lucide-react";

const dateInput =
  "rounded-xl border border-white/10 bg-[#101114] px-3 py-2 text-sm text-zinc-200 outline-none transition-colors focus:border-emerald-500/60";

export function ExportControls() {
  const today = new Date().toISOString().slice(0, 10);
  const [de, setDe] = useState("");
  const [ate, setAte] = useState(today);

  function buildUrl() {
    const params = new URLSearchParams();
    if (de) params.set("de", de);
    if (ate) params.set("ate", ate);
    const q = params.toString();
    return q ? `/api/lead/export?${q}` : "/api/lead/export";
  }

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-zinc-500">De</label>
        <input
          type="date"
          value={de}
          onChange={(e) => setDe(e.target.value)}
          max={ate || today}
          className={dateInput}
        />
      </div>
      <div>
        <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-zinc-500">Até</label>
        <input
          type="date"
          value={ate}
          onChange={(e) => setAte(e.target.value)}
          min={de}
          max={today}
          className={dateInput}
        />
      </div>
      <a
        href={buildUrl()}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#06140e] transition-colors hover:bg-emerald-400"
      >
        <Download className="h-4 w-4" /> Exportar CSV
      </a>
      {(de || ate !== today) && (
        <button
          onClick={() => {
            setDe("");
            setAte(today);
          }}
          className="pb-2 text-xs text-zinc-500 underline hover:text-zinc-300"
        >
          Limpar filtro
        </button>
      )}
    </div>
  );
}

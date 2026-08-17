"use client";

import { useState } from "react";

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
        <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          De
        </label>
        <input
          type="date"
          value={de}
          onChange={(e) => setDe(e.target.value)}
          max={ate || today}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-red-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-semibold text-gray-500 uppercase tracking-wide">
          Até
        </label>
        <input
          type="date"
          value={ate}
          onChange={(e) => setAte(e.target.value)}
          min={de}
          max={today}
          className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none focus:border-red-400"
        />
      </div>
      <a
        href={buildUrl()}
        className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
      >
        ↓ Exportar CSV
      </a>
      {(de || ate !== today) && (
        <button
          onClick={() => { setDe(""); setAte(today); }}
          className="text-xs text-gray-400 hover:text-gray-600 underline"
        >
          Limpar filtro
        </button>
      )}
    </div>
  );
}

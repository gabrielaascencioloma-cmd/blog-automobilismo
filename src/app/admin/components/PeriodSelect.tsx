"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarRange, Check, ChevronDown } from "lucide-react";

export interface PeriodSelectOption {
  value: string;
  label: string;
}

// Lista própria (em vez do <select> nativo) para usar a mesma fonte e o mesmo visual do painel.
export function PeriodSelect({
  value,
  options,
  onChange,
}: {
  value: string;
  options: PeriodSelectOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  function toggle() {
    if (!open) setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    setOpen((v) => !v);
  }

  function choose(v: string) {
    setOpen(false);
    onChange(v);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") setOpen(false);
    else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return toggle();
      setActive((i) => (e.key === "ArrowDown" ? Math.min(options.length - 1, i + 1) : Math.max(0, i - 1)));
    } else if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      choose(options[active].value);
    }
  }

  return (
    <div ref={root} className="relative" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Filtrar por período"
        onClick={toggle}
        className="flex h-10 min-w-[11.5rem] items-center gap-2 rounded-xl border border-white/10 bg-[#101114] pl-3 pr-2.5 text-sm text-zinc-100 transition-colors hover:border-white/20 focus:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
      >
        <CalendarRange className="h-4 w-4 shrink-0 text-zinc-500" />
        <span className="flex-1 whitespace-nowrap text-left">{current.label}</span>
        <ChevronDown className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-30 mt-1.5 w-full min-w-[12.5rem] overflow-hidden rounded-xl border border-white/10 bg-[#17181c] p-1 shadow-xl shadow-black/40"
        >
          {options.map((o, i) => {
            const selected = o.value === value;
            return (
              <li
                key={o.value || "todos"}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  i === active ? "bg-white/[0.07] text-white" : "text-zinc-300"
                } ${selected ? "font-medium text-emerald-400" : ""}`}
              >
                {o.label}
                {selected && <Check className="h-3.5 w-3.5" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

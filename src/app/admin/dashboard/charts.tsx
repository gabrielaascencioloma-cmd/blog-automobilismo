"use client";

import { useEffect, useState } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ── Número que conta de zero até o valor ───────────────── */
export function CountUp({ value, decimals = 0, duration = 1200 }: { value: number; decimals?: number; duration?: number }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    // Sem animação para quem prefere menos movimento: vai direto ao valor.
    const total = reducedMotion() ? 1 : duration;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / total);
      const eased = 1 - Math.pow(1 - p, 4);
      setShown(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <>{shown.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</>;
}

/* ── Barras 3D com "Por mês" / "Acumulado" e tooltip ────── */
type Month = { month: string; year: string; count: number; cumulative: number; current: boolean };

const MONTH_NAMES: Record<string, string> = {
  jan: "janeiro", fev: "fevereiro", mar: "março", abr: "abril", mai: "maio", jun: "junho",
  jul: "julho", ago: "agosto", set: "setembro", out: "outubro", nov: "novembro", dez: "dezembro",
};

export function Bars3D({ data }: { data: Month[] }) {
  const [mode, setMode] = useState<"month" | "total">("month");
  const [hover, setHover] = useState<number | null>(null);

  const W = 1000;
  const H = 380;
  const padL = 46;
  const padR = 34;
  const padT = 56;
  const padB = 52;
  const base = H - padB;
  const plotH = base - padT;
  const slot = (W - padL - padR) / data.length;
  const barW = slot * 0.5;
  const dx = barW * 0.38;
  const dy = dx * 0.62;

  const values = data.map((d) => (mode === "month" ? d.count : d.cumulative));
  const max = Math.max(...values, 1);
  const step = Math.max(1, Math.ceil(max / 4));
  const top = step * 4;
  const ticks = [0, 1, 2, 3, 4].map((i) => i * step);
  const y = (v: number) => base - (v / top) * plotH;

  return (
    <div>
      <div className="mb-4 inline-flex rounded-full border border-white/10 bg-black/30 p-1 text-xs font-medium shadow-[inset_0_1px_2px_rgba(0,0,0,0.6)]">
        {(
          [
            ["month", "Por mês"],
            ["total", "Acumulado"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setMode(key)}
            className={`rounded-full px-3.5 py-1.5 transition-all ${
              mode === key
                ? "bg-gradient-to-b from-emerald-400 to-emerald-600 text-[#03140d] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_4px_14px_-4px_rgba(16,185,129,0.8)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          key={mode}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full min-w-[540px]"
          role="img"
          aria-label={mode === "month" ? "Posts publicados por mês" : "Total acumulado de posts"}
          onMouseLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id="bar-front" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="bar-front-hot" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#a7f3d0" />
              <stop offset="45%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bar-side" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
            <linearGradient id="floor" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
            <filter id="bar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
            <filter id="tip-shadow" x="-30%" y="-30%" width="160%" height="180%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.6" />
            </filter>
          </defs>

          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={padL}
                x2={W - padR + dx}
                y1={y(t) - dy}
                y2={y(t) - dy}
                stroke="rgba(255,255,255,0.06)"
                strokeDasharray={t === 0 ? undefined : "4 6"}
              />
              <text x={padL - 12} y={y(t) - dy + 4} textAnchor="end" fontSize="12" fill="rgba(255,255,255,0.35)">
                {t}
              </text>
            </g>
          ))}

          <polygon
            points={`${padL},${base} ${padL + dx},${base - dy} ${W - padR + dx},${base - dy} ${W - padR},${base}`}
            fill="url(#floor)"
          />

          {data.map((d, i) => {
            const v = values[i];
            const x = padL + i * slot + (slot - barW) / 2;
            const h = v === 0 ? 4 : Math.max(6, (v / top) * plotH);
            const yt = base - h;
            const empty = v === 0;
            const hot = d.current || hover === i;
            const dim = hover !== null && hover !== i;
            return (
              <g
                key={`${d.month}-${d.year}`}
                onMouseEnter={() => setHover(i)}
                style={{ cursor: "default", opacity: dim ? 0.45 : 1, transition: "opacity .2s" }}
              >
                {/* área de hover maior que a barra */}
                <rect x={padL + i * slot} y={padT - 20} width={slot} height={base - padT + 40} fill="transparent" />
                <g
                  className="bar-grow"
                  style={{ transformOrigin: `${x}px ${base}px`, animationDelay: `${i * 55}ms` }}
                >
                  {hot && !empty && (
                    <rect x={x - 6} y={yt - dy} width={barW + dx + 12} height={h + dy} rx="10" fill="#10b981" opacity="0.35" filter="url(#bar-glow)" />
                  )}
                  <polygon
                    points={`${x + barW},${yt} ${x + barW + dx},${yt - dy} ${x + barW + dx},${base - dy} ${x + barW},${base}`}
                    fill={empty ? "rgba(255,255,255,0.05)" : "url(#bar-side)"}
                  />
                  <rect
                    x={x}
                    y={yt}
                    width={barW}
                    height={h}
                    fill={empty ? "rgba(255,255,255,0.07)" : hot ? "url(#bar-front-hot)" : "url(#bar-front)"}
                  />
                  <polygon
                    points={`${x},${yt} ${x + dx},${yt - dy} ${x + barW + dx},${yt - dy} ${x + barW},${yt}`}
                    fill={empty ? "rgba(255,255,255,0.1)" : hot ? "#d1fae5" : "#6ee7b7"}
                  />
                  {!empty && <rect x={x} y={yt} width="2" height={h} fill="rgba(255,255,255,0.35)" />}
                  {!empty && hover !== i && (
                    <text
                      x={x + (barW + dx) / 2}
                      y={yt - dy - 12}
                      textAnchor="middle"
                      fontSize="15"
                      fontWeight="700"
                      fill={d.current ? "#ffffff" : "rgba(255,255,255,0.8)"}
                    >
                      {v}
                    </text>
                  )}
                </g>
                <text
                  x={x + barW / 2}
                  y={base + 24}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight={hot ? 700 : 500}
                  fill={hot ? "#34d399" : "rgba(255,255,255,0.45)"}
                >
                  {d.month}
                </text>
                {(i === 0 || d.month === "jan") && (
                  <text x={x + barW / 2} y={base + 41} textAnchor="middle" fontSize="10.5" fill="rgba(255,255,255,0.25)">
                    {`'${d.year}`}
                  </text>
                )}

                {hover === i && (
                  <g filter="url(#tip-shadow)" pointerEvents="none">
                    {(() => {
                      const tw = 168;
                      const th = 58;
                      const tx = Math.min(Math.max(x + (barW + dx) / 2 - tw / 2, 4), W - tw - 4);
                      const ty = Math.max(yt - dy - th - 14, 4);
                      return (
                        <>
                          <rect x={tx} y={ty} width={tw} height={th} rx="12" fill="#1b1d23" stroke="rgba(255,255,255,0.12)" />
                          <text x={tx + 14} y={ty + 22} fontSize="12" fill="rgba(255,255,255,0.5)">
                            {`${MONTH_NAMES[d.month] ?? d.month} de 20${d.year}`}
                          </text>
                          <text x={tx + 14} y={ty + 44} fontSize="17" fontWeight="700" fill="#fff">
                            {mode === "month" ? `${v} post${v !== 1 ? "s" : ""}` : `${v} no total`}
                          </text>
                          {mode === "total" && d.count > 0 && (
                            <text x={tx + tw - 14} y={ty + 44} textAnchor="end" fontSize="12" fontWeight="600" fill="#34d399">
                              {`+${d.count}`}
                            </text>
                          )}
                        </>
                      );
                    })()}
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

/* ── Rosca 3D interativa ─────────────────────────────────── */
export function Donut3D({ segments, total }: { segments: { label: string; value: number; color: string }[]; total: number }) {
  const [active, setActive] = useState<string | null>(null);
  const size = 240;
  const cx = size / 2;
  const cy = size / 2 - 6;
  const r = 78;
  const stroke = 30;
  const circ = 2 * Math.PI * r;
  const visible = segments.filter((s) => s.value > 0);
  const gap = visible.length > 1 ? 3 : 0;

  const arcs: { label: string; color: string; dash: number; offset: number; value: number }[] = [];
  let offset = 0;
  for (const s of visible) {
    const len = (s.value / Math.max(total, 1)) * circ;
    arcs.push({ label: s.label, color: s.color, value: s.value, dash: Math.max(len - gap, 0.5), offset });
    offset += len;
  }

  const current = arcs.find((a) => a.label === active);

  const ring = (shift: number, layer: "depth" | "face") =>
    arcs.map((a) => {
      const isActive = active === a.label;
      const faded = active !== null && !isActive;
      return (
        <circle
          key={`${a.label}-${shift}`}
          className="donut-draw"
          cx={cx}
          cy={cy + shift}
          r={r}
          fill="none"
          stroke={a.color}
          strokeOpacity={layer === "depth" ? (faded ? 0.12 : 0.35) : faded ? 0.3 : 1}
          strokeWidth={isActive && layer === "face" ? stroke + 8 : stroke}
          strokeDasharray={`${a.dash} ${circ}`}
          strokeDashoffset={-a.offset}
          transform={`rotate(-90 ${cx} ${cy + shift})`}
          style={{ ["--c" as string]: circ, transition: "stroke-width .25s, stroke-opacity .25s" }}
          onMouseEnter={layer === "face" ? () => setActive(a.label) : undefined}
        />
      );
    });

  return (
    <div className="flex w-full flex-col items-center gap-6 sm:flex-row xl:flex-col">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="h-auto w-full max-w-[220px] shrink-0"
        role="img"
        aria-label="Posts por categoria"
        onMouseLeave={() => setActive(null)}
      >
        <defs>
          <radialGradient id="donut-shine" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <filter id="donut-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>
        <ellipse cx={cx} cy={cy + 34 + r * 0.55} rx={r + 10} ry="12" fill="black" opacity="0.55" filter="url(#donut-shadow)" />
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        {[10, 8, 6, 4, 2].map((d) => (
          <g key={d}>{ring(d, "depth")}</g>
        ))}
        {ring(0, "face")}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="url(#donut-shine)" strokeWidth={stroke} pointerEvents="none" />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="34" fontWeight="700" fill={current ? current.color : "#fff"}>
          {current ? current.value : total}
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle" fontSize="11" letterSpacing="2" fill="rgba(255,255,255,0.45)">
          {current ? current.label.toUpperCase().slice(0, 14) : "PUBLICADOS"}
        </text>
      </svg>

      <ul className="w-full space-y-1">
        {segments.map((s) => {
          const pct = total ? Math.round((s.value / total) * 100) : 0;
          const isActive = active === s.label;
          return (
            <li
              key={s.label}
              onMouseEnter={() => s.value > 0 && setActive(s.label)}
              onMouseLeave={() => setActive(null)}
              className={`rounded-lg px-2 py-1.5 transition-colors ${s.value === 0 ? "opacity-35" : "cursor-default hover:bg-white/[0.04]"} ${
                isActive ? "bg-white/[0.06]" : ""
              }`}
            >
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="flex items-center gap-2 text-zinc-300">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 12px ${s.color}` }} />
                  {s.label}
                </span>
                <span className="whitespace-nowrap tabular-nums text-zinc-500">
                  {s.value} <span className="text-zinc-600">· {pct}%</span>
                </span>
              </div>
              {s.value > 0 && (
                <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div className="bar-fill h-full rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Curva suave (área) para mini-gráficos ──────────────── */
export function AreaSpark({
  values,
  color = "#ffffff",
  height = 70,
  id,
}: {
  values: number[];
  color?: string;
  height?: number;
  id: string;
}) {
  const W = 300;
  const H = height;
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const pts = values.map((v, i) => [
    (i / Math.max(values.length - 1, 1)) * W,
    H - 6 - ((v - min) / Math.max(max - min, 1)) * (H - 14),
  ]);
  // Curva suave (Catmull-Rom → Bézier)
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  const last = pts[pts.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id={`area-${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.45" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L ${W},${H} L 0,${H} Z`} fill={`url(#area-${id})`} className="area-fade" />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" className="line-draw" pathLength={1} />
      <circle cx={last[0]} cy={last[1]} r="4" fill={color} className="area-fade" />
    </svg>
  );
}

/* ── Mini barras (leads por dia, posts por mês) ─────────── */
export function MiniBars({ values, color }: { values: number[]; color: string }) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-10 items-end gap-[3px]" aria-hidden="true">
      {values.map((v, i) => (
        <span
          key={i}
          className="bar-grow-css flex-1 rounded-sm"
          style={{
            height: `${Math.max(8, (v / max) * 100)}%`,
            background: v > 0 ? color : "rgba(255,255,255,0.08)",
            opacity: v > 0 ? 0.35 + 0.65 * (v / max) : 1,
            animationDelay: `${i * 30}ms`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Calendário de publicações (estilo GitHub) ──────────── */
type Day = { date: string; published: number; scheduled: number; future: boolean; today: boolean };

export function ActivityCalendar({ days }: { days: Day[] }) {
  const [hover, setHover] = useState<Day | null>(null);
  const weeks: Day[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));
  const maxPub = Math.max(...days.map((d) => d.published), 1);

  const cellColor = (d: Day) => {
    if (d.scheduled > 0) return "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]";
    if (d.published === 0) return d.future ? "bg-white/[0.025]" : "bg-white/[0.06]";
    const level = d.published / maxPub;
    if (level > 0.66) return "bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.6)]";
    if (level > 0.33) return "bg-emerald-500";
    return "bg-emerald-700";
  };

  const label = (d: Day) => {
    const date = new Date(`${d.date}T12:00:00Z`).toLocaleDateString("pt-BR", { timeZone: "UTC", weekday: "short", day: "2-digit", month: "short" });
    if (d.scheduled) return `${date} · ${d.scheduled} agendado${d.scheduled > 1 ? "s" : ""}`;
    return `${date} · ${d.published} publicado${d.published !== 1 ? "s" : ""}`;
  };

  return (
    <div>
      <div className="flex gap-3">
        <div className="grid grid-rows-7 gap-[5px] pt-0.5 text-[10px] text-zinc-600">
          {["seg", "", "qua", "", "sex", "", "dom"].map((d, i) => (
            <span key={i} className="flex h-[var(--cell)] items-center">
              {d}
            </span>
          ))}
        </div>
        <div
          className="grid flex-1 grid-flow-col justify-between gap-y-[5px]"
          style={{ gridTemplateRows: "repeat(7, var(--cell))", gridAutoColumns: "var(--cell)" }}
        >
          {weeks.flatMap((week) =>
            week.map((d) => (
              <span
                key={d.date}
                onMouseEnter={() => setHover(d)}
                onMouseLeave={() => setHover(null)}
                className={`rounded-[5px] transition-transform hover:scale-125 ${cellColor(d)} ${
                  d.today ? "ring-2 ring-white/70 ring-offset-2 ring-offset-[#121317]" : ""
                }`}
              />
            )),
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500">
        <span className="min-h-4 text-zinc-300">{hover ? label(hover) : "Passe o mouse num dia"}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-500" /> publicado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] bg-amber-400" /> agendado
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[3px] ring-2 ring-white/70" /> hoje
          </span>
        </span>
      </div>
    </div>
  );
}

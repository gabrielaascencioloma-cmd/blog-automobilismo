// Filtro por período da lista de posts. Tudo calculado no horário de Brasília (UTC-3),
// o mesmo que o formulário de agendamento usa.

export type PeriodKey = "7d" | "14d" | "28d" | "30d" | "mes-passado" | "mes-atual" | "90d" | "custom";

export const PERIOD_OPTIONS: { value: PeriodKey; label: string }[] = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "14d", label: "Últimos 14 dias" },
  { value: "28d", label: "Últimos 28 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "mes-passado", label: "Último mês" },
  { value: "mes-atual", label: "Mês atual" },
  { value: "90d", label: "Últimos 90 dias" },
  { value: "custom", label: "Personalizado" },
];

const TZ = "America/Sao_Paulo";
const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const pad = (n: number) => String(n).padStart(2, "0");

function todayInBrasilia(now: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" })
      .formatToParts(now)
      .map((x) => [x.type, x.value])
  );
  return { y: Number(p.year), m: Number(p.month), d: Number(p.day) };
}

function isoDay(y: number, m: number, d: number) {
  const dt = new Date(Date.UTC(y, m - 1, d));
  return `${dt.getUTCFullYear()}-${pad(dt.getUTCMonth() + 1)}-${pad(dt.getUTCDate())}`;
}

const startOf = (day: string) => new Date(`${day}T00:00:00-03:00`);
const endOf = (day: string) => new Date(`${day}T23:59:59.999-03:00`);

const formatDay = (day: string) => day.split("-").reverse().join("/");

export interface ResolvedPeriod {
  start: Date;
  end: Date;
  label: string;
}

export function resolvePeriod(
  params: { periodo?: string; de?: string; ate?: string },
  now: Date = new Date()
): ResolvedPeriod | null {
  const { y, m, d } = todayInBrasilia(now);
  const today = isoDay(y, m, d);

  const days = /^(\d+)d$/.exec(params.periodo ?? "");
  if (days && ["7", "14", "28", "30", "90"].includes(days[1])) {
    const from = isoDay(y, m, d - (Number(days[1]) - 1));
    return { start: startOf(from), end: endOf(today), label: `${formatDay(from)} a ${formatDay(today)}` };
  }

  if (params.periodo === "mes-atual") {
    const from = isoDay(y, m, 1);
    const to = isoDay(y, m + 1, 0);
    return { start: startOf(from), end: endOf(to), label: `${formatDay(from)} a ${formatDay(to)}` };
  }

  if (params.periodo === "mes-passado") {
    const from = isoDay(y, m - 1, 1);
    const to = isoDay(y, m, 0);
    return { start: startOf(from), end: endOf(to), label: `${formatDay(from)} a ${formatDay(to)}` };
  }

  if (params.periodo === "custom") {
    let de = params.de && ISO_DAY.test(params.de) ? params.de : null;
    let ate = params.ate && ISO_DAY.test(params.ate) ? params.ate : null;
    if (!de && !ate) return null;
    if (de && ate && de > ate) [de, ate] = [ate, de];
    const start = de ? startOf(de) : new Date(0);
    const end = ate ? endOf(ate) : new Date(8640000000000000);
    const label =
      de && ate ? `${formatDay(de)} a ${formatDay(ate)}` : de ? `a partir de ${formatDay(de)}` : `até ${formatDay(ate!)}`;
    return { start, end, label };
  }

  return null;
}

// "01/10/2026 às 13:00", sempre em horário de Brasília.
export function formatPublishDate(date: Date) {
  const day = date.toLocaleDateString("pt-BR", { timeZone: TZ });
  const time = date.toLocaleTimeString("pt-BR", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
  return `${day} às ${time}`;
}

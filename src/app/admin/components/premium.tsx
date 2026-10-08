// Peças visuais do painel (tema escuro premium). Server-safe: sem hooks.

export const btnGlow =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-[#03140d] shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_10px_30px_-10px_rgba(16,185,129,0.85)] transition-all hover:from-emerald-300 hover:to-emerald-500 disabled:opacity-60";

// Fundo da página: brilhos difusos + textura de pontos, com o conteúdo em largura total.
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-emerald-500/[0.08] blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[28rem] w-[28rem] rounded-full bg-teal-400/[0.05] blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[24rem] w-[40rem] rounded-full bg-sky-500/[0.04] blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(to bottom, black, transparent 70%)",
          WebkitMaskImage: "linear-gradient(to bottom, black, transparent 70%)",
        }}
      />
      <div className="relative mx-auto w-full max-w-[2200px] px-5 py-8 lg:px-8 2xl:px-12 2xl:py-10">{children}</div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  actions,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="dash-in mb-8 flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-0">
        {eyebrow && <div className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400/80">{eyebrow}</div>}
        <h1 className="mt-2 bg-gradient-to-r from-white via-white to-emerald-200 bg-clip-text text-3xl font-semibold tracking-tight text-transparent 2xl:text-4xl">
          {title}
        </h1>
        {subtitle && <div className="mt-1 text-sm text-zinc-500">{subtitle}</div>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

// Moldura premium: borda em degradê, fio de luz no topo e brilho de canto.
export function Panel({
  children,
  className = "",
  innerClassName = "",
  glow,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  glow?: string;
  delay?: number;
}) {
  return (
    <div
      className={`dash-in relative min-w-0 rounded-[22px] bg-gradient-to-b from-white/[0.14] via-white/[0.05] to-white/[0.02] p-px shadow-[0_30px_60px_-30px_rgba(0,0,0,0.9)] ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`relative h-full overflow-hidden rounded-[21px] bg-[#121317] ${innerClassName}`}>
        {glow && <div className={`pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full blur-[80px] ${glow}`} />}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}

export function IconTile({ icon: Icon, tone = "text-zinc-200" }: { icon: React.ElementType; tone?: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.12] to-white/[0.02] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_-8px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
      <Icon className={`h-5 w-5 ${tone}`} />
    </span>
  );
}

export function PanelTitle({
  icon,
  tone,
  title,
  sub,
  right,
}: {
  icon: React.ElementType;
  tone: string;
  title: string;
  sub?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <IconTile icon={icon} tone={tone} />
        <div>
          <h2 className="text-base font-semibold text-white">{title}</h2>
          {sub && <p className="text-xs text-zinc-500">{sub}</p>}
        </div>
      </div>
      {right}
    </div>
  );
}

// Card de filtro clicável (Todos / Publicados / ...), com contagem.
export function FilterCard({
  href,
  active,
  label,
  count,
  icon: Icon,
  tone,
  ring,
  delay = 0,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
  icon: React.ElementType;
  tone: string;
  ring: string;
  delay?: number;
}) {
  return (
    <a
      href={href}
      className={`dash-in group relative overflow-hidden rounded-[18px] p-px transition-transform hover:-translate-y-0.5 ${
        active ? `bg-gradient-to-b ${ring}` : "bg-gradient-to-b from-white/[0.12] to-white/[0.02]"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`flex items-center gap-3 rounded-[17px] px-4 py-3.5 ${active ? "bg-[#17191e]" : "bg-[#121317] group-hover:bg-[#16171b]"}`}>
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ring-white/10 ${
            active ? "bg-white/[0.08]" : "bg-white/[0.04]"
          }`}
        >
          <Icon className={`h-[18px] w-[18px] ${tone}`} />
        </span>
        <div className="min-w-0">
          <p className="text-xs text-zinc-500">{label}</p>
          <p className="text-xl font-semibold tabular-nums text-white">{count.toLocaleString("pt-BR")}</p>
        </div>
      </div>
    </a>
  );
}

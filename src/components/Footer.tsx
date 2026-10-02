import Link from "next/link";
import { Camera, Play, MessageCircle, ArrowUpRight, ArrowUp, Send } from "lucide-react";
import { Logo } from "./Logo";
import { MENU_TOPICS, topicHref } from "@/lib/menu";

const SITE_LINKS = [
  { href: "/", label: "Início" },
  { href: "/blog", label: "Todos os posts" },
  { href: "/seu-carro", label: "Seu Carro" },
  { href: "/sobre", label: "Sobre o blog" },
];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="flex items-center gap-2 font-nav text-[11px] font-bold uppercase tracking-[0.22em] text-red-bright">
      <span className="h-1 w-1 rounded-full bg-red-bright shadow-[0_0_10px_2px_rgba(229,48,29,0.6)]" />
      {children}
    </h4>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-white/60 transition-colors hover:text-white"
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0a0a0b] text-white">
      {/* Linha de luz no topo */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-bright/70 to-transparent" />
      {/* Brilhos de fundo */}
      <div className="pointer-events-none absolute -top-48 left-[12%] -z-10 h-96 w-[38rem] rounded-full bg-red/20 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-40 right-[5%] -z-10 h-80 w-[30rem] rounded-full bg-red/10 blur-[120px]" />
      {/* Textura de pontos que some nas bordas */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6 pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_0.8fr_1.3fr] lg:gap-10">
          {/* Marca */}
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Manutenção, dicas e alertas para quem depende do carro todos os dias — sem enrolação e sem
              jargão de oficina.
            </p>
            <div className="mt-6 flex gap-2.5">
              {[
                { Icon: Camera, label: "Instagram" },
                { Icon: Play, label: "YouTube" },
                { Icon: MessageCircle, label: "WhatsApp" },
              ].map(({ Icon, label }) => (
                <span
                  key={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-white/[0.08] to-white/[0.02] text-white/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_6px_16px_-6px_rgba(0,0,0,0.8)] transition-all hover:-translate-y-0.5 hover:border-red/50 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {/* Assuntos */}
          <div>
            <FooterHeading>Assuntos</FooterHeading>
            <ul className="mt-6 space-y-3 text-sm">
              {MENU_TOPICS.map((topic) => (
                <li key={topic.slug}>
                  <FooterLink href={topicHref(topic)}>{topic.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <FooterHeading>Site</FooterHeading>
            <ul className="mt-6 space-y-3 text-sm">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <FooterHeading>Receba novidades</FooterHeading>
            <div className="mt-6 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.015] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur">
              <p className="text-sm leading-relaxed text-white/70">
                Um resumo por e-mail quando sair conteúdo novo. Sem spam.
              </p>
              <form className="mt-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1 pl-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)]">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full min-w-0 bg-transparent py-1.5 text-sm text-white placeholder:text-white/35 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Assinar"
                  className="btn-3d flex h-9 shrink-0 items-center gap-1.5 rounded-full px-4 text-xs font-bold"
                >
                  Assinar <Send className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé final */}
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] py-6 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Meu Carro Protegido. Todos os direitos reservados.</p>
          <a
            href="#"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-white/60 transition-colors hover:border-white/25 hover:text-white"
          >
            Voltar ao topo
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

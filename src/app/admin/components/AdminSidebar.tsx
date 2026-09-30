"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, PenSquare, Users, ExternalLink, LogOut } from "lucide-react";
import { logout } from "../actions";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText, exact: true },
  { href: "/admin/posts/new", label: "Novo post", icon: PenSquare },
  { href: "/admin/leads", label: "Leads Loma", icon: Users, badgeKey: "leads" as const },
];

function isActive(pathname: string, href: string, exact?: boolean) {
  if (href === "/admin/posts") {
    // "Posts" fica ativo na lista e na edição, mas não em "Novo post".
    return pathname === href || (pathname.startsWith("/admin/posts/") && !pathname.startsWith("/admin/posts/new"));
  }
  return exact ? pathname === href : pathname.startsWith(href);
}

export function AdminSidebar({ email, leadCount }: { email: string; leadCount: number }) {
  const pathname = usePathname();

  const links = NAV.map((item) => {
    const active = isActive(pathname, item.href, item.exact);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`group flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          active
            ? "bg-white/[0.07] text-white"
            : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100"
        }`}
      >
        <Icon className={`h-[18px] w-[18px] ${active ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"}`} />
        <span className="flex-1">{item.label}</span>
        {item.badgeKey === "leads" && leadCount > 0 && (
          <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[11px] font-semibold text-emerald-400">
            {leadCount}
          </span>
        )}
      </Link>
    );
  });

  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#121316] px-4 py-5 lg:flex">
        <Link href="/admin/dashboard" className="flex items-center px-2">
          <Image
            src="/logotipo/mcp-logo-branca.png"
            alt="Meu Carro Protegido"
            width={200}
            height={40}
            className="h-7 w-auto"
            priority
          />
        </Link>

        <p className="mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Menu</p>
        <nav className="mt-2 flex flex-col gap-1">{links}</nav>

        <p className="mt-8 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-600">Site</p>
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-white/[0.04] hover:text-zinc-100"
        >
          <ExternalLink className="h-[18px] w-[18px] text-zinc-500 group-hover:text-zinc-300" />
          Ver o blog
        </a>

        <div className="mt-auto rounded-2xl border border-white/[0.07] bg-gradient-to-br from-emerald-500/[0.12] to-transparent p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold uppercase text-[#06140e]">
              {email.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-zinc-100">{email.split("@")[0]}</p>
              <p className="truncate text-xs text-zinc-500">{email}</p>
            </div>
          </div>
          <form action={logout} className="mt-3">
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#121316]/95 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          <Image
            src="/logotipo/mcp-logo-branca.png"
            alt="Meu Carro Protegido"
            width={200}
            height={40}
            className="h-6 w-auto"
          />
          <form action={logout}>
            <button type="submit" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white">
              <LogOut className="h-3.5 w-3.5" /> Sair
            </button>
          </form>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3">{links}</nav>
      </header>
    </>
  );
}

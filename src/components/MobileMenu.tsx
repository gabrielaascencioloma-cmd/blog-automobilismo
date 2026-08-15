"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavLink = { href: string; label: string };

export function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center rounded-md p-2 text-ink-soft transition-colors hover:text-ink md:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 w-full border-b border-border-subtle bg-surface shadow-lg md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border-subtle py-3 text-sm font-medium text-ink-soft transition-colors last:border-0 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-red px-4 py-2.5 text-sm font-bold text-white"
            >
              Ler os posts
            </Link>
          </nav>
        </div>
      )}
    </>
  );
}

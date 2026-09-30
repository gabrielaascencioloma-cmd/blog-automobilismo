"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { MENU_TOPICS, topicHref } from "@/lib/menu";

const SECONDARY_LINKS = [
  { href: "/seu-carro", label: "Seu Carro" },
  { href: "/sobre", label: "Sobre" },
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      <button
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => (open ? close() : setOpen(true))}
        className="flex items-center justify-center rounded-md p-2 text-ink-soft transition-colors hover:text-ink lg:hidden"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 max-h-[calc(100vh-4.5rem)] w-full overflow-y-auto border-b border-border-subtle bg-surface shadow-lg lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {MENU_TOPICS.map((topic) => {
              const isExpanded = expanded === topic.slug;
              return (
                <div key={topic.slug} className="border-b border-border-subtle">
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    onClick={() => setExpanded(isExpanded ? null : topic.slug)}
                    className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-ink-soft transition-colors hover:text-ink"
                  >
                    {topic.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isExpanded && (
                    <ul className="mb-3 space-y-1 border-l-2 border-red/40 pl-4">
                      {topic.subtopics.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={topicHref(topic, sub)}
                            onClick={close}
                            className="block py-2 text-sm text-ink-soft transition-colors hover:text-ink"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={topicHref(topic)}
                          onClick={close}
                          className="block py-2 text-xs font-bold uppercase tracking-wide text-red"
                        >
                          Ver tudo de {topic.label}
                        </Link>
                      </li>
                    </ul>
                  )}
                </div>
              );
            })}

            {SECONDARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-border-subtle py-3 text-sm font-medium text-ink-soft transition-colors last:border-0 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/blog"
              onClick={close}
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

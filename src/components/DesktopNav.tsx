"use client";

import { useState, type FocusEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { MENU_TOPICS, topicHref } from "@/lib/menu";

export function DesktopNav() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const close = () => setOpenSlug(null);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) close();
  };

  return (
    <nav
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Escape" && close()}
      className="hidden items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] p-1 font-nav text-[13px] font-medium text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] lg:flex"
    >
      {MENU_TOPICS.map((topic, i) => {
        const isOpen = openSlug === topic.slug;
        return (
          <div
            key={topic.slug}
            className="relative"
            onMouseEnter={() => setOpenSlug(topic.slug)}
            onMouseLeave={() => setOpenSlug((current) => (current === topic.slug ? null : current))}
            onFocus={() => setOpenSlug(topic.slug)}
          >
            <Link
              href={topicHref(topic)}
              onClick={close}
              aria-expanded={isOpen}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 transition-colors xl:px-3 ${
                isOpen ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" : "hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {topic.label}
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Link>

            <div
              className={`absolute top-full z-50 w-72 pt-3 ${
                isOpen ? "visible opacity-100 transition-opacity" : "invisible opacity-0"
              } ${i === MENU_TOPICS.length - 1
                  ? "right-0 xl:right-auto xl:left-1/2 xl:-translate-x-1/2"
                  : "left-1/2 -translate-x-1/2"}`}
            >
              <ul className="overflow-hidden rounded-2xl border border-white/10 bg-[#141414]/95 py-2 font-sans shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
                {topic.subtopics.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={topicHref(topic, sub)}
                      onClick={close}
                      className="block px-4 py-2.5 transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                    >
                      <span className="block text-sm font-semibold text-white">{sub.label}</span>
                      <span className="block text-xs text-white/50">{sub.scope}</span>
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-white/10">
                  <Link
                    href={topicHref(topic)}
                    onClick={close}
                    className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                  >
                    Ver tudo de {topic.label}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

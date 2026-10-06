"use client";

import { useEffect, useLayoutEffect, useRef, useState, type FocusEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Eye, Flame } from "lucide-react";
import { MENU_TOPICS, topicHref } from "@/lib/menu";
import type { MenuHighlights, MenuPost } from "@/lib/data/posts";

function HighlightCard({ post, rank }: { post: MenuPost; rank: number }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/card relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03] transition-colors hover:border-white/20"
    >
      <div className="relative h-32 overflow-hidden bg-black">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={post.cover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-2.5 top-2.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-black/60 px-1.5 text-[11px] font-bold text-white ring-1 ring-white/15 backdrop-blur">
          {rank}º
        </span>
      </div>
      <div className="flex flex-1 flex-col justify-between gap-2 p-3">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-white group-hover/card:text-red-bright">
          {post.title}
        </p>
        {post.views > 0 && (
          <span className="inline-flex items-center gap-1 text-[11px] text-white/45">
            <Eye className="h-3 w-3" /> {post.views.toLocaleString("pt-BR")} leituras
          </span>
        )}
      </div>
    </Link>
  );
}

export function DesktopNav({ highlights }: { highlights: MenuHighlights }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [notchX, setNotchX] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const open = (slug: string) => {
    cancelClose();
    setOpenSlug(slug);
  };
  const close = () => {
    cancelClose();
    setOpenSlug(null);
  };
  // Pequena folga para o painel não piscar ao atravessar o espaço entre o menu e ele.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpenSlug(null), 140);
  };

  useEffect(() => cancelClose, []);

  // Posição do bico: centro do tópico ativo, relativo ao menu.
  useLayoutEffect(() => {
    if (!openSlug) return;
    const nav = navRef.current;
    const link = linkRefs.current[openSlug];
    if (!nav || !link) return;
    const navBox = nav.getBoundingClientRect();
    const linkBox = link.getBoundingClientRect();
    setNotchX(linkBox.left - navBox.left + linkBox.width / 2);
  }, [openSlug]);

  const handleBlur = (e: FocusEvent<HTMLElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) close();
  };

  const topic = MENU_TOPICS.find((t) => t.slug === openSlug);
  const topicPosts = topic ? highlights.byTopic[topic.slug] ?? [] : [];
  const usingFallback = topicPosts.length === 0;
  const posts = usingFallback ? highlights.overall : topicPosts;

  return (
    <nav
      ref={navRef}
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
      onBlur={handleBlur}
      onKeyDown={(e) => e.key === "Escape" && close()}
      className="relative hidden lg:block"
    >
      <div className="flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-white/[0.04] p-1 font-nav text-[13px] font-medium text-white/75 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
        {MENU_TOPICS.map((t) => {
          const isOpen = openSlug === t.slug;
          return (
            <Link
              key={t.slug}
              ref={(el) => {
                linkRefs.current[t.slug] = el;
              }}
              href={topicHref(t)}
              onClick={close}
              onMouseEnter={() => open(t.slug)}
              onFocus={() => open(t.slug)}
              aria-expanded={isOpen}
              className={`flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-2 transition-colors xl:px-3 ${
                isOpen
                  ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                  : "hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {t.label}
              <ChevronDown className={`h-3 w-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </Link>
          );
        })}
      </div>

      {/* Painel único, de ponta a ponta do menu */}
      <div
        className={`absolute inset-x-0 top-full z-50 pt-4 transition-all duration-200 ${
          topic ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="relative rounded-2xl border border-white/10 bg-[#141414]/95 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] backdrop-blur-xl">
          {/* Bico que desliza até o tópico ativo */}
          <span
            aria-hidden="true"
            className="absolute -top-[9px] h-[18px] w-[18px] -translate-x-1/2 rotate-45 rounded-[4px] border-l border-t border-white/10 bg-[#141414] transition-[left] duration-300 ease-out"
            style={{ left: notchX }}
          />
          <span
            aria-hidden="true"
            className="absolute -top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-red-bright shadow-[0_0_12px_3px_rgba(229,48,29,0.65)] transition-[left] duration-300 ease-out"
            style={{ left: notchX }}
          />

          {topic && (
            <div key={topic.slug} className="mega-fade grid grid-cols-[230px_1fr] font-sans">
              {/* Subtópicos */}
              <div className="border-r border-white/[0.07] p-3">
                <p className="px-3 pb-2 pt-1 font-nav text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  {topic.label}
                </p>
                <ul>
                  {topic.subtopics.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={topicHref(topic, sub)}
                        onClick={close}
                        className="block rounded-lg px-3 py-2 transition-colors hover:bg-white/[0.06] focus:bg-white/[0.06] focus:outline-none"
                      >
                        <span className="block text-[13px] font-semibold text-white">{sub.label}</span>
                        <span className="block truncate text-[11px] text-white/45">{sub.scope}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={topicHref(topic)}
                  onClick={close}
                  className="mt-2 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-red-bright transition-colors hover:bg-white/[0.06]"
                >
                  Ver tudo de {topic.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Mais lidos do tema */}
              <div className="p-5">
                <div className="mb-4 flex items-center gap-2">
                  <Flame className="h-4 w-4 text-red-bright" />
                  <p className="font-nav text-[13px] font-bold text-white">
                    {usingFallback ? "Mais lidos do blog" : `Mais lidos em ${topic.label}`}
                  </p>
                  {usingFallback && (
                    <span className="text-[11px] text-white/40">· em breve posts sobre {topic.label.toLowerCase()}</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {posts.map((post, i) => (
                    <HighlightCard key={post.slug} post={post} rank={i + 1} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

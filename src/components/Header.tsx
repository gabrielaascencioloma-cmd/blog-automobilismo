import Link from "next/link";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { MENU_TOPICS, topicHref } from "@/lib/menu";
import { ChevronDown, Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Logo inverted compact />

        <nav className="hidden items-center gap-5 text-sm font-medium text-white lg:flex">
          {MENU_TOPICS.map((topic, i) => (
            <div key={topic.slug} className="group relative">
              <Link
                href={topicHref(topic)}
                className="flex items-center gap-1 whitespace-nowrap py-2 transition-colors hover:text-white/70"
              >
                {topic.label}
                <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </Link>

              <div
                className={`invisible absolute top-full z-50 w-72 pt-3 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
                  i >= MENU_TOPICS.length - 2 ? "right-0" : "left-1/2 -translate-x-1/2"
                }`}
              >
                <ul className="overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] py-2 shadow-2xl">
                  {topic.subtopics.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={topicHref(topic, sub)}
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
                      className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-red transition-colors hover:bg-white/5 focus:bg-white/5 focus:outline-none"
                    >
                      Ver tudo de {topic.label}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <form action="/blog" method="get" className="hidden items-center sm:inline-flex lg:hidden xl:inline-flex">
            <input
              type="search"
              name="q"
              placeholder="Pesquise por palavra-chave..."
              className="w-40 rounded-l-full border border-r-0 border-white/20 bg-white/10 py-2 pl-4 pr-2 text-xs text-white placeholder-white/40 outline-none transition-all focus:w-52 focus:border-white/40 focus:bg-white/15"
            />
            <button
              type="submit"
              className="rounded-r-full bg-red px-3 py-2 text-white transition-colors hover:bg-red-dark"
              aria-label="Pesquisar"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

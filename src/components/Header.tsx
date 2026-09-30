import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { Search } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4 lg:gap-10 wide:gap-12">
        <Logo inverted compact className="shrink-0" />

        <DesktopNav />

        <div className="flex items-center gap-2">
          <form action="/blog" method="get" className="hidden items-stretch sm:inline-flex lg:hidden xl:inline-flex">
            <input
              type="search"
              name="q"
              placeholder="Pesquise por palavra-chave..."
              className="w-40 rounded-l-full border border-r-0 border-white bg-white py-2 pl-4 pr-2 text-xs text-ink placeholder-ink-faint outline-none transition-all focus:w-52"
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

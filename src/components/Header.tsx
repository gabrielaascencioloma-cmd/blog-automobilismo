import { Logo } from "./Logo";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";
import { HeaderShell } from "./HeaderShell";
import { Search } from "lucide-react";
import { getMenuHighlights } from "@/lib/data/posts";

export async function Header() {
  const highlights = await getMenuHighlights();

  return (
    <HeaderShell>
      <Logo inverted compact className="shrink-0" />

      <DesktopNav highlights={highlights} />

      <div className="flex items-center gap-2">
        <form action="/blog" method="get" className="hidden items-center sm:inline-flex lg:hidden xl:inline-flex">
          <div className="flex items-center rounded-full bg-white p-1 pl-4 shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)]">
            <input
              type="search"
              name="q"
              placeholder="Pesquise por palavra-chave..."
              className="w-36 bg-transparent py-1 pr-2 font-nav text-xs text-ink placeholder-ink-faint outline-none transition-all focus:w-48"
            />
            <button
              type="submit"
              className="btn-3d flex h-8 w-8 items-center justify-center rounded-full"
              aria-label="Pesquisar"
            >
              <Search className="h-3.5 w-3.5" />
            </button>
          </div>
        </form>
        <MobileMenu />
      </div>
    </HeaderShell>
  );
}

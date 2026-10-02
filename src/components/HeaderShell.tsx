"use client";

import { useEffect, useState } from "react";

// Barra preta de ponta a ponta no topo; ao rolar, vira uma pílula flutuante.
export function HeaderShell({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div
          className={`pointer-events-auto mx-auto transition-all duration-300 ease-out ${
            scrolled
              ? "mt-3 max-w-[1240px] rounded-full border border-white/10 bg-[#141414]/80 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl [@media(max-width:1264px)]:mx-3"
              : "mt-0 max-w-full rounded-none border border-transparent border-b-white/10 bg-black"
          }`}
        >
          <div
            className={`relative mx-auto flex max-w-[1240px] items-center justify-between gap-4 transition-all duration-300 lg:gap-5 ${
              scrolled ? "py-2 pl-5 pr-2" : "px-6 py-4"
            }`}
          >
            {children}
          </div>
        </div>
      </header>
      {/* Reserva o espaço da barra para o conteúdo não ficar por baixo dela */}
      <div aria-hidden="true" className="h-[68px] shrink-0" />
    </>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Link from "next/link";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { LogoutButton } from "./components/LogoutButton";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Painel administrativo · Carro em Dia",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;

  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-slate-100 font-sans text-slate-900">
        {session && (
          <header className="border-b border-slate-700 bg-slate-900">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
              <div className="flex items-center gap-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-slate-100">
                  Carro em Dia
                </span>
                <nav className="flex items-center gap-1 text-sm">
                  <Link
                    href="/admin/dashboard"
                    className="rounded-md px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/admin/posts"
                    className="rounded-md px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    Posts
                  </Link>
                  <Link
                    href="/admin/posts/new"
                    className="rounded-md px-3 py-1.5 text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
                  >
                    + Novo post
                  </Link>
                  <Link
                    href="/admin/leads"
                    className="rounded-md px-3 py-1.5 font-semibold text-red-400 transition-colors hover:bg-slate-800 hover:text-red-300"
                  >
                    Leads Loma
                  </Link>
                </nav>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="hidden sm:block">{session.email}</span>
                <LogoutButton />
              </div>
            </div>
          </header>
        )}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}

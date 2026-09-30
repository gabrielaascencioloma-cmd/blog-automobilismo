import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { AdminSidebar } from "./components/AdminSidebar";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Painel administrativo · Meu Carro Protegido",
  robots: "noindex, nofollow",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySessionToken(token) : null;
  const leadCount = session ? await prisma.lead.count() : 0;

  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`} style={{ colorScheme: "dark" }}>
      <body className="min-h-full bg-[#0c0d0f] font-sans text-zinc-100">
        {session ? (
          <div className="flex min-h-screen flex-col lg:flex-row">
            <AdminSidebar email={session.email} leadCount={leadCount} />
            <main className="min-w-0 flex-1">{children}</main>
          </div>
        ) : (
          <main className="min-h-screen">{children}</main>
        )}
      </body>
    </html>
  );
}

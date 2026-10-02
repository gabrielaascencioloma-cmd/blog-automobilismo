import type { Metadata } from "next";
import { Inter, Archivo, Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadPopup } from "@/components/LeadPopup";
import { SITE_URL } from "@/lib/site";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Meu Carro Protegido — manutenção, dicas e alertas para o seu carro",
    template: "%s · Meu Carro Protegido",
  },
  description:
    "Blog sobre manutenção automotiva, dicas práticas e alertas para quem depende do carro todos os dias.",
  openGraph: {
    siteName: "Meu Carro Protegido",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${archivo.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[--page-bg] text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <LeadPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

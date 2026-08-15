import type { Metadata } from "next";
import { Inter, Archivo } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LeadPopup } from "@/components/LeadPopup";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blog-automobilismo.vercel.app"),
  title: {
    default: "Carro em Dia — manutenção, dicas e alertas para o seu carro",
    template: "%s · Carro em Dia",
  },
  description:
    "Blog sobre manutenção automotiva, dicas práticas e alertas para quem depende do carro todos os dias.",
  openGraph: {
    siteName: "Carro em Dia",
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
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
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

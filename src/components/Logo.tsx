import Link from "next/link";
import Image from "next/image";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link href="/" className={`inline-flex items-center ${className ?? ""}`}>
      {/* Desktop: logotipo completo */}
      <Image
        src={inverted ? "/logotipo/Logo branca.webp" : "/logotipo/Logo.webp"}
        alt="Carro em Dia"
        width={160}
        height={52}
        className="hidden h-10 w-auto sm:block"
        priority
      />
      {/* Mobile: só o ícone */}
      <Image
        src={inverted ? "/logotipo/Icon Branco.webp" : "/logotipo/Icon.webp"}
        alt="Carro em Dia"
        width={40}
        height={40}
        className="block h-9 w-auto sm:hidden"
        priority
      />
    </Link>
  );
}

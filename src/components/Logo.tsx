import Link from "next/link";
import Image from "next/image";

export function Logo({ inverted = false, className }: { inverted?: boolean; className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className ?? ""}`}
    >
      <Image
        src={inverted ? "/logotipo/Logo branca.webp" : "/logotipo/Logo.webp"}
        alt="Carro em Dia"
        width={160}
        height={48}
        priority
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}

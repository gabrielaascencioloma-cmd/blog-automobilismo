import Link from "next/link";
import Image from "next/image";

export function Logo({
  inverted = false,
  compact = false,
  className,
}: {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  const height = compact ? "h-7" : "h-9";
  return (
    <Link href="/" className={`inline-flex items-center ${className ?? ""}`}>
      <Image
        src={inverted ? "/logotipo/mcp-logo-branca.png" : "/logotipo/mcp-logo-preta.png"}
        alt="Meu Carro Protegido"
        width={200}
        height={40}
        className={`hidden ${height} w-auto sm:block`}
        priority
      />
      <Image
        src={inverted ? "/logotipo/mcp-icone-branca.png" : "/logotipo/mcp-icone-preta.png"}
        alt="Meu Carro Protegido"
        width={40}
        height={40}
        className={`block ${height} w-auto sm:hidden`}
        priority
      />
    </Link>
  );
}

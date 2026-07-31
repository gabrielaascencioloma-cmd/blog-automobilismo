import Image from "next/image";

export function PhotoCover({
  src,
  alt,
  className,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className ?? ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className="object-cover"
      />
    </div>
  );
}

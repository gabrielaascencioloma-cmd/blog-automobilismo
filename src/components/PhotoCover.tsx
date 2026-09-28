export function PhotoCover({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className ?? ""}`}>
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

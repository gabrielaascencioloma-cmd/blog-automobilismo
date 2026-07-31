"use client";

import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ImagePlus, Loader2, X } from "lucide-react";

export function MediaUploader({
  initialUrl,
  initialType,
  onChange,
}: {
  initialUrl?: string | null;
  initialType?: "IMAGE" | "VIDEO";
  onChange: (value: { url: string; type: "IMAGE" | "VIDEO" } | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState(initialUrl ?? "");
  const [type, setType] = useState<"IMAGE" | "VIDEO">(initialType ?? "IMAGE");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const blob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/admin/api/upload",
      });
      const detectedType = file.type.startsWith("video/") ? "VIDEO" : "IMAGE";
      setUrl(blob.url);
      setType(detectedType);
      onChange({ url: blob.url, type: detectedType });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setUrl("");
    onChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div>
      {url ? (
        <div className="relative w-full max-w-xs overflow-hidden rounded-xl border border-slate-200">
          {type === "VIDEO" ? (
            <video src={url} controls className="h-40 w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Capa do post" className="h-40 w-full object-cover" />
          )}
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label className="flex w-full max-w-xs cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-300 bg-slate-50 py-8 text-sm text-slate-500 hover:border-slate-400">
          {uploading ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <ImagePlus className="h-6 w-6" />
          )}
          {uploading ? "Enviando…" : "Enviar imagem ou vídeo"}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}

// Converte imagens (JPEG/PNG) para WebP no navegador antes do envio, para não pesar no site.
// GIF, vídeo e WebP já existentes passam direto. Se algo falhar, envia o arquivo original.
const MAX_WIDTH = 1600;
const QUALITY = 0.8;

export async function toWebp(file: File): Promise<File> {
  if (file.type !== "image/jpeg" && file.type !== "image/png") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", QUALITY));
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
  } catch {
    return file;
  }
}

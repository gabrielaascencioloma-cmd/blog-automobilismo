"use client";

import { useActionState, useState } from "react";
import { Send, CalendarClock, FileEdit, Save } from "lucide-react";
import { CATEGORY_LIST } from "@/lib/categories";
import { TiptapEditor } from "./TiptapEditor";
import { MediaUploader } from "./MediaUploader";
import type { PostFormState } from "../posts/actions";
import { card, input, label, btnPrimary } from "./ui";

export interface PostFormInitialValues {
  title: string;
  excerpt: string;
  category: string;
  contentHtml: string;
  coverUrl: string | null;
  coverType: "IMAGE" | "VIDEO";
  status: "DRAFT" | "PUBLISHED";
  publishAt: Date;
}

type PublishingMode = "now" | "schedule" | "draft";

const PUBLISHING_OPTIONS: { value: PublishingMode; label: string; hint: string; icon: React.ElementType }[] = [
  { value: "now", label: "Publicar agora", hint: "Vai ao ar ao salvar", icon: Send },
  { value: "schedule", label: "Agendar", hint: "Escolha data e hora", icon: CalendarClock },
  { value: "draft", label: "Rascunho", hint: "Fica só no painel", icon: FileEdit },
];

function initialPublishingMode(post?: PostFormInitialValues): PublishingMode {
  if (!post) return "now";
  if (post.status === "DRAFT") return "draft";
  return post.publishAt > new Date() ? "schedule" : "now";
}

function toDatetimeLocal(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function PostForm({
  action,
  post,
}: {
  action: (state: PostFormState | undefined, formData: FormData) => Promise<PostFormState>;
  post?: PostFormInitialValues;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);
  const [contentHtml, setContentHtml] = useState(post?.contentHtml ?? "");
  const [cover, setCover] = useState<{ url: string; type: "IMAGE" | "VIDEO" } | null>(
    post?.coverUrl ? { url: post.coverUrl, type: post.coverType } : null
  );
  const [publishing, setPublishing] = useState(initialPublishingMode(post));

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="contentHtml" value={contentHtml} />
      <input type="hidden" name="coverUrl" value={cover?.url ?? ""} />
      <input type="hidden" name="coverType" value={cover?.type ?? "IMAGE"} />
      <input type="hidden" name="publishing" value={publishing} />

      <section className={`${card} space-y-5 p-6`}>
        <div>
          <label htmlFor="title" className={label}>
            Título
          </label>
          <input id="title" name="title" required defaultValue={post?.title} className={input} />
        </div>

        <div>
          <label htmlFor="excerpt" className={label}>
            Resumo curto
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={2}
            defaultValue={post?.excerpt}
            className={input}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="category" className={label}>
              Categoria
            </label>
            <select id="category" name="category" required defaultValue={post?.category ?? ""} className={input}>
              <option value="" disabled>
                Selecione…
              </option>
              {CATEGORY_LIST.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className={label}>Capa (imagem ou vídeo)</span>
            <div className="mt-1.5">
              <MediaUploader initialUrl={post?.coverUrl} initialType={post?.coverType} onChange={setCover} />
            </div>
          </div>
        </div>
      </section>

      <section className={`${card} p-6`}>
        <span className={label}>Conteúdo</span>
        <div className="mt-2">
          <TiptapEditor initialContent={contentHtml} onChange={setContentHtml} />
        </div>
      </section>

      <section className={`${card} p-6`}>
        <span className={label}>Publicação</span>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {PUBLISHING_OPTIONS.map((opt) => {
            const active = publishing === opt.value;
            const Icon = opt.icon;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPublishing(opt.value)}
                aria-pressed={active}
                className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
                  active
                    ? "border-emerald-500/60 bg-emerald-500/10"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.05]"
                }`}
              >
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${active ? "text-emerald-400" : "text-zinc-500"}`} />
                <span>
                  <span className={`block text-sm font-semibold ${active ? "text-white" : "text-zinc-300"}`}>
                    {opt.label}
                  </span>
                  <span className="block text-xs text-zinc-500">{opt.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
        {publishing === "schedule" && (
          <input
            type="datetime-local"
            name="scheduledFor"
            required
            defaultValue={post ? toDatetimeLocal(post.publishAt) : undefined}
            className={`${input} max-w-xs`}
          />
        )}
      </section>

      {state?.error && (
        <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{state.error}</p>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={pending} className={`${btnPrimary} px-6`}>
          <Save className="h-4 w-4" />
          {pending ? "Salvando…" : "Salvar post"}
        </button>
      </div>
    </form>
  );
}

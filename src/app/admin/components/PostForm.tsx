"use client";

import { useActionState, useState } from "react";
import { Send, CalendarClock, FileEdit, Save } from "lucide-react";
import { ADMIN_CATEGORY_OPTIONS, CATEGORIES } from "@/lib/categories";
import { findTopic } from "@/lib/menu";
import { TiptapEditor } from "./TiptapEditor";
import { MediaUploader } from "./MediaUploader";
import type { PostFormState } from "../posts/actions";
import { card, input, label, btnPrimary } from "./ui";

export interface PostFormInitialValues {
  title: string;
  slug?: string;
  excerpt: string;
  category: string;
  subcategory?: string | null;
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

// Sempre no horário de Brasília, igual ao que a action salva (evita diferença entre servidor UTC e navegador).
function toDatetimeLocal(date: Date) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Sao_Paulo",
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
      .formatToParts(date)
      .map((x) => [x.type, x.value])
  );
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
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
  const [category, setCategory] = useState(post?.category ?? "");
  const [subcategory, setSubcategory] = useState(post?.subcategory ?? "");
  const topicSlug = ADMIN_CATEGORY_OPTIONS.find((c) => c.slug === category)?.topicSlug;
  const subtopics = findTopic(topicSlug)?.subtopics ?? [];

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
          <label htmlFor="slug" className={`${label} mt-4 block`}>
            Endereço (slug)
          </label>
          <input
            id="slug"
            name="slug"
            defaultValue={post?.slug}
            placeholder="Em branco: gerado pelo título"
            className={input}
          />
          <p className="mt-1 text-xs text-zinc-500">Vira /blog/endereço. Só letras minúsculas, números e hífens.</p>
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
            <select
              id="category"
              name="category"
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setSubcategory("");
              }}
              className={input}
            >
              <option value="" disabled>
                Selecione…
              </option>
              {ADMIN_CATEGORY_OPTIONS.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
              {post?.category && !ADMIN_CATEGORY_OPTIONS.some((c) => c.slug === post.category) && (
                <option value={post.category}>{CATEGORIES[post.category as keyof typeof CATEGORIES]?.label ?? post.category}</option>
              )}
            </select>
          </div>
          <div>
            <label htmlFor="subcategory" className={label}>
              Subcategoria
            </label>
            <select
              id="subcategory"
              name="subcategory"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              disabled={subtopics.length === 0}
              className={input}
            >
              <option value="">{subtopics.length === 0 ? "Escolha a categoria primeiro" : "Nenhuma"}</option>
              {subtopics.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.label}
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

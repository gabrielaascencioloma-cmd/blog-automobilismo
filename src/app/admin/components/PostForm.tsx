"use client";

import { useActionState, useState } from "react";
import { CATEGORY_LIST } from "@/lib/categories";
import { TiptapEditor } from "./TiptapEditor";
import { MediaUploader } from "./MediaUploader";
import type { PostFormState } from "../posts/actions";

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

function initialPublishingMode(post?: PostFormInitialValues): "now" | "schedule" | "draft" {
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
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="contentHtml" value={contentHtml} />
      <input type="hidden" name="coverUrl" value={cover?.url ?? ""} />
      <input type="hidden" name="coverType" value={cover?.type ?? "IMAGE"} />

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700">
          Título
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={post?.title}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">
          Resumo curto
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          required
          rows={2}
          defaultValue={post?.excerpt}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-slate-700">
          Categoria
        </label>
        <select
          id="category"
          name="category"
          required
          defaultValue={post?.category}
          className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
        >
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
        <span className="block text-sm font-medium text-slate-700">Capa (imagem ou vídeo)</span>
        <div className="mt-1">
          <MediaUploader
            initialUrl={post?.coverUrl}
            initialType={post?.coverType}
            onChange={setCover}
          />
        </div>
      </div>

      <div>
        <span className="block text-sm font-medium text-slate-700">Conteúdo</span>
        <div className="mt-1">
          <TiptapEditor initialContent={contentHtml} onChange={setContentHtml} />
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <span className="block text-sm font-medium text-slate-700">Publicação</span>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-700">
          {[
            { value: "now", label: "Publicar agora" },
            { value: "schedule", label: "Agendar" },
            { value: "draft", label: "Rascunho" },
          ].map((opt) => (
            <label key={opt.value} className="flex items-center gap-2">
              <input
                type="radio"
                name="publishing"
                value={opt.value}
                checked={publishing === opt.value}
                onChange={() => setPublishing(opt.value as typeof publishing)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        {publishing === "schedule" && (
          <input
            type="datetime-local"
            name="scheduledFor"
            required
            defaultValue={post ? toDatetimeLocal(post.publishAt) : undefined}
            className="mt-3 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          />
        )}
      </div>

      {state?.error && <p className="text-sm text-red-600">{state.error}</p>}

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
      >
        {pending ? "Salvando…" : "Salvar post"}
      </button>
    </form>
  );
}

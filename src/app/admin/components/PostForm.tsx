"use client";

import { useActionState, useState } from "react";
import { Send, CalendarClock, FileEdit, Save, Tag, ImageIcon, Link2, Check } from "lucide-react";
import { ADMIN_CATEGORY_OPTIONS, CATEGORIES } from "@/lib/categories";
import { findTopic } from "@/lib/menu";
import { TiptapEditor } from "./TiptapEditor";
import { MediaUploader } from "./MediaUploader";
import type { PostFormState } from "../posts/actions";
import { input, label } from "./ui";
import { Panel, PanelTitle, btnGlow } from "./premium";

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

const PUBLISHING_OPTIONS: { value: PublishingMode; label: string; hint: string; icon: React.ElementType; tone: string }[] = [
  { value: "now", label: "Publicar agora", hint: "Vai ao ar ao salvar", icon: Send, tone: "text-emerald-300" },
  { value: "schedule", label: "Agendar", hint: "Escolha data e hora", icon: CalendarClock, tone: "text-amber-300" },
  { value: "draft", label: "Rascunho", hint: "Fica só no painel", icon: FileEdit, tone: "text-zinc-300" },
];

const SAVE_LABEL: Record<PublishingMode, string> = {
  now: "Publicar post",
  schedule: "Agendar post",
  draft: "Salvar rascunho",
};

const EXCERPT_IDEAL = 160;

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
  const [excerptLength, setExcerptLength] = useState(post?.excerpt.length ?? 0);
  const [slug, setSlug] = useState(post?.slug ?? "");
  const topicSlug = ADMIN_CATEGORY_OPTIONS.find((c) => c.slug === category)?.topicSlug;
  const subtopics = findTopic(topicSlug)?.subtopics ?? [];

  const checklist = [
    { ok: excerptLength > 0, label: "Resumo" },
    { ok: !!category, label: "Categoria" },
    { ok: !!cover, label: "Capa" },
    { ok: contentHtml.replace(/<[^>]*>/g, "").trim().length > 200, label: "Conteúdo" },
  ];

  return (
    <form action={formAction} className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px] 2xl:gap-5">
      <input type="hidden" name="contentHtml" value={contentHtml} />
      <input type="hidden" name="coverUrl" value={cover?.url ?? ""} />
      <input type="hidden" name="coverType" value={cover?.type ?? "IMAGE"} />
      <input type="hidden" name="publishing" value={publishing} />

      {/* Coluna de escrita */}
      <div className="min-w-0 space-y-4 2xl:space-y-5">
        <Panel delay={60}>
          <div className="space-y-5 p-6 2xl:p-8">
            <div>
              <label htmlFor="title" className="sr-only">
                Título
              </label>
              <textarea
                id="title"
                name="title"
                required
                rows={2}
                defaultValue={post?.title}
                placeholder="Título do post"
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                className="w-full resize-none bg-transparent text-2xl font-semibold leading-tight tracking-tight text-white placeholder:text-zinc-700 focus:outline-none md:text-3xl 2xl:text-4xl"
              />
              {/* Endereço com prévia do link */}
              <div className="mt-3 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2 text-sm shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] focus-within:border-emerald-500/50">
                <Link2 className="h-4 w-4 shrink-0 text-zinc-500" />
                <span className="shrink-0 text-zinc-500">meucarroprotegido.com.br/blog/</span>
                <input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="gerado-pelo-titulo"
                  aria-label="Endereço (slug)"
                  className="min-w-0 flex-1 bg-transparent text-emerald-300 placeholder:text-zinc-600 focus:outline-none"
                />
              </div>
              <p className="mt-1.5 text-xs text-zinc-600">Em branco, o endereço é gerado pelo título. Só minúsculas, números e hífens.</p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="excerpt" className={label}>
                  Resumo curto
                </label>
                <span
                  className={`text-xs tabular-nums ${
                    excerptLength === 0 ? "text-zinc-600" : excerptLength <= EXCERPT_IDEAL ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {excerptLength}/{EXCERPT_IDEAL}
                </span>
              </div>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                rows={3}
                defaultValue={post?.excerpt}
                onChange={(e) => setExcerptLength(e.target.value.length)}
                placeholder="Aparece nos cards do blog e no Google."
                className={input}
              />
            </div>
          </div>
        </Panel>

        <Panel delay={120}>
          <div className="p-4 2xl:p-5">
            <div className="mb-3 flex items-center justify-between px-2">
              <span className={label}>Conteúdo</span>
              <span className="text-xs text-zinc-600">A área branca mostra o texto como ele aparece no site</span>
            </div>
            <TiptapEditor initialContent={contentHtml} onChange={setContentHtml} />
          </div>
        </Panel>
      </div>

      {/* Barra lateral fixa */}
      <aside className="min-w-0 space-y-4 xl:sticky xl:top-6 xl:self-start 2xl:space-y-5">
        <Panel glow="bg-emerald-500/15" delay={160}>
          <div className="p-5 2xl:p-6">
            <PanelTitle icon={Send} tone="text-emerald-300" title="Publicação" sub="Quando o post vai ao ar" />
            <div className="mt-5 space-y-2">
              {PUBLISHING_OPTIONS.map((opt) => {
                const active = publishing === opt.value;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setPublishing(opt.value)}
                    aria-pressed={active}
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? "border-emerald-500/50 bg-gradient-to-r from-emerald-500/15 to-emerald-500/[0.03] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ring-1 ring-white/10 ${active ? "bg-white/[0.08]" : "bg-white/[0.03]"}`}>
                      <Icon className={`h-4 w-4 ${active ? opt.tone : "text-zinc-500"}`} />
                    </span>
                    <span className="flex-1">
                      <span className={`block text-sm font-semibold ${active ? "text-white" : "text-zinc-300"}`}>{opt.label}</span>
                      <span className="block text-xs text-zinc-500">{opt.hint}</span>
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
                        active ? "border-emerald-400 bg-emerald-400 text-[#03140d]" : "border-white/20"
                      }`}
                    >
                      {active && <Check className="h-3 w-3" strokeWidth={3} />}
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
                className={`${input} [color-scheme:dark]`}
              />
            )}

            {/* Checklist rápido */}
            <div className="mt-5 grid grid-cols-2 gap-2">
              {checklist.map((item) => (
                <span
                  key={item.label}
                  className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ring-1 ${
                    item.ok ? "bg-emerald-500/10 text-emerald-300 ring-emerald-400/20" : "bg-white/[0.02] text-zinc-500 ring-white/[0.06]"
                  }`}
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full ${item.ok ? "bg-emerald-400 text-[#03140d]" : "border border-white/15"}`}>
                    {item.ok && <Check className="h-2.5 w-2.5" strokeWidth={3} />}
                  </span>
                  {item.label}
                </span>
              ))}
            </div>

            {state?.error && (
              <p className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">{state.error}</p>
            )}

            <button type="submit" disabled={pending} className={`${btnGlow} mt-5 w-full py-3`}>
              <Save className="h-4 w-4" />
              {pending ? "Salvando…" : SAVE_LABEL[publishing]}
            </button>
          </div>
        </Panel>

        <Panel glow="bg-teal-400/10" delay={220}>
          <div className="space-y-4 p-5 2xl:p-6">
            <PanelTitle icon={Tag} tone="text-teal-300" title="Organização" sub="Onde o post aparece no menu" />
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
                className={`${input} disabled:opacity-50`}
              >
                <option value="">{subtopics.length === 0 ? "Escolha a categoria primeiro" : "Nenhuma"}</option>
                {subtopics.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Panel>

        <Panel glow="bg-sky-400/10" delay={280}>
          <div className="p-5 2xl:p-6">
            <PanelTitle icon={ImageIcon} tone="text-sky-300" title="Capa" sub="Imagem ou vídeo do topo do post" />
            <div className="mt-4">
              <MediaUploader initialUrl={post?.coverUrl} initialType={post?.coverType} onChange={setCover} />
            </div>
          </div>
        </Panel>
      </aside>
    </form>
  );
}

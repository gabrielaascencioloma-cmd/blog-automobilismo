import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import type { Post } from "@prisma/client";
import { CATEGORIES } from "@/lib/categories";
import { DeletePostButton } from "./DeletePostButton";
import { PeriodFilter } from "./PeriodFilter";
import { card, btnPrimary, pageHeader, pageTitle, pageSubtitle } from "./ui";
import { formatPublishDate, resolvePeriod } from "../lib/period";

function statusLabel(status: "DRAFT" | "PUBLISHED", publishAt: Date) {
  if (status === "DRAFT") {
    return { text: "Rascunho", dot: "bg-zinc-400", className: "text-zinc-400" };
  }
  if (publishAt > new Date()) {
    return { text: "Agendado", dot: "bg-amber-400", className: "text-amber-300" };
  }
  return { text: "Publicado", dot: "bg-emerald-400", className: "text-emerald-400" };
}

export function PostsView({
  allPosts,
  params,
  basePath = "/admin/posts",
}: {
  allPosts: Post[];
  params: { periodo?: string; de?: string; ate?: string };
  basePath?: string;
}) {
  const now = new Date();
  const published = allPosts.filter((p) => p.status === "PUBLISHED" && p.publishAt <= now).length;
  const scheduled = allPosts.filter((p) => p.status === "PUBLISHED" && p.publishAt > now).length;

  // Com período escolhido, mostra só publicados/agendados dentro dele, do mais recente ao mais antigo.
  const period = resolvePeriod(params);
  const posts = period
    ? allPosts
        .filter((p) => p.status === "PUBLISHED" && p.publishAt >= period.start && p.publishAt <= period.end)
        .sort((a, b) => b.publishAt.getTime() - a.publishAt.getTime())
    : allPosts;

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8">
      <div className={pageHeader}>
        <div>
          <h1 className={pageTitle}>Posts</h1>
          <p className={pageSubtitle}>
            {allPosts.length} no total · {published} publicados · {scheduled} agendados
          </p>
          {period && (
            <p className="mt-1 text-xs text-emerald-400">
              {posts.length} {posts.length === 1 ? "post" : "posts"} em {period.label}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <PeriodFilter
            periodo={period ? (params.periodo ?? "") : ""}
            de={params.de ?? ""}
            ate={params.ate ?? ""}
            basePath={basePath}
          />
          <Link href="/admin/posts/new" className={btnPrimary}>
            <Plus className="h-4 w-4" /> Novo post
          </Link>
        </div>
      </div>

      <div className={`${card} overflow-hidden`}>
        {posts.length === 0 ? (
          <p className="p-8 text-center text-sm text-zinc-500">
            {period ? "Nenhum post publicado ou agendado nesse período." : "Nenhum post ainda."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/[0.06] text-xs text-zinc-500">
                <tr>
                  <th className="px-6 py-3.5 font-medium">Título</th>
                  <th className="hidden px-3 py-3.5 font-medium md:table-cell">Categoria</th>
                  <th className="px-3 py-3.5 font-medium">Status</th>
                  <th className="px-3 py-3.5 font-medium">Data de publicação</th>
                  <th className="px-3 py-3.5 text-right font-medium">Leituras</th>
                  <th className="px-6 py-3.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {posts.map((post) => {
                  const status = statusLabel(post.status, post.publishAt);
                  return (
                    <tr key={post.id} className="transition-colors hover:bg-white/[0.02]">
                      <td className="max-w-md px-6 py-4">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="font-medium text-zinc-100 transition-colors hover:text-emerald-400"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="hidden px-3 py-4 md:table-cell">
                        <span className="rounded-lg bg-white/[0.05] px-2.5 py-1 text-xs text-zinc-300">
                          {CATEGORIES[post.category].label}
                        </span>
                      </td>
                      <td className="px-3 py-4">
                        <span className={`inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium ${status.className}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                          {status.text}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-xs">
                        {post.status === "DRAFT" ? (
                          <span className="text-zinc-600">—</span>
                        ) : (
                          <>
                            <span className="text-zinc-200">{formatPublishDate(post.publishAt)}</span>
                            {status.text === "Agendado" && (
                              <span className="mt-0.5 block text-[11px] font-medium text-amber-300">Agendamento</span>
                            )}
                          </>
                        )}
                      </td>
                      <td className="px-3 py-4 text-right font-semibold text-zinc-200">
                        {post.views > 0 ? post.views.toLocaleString("pt-BR") : <span className="text-zinc-600">—</span>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link
                            href={`/admin/posts/${post.id}/edit`}
                            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:bg-white/[0.06] hover:text-white"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Editar
                          </Link>
                          <DeletePostButton postId={post.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

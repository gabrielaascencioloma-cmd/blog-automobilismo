import Link from "next/link";
import { prisma } from "@/lib/db";
import { CATEGORIES } from "@/lib/categories";
import { DeletePostButton } from "../components/DeletePostButton";

function statusLabel(status: "DRAFT" | "PUBLISHED", publishAt: Date) {
  if (status === "DRAFT") {
    return { text: "Rascunho", className: "bg-slate-200 text-slate-700" };
  }
  if (publishAt > new Date()) {
    return {
      text: `Agendado · ${publishAt.toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}`,
      className: "bg-amber-100 text-amber-800",
    };
  }
  return { text: "Publicado", className: "bg-emerald-100 text-emerald-800" };
}

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-slate-900">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Novo post
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        {posts.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">Nenhum post ainda.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Título</th>
                <th className="px-4 py-3">Categoria</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const status = statusLabel(post.status, post.publishAt);
                return (
                  <tr key={post.id} className="border-b border-slate-100 last:border-0">
                    <td className="px-4 py-3 font-medium text-slate-900">{post.title}</td>
                    <td className="px-4 py-3 text-slate-600">
                      {CATEGORIES[post.category].label}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.className}`}>
                        {status.text}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/admin/posts/${post.id}/edit`}
                          className="font-medium text-slate-600 hover:text-slate-900"
                        >
                          Editar
                        </Link>
                        <DeletePostButton postId={post.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

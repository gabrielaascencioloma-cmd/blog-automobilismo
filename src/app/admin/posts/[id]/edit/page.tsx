import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Eye } from "lucide-react";
import { prisma } from "@/lib/db";
import { PostForm } from "../../../components/PostForm";
import { updatePost } from "../../actions";
import { btnGhost } from "../../../components/ui";
import { PageHeader, PageShell } from "../../../components/premium";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();
  const live = post.status === "PUBLISHED" && post.publishAt <= new Date();

  return (
    <PageShell>
      <PageHeader
        eyebrow={
          <Link href="/admin/posts" className="inline-flex items-center gap-1.5 hover:text-emerald-300">
            <ArrowLeft className="h-3.5 w-3.5" /> Posts
          </Link>
        }
        title="Editar post"
        subtitle={
          <span className="inline-flex flex-wrap items-center gap-3">
            <span>/blog/{post.slug}</span>
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <Eye className="h-3.5 w-3.5" /> {post.views.toLocaleString("pt-BR")} leituras
            </span>
          </span>
        }
        actions={
          live && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
              <ExternalLink className="h-4 w-4" /> Ver no blog
            </a>
          )
        }
      />
      <PostForm action={updatePost.bind(null, post.id)} post={post} />
    </PageShell>
  );
}

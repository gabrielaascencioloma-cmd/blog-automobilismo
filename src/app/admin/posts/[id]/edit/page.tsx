import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { prisma } from "@/lib/db";
import { PostForm } from "../../../components/PostForm";
import { updatePost } from "../../actions";
import { btnGhost, pageTitle, pageSubtitle } from "../../../components/ui";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <Link href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200">
        <ArrowLeft className="h-4 w-4" /> Posts
      </Link>
      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className={pageTitle}>Editar post</h1>
          <p className={pageSubtitle}>/blog/{post.slug}</p>
        </div>
        {post.status === "PUBLISHED" && post.publishAt <= new Date() && (
          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
            <ExternalLink className="h-4 w-4" /> Ver no blog
          </a>
        )}
      </div>
      <div className="mt-8">
        <PostForm action={updatePost.bind(null, post.id)} post={post} />
      </div>
    </div>
  );
}

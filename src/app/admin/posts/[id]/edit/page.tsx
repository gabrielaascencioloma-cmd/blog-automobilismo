import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PostForm } from "../../../components/PostForm";
import { updatePost } from "../../actions";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-xl font-semibold text-slate-900">Editar post</h1>
      <div className="mt-6">
        <PostForm action={updatePost.bind(null, post.id)} post={post} />
      </div>
    </div>
  );
}

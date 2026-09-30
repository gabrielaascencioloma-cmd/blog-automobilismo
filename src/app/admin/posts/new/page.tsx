import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "../../components/PostForm";
import { createPost } from "../actions";
import { pageTitle, pageSubtitle } from "../../components/ui";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <Link href="/admin/posts" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-200">
        <ArrowLeft className="h-4 w-4" /> Posts
      </Link>
      <h1 className={`${pageTitle} mt-3`}>Novo post</h1>
      <p className={pageSubtitle}>Escreva, escolha a capa e publique ou agende</p>
      <div className="mt-8">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}

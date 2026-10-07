import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PostForm } from "../../components/PostForm";
import { createPost } from "../actions";
import { PageHeader, PageShell } from "../../components/premium";

export default function NewPostPage() {
  return (
    <PageShell>
      <PageHeader
        eyebrow={
          <Link href="/admin/posts" className="inline-flex items-center gap-1.5 hover:text-emerald-300">
            <ArrowLeft className="h-3.5 w-3.5" /> Posts
          </Link>
        }
        title="Novo post"
        subtitle="Escreva, escolha a capa e publique ou agende."
      />
      <PostForm action={createPost} />
    </PageShell>
  );
}

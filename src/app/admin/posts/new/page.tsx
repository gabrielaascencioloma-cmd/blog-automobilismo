import { PostForm } from "../../components/PostForm";
import { createPost } from "../actions";

export default function NewPostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-xl font-semibold text-slate-900">Novo post</h1>
      <div className="mt-6">
        <PostForm action={createPost} />
      </div>
    </div>
  );
}

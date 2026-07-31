"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deletePost } from "../posts/actions";

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleClick() {
    if (!window.confirm("Excluir este post? Essa ação não pode ser desfeita.")) return;
    startTransition(async () => {
      await deletePost(postId);
      router.refresh();
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={pending}
      className="font-medium text-red-600 hover:text-red-800 disabled:opacity-50"
    >
      {pending ? "Excluindo…" : "Excluir"}
    </button>
  );
}

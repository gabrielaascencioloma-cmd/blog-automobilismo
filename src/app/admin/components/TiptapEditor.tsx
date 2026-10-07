"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Table, TableRow, TableHeader, TableCell } from "@tiptap/extension-table";
import { upload } from "@vercel/blob/client";
import { toWebp } from "../lib/toWebp";
import {
  Bold as BoldIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  LinkIcon,
  ShieldPlus,
  ImagePlus,
  Loader2,
  Table2,
  Undo2,
  Redo2,
} from "lucide-react";
import { CalloutNode } from "./tiptap/CalloutNode";
import { BlockMover, ImageBlock } from "./tiptap/blocks";
import { BlockControls } from "./tiptap/BlockControls";

function ToolbarButton({
  onClick,
  active,
  children,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      title={label}
      onClick={onClick}
      className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
        active
          ? "bg-gradient-to-b from-emerald-400/25 to-emerald-500/10 text-emerald-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-emerald-400/30"
          : "text-zinc-400 hover:bg-white/[0.07] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function TiptapEditor({
  initialContent,
  onChange,
}: {
  initialContent: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      CalloutNode,
      ImageBlock,
      BlockMover,
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose-article min-h-[480px] max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const fileRef = useRef<HTMLInputElement>(null);
  const [paper, setPaper] = useState<HTMLDivElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  async function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = "";
    if (!editor || files.length === 0) return;
    setUploading(true);
    setUploadError(null);
    try {
      for (const picked of files) {
        const file = await toWebp(picked);
        const blob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/admin/api/upload",
        });
        const alt = window.prompt(`Texto alternativo (ALT) para ${file.name}:`, "") ?? "";
        editor.chain().focus().setImage({ src: blob.url, alt }).run();
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Falha no upload.");
    } finally {
      setUploading(false);
    }
  }

  if (!editor) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.9)]">
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-1 border-b border-white/10 bg-gradient-to-b from-[#17181d] to-[#111215] p-2">
        <ToolbarButton
          label="Negrito"
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <BoldIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Título"
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Subtítulo"
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista"
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Lista numerada"
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Link"
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("URL do link:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          label="Inserir destaque"
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertContent({
                type: "callout",
                attrs: { title: "" },
                content: [{ type: "paragraph" }],
              })
              .run()
          }
        >
          <ShieldPlus className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Inserir imagem" onClick={() => fileRef.current?.click()}>
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
        </ToolbarButton>
        <ToolbarButton
          label="Inserir tabela"
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        >
          <Table2 className="h-4 w-4" />
        </ToolbarButton>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleImages}
        />
        <div className="mx-1 w-px bg-white/10" />
        <ToolbarButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Refazer" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>
      {uploadError && <p className="bg-red-500/10 px-3 py-2 text-xs text-red-400">{uploadError}</p>}
      {/* Área de escrita clara, igual ao post no site. Cada bloco pode subir, descer, duplicar ou sair. */}
      <div ref={setPaper} className="relative bg-white px-6 pb-8 pt-12 text-ink md:px-10 md:pb-10 md:pt-14">
        <EditorContent editor={editor} />
        <BlockControls editor={editor} container={paper} />
      </div>
      <p className="border-t border-white/10 bg-[#111215] px-4 py-2 text-[11px] text-zinc-500">
        Clique num bloco para mover (↑ ↓ ou Alt+↑/↓), duplicar ou apagar. Imagens também podem ser arrastadas e têm tamanho e alinhamento.
      </p>
    </div>
  );
}

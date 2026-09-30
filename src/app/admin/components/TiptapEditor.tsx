"use client";

import { useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
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
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
        active ? "bg-emerald-500/15 text-emerald-400" : "text-zinc-400 hover:bg-white/[0.07] hover:text-white"
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
      Image,
      Table,
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose-article min-h-[300px] max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const fileRef = useRef<HTMLInputElement>(null);
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
    <div className="overflow-hidden rounded-xl border border-white/10">
      <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#101114] p-2">
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
      {/* Área de escrita clara, igual ao post no site */}
      <div className="bg-white px-5 py-4 text-ink">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

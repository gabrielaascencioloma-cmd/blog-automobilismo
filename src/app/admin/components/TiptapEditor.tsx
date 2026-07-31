"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold as BoldIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  LinkIcon,
  ShieldPlus,
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
        active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-200"
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
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: "prose-article min-h-[300px] max-w-none focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl border border-slate-300 bg-white">
      <div className="flex flex-wrap gap-1 border-b border-slate-200 p-2">
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
        <div className="mx-1 w-px bg-slate-200" />
        <ToolbarButton label="Desfazer" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton label="Refazer" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 className="h-4 w-4" />
        </ToolbarButton>
      </div>
      <div className="px-4 py-3">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

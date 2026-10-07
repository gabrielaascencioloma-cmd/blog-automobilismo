"use client";

import { useEffect, useState } from "react";
import type { Editor } from "@tiptap/core";
import { NodeSelection } from "@tiptap/pm/state";
import { ArrowDown, ArrowUp, Copy, Trash2, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { deleteBlock, duplicateBlock, getTopBlock, moveBlock, type ImageAlign, type ImageWidth } from "./blocks";

type Box = { top: number; left: number; width: number; height: number };

const WIDTHS: { value: ImageWidth; label: string }[] = [
  { value: "50%", label: "P" },
  { value: "75%", label: "M" },
  { value: "100%", label: "G" },
];
const ALIGNS: { value: ImageAlign; icon: React.ElementType; label: string }[] = [
  { value: "left", icon: AlignLeft, label: "Alinhar à esquerda" },
  { value: "center", icon: AlignCenter, label: "Centralizar" },
  { value: "right", icon: AlignRight, label: "Alinhar à direita" },
];

function Btn({
  onClick,
  label,
  disabled,
  active,
  danger,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  active?: boolean;
  danger?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      // Não tira o foco do editor ao clicar.
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`flex h-7 min-w-7 items-center justify-center rounded-lg px-1.5 text-xs font-semibold transition-colors disabled:opacity-30 ${
        active
          ? "bg-emerald-400 text-[#03140d]"
          : danger
            ? "text-red-300 hover:bg-red-500/20"
            : "text-zinc-200 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

// Contorno + barrinha flutuante do bloco atual (subir, descer, duplicar, apagar; tamanho/alinhamento de imagem).
export function BlockControls({ editor, container }: { editor: Editor; container: HTMLElement | null }) {
  const [box, setBox] = useState<Box | null>(null);
  const [, force] = useState(0);

  useEffect(() => {
    const update = () => {
      force((n) => n + 1);
      if (!container || (!editor.isFocused && !(editor.state.selection instanceof NodeSelection))) {
        setBox(null);
        return;
      }
      const block = getTopBlock(editor);
      if (!block) return setBox(null);
      const dom = editor.view.nodeDOM(block.pos);
      if (!(dom instanceof HTMLElement)) return setBox(null);
      const c = container.getBoundingClientRect();
      const r = dom.getBoundingClientRect();
      setBox({ top: r.top - c.top, left: r.left - c.left, width: r.width, height: r.height });
    };
    update();
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    editor.on("focus", update);
    editor.on("blur", update);
    window.addEventListener("resize", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
      editor.off("focus", update);
      editor.off("blur", update);
      window.removeEventListener("resize", update);
    };
  }, [editor, container]);

  if (!box) return null;
  const block = getTopBlock(editor);
  if (!block) return null;
  const isFirst = block.index === 0;
  const isLast = block.index === editor.state.doc.childCount - 1;
  const isImage = block.node.type.name === "image";
  const width = (block.node.attrs.width as ImageWidth) ?? "100%";
  const align = (block.node.attrs.align as ImageAlign) ?? "center";
  const setImage = (attrs: Partial<{ width: ImageWidth; align: ImageAlign }>) =>
    editor.chain().focus().updateAttributes("image", attrs).run();

  return (
    <>
      {/* Contorno do bloco */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute rounded-lg ring-2 ring-emerald-400/50 transition-all duration-150"
        style={{ top: box.top - 6, left: box.left - 8, width: box.width + 16, height: box.height + 12 }}
      />
      {/* Barrinha */}
      <div
        className="absolute z-20 flex items-center gap-0.5 rounded-xl border border-white/10 bg-[#16171c]/95 p-1 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.7)] backdrop-blur transition-all duration-150"
        style={{ top: Math.max(box.top - 44, 4), left: Math.max(box.left + box.width - 8, 0), transform: "translateX(-100%)" }}
      >
        {isImage && (
          <>
            {WIDTHS.map((w) => (
              <Btn key={w.value} label={`Tamanho ${w.label}`} active={width === w.value} onClick={() => setImage({ width: w.value })}>
                {w.label}
              </Btn>
            ))}
            <span className="mx-1 h-4 w-px bg-white/10" />
            {ALIGNS.map((a) => (
              <Btn key={a.value} label={a.label} active={align === a.value} onClick={() => setImage({ align: a.value })}>
                <a.icon className="h-3.5 w-3.5" />
              </Btn>
            ))}
            <span className="mx-1 h-4 w-px bg-white/10" />
          </>
        )}
        <Btn label="Subir bloco (Alt+↑)" disabled={isFirst} onClick={() => moveBlock(editor, "up")}>
          <ArrowUp className="h-3.5 w-3.5" />
        </Btn>
        <Btn label="Descer bloco (Alt+↓)" disabled={isLast} onClick={() => moveBlock(editor, "down")}>
          <ArrowDown className="h-3.5 w-3.5" />
        </Btn>
        <Btn label="Duplicar bloco" onClick={() => duplicateBlock(editor)}>
          <Copy className="h-3.5 w-3.5" />
        </Btn>
        <Btn label="Apagar bloco" danger onClick={() => deleteBlock(editor)}>
          <Trash2 className="h-3.5 w-3.5" />
        </Btn>
      </div>
    </>
  );
}

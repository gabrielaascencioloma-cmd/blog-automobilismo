// Edição modular: cada filho direto do documento (parágrafo, título, imagem, tabela, destaque…)
// é um "bloco" que pode subir, descer, ser duplicado ou apagado.
import { Extension, type Editor } from "@tiptap/core";
import Image from "@tiptap/extension-image";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import type { Node as PMNode } from "@tiptap/pm/model";

export interface TopBlock {
  index: number;
  pos: number;
  node: PMNode;
}

// Bloco de nível superior onde está o cursor (ou a imagem selecionada).
export function getTopBlock(editor: Editor): TopBlock | null {
  const { doc, selection } = editor.state;
  if (doc.childCount === 0) return null;
  const index = Math.min(selection.$from.index(0), doc.childCount - 1);
  let pos = 0;
  for (let i = 0; i < index; i++) pos += doc.child(i).nodeSize;
  return { index, pos, node: doc.child(index) };
}

function selectBlock(editor: Editor, pos: number) {
  const { tr } = editor.state;
  const node = tr.doc.nodeAt(pos);
  if (!node) return tr;
  const selection = node.isAtom
    ? NodeSelection.create(tr.doc, pos)
    : TextSelection.near(tr.doc.resolve(Math.min(pos + 1, tr.doc.content.size)));
  return tr.setSelection(selection);
}

export function moveBlock(editor: Editor, direction: "up" | "down") {
  const block = getTopBlock(editor);
  if (!block) return false;
  const { doc } = editor.state;
  const target = direction === "up" ? block.index - 1 : block.index + 1;
  if (target < 0 || target >= doc.childCount) return false;

  const other = doc.child(target);
  const { node, pos } = block;
  let tr = editor.state.tr;
  let newPos: number;
  if (direction === "up") {
    const otherPos = pos - other.nodeSize;
    tr = tr.replaceWith(otherPos, pos + node.nodeSize, [node, other]);
    newPos = otherPos;
  } else {
    const otherEnd = pos + node.nodeSize + other.nodeSize;
    tr = tr.replaceWith(pos, otherEnd, [other, node]);
    newPos = pos + other.nodeSize;
  }
  const moved = tr.doc.nodeAt(newPos);
  if (moved) {
    const sel =
      moved.type.name === "image" || moved.isAtom
        ? NodeSelection.create(tr.doc, newPos)
        : TextSelection.near(tr.doc.resolve(newPos + 1));
    tr = tr.setSelection(sel);
  }
  editor.view.dispatch(tr.scrollIntoView());
  editor.view.focus();
  return true;
}

export function duplicateBlock(editor: Editor) {
  const block = getTopBlock(editor);
  if (!block) return false;
  const insertAt = block.pos + block.node.nodeSize;
  const tr = editor.state.tr.insert(insertAt, block.node.copy(block.node.content));
  editor.view.dispatch(tr);
  editor.view.dispatch(selectBlock(editor, insertAt).scrollIntoView());
  editor.view.focus();
  return true;
}

export function deleteBlock(editor: Editor) {
  const block = getTopBlock(editor);
  if (!block) return false;
  const { doc } = editor.state;
  let tr = editor.state.tr;
  if (doc.childCount === 1) {
    // Documento nunca fica vazio: troca o último bloco por um parágrafo em branco.
    tr = tr.replaceWith(0, doc.content.size, editor.schema.nodes.paragraph.create());
  } else {
    tr = tr.delete(block.pos, block.pos + block.node.nodeSize);
  }
  editor.view.dispatch(tr);
  editor.view.focus();
  return true;
}

// Alt+↑ / Alt+↓ movem o bloco atual.
export const BlockMover = Extension.create({
  name: "blockMover",
  addKeyboardShortcuts() {
    return {
      "Alt-ArrowUp": () => moveBlock(this.editor, "up"),
      "Alt-ArrowDown": () => moveBlock(this.editor, "down"),
    };
  },
});

export type ImageWidth = "100%" | "75%" | "50%";
export type ImageAlign = "left" | "center" | "right";

// Imagem com tamanho e alinhamento, salvos como estilo no HTML do post.
export const ImageBlock = Image.extend({
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        parseHTML: (el) => (el as HTMLElement).style.width || "100%",
      },
      align: {
        default: "center",
        parseHTML: (el) => {
          const s = (el as HTMLElement).style;
          if (s.marginLeft === "auto" && s.marginRight === "auto") return "center";
          if (s.marginLeft === "auto") return "right";
          if (s.marginRight === "auto") return "left";
          return "center";
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { width, align, height: _height, ...rest } = HTMLAttributes as Record<string, string | null>;
    void _height;
    const margins =
      align === "left" ? "margin-left:0;margin-right:auto" : align === "right" ? "margin-left:auto;margin-right:0" : "margin-left:auto;margin-right:auto";
    return ["img", { ...rest, style: `width:${width || "100%"};${margins}` }];
  },
});

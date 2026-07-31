import { Node, mergeAttributes } from "@tiptap/core";
import {
  ReactNodeViewRenderer,
  NodeViewWrapper,
  NodeViewContent,
  type NodeViewProps,
} from "@tiptap/react";
import { ShieldCheck } from "lucide-react";

function CalloutView({ node, updateAttributes }: NodeViewProps) {
  return (
    <NodeViewWrapper className="my-4 rounded-xl border-l-4 border-l-[#ae9768] border-y border-r border-slate-200 bg-[#e6e0d6] p-4">
      <div className="mb-2 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 shrink-0 text-[#8f7a4f]" />
        <input
          value={node.attrs.title}
          onChange={(e) => updateAttributes({ title: e.target.value })}
          placeholder="Título do destaque"
          className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:font-normal placeholder:text-slate-400"
        />
      </div>
      <NodeViewContent className="prose-callout-content text-sm text-slate-700" />
    </NodeViewWrapper>
  );
}

export const CalloutNode = Node.create({
  name: "callout",
  group: "block",
  content: "paragraph+",
  isolating: true,

  addAttributes() {
    return {
      title: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-title") ?? "",
        renderHTML: (attrs) => ({ "data-title": attrs.title }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "div[data-callout]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-callout": "" }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutView);
  },
});

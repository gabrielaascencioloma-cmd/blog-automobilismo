"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import type { PostSummary } from "@/lib/data/posts";
import { EditorialGrid, MixedSection, MosaicSection, PopularSplit } from "./sections";

// Cada bloco que aparece ao rolar usa um layout diferente, em rodízio.
const LAYOUTS: { size: number; render: (posts: PostSummary[]) => React.ReactNode }[] = [
  { size: 4, render: (p) => <EditorialGrid posts={p} eyebrow="Continue rolando" title="Continue lendo" /> },
  { size: 5, render: (p) => <MosaicSection posts={p} eyebrow="Separamos para você" title="Mais para você" /> },
  {
    size: 6,
    render: (p) => {
      const popular = [...p].sort((a, b) => b.views - a.views).slice(0, 4);
      const features = p.filter((post) => !popular.includes(post)).slice(0, 2);
      return <PopularSplit title="Vale a leitura" popular={popular} features={features} />;
    },
  },
  { size: 6, render: (p) => <MixedSection posts={p} eyebrow="Ainda tem mais" title="Do arquivo" /> },
];

function buildChunks(posts: PostSummary[]) {
  const chunks: { layout: number; posts: PostSummary[] }[] = [];
  let i = 0;
  let layout = 0;
  while (i < posts.length) {
    let index = layout % LAYOUTS.length;
    const remaining = posts.length - i;
    // Sobra pequena no fim: usa a grade editorial, que se ajusta a 1–4 posts.
    if (remaining < LAYOUTS[index].size && remaining <= 4) index = 0;
    const { size } = LAYOUTS[index];
    chunks.push({ layout: index, posts: posts.slice(i, i + size) });
    i += size;
    layout++;
  }
  return chunks;
}

// Home "infinita": novos blocos entram conforme a pessoa chega ao fim da página.
export function InfiniteSections({ posts }: { posts: PostSummary[] }) {
  const chunks = buildChunks(posts);
  const [visible, setVisible] = useState(0);
  const sentinel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || visible >= chunks.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setVisible((v) => Math.min(v + 1, chunks.length));
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, chunks.length]);

  if (chunks.length === 0) return null;

  return (
    <>
      {chunks.slice(0, visible).map((chunk, i) => (
        <div key={i} className="home-reveal">
          {LAYOUTS[chunk.layout].render(chunk.posts)}
        </div>
      ))}
      {visible < chunks.length ? (
        <div ref={sentinel} className="flex justify-center py-10 text-ink-faint" aria-hidden="true">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 pb-16 pt-6 text-center">
          <span className="h-px w-24 bg-gradient-to-r from-transparent via-red/50 to-transparent" />
          <p className="text-sm text-ink-soft">Você chegou ao fim dos destaques.</p>
          <Link href="/blog" className="btn-3d inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold">
            Ver todos os posts <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </>
  );
}

export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORY_LIST, type CategorySlug } from "@/lib/categories";
import { findTopic, postMatchesTopic, topicHref } from "@/lib/menu";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Manutenção automotiva: dicas, alertas e revisão do seu carro",
  description: "Posts sobre manutenção automotiva, dicas práticas e alertas para quem depende do carro todos os dias.",
};

const chipBase = "rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors";
const chipActive = "bg-red text-white";
const chipIdle = "border border-border-subtle text-ink-soft hover:border-red/40 hover:text-ink";

function isCategorySlug(value: string | undefined): value is CategorySlug {
  return CATEGORY_LIST.some((c) => c.slug === value);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string; topico?: string; sub?: string }>;
}) {
  const { categoria, topico, sub } = await searchParams;
  const activeTopic = findTopic(topico);
  const activeSubtopic = activeTopic?.subtopics.find((s) => s.slug === sub);
  const activeCategory = !activeTopic && isCategorySlug(categoria) ? categoria : undefined;

  const allPosts = await getAllPosts();
  const posts = allPosts.filter((post) => {
    if (activeTopic) return postMatchesTopic(post, activeTopic, activeSubtopic);
    return !activeCategory || post.category === activeCategory;
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red">
          {activeTopic ? (
            <Link href={topicHref(activeTopic)} className="hover:underline">
              {activeTopic.label}
            </Link>
          ) : (
            "Blog"
          )}
        </p>
        <h1 className="font-display text-4xl font-black uppercase text-ink sm:text-5xl">
          {activeSubtopic?.label ?? activeTopic?.label ?? "Todos os posts"}
        </h1>
        <p className="mt-3 text-ink-soft">
          {activeSubtopic?.scope ??
            (activeTopic
              ? activeTopic.subtopics.map((s) => s.label).join(" · ")
              : "Manutenção, dicas práticas e alertas para quem depende do carro todos os dias.")}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {activeTopic ? (
          <>
            <Link
              href={topicHref(activeTopic)}
              className={`${chipBase} ${!activeSubtopic ? chipActive : chipIdle}`}
            >
              Tudo
            </Link>
            {activeTopic.subtopics.map((s) => (
              <Link
                key={s.slug}
                href={topicHref(activeTopic, s)}
                className={`${chipBase} ${activeSubtopic?.slug === s.slug ? chipActive : chipIdle}`}
              >
                {s.label}
              </Link>
            ))}
          </>
        ) : (
          <>
            <Link href="/blog" className={`${chipBase} ${!activeCategory ? chipActive : chipIdle}`}>
              Todos
            </Link>
            {CATEGORY_LIST.map((c) => (
              <Link
                key={c.slug}
                href={`/blog?categoria=${c.slug}`}
                className={`${chipBase} ${activeCategory === c.slug ? chipActive : chipIdle}`}
              >
                {c.label}
              </Link>
            ))}
          </>
        )}
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-ink-soft">
          <p>{activeTopic ? "Ainda não há posts sobre esse assunto." : "Ainda não há posts nessa categoria."}</p>
          <Link href="/blog" className="mt-3 inline-block text-sm font-bold text-red hover:underline">
            Ver todos os posts
          </Link>
        </div>
      )}
    </div>
  );
}

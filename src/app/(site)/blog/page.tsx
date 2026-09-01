import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORY_LIST, type CategorySlug } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Manutenção automotiva: dicas, alertas e revisão do seu carro",
  description: "Posts sobre manutenção automotiva, dicas práticas e alertas para quem depende do carro todos os dias.",
};

function isCategorySlug(value: string | undefined): value is CategorySlug {
  return CATEGORY_LIST.some((c) => c.slug === value);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const activeCategory = isCategorySlug(categoria) ? categoria : undefined;

  const allPosts = await getAllPosts();
  const posts = allPosts.filter(
    (post) => !activeCategory || post.category === activeCategory
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-red">
          Blog
        </p>
        <h1 className="font-display text-4xl font-black uppercase text-ink sm:text-5xl">
          Todos os posts
        </h1>
        <p className="mt-3 text-ink-soft">
          Manutenção, dicas práticas e alertas para quem depende do carro todos os dias.
        </p>
      </div>

      {/* Category filter */}
      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
            !activeCategory
              ? "bg-red text-white"
              : "border border-border-subtle text-ink-soft hover:border-red/40 hover:text-ink"
          }`}
        >
          Todos
        </Link>
        {CATEGORY_LIST.map((c) => (
          <Link
            key={c.slug}
            href={`/blog?categoria=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
              activeCategory === c.slug
                ? "bg-red text-white"
                : "border border-border-subtle text-ink-soft hover:border-red/40 hover:text-ink"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-ink-soft">
          Ainda não há posts nessa categoria.
        </p>
      )}
    </div>
  );
}

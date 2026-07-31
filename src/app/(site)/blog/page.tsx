import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORY_LIST, type CategorySlug } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";

export const metadata: Metadata = {
  title: "Blog",
  description: "Todos os posts sobre manutenção, dicas e alertas para o seu carro.",
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
        <h1 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
          Blog
        </h1>
        <p className="mt-3 text-ink-soft">
          Manutenção, dicas práticas e alertas para quem depende do carro
          todos os dias.
        </p>
      </div>

      <div className="mt-8 inline-flex flex-wrap gap-1 rounded-full bg-surface p-1.5 shadow-sm">
        <Link
          href="/blog"
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            !activeCategory
              ? "bg-ink text-cream"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          Todos
        </Link>
        {CATEGORY_LIST.map((c) => (
          <Link
            key={c.slug}
            href={`/blog?categoria=${c.slug}`}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeCategory === c.slug
                ? "bg-ink text-cream"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      {posts.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
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

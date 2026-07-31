import Link from "next/link";
import { ArrowRight, Wrench, ListChecks, TriangleAlert, CalendarClock } from "lucide-react";
import { getAllPosts } from "@/lib/data/posts";
import { CATEGORIES } from "@/lib/categories";
import { PostCard } from "@/components/PostCard";
import { PhotoCover } from "@/components/PhotoCover";

const CATEGORY_ICONS = {
  manutencao: Wrench,
  dicas: ListChecks,
  alertas: TriangleAlert,
  novidades: CalendarClock,
} as const;

export default async function Home() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[86vh] min-h-[560px] w-full overflow-hidden">
        <PhotoCover
          src="/photos/hero.jpg"
          alt="Carro popular estacionado em uma rua ao entardecer"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-transparent" />
        <div className="absolute inset-0 mx-auto flex max-w-6xl flex-col justify-end px-6 pb-16 sm:pb-20">
          <h1 className="font-display max-w-2xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-cream sm:text-6xl md:text-7xl">
            Carro em dia
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/85">
            Manutenção, dicas práticas e alertas sobre tudo que muda no
            universo automotivo — direto ao ponto, para quem depende do carro
            todos os dias.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-cream"
            >
              Ver últimos posts
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sobre"
              className="inline-flex items-center gap-2 rounded-full border border-cream/50 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-cream/10"
            >
              Sobre o blog
            </Link>
          </div>
        </div>
      </section>

      {/* Featured + latest posts */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Últimos posts
          </h2>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-dark hover:underline"
          >
            Ver todos
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {featured && <PostCard post={featured} featured />}
          {rest.slice(0, 4).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Category overview */}
      <section className="bg-cream-warm">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display text-2xl font-extrabold text-ink">
            Sobre o que a gente escreve
          </h2>
          <p className="mt-2 max-w-lg text-sm text-ink-soft">
            Quatro frentes, sempre com o mesmo objetivo: ajudar você a manter
            o carro rodando sem sustos e sem gastar mais do que precisa.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Object.values(CATEGORIES).map((cat) => {
              const Icon = CATEGORY_ICONS[cat.slug];
              return (
                <Link
                  key={cat.slug}
                  href={`/blog?categoria=${cat.slug}`}
                  className="group rounded-2xl bg-surface p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-bold text-ink">
                    {cat.label}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink-soft">
                    {cat.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative overflow-hidden bg-teal">
        <div className="relative mx-auto max-w-6xl px-6 py-20 text-center">
          <h2 className="font-display mx-auto max-w-xl text-3xl font-extrabold uppercase leading-tight text-cream">
            Carro parado é dinheiro parado.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-cream/75">
            Novos posts sobre manutenção, dicas e alertas toda semana. Comece
            pelos mais lidos.
          </p>
          <Link
            href="/blog"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-dark hover:text-cream"
          >
            Explorar o blog
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

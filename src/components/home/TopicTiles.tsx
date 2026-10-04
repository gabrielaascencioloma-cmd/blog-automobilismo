import Link from "next/link";
import { Wrench, Landmark, FileText, ShieldAlert, Scale, ShieldCheck, ArrowUpRight } from "lucide-react";
import type { PostSummary } from "@/lib/data/posts";
import { ADMIN_CATEGORY_OPTIONS, CATEGORIES } from "@/lib/categories";
import { MENU_TOPICS, postMatchesTopic, topicHref } from "@/lib/menu";
import { SectionHeader } from "./sections";

const ICONS: Record<string, React.ElementType> = {
  manutencao: Wrench,
  financiamento: Landmark,
  documentos: FileText,
  seguranca: ShieldAlert,
  comparativos: Scale,
  "protecao-veicular": ShieldCheck,
};

// MORNA — atalhos visuais para os 6 assuntos do menu.
export function TopicTiles({ posts }: { posts: PostSummary[] }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14">
      <SectionHeader eyebrow="Encontre o que precisa" title="Explore por assunto" href={null} />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {MENU_TOPICS.map((topic) => {
          const category = ADMIN_CATEGORY_OPTIONS.find((c) => c.topicSlug === topic.slug)?.slug ?? "manutencao";
          const count = posts.filter((p) => postMatchesTopic(p, topic)).length;
          const Icon = ICONS[topic.slug] ?? Wrench;
          return (
            <Link
              key={topic.slug}
              href={topicHref(topic)}
              className="group overflow-hidden rounded-2xl border border-border-subtle bg-white transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.45)]"
            >
              <div className="relative h-28 overflow-hidden bg-ink">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={CATEGORIES[category].coverImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
              <div className="relative px-4 pb-4 pt-6">
                <span className="absolute -top-5 left-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-[0_6px_16px_-6px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
                  <Icon className="h-[18px] w-[18px] text-red" />
                </span>
                <div>
                  <p className="font-nav text-[13px] font-bold leading-tight text-ink">{topic.label}</p>
                  <p className="text-[11px] text-ink-faint">
                    {count > 0 ? `${count} post${count !== 1 ? "s" : ""}` : "Em breve"}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

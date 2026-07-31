import { prisma } from "@/lib/db";

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  topPosts: { id: string; slug: string; title: string; category: string; views: number; publishAt: Date }[];
  postsByCategory: { category: string; count: number }[];
  monthlyGrowth: { month: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();

  const [allPosts, topPosts, byCategory] = await Promise.all([
    prisma.post.findMany({
      select: { status: true, publishAt: true, views: true, createdAt: true },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", publishAt: { lte: now } },
      orderBy: { views: "desc" },
      take: 8,
      select: { id: true, slug: true, title: true, category: true, views: true, publishAt: true },
    }),
    prisma.post.groupBy({
      by: ["category"],
      where: { status: "PUBLISHED", publishAt: { lte: now } },
      _count: { id: true },
    }),
  ]);

  const totalPosts = allPosts.length;
  const publishedPosts = allPosts.filter(
    (p) => p.status === "PUBLISHED" && p.publishAt <= now
  ).length;
  const scheduledPosts = allPosts.filter(
    (p) => p.status === "PUBLISHED" && p.publishAt > now
  ).length;
  const draftPosts = allPosts.filter((p) => p.status === "DRAFT").length;
  const totalViews = allPosts.reduce((sum, p) => sum + p.views, 0);

  const postsByCategory = byCategory.map((g) => ({
    category: g.category,
    count: g._count.id,
  }));

  // Monthly growth for the last 6 months
  const months: { month: string; count: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("pt-BR", { month: "short", year: "2-digit" });
    const count = allPosts.filter((p) => {
      const pub = p.publishAt;
      return (
        p.status === "PUBLISHED" &&
        pub.getFullYear() === d.getFullYear() &&
        pub.getMonth() === d.getMonth()
      );
    }).length;
    months.push({ month: label, count });
  }

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    scheduledPosts,
    totalViews,
    topPosts,
    postsByCategory,
    monthlyGrowth: months,
  };
}

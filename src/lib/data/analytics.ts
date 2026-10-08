import { prisma } from "@/lib/db";

const TZ = "America/Sao_Paulo";

export interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  avgViews: number;
  topPosts: { id: string; slug: string; title: string; category: string; views: number; publishAt: Date; coverUrl: string | null }[];
  postsByCategory: { category: string; count: number }[];
  monthlyGrowth: { month: string; year: string; count: number; cumulative: number; current: boolean }[];
  // 16 semanas: 12 para trás + 4 para frente (agendados), um item por dia.
  activity: { date: string; published: number; scheduled: number; future: boolean; today: boolean }[];
  upcoming: { id: string; title: string; category: string; publishAt: Date }[];
  leads: {
    total: number;
    last7Days: number;
    cotacao: number;
    verificacao: number;
    recent: { id: number; tipo: string; nome: string | null; placa: string | null; createdAt: Date }[];
    // Leads por dia nas últimas 2 semanas.
    daily: number[];
  };
}

// Ano e mês no horário de Brasília (o servidor roda em UTC).
function yearMonthBR(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit" }).formatToParts(date);
  const year = Number(parts.find((p) => p.type === "year")?.value);
  const month = Number(parts.find((p) => p.type === "month")?.value) - 1;
  return { year, month };
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [allPosts, topPosts, byCategory, upcoming, leadTotal, leadLast7, leadCotacao, recentLeads] = await Promise.all([
    prisma.post.findMany({
      select: { status: true, publishAt: true, views: true },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", publishAt: { lte: now } },
      orderBy: { views: "desc" },
      take: 8,
      select: { id: true, slug: true, title: true, category: true, views: true, publishAt: true, coverUrl: true },
    }),
    prisma.post.groupBy({
      by: ["category"],
      where: { status: "PUBLISHED", publishAt: { lte: now } },
      _count: { id: true },
    }),
    prisma.post.findMany({
      where: { status: "PUBLISHED", publishAt: { gt: now } },
      orderBy: { publishAt: "asc" },
      take: 5,
      select: { id: true, title: true, category: true, publishAt: true },
    }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.lead.count({ where: { tipo: "cotacao" } }),
    prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, tipo: true, nome: true, placa: true, createdAt: true },
    }),
  ]);
  const leads14 = await prisma.lead.findMany({
    where: { createdAt: { gte: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000) } },
    select: { createdAt: true },
  });

  const published = allPosts.filter((p) => p.status === "PUBLISHED" && p.publishAt <= now);
  const totalPosts = allPosts.length;
  const publishedPosts = published.length;
  const scheduledPosts = allPosts.filter((p) => p.status === "PUBLISHED" && p.publishAt > now).length;
  const draftPosts = allPosts.filter((p) => p.status === "DRAFT").length;
  const totalViews = allPosts.reduce((sum, p) => sum + p.views, 0);

  const postsByCategory = byCategory.map((g) => ({ category: g.category, count: g._count.id }));

  // Posts publicados por mês nos últimos 12 meses (horário de Brasília).
  const nowBR = yearMonthBR(now);
  const months: DashboardStats["monthlyGrowth"] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.UTC(nowBR.year, nowBR.month - i, 15));
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const count = published.filter((p) => {
      const ym = yearMonthBR(p.publishAt);
      return ym.year === year && ym.month === month;
    }).length;
    months.push({
      month: d.toLocaleDateString("pt-BR", { month: "short", timeZone: "UTC" }).replace(".", ""),
      year: String(year).slice(2),
      count,
      cumulative: 0,
      current: i === 0,
    });
  }
  const windowCount = months.reduce((sum, m) => sum + m.count, 0);
  let running = publishedPosts - windowCount;
  for (const m of months) {
    running += m.count;
    m.cumulative = running;
  }

  // Calendário de atividade por dia (horário de Brasília).
  const dayKey = (date: Date) => new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(date);
  const todayKey = dayKey(now);
  const perDay = new Map<string, { published: number; scheduled: number }>();
  for (const p of allPosts) {
    if (p.status !== "PUBLISHED") continue;
    const key = dayKey(p.publishAt);
    const entry = perDay.get(key) ?? { published: 0, scheduled: 0 };
    if (p.publishAt <= now) entry.published++;
    else entry.scheduled++;
    perDay.set(key, entry);
  }
  // Começa numa segunda-feira, 12 semanas atrás.
  const todayUTC = new Date(`${todayKey}T12:00:00Z`);
  const weekday = (todayUTC.getUTCDay() + 6) % 7; // 0 = segunda
  const start = new Date(todayUTC.getTime() - (weekday + 7 * 11) * 24 * 60 * 60 * 1000);
  const activity: DashboardStats["activity"] = [];
  for (let i = 0; i < 7 * 16; i++) {
    const key = new Date(start.getTime() + i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const entry = perDay.get(key) ?? { published: 0, scheduled: 0 };
    activity.push({ date: key, ...entry, future: key > todayKey, today: key === todayKey });
  }

  const daily: number[] = [];
  for (let i = 13; i >= 0; i--) {
    const key = dayKey(new Date(now.getTime() - i * 24 * 60 * 60 * 1000));
    daily.push(leads14.filter((l) => dayKey(l.createdAt) === key).length);
  }

  return {
    totalPosts,
    publishedPosts,
    draftPosts,
    scheduledPosts,
    totalViews,
    avgViews: publishedPosts ? totalViews / publishedPosts : 0,
    topPosts,
    postsByCategory,
    monthlyGrowth: months,
    activity,
    upcoming,
    leads: {
      total: leadTotal,
      last7Days: leadLast7,
      cotacao: leadCotacao,
      verificacao: leadTotal - leadCotacao,
      recent: recentLeads,
      daily,
    },
  };
}

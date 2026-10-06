import { prisma } from "@/lib/db";
import { PostsView } from "../components/PostsView";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ periodo?: string; de?: string; ate?: string }>;
}) {
  const params = await searchParams;
  const allPosts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  return <PostsView allPosts={allPosts} params={params} />;
}

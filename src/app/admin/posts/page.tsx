import { prisma } from "@/lib/db";
import { PostsView, type PostsParams } from "../components/PostsView";

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<PostsParams> }) {
  const params = await searchParams;
  const allPosts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
  return <PostsView allPosts={allPosts} params={params} />;
}

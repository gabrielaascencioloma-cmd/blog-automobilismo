import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json();
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      select: { views: true },
    });

    return NextResponse.json({ views: post.views });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

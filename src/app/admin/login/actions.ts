"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { SESSION_COOKIE_NAME, SESSION_MAX_AGE, createSessionToken, verifyPassword } from "@/lib/auth";

export async function login(_prevState: { error?: string } | undefined, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = email ? await prisma.user.findUnique({ where: { email } }) : null;
  const valid = user ? await verifyPassword(password, user.passwordHash) : false;

  if (!user || !valid) {
    return { error: "E-mail ou senha incorretos." };
  }

  const token = await createSessionToken({ sub: user.id, email: user.email });

  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });

  redirect("/admin/posts");
}

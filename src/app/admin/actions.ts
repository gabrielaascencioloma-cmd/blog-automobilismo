"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function logout() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}

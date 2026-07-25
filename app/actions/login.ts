"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateAdminLogin } from "@/lib/auth/auth";

export async function login(formData: FormData) {
  const username = formData.get("username")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (!validateAdminLogin(username, password)) {
    redirect("/login?error=1");
  }

  const cookieStore = await cookies();

  cookieStore.set("admin-auth", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  redirect("/admin");
}
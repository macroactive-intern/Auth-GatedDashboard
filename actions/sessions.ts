"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth/session";

const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}

export async function signOutOtherSessions(): Promise<void> {
  const session = await requireAuth();

  const cookieStore = await cookies();
  const currentToken = SESSION_COOKIES.map((name) => cookieStore.get(name)?.value).find(Boolean);

  if (!currentToken) return;

  await prisma.session.deleteMany({
    where: {
      userId: session.user.id,
      sessionToken: { not: currentToken },
    },
  });

  revalidatePath("/settings");
}

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import type { Role } from "@/lib/roles";
import { hasRole } from "@/lib/auth/permissions";

export async function getOptionalSession() {
  return await auth();
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session;
}

export async function requireRole(role: Role) {
  const session = await requireAuth();
  if (!hasRole(session.user.role, role)) redirect("/403");
  return session;
}

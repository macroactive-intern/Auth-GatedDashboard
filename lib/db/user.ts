import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/roles";

const PAGE_SIZE = 20;

export async function getAllUsers() {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      emailVerified: true,
    },
    orderBy: { email: "asc" },
  });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, image: true, role: true, bio: true },
  });
}

export async function updateUserRole(id: string, role: Role) {
  return prisma.user.update({ where: { id }, data: { role } });
}

export async function getUserStats() {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const [total, newThisWeek, roleCounts] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: weekAgo } } }),
    prisma.user.groupBy({ by: ["role"], _count: { role: true } }),
  ]);

  const byRole: Record<Role, number> = { USER: 0, MODERATOR: 0, ADMIN: 0 };
  for (const r of roleCounts) byRole[r.role as Role] = r._count.role;

  return { total, newThisWeek, byRole };
}

export async function getPaginatedUsers(page: number) {
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      select: { id: true, name: true, email: true, image: true, role: true, createdAt: true },
      orderBy: { email: "asc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count(),
  ]);
  return { users, total, pageCount: Math.ceil(total / PAGE_SIZE) };
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string; bio?: string }
) {
  return prisma.user.update({ where: { id }, data });
}

import { prisma } from "@/lib/prisma";
import type { Role } from "@/lib/roles";

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
    select: { id: true, name: true, email: true, image: true, role: true },
  });
}

export async function updateUserRole(id: string, role: Role) {
  return prisma.user.update({ where: { id }, data: { role } });
}

export async function updateUserProfile(
  id: string,
  data: { name?: string; image?: string }
) {
  return prisma.user.update({ where: { id }, data });
}

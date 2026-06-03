import { prisma } from "@/lib/prisma";

export async function getUserSessions(userId: string) {
  return prisma.session.findMany({
    where: { userId },
    orderBy: { expires: "desc" },
  });
}

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/auth/session";
import { updateUserRole } from "@/lib/db/user";
import { Roles } from "@/lib/roles";

const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(["USER", "MODERATOR", "ADMIN"]),
});

export async function updateUserRoleAction(formData: FormData): Promise<void> {
  await requireRole(Roles.ADMIN);

  const parsed = updateRoleSchema.safeParse({
    userId: formData.get("userId"),
    role: formData.get("role"),
  });
  if (!parsed.success) throw new Error("Invalid input.");

  await updateUserRole(parsed.data.userId, parsed.data.role);
  revalidatePath("/admin/users");
}

export async function changeUserRole(userId: string, formData: FormData): Promise<void> {
  await requireRole(Roles.ADMIN);

  const role = z.enum(["USER", "MODERATOR", "ADMIN"]).parse(formData.get("role"));
  await updateUserRole(userId, role);
  revalidatePath("/admin/users");
}

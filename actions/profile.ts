"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/session";
import { updateUserProfile } from "@/lib/db/user";

const profileSchema = z.object({
  name: z.string().min(1).max(100),
  bio: z.string().max(500).optional(),
});

export async function updateProfileAction(formData: FormData): Promise<void> {
  const session = await requireAuth();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio") || undefined,
  });
  if (!parsed.success) throw new Error("Invalid input.");

  await updateUserProfile(session.user.id, {
    name: parsed.data.name,
    bio: parsed.data.bio,
  });
  revalidatePath("/profile");
}

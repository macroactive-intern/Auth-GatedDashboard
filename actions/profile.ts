"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs/promises";
import { requireAuth } from "@/lib/auth/session";
import { updateUserProfile } from "@/lib/db/user";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be 50 characters or fewer"),
  bio: z.string().max(200, "Bio must be 200 characters or fewer").optional(),
});

const avatarUrlSchema = z.object({
  imageUrl: z.string().url("Must be a valid URL"),
});

const ALLOWED_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

export async function updateProfile(formData: FormData): Promise<void> {
  const session = await requireAuth();

  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
    bio: formData.get("bio") || undefined,
  });
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  await updateUserProfile(session.user.id, {
    name: parsed.data.name,
    bio: parsed.data.bio,
  });

  revalidatePath("/settings");
  revalidatePath("/profile");
}

export async function updateAvatar(formData: FormData): Promise<void> {
  const session = await requireAuth();
  const userId = session.user.id;

  const file = formData.get("avatar") as File | null;
  const imageUrl = formData.get("imageUrl") as string | null;

  if (file && file.size > 0) {
    const ext = ALLOWED_MIME[file.type];
    if (!ext) throw new Error("Unsupported image type. Use JPEG, PNG, GIF, or WebP.");

    const avatarsDir = path.join(process.cwd(), "public", "avatars");
    await fs.mkdir(avatarsDir, { recursive: true });

    const filename = `${userId}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(path.join(avatarsDir, filename), buffer);

    await updateUserProfile(userId, { image: `/avatars/${filename}` });
  } else if (imageUrl?.trim()) {
    const parsed = avatarUrlSchema.safeParse({ imageUrl: imageUrl.trim() });
    if (!parsed.success) throw new Error("Invalid URL.");
    await updateUserProfile(userId, { image: parsed.data.imageUrl });
  } else {
    throw new Error("Provide an image file or a URL.");
  }

  revalidatePath("/settings");
  revalidatePath("/profile");
}

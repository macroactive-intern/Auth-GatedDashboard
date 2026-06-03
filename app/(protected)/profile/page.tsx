import { requireAuth } from "@/lib/auth/session";
import { getUserById } from "@/lib/db/user";
import { updateProfile } from "@/actions/profile";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await requireAuth();
  const user = await getUserById(session.user.id);

  if (!user) return null;

  const { name, email, image, role, bio } = user;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Profile</h1>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-6 dark:border-zinc-800 dark:bg-zinc-900">
          {/* Avatar + identity */}
          <div className="flex items-center gap-4">
            {image ? (
              <Image
                src={image}
                alt={name ?? "Avatar"}
                width={72}
                height={72}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-zinc-200 text-2xl font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                {(name ?? email ?? "?")[0].toUpperCase()}
              </div>
            )}
            <div className="space-y-1">
              <p className="font-semibold text-zinc-900 dark:text-white">
                {name ?? "No name set"}
              </p>
              <p className="text-sm text-zinc-500">{email}</p>
              <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {role}
              </span>
            </div>
          </div>

          {/* Bio display */}
          {bio && (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 pt-4 dark:border-zinc-800">
              {bio}
            </p>
          )}

          {/* Edit form */}
          <form action={updateProfile} className="space-y-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Display name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={name ?? ""}
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                defaultValue={bio ?? ""}
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

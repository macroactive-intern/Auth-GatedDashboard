import { requireAuth } from "@/lib/auth/session";
import { updateProfileAction } from "@/actions/profile";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await requireAuth();
  const { name, email, image } = session.user;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Profile</h1>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mb-6 flex items-center gap-4">
            {image && (
              <Image
                src={image}
                alt={name ?? "Avatar"}
                width={64}
                height={64}
                className="rounded-full"
              />
            )}
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white">
                {name ?? "No name set"}
              </p>
              <p className="text-sm text-zinc-500">{email}</p>
            </div>
          </div>

          <form action={updateProfileAction} className="space-y-4">
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

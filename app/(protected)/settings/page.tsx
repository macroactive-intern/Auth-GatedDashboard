import { requireAuth } from "@/lib/auth/session";
import { getUserById } from "@/lib/db/user";
import { getLinkedProviders } from "@/lib/db/account";
import { getUserSessions } from "@/lib/db/session";
import { updateProfile, updateAvatar } from "@/actions/profile";
import { signOutAction, signOutOtherSessions } from "@/actions/sessions";
import { cookies } from "next/headers";
import Image from "next/image";

const PROVIDER_LABELS: Record<string, string> = {
  github: "GitHub",
  google: "Google",
};

const SESSION_COOKIES = ["authjs.session-token", "__Secure-authjs.session-token"];

export default async function SettingsPage() {
  const session = await requireAuth();
  const cookieStore = await cookies();
  const currentToken = SESSION_COOKIES.map((name) => cookieStore.get(name)?.value).find(Boolean);

  const [user, providers, sessions] = await Promise.all([
    getUserById(session.user.id),
    getLinkedProviders(session.user.id),
    getUserSessions(session.user.id),
  ]);

  if (!user) return null;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Settings</h1>

        {/* Profile */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Profile</h2>
          <form action={updateProfile} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Display name <span className="text-zinc-400 font-normal">(2–50 chars)</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                defaultValue={user.name ?? ""}
                minLength={2}
                maxLength={50}
                required
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Bio <span className="text-zinc-400 font-normal">(max 200 chars)</span>
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                maxLength={200}
                defaultValue={user.bio ?? ""}
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Save profile
            </button>
          </form>
        </section>

        {/* Avatar */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Avatar</h2>
          <div className="flex items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name ?? "Avatar"}
                width={64}
                height={64}
                className="rounded-full"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200 text-xl font-semibold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                {(user.name ?? user.email ?? "?")[0].toUpperCase()}
              </div>
            )}
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Upload an image or paste a URL
            </p>
          </div>
          <form action={updateAvatar} className="space-y-3">
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Upload image
              </label>
              <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="mt-1 block w-full text-sm text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-100 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-zinc-700 hover:file:bg-zinc-200 dark:file:bg-zinc-700 dark:file:text-zinc-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
              <span className="text-xs text-zinc-400">or</span>
              <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            </div>
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Avatar URL
              </label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                placeholder="https://..."
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-400 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Update avatar
            </button>
          </form>
        </section>

        {/* Linked accounts */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Linked accounts</h2>
          <ul className="space-y-2">
            {(["github", "google"] as const).map((provider) => {
              const linked = providers.includes(provider);
              return (
                <li key={provider} className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800">
                  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    {PROVIDER_LABELS[provider]}
                  </span>
                  <span className={`text-xs font-medium ${linked ? "text-emerald-600 dark:text-emerald-400" : "text-zinc-400"}`}>
                    {linked ? "Connected" : "Not connected"}
                  </span>
                </li>
              );
            })}
          </ul>
          <a
            href="/login"
            className="inline-block rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Link another provider
          </a>
        </section>

        {/* Sessions */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Sessions</h2>
          <ul className="space-y-2">
            {sessions.map((s) => {
              const isCurrent = s.sessionToken === currentToken;
              return (
                <li key={s.sessionToken} className="flex items-center justify-between rounded-lg border border-zinc-100 px-4 py-3 dark:border-zinc-800">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {isCurrent ? "Current session" : "Session"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-0.5">
                      Expires {new Date(s.expires).toLocaleDateString()}
                    </p>
                  </div>
                  {isCurrent && (
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Active</span>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="flex gap-3">
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Sign out
              </button>
            </form>
            {sessions.length > 1 && (
              <form action={signOutOtherSessions}>
                <button
                  type="submit"
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  Sign out other sessions ({sessions.length - 1})
                </button>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

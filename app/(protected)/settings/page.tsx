import { requireAuth } from "@/lib/auth/session";
import { signOutAction } from "@/actions/sessions";
import Link from "next/link";

export default async function SettingsPage() {
  const session = await requireAuth();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Settings</h1>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 space-y-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white">Account</h2>
          <p className="text-sm text-zinc-500">
            Signed in as{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-300">
              {session.user.email}
            </span>
          </p>
          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Back to dashboard
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

import { requireRole } from "@/lib/auth/session";
import { getUserStats } from "@/lib/db/user";
import Link from "next/link";

export default async function AdminPage() {
  const session = await requireRole("ADMIN");
  const stats = await getUserStats();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Admin</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Signed in as {session.user.email}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total users</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">New this week</p>
            <p className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">{stats.newThisWeek}</p>
          </div>
        </div>

        {/* Role breakdown */}
        <section className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="font-semibold text-zinc-900 dark:text-white mb-4">Role breakdown</h2>
          <ul className="space-y-3">
            {(["USER", "MODERATOR", "ADMIN"] as const).map((role) => (
              <li key={role} className="flex items-center justify-between">
                <span className="text-sm text-zinc-700 dark:text-zinc-300">{role}</span>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                  {stats.byRole[role]}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Navigation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/users"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
          >
            <h2 className="font-semibold text-zinc-900 dark:text-white">User Management</h2>
            <p className="mt-1 text-sm text-zinc-500">View and manage user roles</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

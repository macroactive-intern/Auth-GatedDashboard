import { requireAuth } from "@/lib/auth/session";
import { isAdmin } from "@/lib/roles";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await requireAuth();
  const { name, email, role } = session.user;

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back, {name ?? email}
            </p>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isAdmin(role)
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {role}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/profile"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="font-semibold text-zinc-900 dark:text-white">Profile</h2>
            <p className="mt-1 text-sm text-zinc-500">Update your name and avatar</p>
          </Link>
          <Link
            href="/settings"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="font-semibold text-zinc-900 dark:text-white">Settings</h2>
            <p className="mt-1 text-sm text-zinc-500">Manage your account</p>
          </Link>
          {isAdmin(role) && (
            <Link
              href="/admin"
              className="rounded-xl border border-amber-200 bg-amber-50 p-6 transition hover:border-amber-300 dark:border-amber-800 dark:bg-amber-950"
            >
              <h2 className="font-semibold text-amber-900 dark:text-amber-200">Admin Panel</h2>
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-400">
                Manage users and roles
              </p>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

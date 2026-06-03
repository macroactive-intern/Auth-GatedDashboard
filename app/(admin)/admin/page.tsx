import { requireRole } from "@/lib/auth/session";
import Link from "next/link";

export default async function AdminPage() {
  await requireRole("ADMIN");

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Admin</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">System administration</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Link
            href="/admin/users"
            className="rounded-xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <h2 className="font-semibold text-zinc-900 dark:text-white">User Management</h2>
            <p className="mt-1 text-sm text-zinc-500">View and manage user roles</p>
          </Link>
        </div>
      </div>
    </main>
  );
}

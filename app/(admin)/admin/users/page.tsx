import { requireRole } from "@/lib/auth/session";
import { getPaginatedUsers } from "@/lib/db/user";
import { changeUserRole } from "@/actions/admin";
import Link from "next/link";

export default async function AdminUsersPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await requireRole("ADMIN");
  const params = await props.searchParams;
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const { users, pageCount } = await getPaginatedUsers(page);

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Users</h1>
          <Link
            href="/admin"
            className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
          >
            ← Admin
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Name</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Email</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Role</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Joined</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Change role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {users.map((user) => {
                const action = changeUserRole.bind(null, user.id);
                return (
                  <tr key={user.id}>
                    <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white">
                      {user.name ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">{user.email}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                            : user.role === "MODERATOR"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {user.id !== session.user.id ? (
                        <form action={action} className="flex items-center gap-2">
                          <select
                            name="role"
                            defaultValue={user.role}
                            className="rounded-lg border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          >
                            <option value="USER">USER</option>
                            <option value="MODERATOR">MODERATOR</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                          <button
                            type="submit"
                            className="rounded-lg bg-zinc-900 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                          >
                            Apply
                          </button>
                        </form>
                      ) : (
                        <span className="text-xs text-zinc-400">You</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">
              Page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/users?page=${page - 1}`}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Previous
                </Link>
              )}
              {page < pageCount && (
                <Link
                  href={`/admin/users?page=${page + 1}`}
                  className="rounded-lg border border-zinc-200 px-3 py-1.5 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

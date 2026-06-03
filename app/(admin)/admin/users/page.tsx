import { requireRole } from "@/lib/auth/session";
import { getAllUsers } from "@/lib/db/user";
import { updateUserRoleAction } from "@/actions/admin";
import Image from "next/image";

export default async function AdminUsersPage() {
  const session = await requireRole("ADMIN");
  const users = await getAllUsers();

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Users</h1>

        <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-sm">
            <thead className="border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">User</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Role</th>
                <th className="px-6 py-3 text-left font-medium text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.image && (
                        <Image
                          src={user.image}
                          alt={user.name ?? ""}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {user.name ?? "—"}
                        </p>
                        <p className="text-zinc-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                          : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.id !== session.user.id && (
                      <form action={updateUserRoleAction}>
                        <input type="hidden" name="userId" value={user.id} />
                        <input
                          type="hidden"
                          name="role"
                          value={user.role === "ADMIN" ? "USER" : "ADMIN"}
                        />
                        <button
                          type="submit"
                          className="text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                        >
                          {user.role === "ADMIN" ? "Revoke admin" : "Make admin"}
                        </button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

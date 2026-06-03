import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 p-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          403 &mdash; You do not have permission to access this page.
        </h1>
        <Link
          href="/dashboard"
          className="inline-block rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}

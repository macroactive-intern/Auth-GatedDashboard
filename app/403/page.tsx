import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 p-8">
      <div className="text-center space-y-4">
        <p className="text-6xl font-bold text-zinc-900 dark:text-white">403</p>
        <h1 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300">
          Access Denied
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          You don&apos;t have permission to view this page.
        </p>
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

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Auth Dashboard
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Role-based access control with GitHub and Google OAuth.
        </p>
        <Link
          href="/login"
          className="inline-block rounded-lg bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          Sign in to get started
        </Link>
      </div>
    </main>
  );
}

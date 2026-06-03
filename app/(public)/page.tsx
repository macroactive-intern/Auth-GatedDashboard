import Link from "next/link";

const navLinks = [
  { href: "/login", label: "Login" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/settings", label: "Settings" },
  { href: "/admin", label: "Admin" },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Auth Dashboard
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Role-based access control with GitHub and Google OAuth.
          </p>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}

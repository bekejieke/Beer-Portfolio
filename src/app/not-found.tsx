import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-slate-300">
      <div className="max-w-md">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-100">Page not found</h1>
        <p className="mt-4 leading-7 text-slate-400">
          This portfolio page is not available yet. Return to the homepage to continue browsing the shell.
        </p>
        <Link
          className="mt-8 inline-flex rounded-sm border border-slate-700 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-teal-300/70 hover:text-teal-200"
          href="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 className="text-7xl font-bold text-primary">404</h1>

      <h2 className="mt-4 text-3xl font-semibold">Page not found</h2>

      <p className="mt-2 max-w-md text-placeholder">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        href="/"
        className="mt-8 rounded-md bg-primary px-6 py-3 text-dark-200 transition hover:opacity-90"
      >
        Go Home
      </Link>
    </main>
  );
}

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold text-red-500">Something went wrong</h1>

      <p className="mt-4 max-w-md text-placeholder">
        An unexpected error occurred while loading this page.
      </p>

      <button
        onClick={reset}
        className="mt-8 rounded-md bg-primary px-6 py-3 text-dark-200"
      >
        Try Again
      </button>
    </main>
  );
}

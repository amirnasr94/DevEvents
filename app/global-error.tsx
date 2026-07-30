"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">Application Error</h1>

          <p className="mt-3">Something went wrong. {error.message}</p>

          <button
            onClick={reset}
            className="mt-6 rounded-md bg-primary px-5 py-2"
          >
            Reload
          </button>
        </main>
      </body>
    </html>
  );
}

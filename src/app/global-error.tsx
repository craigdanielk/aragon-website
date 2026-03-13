"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-300 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-lg mb-4">Something went wrong</h2>
          <button
            onClick={() => reset()}
            className="text-sm font-mono text-neutral-500 hover:text-neutral-300"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

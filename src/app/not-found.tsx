import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="text-6xl font-bold text-neutral-100 font-mono mb-4">
        404
      </h1>
      <p className="text-lg text-neutral-400 mb-8">
        Page not found. The route you requested does not exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 text-base font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

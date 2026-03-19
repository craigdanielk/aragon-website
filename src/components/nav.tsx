"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "/blog", label: "Blog" },
  { href: "/conversations", label: "Conversations" },
  { href: "/builds", label: "What I've Built" },
  { href: "/workflows", label: "Workflows" },
  { href: "/agents", label: "Agents" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-base tracking-wider text-neutral-400 hover:text-[var(--accent-green)] transition-colors"
        >
          A.R.A.G.O.N.
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base transition-colors ${
                pathname.startsWith(link.href)
                  ? "text-[var(--accent-blue-hover)]"
                  : "text-neutral-500 hover:text-neutral-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/consultation"
            className="ml-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors"
          >
            Start Discovery
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 10H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M3 15H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--background)]">
          <div className="px-6 py-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-base py-1 transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-[var(--accent-blue-hover)]"
                    : "text-neutral-500 hover:text-neutral-200"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors text-center"
            >
              Start Discovery
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

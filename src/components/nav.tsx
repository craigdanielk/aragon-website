"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";

type ChildLink = { href: string; label: string };
type NavItem =
  | { href: string; label: string; children?: never }
  | { href?: never; label: string; children: ChildLink[] };

const navItems: NavItem[] = [
  {
    label: "Blogs",
    children: [
      { href: "/blog", label: "Agent Blogs" },
      { href: "/conversations", label: "Conversations with Claude" },
      { href: "/about", label: "About" },
    ],
  },
  { href: "/builds", label: "Builds" },
  { href: "/architecture", label: "Architecture" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogsExpanded, setBlogsExpanded] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

  // Check if any child of Blogs is active
  const blogsChildren = (navItems[0] as { label: string; children: ChildLink[] }).children;
  const blogsActive = blogsChildren.some((c) => pathname.startsWith(c.href));

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
          {navItems.map((item) => {
            if (item.children) {
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 text-base transition-colors ${
                      blogsActive
                        ? "text-[var(--accent-blue-hover)]"
                        : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                    }`}
                    aria-haspopup="true"
                    aria-expanded={desktopDropdownOpen}
                  >
                    <span>{item.label}</span>
                    {/* Chevron */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform duration-200 ${
                        desktopDropdownOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M2 4L6 8L10 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dropdown panel — pt-2 instead of mt-2 keeps hover area continuous */}
                  <div
                    className={`absolute top-full left-0 pt-2 min-w-[200px] transition-all duration-150 ${
                      desktopDropdownOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                    style={{ transformOrigin: "top left" }}
                  >
                    <div className="border border-[var(--border)] bg-[var(--surface-elevated)] rounded-sm font-mono text-sm">
                      {item.children.map((child, idx) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 transition-colors ${
                            idx !== item.children.length - 1
                              ? "border-b border-[var(--border)]"
                              : ""
                          } ${
                            pathname.startsWith(child.href)
                              ? "text-[var(--accent-blue-hover)] bg-[var(--surface)]"
                              : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-base transition-colors ${
                  pathname.startsWith(item.href)
                    ? "text-[var(--accent-blue-hover)]"
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
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
            className="p-2 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              {mobileOpen ? (
                <path
                  d="M4 4L16 16M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
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
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => {
              if (item.children) {
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => setBlogsExpanded(!blogsExpanded)}
                      className={`w-full flex items-center justify-between py-2 text-base transition-colors ${
                        blogsActive
                          ? "text-[var(--accent-blue-hover)]"
                          : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                      }`}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className={`transition-transform duration-200 ${
                          blogsExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <path
                          d="M2 4L6 8L10 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {blogsExpanded && (
                      <div className="ml-4 border-l border-[var(--border)] pl-3 flex flex-col gap-1 mb-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={`py-1.5 text-sm font-mono transition-colors ${
                              pathname.startsWith(child.href)
                                ? "text-[var(--accent-blue-hover)]"
                                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 text-base transition-colors ${
                    pathname.startsWith(item.href)
                      ? "text-[var(--accent-blue-hover)]"
                      : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mt-3 px-4 py-2 text-sm font-medium rounded-md bg-[var(--accent-blue)] text-white hover:bg-[var(--accent-blue-hover)] transition-colors text-center"
            >
              Start Discovery
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

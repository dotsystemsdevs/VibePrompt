"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/workflow", label: "Workflow" },
  { href: "/browse", label: "Prompts" },
  { href: "/awesome", label: "Awesome" },
  { href: "/about", label: "About" },
];

const GITHUB_URL = "https://github.com/dotsystemsdevs/VibePrompt";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/15 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-75">
          vibeprompt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs transition-colors hover:text-foreground"
                style={{ color: active ? "var(--lilac)" : "var(--muted-foreground)" }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden px-4 py-1.5 text-xs font-medium transition-opacity hover:opacity-85 sm:inline-flex"
            style={{ backgroundColor: "var(--accent-blue)", color: "#ffffff" }}
          >
            Submit to GitHub
          </a>
          <button className="md:hidden text-muted-foreground" onClick={() => setOpen(!open)}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-foreground/15 px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-4 text-xs">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="transition-colors hover:text-foreground"
                  style={{ color: active ? "var(--lilac)" : "var(--muted-foreground)" }}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}

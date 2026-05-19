"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/workflow", label: "Workflow" },
  { href: "/browse", label: "Prompts" },
  { href: "/awesome", label: "Awesome" },
  { href: "/articles", label: "Articles" },
  { href: "/scan", label: "Scan" },
];

const GITHUB_URL = "https://github.com/dotsystemsdevs/vibeprompt";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-foreground/12 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-70">
          <Image src="/favicon.svg" alt="vibeprompt logo" width={20} height={20} className="rounded-sm" />
          <span className="text-sm font-semibold tracking-tight text-foreground">vibeprompt</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-xs transition-colors ${
                  active
                    ? "font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground/90"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="vibeprompt on GitHub (opens in new tab)"
            className="hidden border border-foreground/20 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-white/[0.05] sm:inline-flex"
          >
            GitHub ↗
          </a>
          <button type="button" className="p-2 -mr-2 text-muted-foreground md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-foreground/12 px-6 pb-5 pt-4 md:hidden">
          <div className="flex flex-col gap-4 text-xs">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href || pathname.startsWith(l.href + "/");
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    active ? "font-medium text-foreground" : "text-muted-foreground hover:text-foreground"
                  }
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              );
            })}
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-foreground/20 px-3 py-2 text-center font-medium text-foreground"
              onClick={() => setOpen(false)}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

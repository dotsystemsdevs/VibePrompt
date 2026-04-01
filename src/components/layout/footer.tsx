"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="border-t border-foreground/15">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-tight text-foreground">vibeprompt</p>
            <p className="mt-1 text-xs text-muted-foreground">Open source prompt library for vibe coders.</p>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-muted-foreground">
            <Link href="/browse" className="transition-colors hover:text-foreground">Prompts</Link>
            <Link href="/workflow" className="transition-colors hover:text-foreground">Workflow</Link>
            <Link href="/awesome" className="transition-colors hover:text-foreground">Awesome</Link>
            <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
            <a
              href="https://github.com/dotsystemsdevs/VibePrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
              style={{ color: "var(--lilac)" }}
            >
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

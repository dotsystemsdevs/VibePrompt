"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

const GITHUB_URL = "https://github.com/dotsystemsdevs/VibePrompt";

type FooterContributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
};

type ApiContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
};

export function Footer() {
  const pathname = usePathname();
  const compact = pathname === "/";

  const showContributorStrip = useMemo(() => {
    if (pathname === "/") return true;
    if (pathname === "/browse") return true;
    if (pathname.startsWith("/prompts/")) return true;
    if (pathname === "/workflow") return true;
    if (pathname === "/awesome") return true;
    return false;
  }, [pathname]);

  const [contributors, setContributors] = useState<FooterContributor[] | null>(null);

  useEffect(() => {
    if (!showContributorStrip) {
      setContributors(null);
      return;
    }

    // Prompt detail page: use server-resolved contributor from data-* attributes
    if (pathname.startsWith("/prompts/")) {
      const el = document.querySelector("[data-footer-contributor-login]") as HTMLElement | null;
      const login = el?.dataset.footerContributorLogin;
      const avatarUrl = el?.dataset.footerContributorAvatar;
      const profileUrl = el?.dataset.footerContributorUrl;
      if (login && avatarUrl && profileUrl) {
        setContributors([{ login, avatarUrl, profileUrl }]);
      } else {
        setContributors(null);
      }
      return;
    }

    // Repo contributors for workflow/awesome/browse (cached in sessionStorage)
    const cacheKey = "vp_repo_contrib_v1";
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached) as { at: number; items: FooterContributor[] };
        if (Date.now() - parsed.at < 60 * 60 * 1000 && Array.isArray(parsed.items)) {
          setContributors(parsed.items);
          return;
        }
      }
    } catch {
      // ignore
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("https://api.github.com/repos/dotsystemsdevs/VibePrompt/contributors?per_page=30");
        if (!res.ok) throw new Error("bad_status");
        const data = (await res.json()) as ApiContributor[];
        const items: FooterContributor[] = (Array.isArray(data) ? data : [])
          .filter((c) => typeof c?.login === "string" && c.login.length > 0)
          .slice(0, 18)
          .map((c) => ({ login: c.login, avatarUrl: c.avatar_url, profileUrl: c.html_url }));
        if (cancelled) return;
        setContributors(items);
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), items }));
        } catch {
          // ignore
        }
      } catch {
        if (!cancelled) setContributors(null);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pathname, showContributorStrip]);

  return (
    <footer className={`shrink-0 border-t border-foreground/12 ${compact ? "bg-background" : ""}`}>

      {/* Bottom links */}
      <div className={`mx-auto max-w-6xl px-6 ${compact ? "py-4" : "py-10"}`}>
        {compact ? (
          <div className="flex items-center justify-between gap-4">
            {showContributorStrip && contributors && contributors.length > 0 ? (
              <div className="flex items-center gap-2.5">
                <div className="flex items-center">
                  {contributors.slice(0, 8).map((c, i) => (
                    <a
                      key={c.login}
                      href={c.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={c.login}
                      className="relative block transition-transform hover:z-10 hover:scale-110"
                      style={{ marginLeft: i === 0 ? 0 : "-7px" }}
                    >
                      <Image
                        src={c.avatarUrl}
                        alt={c.login}
                        width={24}
                        height={24}
                        className="rounded-full border border-background"
                      />
                    </a>
                  ))}
                </div>
                <a
                  href={`${GITHUB_URL}/graphs/contributors`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-foreground/30 transition-colors hover:text-foreground/60"
                >
                  {contributors.length} contributor{contributors.length !== 1 ? "s" : ""} ↗
                </a>
              </div>
            ) : <div />}
            <div className="flex items-center gap-3 text-[11px]">
              <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
              <span className="text-foreground/20">·</span>
              <Link href="/privacy" className="text-muted-foreground transition-colors hover:text-foreground">Privacy</Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-tight text-foreground">vibeprompt</p>
              <p className="mt-1 text-xs text-muted-foreground">Prompts, resources, and tools for vibe coders.</p>
              {showContributorStrip && contributors && contributors.length > 0 && (
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center">
                    {contributors.slice(0, 8).map((c, i) => (
                      <a
                        key={c.login}
                        href={c.profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={c.login}
                        className="relative block transition-transform hover:z-10 hover:scale-110"
                        style={{ marginLeft: i === 0 ? 0 : "-7px" }}
                      >
                        <Image
                          src={c.avatarUrl}
                          alt={c.login}
                          width={24}
                          height={24}
                          className="rounded-full border border-background"
                        />
                      </a>
                    ))}
                  </div>
                  <a
                    href={`${GITHUB_URL}/graphs/contributors`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-foreground/30 transition-colors hover:text-foreground/60"
                  >
                    {contributors.length} contributor{contributors.length !== 1 ? "s" : ""} ↗
                  </a>
                </div>
              )}
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Link href="/about" className="transition-colors hover:text-foreground">About</Link>
              <span className="mx-2 text-foreground/20">·</span>
              <Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link>
            </div>
          </div>
        )}
      </div>
    </footer>
  );
}

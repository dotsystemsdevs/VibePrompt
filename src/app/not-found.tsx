import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not found · vibeprompt",
  description: "The page you're looking for doesn't exist. Try the workflow, prompts, or articles instead.",
  robots: { index: false, follow: true },
};

const SUGGESTIONS = [
  {
    href: "/workflow",
    label: "The 9-step workflow",
    description: "From raw idea to shipped. Interactive checklists, save your progress.",
  },
  {
    href: "/browse",
    label: "Prompt library",
    description: "Battle-tested prompts for Claude Code, Cursor, Windsurf.",
  },
  {
    href: "/articles",
    label: "Deep-dive articles & fixes",
    description: "TestFlight, ASO, conversion, vibe coding mistakes. Field-tested problems and the tactical answer for each.",
  },
  {
    href: "/awesome",
    label: "Tools & resources",
    description: "Curated picks. MCP servers, agents, CLIs, no affiliates.",
  },
  {
    href: "/scan",
    label: "Audit a live site",
    description: "Paste any URL. SEO, security, conversion, AI discoverability.",
  },
];

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
        404
      </p>
      <h1 className="mb-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
        Page not found.
      </h1>
      <p className="mb-10 max-w-xl text-sm leading-relaxed text-foreground/55">
        That URL doesn&apos;t lead anywhere. The page was renamed, deleted, or never
        existed. Try one of these instead:
      </p>

      <ul className="border border-foreground/15 overflow-hidden">
        {SUGGESTIONS.map((s, i) => (
          <li key={s.href} className={i > 0 ? "border-t border-foreground/[0.08]" : ""}>
            <Link
              href={s.href}
              className="group flex items-baseline justify-between gap-4 px-5 py-4 sm:px-6 transition-colors hover:bg-foreground/[0.03]"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-foreground/85 group-hover:text-foreground transition-colors">
                  {s.label}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-foreground/45">
                  {s.description}
                </p>
              </div>
              <span className="shrink-0 text-foreground/30 transition-colors group-hover:text-foreground/70">→</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-10 text-[11px] text-foreground/35">
        Or{" "}
        <Link href="/" className="underline decoration-foreground/30 hover:decoration-foreground hover:text-foreground/65 transition-colors">
          start at the homepage
        </Link>
        .
      </p>
    </main>
  );
}

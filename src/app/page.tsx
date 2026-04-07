import Link from "next/link";
import { getPromptLibrary } from "@/lib/prompt-library";

const GITHUB_URL = "https://github.com/dotsystemsdevs/VibePrompt";

const FEATURES = [
  {
    label: "Copy in one click",
    body: "No login, no friction. Every prompt is ready to paste into your AI tool of choice.",
    icon: "M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184",
    soon: false,
  },
  {
    label: "Stage by stage",
    body: "From agent setup to post-launch ops — every phase of the vibe coding workflow covered.",
    icon: "M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5",
    soon: false,
  },
  {
    label: "Community sourced",
    body: "Every prompt is battle-tested by real builders. Submit via GitHub PR to add your own.",
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z",
    soon: false,
  },
  {
    label: "Personal library",
    body: "Save the prompts you use most and access them from any device, any session.",
    icon: "M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z",
    soon: true,
  },
];

export default async function HomePage() {
  await getPromptLibrary();

  return (
    <div className="flex h-svh flex-col pt-12">

      {/* Hero */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-[10px] uppercase tracking-[0.22em] text-foreground/35">
          Open source · Community built
        </p>

        <h1
          className="font-bold leading-[1.02] tracking-[-0.04em]"
          style={{
            fontFamily: "var(--font-geist-sans)",
            fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
          }}
        >
          Everything you need<br />to ship with AI.
        </h1>

        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground/45">
          Prompts, workflow, and tools — the complete kit for vibe coders who build real products.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ backgroundColor: "var(--accent-blue)" }}
          >
            Get started →
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-foreground/40 transition-colors hover:text-foreground"
          >
            Contribute a prompt ↗
          </a>
        </div>
      </div>

      {/* Value cards */}
      <div className="px-6 pb-12">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-4">
          {FEATURES.map(({ label, body, icon, soon }) => (
            <div
              key={label}
              className="relative flex flex-col justify-between border border-foreground/15 bg-foreground/[0.04] px-6 py-6"
            >
              {soon && (
                <span className="absolute right-3 top-3 border border-foreground/15 px-1.5 py-0.5 text-[8px] uppercase tracking-widest text-foreground/30">
                  Coming soon
                </span>
              )}
              <svg
                className="mb-5 h-5 w-5 text-foreground/80"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
              </svg>
              <div>
                <p className="text-sm font-semibold text-foreground/90">{label}</p>
                <p className="mt-2 text-xs leading-relaxed text-foreground/40">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

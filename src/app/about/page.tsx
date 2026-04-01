import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";

export const metadata = {
  title: "About — VibePrompt",
  description: "VibePrompt is an open-source prompt library and toolkit for vibe coders who ship.",
};

export default function AboutPage() {
  return (
    <div className="pt-12">
      <Hero
        title={"Built for builders\nwho ship."}
        description="VibePrompt is an open-source toolkit for vibe coders — the people who use AI to build and launch real products."
        accent="#ffffff"
      />

      <div className="mx-auto max-w-6xl px-6">
        <section className="border-t border-foreground/20 py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[160px_1fr]">
            <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/35 md:pt-0.5">Why</p>
            <div className="max-w-2xl space-y-5 text-sm leading-[1.9] text-foreground/55">
              <p>
                I had prompts in Notion, some in notes apps, some saved as bookmarks, some buried in old chats.
                Every time I started a new project I'd spend the first hour hunting for the same things.
                I wanted one place — just the prompts that actually work, organized by when you need them.
                Solo project, open source, anyone can contribute via GitHub.
              </p>
              <a
                href="mailto:dot.systems@proton.me"
                className="inline-block text-sm text-foreground/40 underline underline-offset-4 transition-colors hover:text-foreground"
              >
                dot.systems@proton.me
              </a>
            </div>
          </div>
        </section>

        <GithubCta
          title={"Want to\ncontribute?"}
          description="Open a pull request. New prompts, workflow improvements, tool additions — all welcome."
          primaryHref="https://github.com/dotsystemsdevs/VibePrompt"
          primaryLabel="Open a PR on GitHub"
        />
      </div>
    </div>
  );
}

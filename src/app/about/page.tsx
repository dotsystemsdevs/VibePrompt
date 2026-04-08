import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";

export const metadata = {
  title: "About | VibePrompt",
  description: "VibePrompt is an open-source prompt library and toolkit for vibe coders who ship.",
};

export default function AboutPage() {
  return (
    <div className="pt-12">
      <Hero
        title={"Built for builders\nwho ship."}
        description="VibePrompt is an open-source toolkit for vibe coders, the people who use AI to build and launch real products."
        accent="#ffffff"
      />

      <div className="mx-auto max-w-6xl px-6">
        <section className="border-t border-foreground/20 py-12 sm:py-16">
          <a
            href="mailto:dot.systems@proton.me"
            className="inline-block text-sm text-foreground/40 underline underline-offset-4 transition-colors hover:text-foreground"
          >
            dot.systems@proton.me
          </a>
        </section>

        <GithubCta
          title={"Want to\ncontribute?"}
          description="Open a pull request. New prompts, workflow improvements, tool additions, all welcome."
          primaryHref="https://github.com/dotsystemsdevs/VibePrompt"
          primaryLabel="Open a PR on GitHub"
        />
      </div>
    </div>
  );
}

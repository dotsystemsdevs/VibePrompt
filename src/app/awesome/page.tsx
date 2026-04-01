import { AwesomeClient } from "@/components/awesome/awesome-client";
import { AWESOME_CATEGORIES } from "@/lib/awesome-data";
import { GithubCta } from "@/components/cta/github-cta";
import { Hero } from "@/components/hero/hero";

export const metadata = {
  title: "Awesome Vibe Coding — VibePrompt",
  description: "A curated list of tools, platforms, and resources for AI-first builders.",
};

export default function AwesomePage() {
  const totalItems = AWESOME_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="pt-12">
      {/* Header */}
      <Hero
        title={"Tools that\nvibe coders actually use."}
        description={`${totalItems} curated tools, platforms, and resources — no bloat, no affiliates.`}
        accent="#ffffff"
      />

      <div className="mx-auto max-w-6xl pt-6">
        <AwesomeClient categories={AWESOME_CATEGORIES} />
        <GithubCta
          title={"Know a tool\nwe're missing?"}
          description="Open a PR. If it belongs here, it goes in."
          accent="#ffffff"
          primaryHref="https://github.com/dotsystemsdevs/VibePrompt"
          primaryLabel="Submit on GitHub"
        />
      </div>
    </div>
  );
}

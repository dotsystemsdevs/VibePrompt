import { AwesomeClient } from "@/components/awesome/awesome-client";
import { AWESOME_CATEGORIES } from "@/lib/awesome-data";
import { GithubCta } from "@/components/cta/github-cta";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";

export const metadata = {
  title: "Awesome Vibe Coding — Tools & Resources for AI Builders | VibePrompt",
  description: "Curated list of tools, AI coding platforms, and resources for vibe coders. No bloat, no affiliates — just what actually works.",
  alternates: { canonical: "/awesome" },
  openGraph: {
    title: "Awesome Vibe Coding — Tools for AI Builders",
    description: "Curated tools, platforms, and resources for vibe coders. No bloat, no affiliates.",
    url: "https://vibeprompt.tech/awesome",
  },
};

export default async function AwesomePage() {
  const totalItems = AWESOME_CATEGORIES.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Tools that\nvibe coders actually use."}
          description={`${totalItems} curated tools, platforms, and resources, no bloat, no affiliates.`}
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl pt-6">
        <AwesomeClient categories={AWESOME_CATEGORIES} />
        <Reveal>
          <GithubCta
            title={"Know a tool\nwe're missing?"}
            description="Suggest it in two minutes. If it belongs here, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/VibePrompt/issues/new?template=suggest-tool.yml"
            primaryLabel="Suggest a tool"
            secondaryHref="https://github.com/dotsystemsdevs/VibePrompt"
            secondaryLabel="Submit a PR instead"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}

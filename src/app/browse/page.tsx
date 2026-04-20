import { BrowseClient } from "@/components/prompts/browse-client";
import { getPromptLibrary } from "@/lib/prompt-library";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-static";

export default async function BrowsePage() {
  const { categories, prompts } = await getPromptLibrary();

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Prompts that\nactually ship."}
          description={`${prompts.length} battle-tested prompts, organized by stage, ready to copy.`}
          accent="#ffffff"
        />
      </Reveal>
      <div className="mx-auto max-w-6xl pt-6">
        <Suspense fallback={<div className="px-6 py-10 text-sm text-muted-foreground">Loading prompts...</div>}>
          <BrowseClient categories={categories} prompts={prompts} />
        </Suspense>
        <Reveal>
          <GithubCta
            title={"Got a prompt\nthat ships?"}
            description="Used a prompt that actually worked? Submit it. If it's battle-tested, it gets in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/VibePrompt/issues/new?template=suggest-prompt.yml"
            primaryLabel="Suggest a prompt"
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

import { BrowseClient } from "@/components/prompts/browse-client";
import { getPromptLibrary } from "@/lib/prompt-library";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Suspense } from "react";

export const dynamic = "force-static";

export default async function BrowsePage() {
  const { categories, prompts } = await getPromptLibrary();

  return (
    <div className="pt-12">
      <Hero
        title={"Prompts that\nactually ship."}
        description={`${prompts.length} battle-tested prompts — organized by stage, ready to copy.`}
        accent="#ffffff"
      />
      <div className="mx-auto max-w-6xl pt-6">
        <Suspense fallback={<div className="px-6 py-10 text-sm text-muted-foreground">Loading prompts...</div>}>
          <BrowseClient categories={categories} prompts={prompts} />
        </Suspense>
        <GithubCta
          title={"Got a prompt\nthat ships?"}
          description="Submit a pull request. If it's battle-tested and useful, it gets in."
          accent="#ffffff"
          primaryHref="https://github.com/dotsystemsdevs/VibePrompt"
          primaryLabel="Submit on GitHub"
        />
      </div>
    </div>
  );
}

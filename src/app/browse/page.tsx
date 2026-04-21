import type { Metadata } from "next";
import { BrowseClient } from "@/components/prompts/browse-client";
import { getPromptLibrary } from "@/lib/prompt-library";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Suspense } from "react";
import { Reveal } from "@/components/motion/reveal";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "AI Prompt Library | 40 Prompts for Vibe Coders — VibePrompt",
  description:
    "Browse 40 free, copy-ready AI prompts for every stage of your build: context setup, PRD writing, code review, shipping, and more.",
  alternates: { canonical: "/browse" },
  openGraph: {
    title: "AI Prompt Library — 40 Prompts for Vibe Coders",
    description: "Copy-ready prompts for context, PRD, build, quality, and ship. Free and open source.",
    url: "https://vibeprompt.tech/browse",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

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
        <Suspense fallback={<div className="border border-foreground/20 overflow-hidden" style={{ minHeight: "640px" }} />}>
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

import { auth } from "@clerk/nextjs/server";
import { getSavedSlugs } from "@/lib/actions/saves";
import { getPromptLibrary } from "@/lib/prompt-library";
import { SignInPrompt } from "@/components/prompts/sign-in-prompt";
import { AWESOME_CATEGORIES } from "@/lib/awesome-data";
import { Hero } from "@/components/hero/hero";
import { LibraryClient } from "@/components/library/library-client";

export default async function LibraryPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="pt-12">
        <Hero
          title={"Your personal\nprompt workspace."}
          description="Save, organize, and reuse the prompts that actually work for you."
          accent="#2563EB"
        />
        <div className="mx-auto max-w-6xl">
          <div className="px-6 py-20 text-center">
            <p className="mb-2 text-sm font-medium text-foreground">Sign in to save prompts</p>
            <p className="mb-8 text-sm text-muted-foreground max-w-sm mx-auto">
              Create a free account to save prompts and access them from any device.
            </p>
            <SignInPrompt />
          </div>
        </div>
      </div>
    );
  }

  const [savedSlugs, { prompts }] = await Promise.all([
    getSavedSlugs(),
    getPromptLibrary(),
  ]);

  const savedPrompts = prompts.filter((p) => savedSlugs.includes(p.slug));

  const savedAwesomeHrefs = savedSlugs
    .filter((s) => s.startsWith("awesome:"))
    .map((s) => {
      try {
        return decodeURIComponent(s.slice("awesome:".length));
      } catch {
        return null;
      }
    })
    .filter((v): v is string => typeof v === "string" && v.length > 0);

  const awesomeByHref: Record<string, { name: string; description: string; href: string; catTitle: string; catEmoji: string }> = {};
  for (const cat of AWESOME_CATEGORIES) {
    for (const item of cat.items) {
      awesomeByHref[item.href] = { ...item, catTitle: cat.title, catEmoji: cat.emoji };
    }
  }

  return (
    <div className="pt-12">
      <Hero
        title={"Your personal\nprompt workspace."}
        description={
          savedPrompts.length === 0
            ? "Save prompts while browsing and they'll live here."
            : `${savedPrompts.length} saved prompt${savedPrompts.length === 1 ? "" : "s"} · ready to use.`
        }
        accent="#2563EB"
      />
      <div className="mx-auto max-w-6xl">
        <LibraryClient
          savedPrompts={savedPrompts}
          savedAwesomeHrefs={savedAwesomeHrefs}
          awesomeByHref={awesomeByHref}
        />
      </div>
    </div>
  );
}

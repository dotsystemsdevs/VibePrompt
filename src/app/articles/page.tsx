import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Articles | VibePrompt",
  description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles, VibePrompt",
    description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
    url: "https://vibeprompt.tech/articles",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"What actually\nworks."}
          description="Practical guides for building with AI, no fluff, no theory."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-6">
        {articles.length === 0 ? (
          <div className="border border-foreground/20 px-8 py-20 text-center">
            <p className="text-sm text-muted-foreground">No articles yet.</p>
          </div>
        ) : (
          <div className="border border-foreground/20 overflow-hidden">
            {articles.map((article, i) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className={`group flex flex-col sm:flex-row gap-0 transition-colors hover:bg-foreground/[0.03] ${i > 0 ? "border-t border-foreground/[0.08]" : ""}`}
              >
                {/* Image */}
                <div className="relative w-full sm:w-64 shrink-0 overflow-hidden" style={{ aspectRatio: "16/9" }}>
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 640px) 100vw, 256px"
                  />
                </div>

                {/* Text */}
                <div className="flex flex-1 flex-col justify-between gap-3 p-5 sm:p-6">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35 mb-2">
                      {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                    <h2 className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-foreground/30">{article.author}</span>
                    <span className="text-xs text-foreground/25 transition-colors group-hover:text-foreground/60">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Reveal>
          <GithubCta
            title={"Got an article\nidea?"}
            description="Practical guides, lessons learned, or tools that work, if it helps vibe coders ship, suggest it."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/VibePrompt/issues"
            primaryLabel="Suggest an article"
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

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllArticles, CATEGORIES, CATEGORY_LABEL, type Category } from "@/lib/articles";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Articles | vibeprompt",
  description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles, vibeprompt",
    description: "Practical guides and insights for vibe coders, what actually works when building with AI.",
    url: "https://vibeprompt.tech/articles",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

interface ArticlesPageProps {
  searchParams: Promise<{ cat?: string }>;
}

function parseCategory(raw: string | undefined): Category | null {
  if (raw && (CATEGORIES as readonly string[]).includes(raw)) return raw as Category;
  return null;
}

export default async function ArticlesPage({ searchParams }: ArticlesPageProps) {
  const { cat } = await searchParams;
  const activeCategory = parseCategory(cat);
  const allArticles = await getAllArticles();
  const articles = activeCategory ? allArticles.filter((a) => a.category === activeCategory) : allArticles;

  const counts: Record<Category, number> = Object.fromEntries(
    CATEGORIES.map((c) => [c, 0])
  ) as Record<Category, number>;
  for (const a of allArticles) counts[a.category]++;

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
        {/* Category tabs */}
        <div className="mb-6 flex flex-wrap items-center gap-x-1 gap-y-2 border-b border-foreground/12 pb-0">
          <CategoryTab href="/articles" active={activeCategory === null} label="All" count={allArticles.length} />
          {CATEGORIES.filter((c) => counts[c] > 0).map((c) => (
            <CategoryTab
              key={c}
              href={`/articles?cat=${c}`}
              active={activeCategory === c}
              label={CATEGORY_LABEL[c]}
              count={counts[c]}
            />
          ))}
        </div>

        {articles.length === 0 ? (
          <div className="border border-foreground/20 px-8 py-20 text-center">
            <p className="text-sm text-muted-foreground">No articles in this category yet.</p>
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
                    <div className="mb-2 flex items-center gap-2">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
                        {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      <span className="text-foreground/15">·</span>
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35">
                        {CATEGORY_LABEL[article.category]}
                      </p>
                    </div>
                    <h2 className="text-sm font-semibold leading-snug text-foreground/90 group-hover:text-foreground transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-foreground/55">
                      {article.author}
                      <span className="mx-1.5 text-foreground/25">·</span>
                      {article.readingMinutes} min read
                    </span>
                    <span className="text-xs text-foreground/55 transition-colors group-hover:text-foreground">Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        <Reveal>
          <section className="mt-12 border border-foreground/12 p-6 sm:p-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45 mb-3">
              Stay in the loop
            </p>
            <h2 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-foreground mb-2">
              Get new articles when they ship.
            </h2>
            <p className="text-sm leading-relaxed text-foreground/55 max-w-xl mb-5">
              No newsletter, no email. Subscribe via RSS or watch the repo — whichever fits your workflow.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/feed.xml"
                className="inline-flex items-center gap-2 border border-foreground/25 px-4 py-2 text-[12px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.04]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M6.18 15.64a2.18 2.18 0 1 1 0 4.36 2.18 2.18 0 0 1 0-4.36zM4 10.1V13a8.99 8.99 0 0 1 9 9h2.9A11.9 11.9 0 0 0 4 10.1zM4 4v2.9c7.79 0 14.1 6.31 14.1 14.1H21C21 11.39 13.61 4 4 4z" />
                </svg>
                RSS feed
              </a>
              <a
                href="https://github.com/dotsystemsdevs/vibe-prompt/subscription"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/25 px-4 py-2 text-[12px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.04]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Watch on GitHub
              </a>
            </div>
          </section>
          <GithubCta
            title={"Got an article\nidea?"}
            description="Practical guides, lessons learned, or tools that work, if it helps vibe coders ship, suggest it."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues"
            primaryLabel="Suggest an article"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR instead"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}

function CategoryTab({
  href,
  active,
  label,
  count,
}: {
  href: string;
  active: boolean;
  label: string;
  count: number;
}) {
  return (
    <Link
      href={href}
      className={`relative px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors ${
        active ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
      }`}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      <span className="ml-1.5 tabular-nums text-foreground/30">{count}</span>
      {active && <span className="absolute inset-x-2 -bottom-px h-px bg-foreground" />}
    </Link>
  );
}

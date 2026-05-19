import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getArticle, getAllArticles, CATEGORY_LABEL } from "@/lib/articles";
import { ArticleToc } from "@/components/articles/article-toc";
import { LIST_PROBLEMS, LIST_CATEGORY_LABEL } from "@/lib/list-problems";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} | vibeprompt`,
    description: article.description,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://vibeprompt.tech/articles/${slug}`,
      images: article.image ? [{ url: article.image, alt: article.imageAlt }] : [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const allArticles = await getAllArticles();
  const relatedArticles = allArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 3);
  const relatedProblems = LIST_PROBLEMS.filter((p) => p.articleSlug === article.slug);

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">

        {/* Back */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-xs text-foreground/40 transition-colors hover:text-foreground/80 mb-8"
        >
          ← Articles
        </Link>

        <div className="lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* TOC sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8">
              <ArticleToc items={article.toc} />
            </div>
          </aside>

          <article className="mx-auto max-w-2xl lg:mx-0">

            {/* Header */}
            <header className="mb-8">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/35 mb-3">
                {new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                {" · "}{article.author}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.03em] text-foreground">
                {article.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {article.description}
              </p>
            </header>

            {/* Hero image */}
            {article.image && (
              <div className="relative w-full overflow-hidden mb-10 border border-foreground/10" style={{ aspectRatio: "16/9" }}>
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 672px) 100vw, 672px"
                />
              </div>
            )}

            {/* Body */}
            <div
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.html }}
            />

            {/* Related section */}
            {(relatedArticles.length > 0 || relatedProblems.length > 0) && (
              <aside className="mt-16 border-t border-foreground/12 pt-10">
                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/45">
                  Keep reading
                </p>

                {relatedArticles.length > 0 && (
                  <div className="mb-8">
                    <h3 className="mb-3 text-[13px] font-semibold text-foreground/85">
                      More in {CATEGORY_LABEL[article.category]}
                    </h3>
                    <ul className="space-y-1">
                      {relatedArticles.map((a) => (
                        <li key={a.slug}>
                          <Link
                            href={`/articles/${a.slug}`}
                            className="group block py-2 border-b border-foreground/[0.06] last:border-b-0"
                          >
                            <p className="text-[14px] font-medium leading-snug text-foreground/85 group-hover:text-foreground transition-colors">
                              {a.title}
                            </p>
                            <p className="mt-1 text-[12px] leading-relaxed text-foreground/45 line-clamp-2">
                              {a.description}
                            </p>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {relatedProblems.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-[13px] font-semibold text-foreground/85">
                      Common problems this covers
                    </h3>
                    <ul className="space-y-0.5">
                      {relatedProblems.map((p) => (
                        <li key={p.id}>
                          <Link
                            href={`/list?cat=${p.category}#${p.id}`}
                            className="group flex items-baseline gap-3 py-1.5"
                          >
                            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-foreground/30 w-12 shrink-0">
                              {LIST_CATEGORY_LABEL[p.category]}
                            </span>
                            <span className="text-[13px] leading-snug text-foreground/70 group-hover:text-foreground transition-colors">
                              {p.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            )}

          </article>
        </div>
      </div>
    </div>
  );
}

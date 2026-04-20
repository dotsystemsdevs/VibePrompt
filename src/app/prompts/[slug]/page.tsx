import { notFound } from "next/navigation";
import Link from "next/link";
import { getPromptBySlug } from "@/lib/prompt-library";
import { getPromptContributor } from "@/lib/github-prompt-contributor";
import { PromptActions } from "@/components/prompts/prompt-actions";
import { PromptContributorBadge } from "@/components/prompts/prompt-contributor";
import { getCopyCount } from "@/lib/actions/copies";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const PLACEHOLDER_RE = /(\[[^\]]+\]|\{\{[^}]+\}\})/g;
const PLACEHOLDER_TEST_RE = /^\[[^\]]+\]$|^\{\{[^}]+\}\}$/;

function HighlightPlaceholders({ text }: { text: string }) {
  const parts = text.split(PLACEHOLDER_RE);
  return (
    <>
      {parts.map((part, i) => {
        const isPlaceholder = PLACEHOLDER_TEST_RE.test(part);
        if (!isPlaceholder) return <span key={i}>{part}</span>;
        return (
          <span key={i} style={{ color: "var(--accent-blue)" }}>
            {part}
          </span>
        );
      })}
    </>
  );
}

function parseMultiSection(text: string): { title: string; body: string }[] | null {
  if (!text.includes("\n---\n")) return null;
  return text
    .split(/\n---\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      const newline = chunk.indexOf("\n");
      if (newline === -1) return { title: "", body: chunk };
      const title = chunk.slice(0, newline).replace(/:$/, "").trim();
      const body = chunk.slice(newline + 1).trim();
      return { title, body };
    });
}

export default async function PromptPage({ params }: PageProps) {
  const { slug } = await params;
  const [prompt, copyCount] = await Promise.all([
    getPromptBySlug(slug),
    getCopyCount(slug),
  ]);
  if (!prompt) notFound();

  const contributor = await getPromptContributor(prompt.githubPath ?? "");

  const sections = parseMultiSection(prompt.prompt);

  // Show whenToUse below useCase only if it adds new info
  const extraContext =
    prompt.whenToUse &&
    prompt.whenToUse !== prompt.useCase &&
    !prompt.useCase.startsWith(prompt.whenToUse.slice(0, 40))
      ? prompt.whenToUse
      : null;

  return (
    <div className="pt-12">
      <div className="mx-auto max-w-6xl pt-6">
        <article className="overflow-hidden border border-foreground/20">

          {/* Header */}
          <div
            className="border-b border-foreground/20 bg-foreground/[0.03] px-4 py-8 sm:px-8 sm:py-10"
            data-footer-contributor-login={contributor.login}
            data-footer-contributor-avatar={contributor.avatarUrl}
            data-footer-contributor-url={contributor.profileUrl}
          >
            <div className="mb-4 flex items-center gap-2 text-[10px]">
              <Link href="/browse" className="text-foreground/35 transition-colors hover:text-foreground">
                Browse
              </Link>
              <span className="text-foreground/20">/</span>
              <Link
                href={`/browse?category=${prompt.category}`}
                className="font-bold uppercase tracking-widest transition-colors hover:text-foreground"
                style={{ color: "var(--accent-blue)" }}
              >
                {prompt.categoryName}
              </Link>
            </div>
            <h1 className="text-2xl font-bold leading-snug tracking-tight text-foreground">
              {prompt.title}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/50">
              {prompt.useCase}
            </p>
            {extraContext && (
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-foreground/35">
                {extraContext}
              </p>
            )}
            <PromptContributorBadge contributor={contributor} />
          </div>

          {/* Prompt section, label + copy in same row */}
          <div>
            <div className="flex items-center justify-between border-b border-foreground/20 px-4 py-3 sm:px-8">
              <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                Prompt
              </span>
              <div className="flex items-center gap-2">
                <PromptActions
                  slug={prompt.slug}
                  promptText={prompt.prompt}
                  initialUpvotes={prompt.upvotes}
                  initialCopyCount={copyCount}
                  inline
                />
              </div>
            </div>

            {sections ? (
              <div className="divide-y divide-foreground/[0.06]">
                {sections.map((s, i) => (
                  <div key={i} className="px-4 py-6 sm:px-8">
                    {s.title && (
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
                        {s.title}
                      </p>
                    )}
                    <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/75">
                      <HighlightPlaceholders text={s.body} />
                    </pre>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-4 py-6 sm:px-8">
                <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground/75">
                  <HighlightPlaceholders text={prompt.prompt} />
                </pre>
              </div>
            )}
          </div>

        </article>
      </div>
      <div className="h-16" />
    </div>
  );
}

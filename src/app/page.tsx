import Link from "next/link";
import Image from "next/image";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getRepoContributors } from "@/lib/github-repo-contributors";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";
import { getAllArticles } from "@/lib/articles";
import { LIST_PROBLEMS } from "@/lib/list-problems";

export default async function HomePage() {
  const { prompts } = await getPromptLibrary();
  const contributors = await getRepoContributors();
  const articles = await getAllArticles();
  const fixesCount = LIST_PROBLEMS.length;
  const articlesCount = articles.length;
  const promptsCount = prompts.length;

  const schemaOrg = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "vibeprompt",
    description: `The vibe coding cookbook — recipes for shipping with AI. 10-step workflow, ${promptsCount} battle-tested prompts, ${fixesCount} field-tested fixes, and ${articlesCount} deep-dives. Free, open source, web-native.`,
    url: "https://vibeprompt.tech",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    keywords: "vibe coding, vibe coding cookbook, vibe coding book, vibe coding guide, AI prompts, prompt library, Claude prompts, AI workflow, open source",
    creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-12">

        {/* ── Desktop: split ── */}
        <div className="mx-auto hidden w-full max-w-6xl items-center gap-20 px-12 xl:px-16 lg:flex py-16 xl:py-20">

          {/* Left */}
          <div className="flex flex-1 flex-col">

            <h1
              className="font-bold leading-[1.02] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(2.6rem, 3.8vw + 0.5rem, 4.2rem)" }}
            >
              The vibe coding
              <br />
              cookbook.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/55">
              {promptsCount} prompts, {fixesCount} fixes, a 10-step workflow.
              {" "}
              <Link href="/vs-books" className="underline decoration-foreground/25 hover:decoration-foreground hover:text-foreground transition-colors">
                Free, open source.
              </Link>
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/workflow"
                className="cta inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-all hover:opacity-85 active:scale-95"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                See the workflow →
              </Link>
              <Link
                href="/scan"
                className="text-xs text-foreground/50 transition-colors hover:text-foreground/85"
              >
                Or scan a site →
              </Link>
            </div>

            {contributors.length > 0 && (
              <div className="mt-10 flex items-center gap-3">
                <div className="flex items-center">
                  {contributors.slice(0, 8).map((c, i) => (
                    <a
                      key={c.login}
                      href={c.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={c.login}
                      className="relative block transition-transform hover:z-10 hover:scale-110"
                      style={{ marginLeft: i === 0 ? 0 : "-8px" }}
                    >
                      <Image
                        src={c.avatarUrl}
                        alt={c.login}
                        width={26}
                        height={26}
                        className="rounded-full border border-background"
                      />
                    </a>
                  ))}
                </div>
                <span className="text-[11px] text-foreground/45">
                  Built in the open by {contributors.length} ·{" "}
                  <a
                    href="https://github.com/dotsystemsdevs/vibe-prompt/blob/master/CONTRIBUTING.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/70 transition-colors hover:text-foreground"
                  >
                    Join us →
                  </a>
                </span>
              </div>
            )}

          </div>

          {/* Right, workflow card */}
          <div className="w-[340px] shrink-0">
            <div className="border border-foreground/20 bg-[#0a0a0a]">

              <div className="flex items-center justify-between border-b border-foreground/12 px-4 py-3">
                <span className="text-[9px] font-medium uppercase tracking-widest text-foreground/55">
                  Vibe coding workflow
                </span>
                <span className="text-[9px] text-foreground/45">{WORKFLOW_STEPS.length} steps</span>
              </div>

              <div className="divide-y divide-foreground/[0.06]">
                {WORKFLOW_STEPS.map(({ step, title }) => (
                  <Link
                    key={step}
                    href={`/workflow#step-${step}`}
                    className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-foreground/25">{step}</span>
                    <span className="flex-1 text-[11px] text-foreground/55 transition-colors group-hover:text-foreground/80">{title}</span>
                    <span className="text-[9px] text-foreground/20 transition-colors group-hover:text-foreground/45">→</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-foreground/10 px-4 py-3">
                <Link
                  href="/workflow"
                  className="text-[11px] font-medium text-foreground/30 transition-colors hover:text-foreground/65"
                >
                  See full workflow →
                </Link>
              </div>

            </div>
          </div>

        </div>

        {/* ── Mobile ── */}
        <div className="flex flex-1 flex-col px-5 py-10 lg:hidden">

          <p
            aria-hidden="true"
            className="font-bold leading-[1.05] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.2rem, 8vw, 3rem)" }}
          >
            The vibe coding
            <br />cookbook.
          </p>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/55">
            {promptsCount} prompts, {fixesCount} fixes, a 10-step workflow.
            {" "}
            <Link href="/vs-books" className="underline decoration-foreground/25 hover:decoration-foreground hover:text-foreground transition-colors">
              Free, open source.
            </Link>
          </p>

          <div className="mt-7 flex items-center gap-3">
            <Link
              href="/workflow"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85"
              style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
            >
              See the workflow →
            </Link>
            <Link
              href="/scan"
              className="text-xs text-foreground/50 transition-colors hover:text-foreground/85"
            >
              Or scan a site →
            </Link>
          </div>

          {/* Workflow card */}
          <div className="mt-8 border border-foreground/20">
            <div className="flex items-center justify-between border-b border-foreground/12 px-4 py-2.5">
              <span className="text-[9px] font-medium uppercase tracking-widest text-foreground/55">Vibe coding workflow</span>
              <span className="text-[9px] text-foreground/45">{WORKFLOW_STEPS.length} steps</span>
            </div>
            <div className="divide-y divide-foreground/[0.06]">
              {WORKFLOW_STEPS.map(({ step, title }) => (
                <Link
                  key={step}
                  href={`/workflow#step-${step}`}
                  className="group flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-foreground/[0.04]"
                >
                  <span className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-foreground/25">{step}</span>
                  <span className="flex-1 text-[11px] text-foreground/55 transition-colors group-hover:text-foreground/80">{title}</span>
                  <span className="text-[9px] text-foreground/20">→</span>
                </Link>
              ))}
            </div>
            <div className="border-t border-foreground/10 px-4 py-3">
              <Link href="/workflow" className="text-[11px] font-medium text-foreground/55 transition-colors hover:text-foreground">
                See full workflow →
              </Link>
            </div>
          </div>

          {contributors.length > 0 && (
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center">
                {contributors.slice(0, 8).map((c, i) => (
                  <a
                    key={c.login}
                    href={c.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={c.login}
                    className="relative block transition-transform hover:z-10 hover:scale-110"
                    style={{ marginLeft: i === 0 ? 0 : "-7px" }}
                  >
                    <Image
                      src={c.avatarUrl}
                      alt={c.login}
                      width={24}
                      height={24}
                      className="rounded-full border border-background"
                    />
                  </a>
                ))}
              </div>
              <span className="text-[11px] text-foreground/45">
                Built by {contributors.length} ·{" "}
                <a
                  href="https://github.com/dotsystemsdevs/vibe-prompt/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/70 transition-colors hover:text-foreground"
                >
                  Join →
                </a>
              </span>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

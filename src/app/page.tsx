import Link from "next/link";
import Image from "next/image";
import { getPromptLibrary } from "@/lib/prompt-library";
import { getRepoContributors } from "@/lib/github-repo-contributors";
import { WORKFLOW_STEPS } from "@/lib/workflow-steps";

const SCHEMA_ORG = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "vibeprompt",
  description: "52 battle-tested AI prompts, a 9-step vibe coding workflow, and a curated tool list, free and open source.",
  url: "https://vibeprompt.tech",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  keywords: "AI prompts, vibe coding, prompt library, Claude prompts, AI workflow, open source",
  creator: { "@type": "Organization", name: "vibeprompt", url: "https://vibeprompt.tech" },
};

export default async function HomePage() {
  const { prompts, categories } = await getPromptLibrary();
  const contributors = await getRepoContributors();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_ORG) }} />

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-12">

        {/* ── Desktop: split ── */}
        <div className="mx-auto hidden w-full max-w-6xl items-center gap-20 px-12 xl:px-16 lg:flex py-16 xl:py-20">

          {/* Left */}
          <div className="flex flex-1 flex-col">

            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
              {prompts.length} prompts &nbsp;·&nbsp; {categories.length} categories &nbsp;·&nbsp; free plan · open source
            </p>

            <h1
              className="font-bold leading-[1.02] tracking-[-0.04em] text-foreground"
              style={{ fontSize: "clamp(2.6rem, 3.8vw + 0.5rem, 4.2rem)" }}
            >
              Everything you need
              <br />
              to ship with AI.
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground/50">
              The 9-step vibe coding playbook from idea to shipped,
              plus {prompts.length} battle-tested prompts to use at every stage.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/workflow"
                className="cta inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold text-white transition-all hover:opacity-85 active:scale-95"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                See the workflow →
              </Link>
              <a
                href="https://github.com/dotsystemsdevs/vibeprompt/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-foreground/25 px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-foreground/45 hover:bg-foreground/[0.05]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Contribute
              </a>
            </div>

            {contributors.length > 0 && (
              <div className="mt-8 flex items-center gap-4">
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
                        width={32}
                        height={32}
                        className="rounded-full border border-background transition-transform"
                      />
                    </a>
                  ))}
                </div>
                <p className="text-[11px] text-foreground/50">
                  Built by {contributors.length} contributor{contributors.length !== 1 ? "s" : ""} · trusted by builders worldwide
                </p>
              </div>
            )}

          </div>

          {/* Right, workflow card */}
          <div className="w-[340px] shrink-0">
            <div className="border border-foreground/20 bg-[#0a0a0a]">

              <div className="flex items-center justify-between border-b border-foreground/12 px-4 py-3">
                <span className="text-[9px] font-medium uppercase tracking-widest text-foreground/30">
                  Vibe coding workflow
                </span>
                <span className="text-[9px] text-foreground/20">{WORKFLOW_STEPS.length} steps</span>
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

          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/50">
            {prompts.length} prompts &nbsp;·&nbsp; {categories.length} categories &nbsp;·&nbsp; free
          </p>

          <p
            aria-hidden="true"
            className="font-bold leading-[1.05] tracking-[-0.04em] text-foreground"
            style={{ fontSize: "clamp(2.2rem, 8vw, 3rem)" }}
          >
            Everything you need
            <br />to ship with AI.
          </p>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/50">
            The 9-step vibe coding playbook from idea to shipped, plus {prompts.length} battle-tested prompts.
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
              href="/browse"
              className="text-xs text-foreground/40 transition-colors hover:text-foreground/70"
            >
              Browse prompts →
            </Link>
          </div>

          {/* Workflow card */}
          <div className="mt-8 border border-foreground/20">
            <div className="flex items-center justify-between border-b border-foreground/12 px-4 py-2.5">
              <span className="text-[9px] font-medium uppercase tracking-widest text-foreground/30">Vibe coding workflow</span>
              <span className="text-[9px] text-foreground/20">{WORKFLOW_STEPS.length} steps</span>
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
              <Link href="/workflow" className="text-[11px] font-medium text-foreground/30 transition-colors hover:text-foreground/65">
                See full workflow →
              </Link>
            </div>
          </div>

          {contributors.length > 0 && (
            <div className="mt-7 flex items-center gap-3">
              <div className="flex items-center">
                {contributors.slice(0, 6).map((c, i) => (
                  <a
                    key={c.login}
                    href={c.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={c.login}
                    className="relative block transition-transform hover:scale-110"
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
              <p className="text-[11px] text-foreground/30">
                Built by {contributors.length} contributor{contributors.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}

        </div>

      </div>
    </>
  );
}

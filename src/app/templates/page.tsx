import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { GithubCta } from "@/components/cta/github-cta";

export const metadata: Metadata = {
  title: "Templates — AGENTS.md, PRD, memory-bank | vibeprompt",
  description:
    "Drop-in starter files for vibe coding: AGENTS.md, PRD.md, memory-bank/@architecture.md, implementation-plan.md. Free downloads, no sign-up.",
  alternates: { canonical: "/templates" },
  openGraph: {
    title: "Templates — AGENTS.md, PRD, memory-bank",
    description: "Drop-in starter files for vibe coding. Free downloads, no sign-up.",
    url: "https://vibeprompt.tech/templates",
    images: [{ url: "https://vibeprompt.tech/opengraph-image", width: 1200, height: 630 }],
  },
};

type Template = {
  filename: string;
  href: string;
  title: string;
  description: string;
  use: string;
  workflowStep?: string;
};

const TEMPLATES: Template[] = [
  {
    filename: "AGENTS.md",
    href: "/templates/AGENTS.md",
    title: "AGENTS.md",
    description: "The file every AI coding session reads first. Stack, folder structure, hard rules, and the session-kickoff prompt.",
    use: "Drop in repo root. Claude Code, Cursor, and Windsurf read it automatically.",
    workflowStep: "04 · Context",
  },
  {
    filename: "PRD.md",
    href: "/templates/PRD.md",
    title: "PRD.md",
    description: "One-page product spec. Target user, goal, MVP features (max 5), explicit out-of-scope list, success criteria.",
    use: "Save as `docs/PRD.md`. Paste the relevant section into every AI session before asking for code.",
    workflowStep: "02 · PRD",
  },
  {
    filename: "@architecture.md",
    href: "/templates/architecture.md",
    title: "memory-bank/@architecture.md",
    description: "Map of the codebase: stack, file layout, where state lives, server-vs-client boundaries, conventions.",
    use: "Save as `memory-bank/@architecture.md`. The @ prefix marks it as an always-on context file in many tools.",
    workflowStep: "04 · Context",
  },
  {
    filename: "implementation-plan.md",
    href: "/templates/implementation-plan.md",
    title: "memory-bank/implementation-plan.md",
    description: "Ordered task list, broken into atomic steps (≤3 files each). Phases mirror the build journey from foundation to ship.",
    use: "Save as `memory-bank/implementation-plan.md`. Update after every session — completed tasks ticked, surprises moved into phases.",
    workflowStep: "04 · Context",
  },
];

export default function TemplatesPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"Drop-in templates\nfor vibe coding."}
          description="Starter files you can fork, edit, and ship. AGENTS.md, PRD, memory-bank, implementation plan. Free, no sign-up, no email."
          accent="#ffffff"
        />
      </Reveal>

      <div className="mx-auto max-w-6xl px-6 pt-2 pb-10">
        <div className="space-y-5">
          {TEMPLATES.map((t) => (
            <Reveal key={t.filename}>
              <article className="border border-foreground/12 p-6 sm:p-8">
                <div className="mb-3 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 className="font-mono text-base sm:text-lg font-semibold text-foreground">
                    {t.title}
                  </h2>
                  {t.workflowStep && (
                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-foreground/40">
                      Workflow step {t.workflowStep}
                    </span>
                  )}
                </div>

                <p className="mb-3 text-[14px] leading-relaxed text-foreground/75 max-w-2xl">
                  {t.description}
                </p>

                <p className="mb-5 text-[12px] leading-relaxed text-foreground/45 max-w-2xl">
                  <span className="font-semibold text-foreground/65">How to use: </span>
                  {t.use}
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={t.href}
                    download={t.filename}
                    className="inline-flex items-center gap-2 border border-foreground/25 px-4 py-2 text-[12px] font-semibold text-foreground transition-colors hover:bg-foreground/[0.04]"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download {t.filename}
                  </a>
                  <a
                    href={t.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-foreground/50 transition-colors hover:text-foreground"
                  >
                    Preview raw →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <GithubCta
            title={"Got a template\nidea?"}
            description="A boilerplate file other vibe coders would steal — open an issue or PR. If it helps people ship, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a template"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-12"
          />
        </Reveal>
      </div>
    </div>
  );
}

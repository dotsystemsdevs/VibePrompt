export const metadata = {
  title: "About | VibePrompt",
  description: "VibePrompt is an open-source prompt library and toolkit for vibe coders who ship.",
};

export default function AboutPage() {
  return (
    <div className="pt-12">
      <div className="mx-auto max-w-xl px-6 py-16 sm:py-20">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">About</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Built for builders who ship.</h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          VibePrompt is an open-source toolkit for vibe coders — builders who use AI to go from idea → prototype → shipped
          product. Use the prompts, follow the workflow, and keep momentum.
        </p>

        <h2 className="mt-10 text-sm font-semibold tracking-tight text-foreground">What it is</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A starter pack for building with AI: a prompt library you can copy-paste, plus a workflow you can follow when you want
          to move fast without losing quality.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The goal is simple: reduce blank-page time, keep scope tight, and help you finish the last 10% (polish, copy, UX, and
          launch) instead of getting stuck iterating forever.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
          <li>
            <span className="text-foreground">Prompts</span> for planning, building, debugging, and polishing
          </li>
          <li>
            <span className="text-foreground">Workflow</span> that keeps you moving from “idea” to “done”
          </li>
          <li>
            <span className="text-foreground">Tools & patterns</span> for faster, cleaner shipping
          </li>
        </ul>

        <h2 className="mt-12 text-sm font-semibold tracking-tight text-foreground">Contact</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Feedback, bugs, or ideas — use GitHub issues for anything public, or email for private questions.
        </p>
        <ul className="mt-5 space-y-3 text-sm">
          <li>
            <a
              href="https://github.com/dotsystemsdevs/VibePrompt"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-foreground/15 bg-foreground/[0.02] px-4 py-3 font-medium text-foreground transition-colors hover:bg-foreground/[0.04]"
            >
              Open source on GitHub ↗
            </a>
            <p className="mt-1 text-xs text-muted-foreground">Star it, fork it, or browse the code.</p>
          </li>
          <li>
            <a
              href="https://github.com/dotsystemsdevs/VibePrompt/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="block border border-foreground/15 bg-foreground/[0.02] px-4 py-3 font-medium text-foreground transition-colors hover:bg-foreground/[0.04]"
            >
              GitHub Issues ↗
            </a>
            <p className="mt-1 text-xs text-muted-foreground">Bugs, feature requests, and feedback.</p>
          </li>
          <li>
            <a
              href="mailto:dot.systems@proton.me"
              className="block border border-foreground/15 bg-foreground/[0.02] px-4 py-3 font-medium text-foreground transition-colors hover:bg-foreground/[0.04]"
            >
              dot.systems@proton.me
            </a>
            <p className="mt-1 text-xs text-muted-foreground">Private questions.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

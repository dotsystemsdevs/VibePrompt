import Link from "next/link";
import { Prompt } from "@/lib/types";

interface PromptCardProps {
  prompt: Prompt;
  number?: number;
}

export function PromptCard({ prompt, number }: PromptCardProps) {
  return (
    <div className="group relative flex h-full min-h-[200px] flex-col bg-background transition-colors hover:bg-card">
      <Link href={`/prompts/${prompt.slug}`} className="absolute inset-0 z-10" aria-label={prompt.title} prefetch={false} />
      <div className="flex flex-1 flex-col px-6 py-7">
        <div className="mb-3 flex items-center justify-between">
          <span className="inline-flex items-center text-[10px] uppercase tracking-widest text-muted-foreground">
            {prompt.categoryName}
          </span>
          {number !== undefined && (
            <span className="text-[10px] tabular-nums text-muted-foreground/60">
              {String(number).padStart(2, "0")}
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold leading-snug text-foreground/90 transition-colors group-hover:text-foreground">
          {prompt.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {prompt.useCase}
        </p>

        <div className="mt-5 flex items-end justify-between gap-2 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-1">
            {prompt.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="border border-foreground/20 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground/60"
              >
                {t}
              </span>
            ))}
          </div>
          <span className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100">→</span>
        </div>
      </div>
    </div>
  );
}

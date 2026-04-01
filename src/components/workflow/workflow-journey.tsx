"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type WorkflowJourneyStep = {
  step: string;
  title: string;
  what: string;
  emoji: string;
};

type WorkflowJourneyProps = {
  steps: readonly WorkflowJourneyStep[];
  activeStep: string;
  onActiveChange: (step: string) => void;
};

export function WorkflowJourney({ steps, activeStep, onActiveChange }: WorkflowJourneyProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const accent = "#3b82f6";
  const accentRgb = "59,130,246";

  useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      steps.forEach((s) => {
        ScrollTrigger.create({
          trigger: `#row-${s.step}`,
          start: "top 52%",
          end: "bottom 48%",
          onEnter: () => onActiveChange(s.step),
          onEnterBack: () => onActiveChange(s.step),
        });
      });
    }, root);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => ctx.revert();
  }, [steps, onActiveChange]);

  useEffect(() => {
    const idx = steps.findIndex((s) => s.step === activeStep);
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, {
        scale: i === idx ? 1.015 : 1,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }, [activeStep, steps]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let cancelled = false;
    let ctx: gsap.Context | null = null;
    const raf = requestAnimationFrame(() => {
      if (cancelled) return;
      const cards = cardRefs.current.filter(Boolean);
      if (cards.length === 0) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: wrap,
              start: "top 85%",
              once: true,
            },
          }
        );
      }, wrap);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [steps.length]);

  return (
    <section className="border-b border-border px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Creating process that ships in
              <span className="text-foreground/60"> days, not weeks.</span>
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Eight steps from idea → shipped product. Scroll the page for details.
            </p>
          </div>
          <a
            href="#row-01"
            className="inline-flex shrink-0 items-center justify-center self-start rounded-none border border-white/30 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-white/[0.06] sm:self-auto"
            style={{ boxShadow: `0 0 20px rgba(${accentRgb},0.12)` }}
          >
            Start workflow
          </a>
        </div>

        <div
          ref={wrapRef}
          className="relative mt-10 overflow-hidden rounded-none border border-white/10 bg-[oklch(0.065_0_0)] md:mt-14"
        >
          <div className="flex items-stretch overflow-x-auto no-scrollbar">
            {steps.map((s, i) => {
              const isActive = activeStep === s.step;
              const dividerActive =
                i < steps.length - 1 && (activeStep === steps[i].step || activeStep === steps[i + 1].step);

              return (
                <div key={s.step} className="flex shrink-0 items-stretch">
                  <Link
                    href={`#row-${s.step}`}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    onClick={() => onActiveChange(s.step)}
                    className="group relative flex w-[min(78vw,280px)] shrink-0 flex-col px-5 py-5 transition-colors hover:bg-white/[0.02] sm:w-[240px] md:w-[min(12.5vw,220px)] md:min-w-[180px] md:flex-1"
                    style={{
                      boxShadow: isActive ? `inset 0 0 0 1px rgba(${accentRgb},0.55)` : undefined,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold transition-colors"
                        style={{
                          borderColor: isActive ? accent : "rgba(255,255,255,0.18)",
                          background: isActive ? `rgba(${accentRgb},0.18)` : "rgba(0,0,0,0.25)",
                          color: isActive ? "#eaf2ff" : "rgba(255,255,255,0.6)",
                        }}
                        aria-hidden
                      >
                        {s.emoji}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold tracking-tight text-foreground">{s.title}</p>
                        <p className="mt-0.5 font-mono text-[10px] tabular-nums text-muted-foreground">{s.step}</p>
                      </div>
                    </div>

                    <p className="mt-4 line-clamp-3 text-[12px] leading-relaxed text-muted-foreground">
                      {s.what}
                    </p>
                  </Link>

                  {i < steps.length - 1 && (
                    <div className="flex w-px shrink-0 items-stretch bg-white/10">
                      <div
                        className="w-px"
                        style={{
                          background: dividerActive ? `rgba(${accentRgb},0.65)` : "rgba(255,255,255,0.12)",
                        }}
                        aria-hidden
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

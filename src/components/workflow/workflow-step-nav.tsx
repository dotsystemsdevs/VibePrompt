"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { step: "00", title: "Setup" },
  { step: "01", title: "Validate" },
  { step: "02", title: "Specify" },
  { step: "03", title: "Stack" },
  { step: "04", title: "Context" },
  { step: "05", title: "Build" },
  { step: "06", title: "Quality" },
  { step: "07", title: "Ship" },
  { step: "08", title: "Iterate" },
];

export function WorkflowStepNav() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show nav after scrolling past the hero (~300px)
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    STEPS.forEach(({ step }) => {
      const el = document.getElementById(`step-${step}`);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(step);
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollTo(step: string) {
    const el = document.getElementById(`step-${step}`);
    if (!el) return;
    const offset = 96; // navbar (48px) + this nav (~48px)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div
      className={`fixed left-0 right-0 top-12 z-40 border-b border-border bg-background/90 backdrop-blur-md transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
      }`}
      ref={navRef}
    >
      <div className="mx-auto max-w-6xl">
        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background/90 to-transparent"
          />
          <div className="flex items-center overflow-x-auto no-scrollbar px-6">
            {STEPS.map((s) => (
              <button
                key={s.step}
                onClick={() => scrollTo(s.step)}
                className={`group flex shrink-0 items-center gap-1.5 border-b-2 px-3 py-3 transition-colors ${
                  active === s.step
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className={`font-mono text-[10px] tabular-nums transition-colors ${
                    active === s.step ? "text-foreground/50" : "text-muted-foreground/40 group-hover:text-muted-foreground"
                  }`}
                >
                  {s.step}
                </span>
                <span className="text-xs">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type HeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  descriptionSlot?: React.ReactNode;
  primaryAction?: HeroAction;
  secondaryAction?: HeroAction;
  rightSlot?: React.ReactNode;
  className?: string;
  accent?: string;
};

function splitLines(text: string) {
  return text.split("\n").map((t) => t.trim()).filter(Boolean);
}

function renderLine(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <span key={i} style={{ color: "var(--accent-blue)" }}>{part.slice(2, -2)}</span>;
    }
    return part;
  });
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

function Action({ action, accent }: { action: HeroAction; accent: string }) {
  const variant = action.variant ?? "primary";
  const classes =
    variant === "primary"
      ? "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#09090b] transition-opacity hover:opacity-85"
      : "text-xs text-muted-foreground transition-colors hover:text-foreground";

  const style = variant === "primary" ? { backgroundColor: accent } : {};

  if (isExternalHref(action.href)) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={classes} style={style}>
        {action.label} →
      </a>
    );
  }

  return (
    <Link href={action.href} className={classes} style={style}>
      {action.label} →
    </Link>
  );
}


export function Hero({
  eyebrow,
  title,
  description,
  descriptionSlot,
  primaryAction,
  secondaryAction,
  rightSlot,
  className,
  accent,
}: HeroProps) {
  const resolvedAccent = accent ?? "var(--lilac)";
  return (
    <section
      className={`relative overflow-hidden px-6 py-8 sm:py-10 ${className ?? ""}`}
      style={{ ["--hero-accent" as never]: resolvedAccent } as React.CSSProperties}
    >


      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className={`${!rightSlot ? "mx-auto max-w-4xl text-center" : "max-w-2xl"}`}>
            {eyebrow && (
              <p className="hero-kicker mb-5">{eyebrow}</p>
            )}

            <h1 className="hero-display">
              {splitLines(title).map((line, i, arr) => (
                <span key={i}>
                  {renderLine(line)}
                  {i < arr.length - 1 ? <br /> : null}
                </span>
              ))}
            </h1>

            {description && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            )}
            {descriptionSlot && (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {descriptionSlot}
              </p>
            )}

            {(primaryAction || secondaryAction) && (
              <div className="mt-8 flex flex-wrap items-center gap-5">
                {primaryAction && <Action action={primaryAction} accent={resolvedAccent} />}
                {secondaryAction && <Action action={secondaryAction} accent={resolvedAccent} />}
              </div>
            )}
          </div>

          {rightSlot ? <div className="relative hidden lg:block">{rightSlot}</div> : null}
        </div>
      </div>
    </section>
  );
}

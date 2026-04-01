import Link from "next/link";

type GithubCtaProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  borderTop?: boolean;
  accent?: string;
  className?: string;
};

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href);
}

export function GithubCta({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  borderTop = true,
  className,
}: GithubCtaProps) {
  return (
    <section
      className={`${borderTop ? "border-t border-foreground/20" : ""} px-6 py-16 ${className ?? ""}`}
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-md">
          <h2
            className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-geist-sans)", letterSpacing: "-0.025em" }}
          >
            {title.split("\n").map((line, i, arr) => (
              <span key={i}>
                {line}
                {i < arr.length - 1 ? <br /> : null}
              </span>
            ))}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-foreground/45">{description}</p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          {isExternalHref(primaryHref) ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--accent-blue)" }}
            >
              {primaryLabel} →
            </a>
          ) : (
            <Link
              href={primaryHref}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--accent-blue)" }}
            >
              {primaryLabel} →
            </Link>
          )}
          {secondaryHref && secondaryLabel && (
            isExternalHref(secondaryHref) ? (
              <a
                href={secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-foreground/40 transition-colors hover:text-foreground"
              >
                {secondaryLabel} →
              </a>
            ) : (
              <Link href={secondaryHref} className="text-xs text-foreground/40 transition-colors hover:text-foreground">
                {secondaryLabel} →
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  );
}

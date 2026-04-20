import Image from "next/image";
import Link from "next/link";
import type { PromptContributor } from "@/lib/github-prompt-contributor";

export function PromptContributorBadge({ contributor }: { contributor: PromptContributor }) {
  return (
    <div className="mt-5 flex items-center gap-3">
      <Image
        src={contributor.avatarUrl}
        alt=""
        width={36}
        height={36}
        className="rounded-full border border-white/10 bg-white/5"
      />
      <p className="text-xs text-muted-foreground">
        Submitted by{" "}
        <Link
          href={contributor.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          @{contributor.login}
        </Link>
      </p>
    </div>
  );
}

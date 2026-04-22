import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { AuditClient, CountUp } from "./audit-client";
import { kv } from "@vercel/kv";

export const metadata: Metadata = {
  title: "PageLens | VibePrompt",
  description:
    "Paste any URL and get a prioritized scan of your landing page — SEO, conversion, AI discoverability, and security in seconds.",
};

async function getScanCount(): Promise<number> {
  try {
    return (await kv.get<number>("scan_count")) ?? 0;
  } catch {
    return 0;
  }
}

export default async function AuditPage() {
  const scanCount = await getScanCount();

  return (
    <div className="pt-12">
      <Hero
        title={"Is your landing page\nactually converting?"}
        descriptionSlot={
          scanCount > 0
            ? <><CountUp target={scanCount} /> sites analyzed. Paste yours to see exactly what to fix.</>
            : <>Paste your vibe-coded site and get a ranked list of exactly what to fix before you ship.</>
        }
        accent="#ffffff"
      />
      <AuditClient scanCount={scanCount} />
    </div>
  );
}

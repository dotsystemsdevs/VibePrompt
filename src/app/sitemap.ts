import type { MetadataRoute } from "next";
import { getPromptLibrary } from "@/lib/prompt-library";

const BASE = "https://vibeprompt.tech";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { prompts } = await getPromptLibrary();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/workflow`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/browse`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/awesome`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  const promptRoutes: MetadataRoute.Sitemap = prompts.map((p) => ({
    url: `${BASE}/prompts/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...promptRoutes];
}

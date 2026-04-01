"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function toggleSave(slug: string): Promise<{ saved: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { saved: false, error: "unauthenticated" };

  const { data: existing } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", userId)
    .eq("prompt_slug", slug)
    .maybeSingle();

  if (existing) {
    await supabase.from("saves").delete().eq("id", existing.id);
    return { saved: false };
  }

  await supabase.from("saves").insert({ user_id: userId, prompt_slug: slug });
  return { saved: true };
}

export async function getSavedSlugs(): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const { data } = await supabase
    .from("saves")
    .select("prompt_slug")
    .eq("user_id", userId);

  return (data ?? []).map((r) => r.prompt_slug);
}

export async function isSaved(slug: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const { data } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", userId)
    .eq("prompt_slug", slug)
    .maybeSingle();

  return !!data;
}

export async function getPromptSaveCounts(slugs: string[]): Promise<Record<string, number>> {
  const unique = Array.from(new Set(slugs.filter(Boolean)));
  if (unique.length === 0) return {};

  const { data } = await supabase
    .from("saves")
    .select("prompt_slug")
    .in("prompt_slug", unique);

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    counts[row.prompt_slug] = (counts[row.prompt_slug] ?? 0) + 1;
  }

  for (const slug of unique) {
    counts[slug] = counts[slug] ?? 0;
  }

  return counts;
}

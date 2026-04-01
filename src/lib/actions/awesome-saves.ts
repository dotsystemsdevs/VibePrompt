"use server";

import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

const AWESOME_PREFIX = "awesome:";

function toKey(href: string) {
  return `${AWESOME_PREFIX}${encodeURIComponent(href)}`;
}

function fromKey(key: string) {
  if (!key.startsWith(AWESOME_PREFIX)) return null;
  const encoded = key.slice(AWESOME_PREFIX.length);
  try {
    return decodeURIComponent(encoded);
  } catch {
    return null;
  }
}

export async function toggleAwesomeSave(href: string): Promise<{ saved: boolean; error?: string }> {
  const { userId } = await auth();
  if (!userId) return { saved: false, error: "unauthenticated" };

  const key = toKey(href);

  const { data: existing } = await supabase
    .from("saves")
    .select("id")
    .eq("user_id", userId)
    .eq("prompt_slug", key)
    .maybeSingle();

  if (existing) {
    await supabase.from("saves").delete().eq("id", existing.id);
    return { saved: false };
  }

  await supabase.from("saves").insert({ user_id: userId, prompt_slug: key });
  return { saved: true };
}

export async function getSavedAwesomeHrefs(): Promise<string[]> {
  const { userId } = await auth();
  if (!userId) return [];

  const { data } = await supabase
    .from("saves")
    .select("prompt_slug")
    .eq("user_id", userId)
    .like("prompt_slug", `${AWESOME_PREFIX}%`);

  return (data ?? [])
    .map((r) => fromKey(r.prompt_slug))
    .filter((v): v is string => typeof v === "string" && v.length > 0);
}

export async function getAwesomeSaveCounts(hrefs: string[]): Promise<Record<string, number>> {
  const unique = Array.from(new Set(hrefs.filter(Boolean)));
  if (unique.length === 0) return {};

  const keys = unique.map(toKey);
  const { data } = await supabase
    .from("saves")
    .select("prompt_slug")
    .in("prompt_slug", keys);

  const countsByKey: Record<string, number> = {};
  for (const row of data ?? []) {
    countsByKey[row.prompt_slug] = (countsByKey[row.prompt_slug] ?? 0) + 1;
  }

  const countsByHref: Record<string, number> = {};
  for (const href of unique) {
    countsByHref[href] = countsByKey[toKey(href)] ?? 0;
  }

  return countsByHref;
}


"use server";

import { getSupabase } from "@/lib/supabase";

export async function incrementSaveCounter(): Promise<void> {
  try {
    const db = getSupabase();
    const { data } = await db
      .from("save_counter")
      .select("count")
      .eq("id", 1)
      .maybeSingle() as { data: { count: number } | null };

    if (data) {
      await db.from("save_counter").update({ count: data.count + 1 }).eq("id", 1);
    } else {
      await db.from("save_counter").insert({ id: 1, count: 1 });
    }
  } catch {
    // Graceful fallback if table doesn't exist yet
  }
}

export async function getTotalSaves(): Promise<number> {
  try {
    const db = getSupabase();
    const { data } = await db
      .from("save_counter")
      .select("count")
      .eq("id", 1)
      .maybeSingle() as { data: { count: number } | null };
    return data?.count ?? 0;
  } catch {
    return 0;
  }
}

"use client";

import { useEffect, useMemo, useState } from "react";
import type { Prompt } from "@/lib/types";
import { readLocalSavedSlugs } from "@/lib/local-saves";
import { LibraryClient } from "@/components/library/library-client";

type AwesomeItem = {
  name: string;
  description: string;
  href: string;
  catTitle: string;
  catEmoji: string;
};

function decodeAwesomeHref(key: string): string | null {
  if (!key.startsWith("awesome:")) return null;
  const encoded = key.slice("awesome:".length);
  try {
    return decodeURIComponent(encoded);
  } catch {
    return null;
  }
}

export function LibraryClientLocal({
  prompts,
  awesomeByHref,
}: {
  prompts: Prompt[];
  awesomeByHref: Record<string, AwesomeItem>;
}) {
  const [savedSlugs, setSavedSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => setSavedSlugs(readLocalSavedSlugs());
    sync();
    window.addEventListener("vp:saves-changed", sync as EventListener);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("vp:saves-changed", sync as EventListener);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const savedPrompts = useMemo(() => {
    const set = new Set(savedSlugs);
    return prompts.filter((p) => set.has(p.slug));
  }, [prompts, savedSlugs]);

  const savedAwesomeHrefs = useMemo(() => {
    return savedSlugs
      .map(decodeAwesomeHref)
      .filter((v): v is string => typeof v === "string" && v.length > 0);
  }, [savedSlugs]);

  return (
    <LibraryClient
      savedPrompts={savedPrompts}
      savedAwesomeHrefs={savedAwesomeHrefs}
      awesomeByHref={awesomeByHref}
    />
  );
}


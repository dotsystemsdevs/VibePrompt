export const LOCAL_SAVES_KEY = "vp_saved_slugs_v1";

export function readLocalSavedSlugs(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_SAVES_KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v): v is string => typeof v === "string" && v.length > 0);
  } catch {
    return [];
  }
}

export function writeLocalSavedSlugs(next: string[]) {
  if (typeof window === "undefined") return;
  try {
    const unique = Array.from(new Set(next.filter(Boolean)));
    window.localStorage.setItem(LOCAL_SAVES_KEY, JSON.stringify(unique));
  } catch {
    // ignore
  }
}

export function isLocallySaved(slug: string): boolean {
  const slugs = readLocalSavedSlugs();
  return slugs.includes(slug);
}

export function toggleLocalSave(slug: string): boolean {
  const slugs = readLocalSavedSlugs();
  const saved = slugs.includes(slug);
  const next = saved ? slugs.filter((s) => s !== slug) : [...slugs, slug];
  writeLocalSavedSlugs(next);
  try {
    window.dispatchEvent(new CustomEvent("vp:saves-changed"));
  } catch {
    // ignore
  }
  return !saved;
}


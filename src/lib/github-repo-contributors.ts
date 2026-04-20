import "server-only";

import { unstable_cache } from "next/cache";
import type { PromptContributor } from "@/lib/github-prompt-contributor";

type ApiContributor = {
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
  type?: string;
};

type GithubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
};

function githubHeaders(): HeadersInit {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { headers: githubHeaders(), next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function fallbackContributors(): Promise<PromptContributor[]> {
  const login = process.env.GITHUB_PROMPTS_DEFAULT_LOGIN ?? "dotsystemsdevs";
  const user = await fetchJson<GithubUser>(`https://api.github.com/users/${encodeURIComponent(login)}`);
  if (user?.login) {
    return [{ login: user.login, avatarUrl: user.avatar_url, profileUrl: user.html_url }];
  }
  return [
    {
      login,
      avatarUrl: `https://github.com/${login}.png?size=64`,
      profileUrl: `https://github.com/${login}`,
    },
  ];
}

async function fetchContributorsUncached(): Promise<PromptContributor[]> {
  const owner = process.env.GITHUB_PROMPTS_OWNER ?? "dotsystemsdevs";
  const repo = process.env.GITHUB_PROMPTS_REPO ?? "VibePrompt";
  const url = `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`;

  const data = await fetchJson<ApiContributor[]>(url);
  if (!Array.isArray(data) || data.length === 0) {
    return fallbackContributors();
  }

  const mapped = data
    .filter((c) => typeof c.login === "string" && c.login.length > 0)
    .map((c) => ({
      login: c.login,
      avatarUrl: c.avatar_url,
      profileUrl: c.html_url,
    }));

  return mapped.length > 0 ? mapped : fallbackContributors();
}

const getRepoContributorsCached = unstable_cache(
  async () => fetchContributorsUncached(),
  ["github-repo-contributors-list"],
  { revalidate: 3600 }
);

/** All GitHub users who contributed commits to the configured repo (up to 100). */
export async function getRepoContributors(): Promise<PromptContributor[]> {
  return getRepoContributorsCached();
}

import "server-only";

import { unstable_cache } from "next/cache";

export type PromptContributor = {
  login: string;
  avatarUrl: string;
  profileUrl: string;
};

type GithubCommit = {
  author: { login: string; avatar_url: string; html_url: string } | null;
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

async function resolveDefaultContributor(): Promise<PromptContributor> {
  const login = process.env.GITHUB_PROMPTS_DEFAULT_LOGIN ?? "dotsystemsdevs";
  const user = await fetchJson<GithubUser>(`https://api.github.com/users/${encodeURIComponent(login)}`);
  if (user?.login) {
    return {
      login: user.login,
      avatarUrl: user.avatar_url,
      profileUrl: user.html_url,
    };
  }
  return {
    login,
    avatarUrl: `https://github.com/${login}.png?size=64`,
    profileUrl: `https://github.com/${login}`,
  };
}

async function fetchContributorUncached(repoPath: string): Promise<PromptContributor> {
  const owner = process.env.GITHUB_PROMPTS_OWNER ?? "dotsystemsdevs";
  const repo = process.env.GITHUB_PROMPTS_REPO ?? "VibePrompt";

  if (!repoPath.trim()) {
    return resolveDefaultContributor();
  }

  const pathParam = encodeURIComponent(repoPath);
  const url = `https://api.github.com/repos/${owner}/${repo}/commits?path=${pathParam}&per_page=1`;

  const commits = await fetchJson<GithubCommit[]>(url);
  const row = Array.isArray(commits) ? commits[0] : undefined;
  const ghAuthor = row?.author;
  if (ghAuthor?.login) {
    return {
      login: ghAuthor.login,
      avatarUrl: ghAuthor.avatar_url,
      profileUrl: ghAuthor.html_url,
    };
  }

  return resolveDefaultContributor();
}

const getContributorForPath = unstable_cache(
  async (cacheKey: string): Promise<PromptContributor> => {
    const repoPath = cacheKey === "__default__" ? "" : cacheKey;
    return fetchContributorUncached(repoPath);
  },
  ["github-prompt-contributor"],
  { revalidate: 3600 }
);

export async function getPromptContributor(repoPath: string): Promise<PromptContributor> {
  const key = repoPath.trim() || "__default__";
  return getContributorForPath(key);
}

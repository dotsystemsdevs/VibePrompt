export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  count: number;
};

export type Prompt = {
  slug: string;
  title: string;
  category: string;
  categoryName: string;
  /** Path in the GitHub repo (e.g. `prompt-library/PRD Spec/foo.md`) for contributor lookup */
  githubPath?: string;
  tags: string[];
  difficulty: Difficulty;
  tools: string[];
  author: string;
  useCase: string;
  whenToUse: string;
  prompt: string;
  outputExample?: string;
  notes?: string;
  upvotes: number;
  commentCount: number;
  createdAt: string;
};

export type Comment = {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  upvotes: number;
};

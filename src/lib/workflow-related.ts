// Mapping from workflow step number to related articles and field-tested fixes.
// Kept separate from workflow-data.ts so the step data stays focused on tasks/checklists.

export type WorkflowRelated = {
  articleSlugs?: string[];
  fixIds?: string[];
};

export const WORKFLOW_RELATED: Record<string, WorkflowRelated> = {
  "00": {
    // Environment: basic setup, nothing tactical to link yet
  },
  "01": {
    // Research: validation, no fixes mapped
  },
  "02": {
    articleSlugs: ["what-an-mvp-actually-is"],
    fixIds: ["mvp-not-mvp"],
  },
  "03": {
    // Stack: no fixes directly tied to stack choice
  },
  "04": {
    articleSlugs: ["context-is-everything"],
    fixIds: ["dont-know-codebase", "every-prompt-new-state", "deprecated-apis"],
  },
  "05": {
    articleSlugs: ["one-shot-myth", "vibecoding-real-examples-with-time-data", "vibe-coding-mistakes"],
    fixIds: ["last-20-percent", "ai-confidently-wrong", "code-duplication-pile", "give-up-refactor"],
  },
  "06": {
    articleSlugs: ["vibe-coding-mistakes"],
    fixIds: ["ai-code-security-holes", "tests-pass-feature-broken", "type-errors-cascade"],
  },
  "07": {
    articleSlugs: [
      "closed-testing-on-google-play",
      "launching-on-google-play",
      "testflight-and-app-store-publishing",
    ],
    fixIds: ["play-closed-testing-12", "app-review-rejected-vague", "vercel-prod-breaks", "env-vars-broken"],
  },
  "08": {
    articleSlugs: [
      "launching-on-google-play",
      "getting-your-first-app-reviews",
      "instagram-for-indie-apps",
      "onboarding-that-actually-converts",
      "taking-payment-as-an-indie-dev",
    ],
    fixIds: [
      "reddit-removed-post",
      "ph-launch-8-upvotes",
      "show-hn-sunk",
      "twitter-12-impressions",
      "five-stars-three-reviews",
      "rank-brand-only",
      "priced-too-low",
      "free-tier-converts-zero",
    ],
  },
  "09": {
    articleSlugs: ["after-launch-troubleshooting", "onboarding-that-actually-converts"],
    fixIds: ["60-visitors-zero-conv", "metrics-anxious", "refunds-week-one"],
  },
};

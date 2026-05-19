import type { Metadata } from "next";
import { WorkflowStepper } from "@/components/workflow/workflow-stepper";
import { WORKFLOW_PAGE_STEPS as STEPS } from "@/lib/workflow-data";
import { Hero } from "@/components/hero/hero";
import { GithubCta } from "@/components/cta/github-cta";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Vibe Coding Workflow | From idea to shipped",
  description:
    "The complete build loop for indie devs: validate, spec, stack, context, build, gate, ship, iterate.",
  alternates: { canonical: "/workflow" },
};

export default function WorkflowPage() {
  return (
    <div className="pt-12">
      <Reveal>
        <Hero
          title={"The vibe coding\nworkflow."}
          description="9 steps from idea to shipped, built from the most-starred vibe coding repos."
          accent="#ffffff"
        />
      </Reveal>
      <div className="mx-auto max-w-6xl px-6 pt-6">
        <WorkflowStepper steps={STEPS} />
        <Reveal>
          <GithubCta
            title={"Something\nmissing?"}
            description="Suggest a step, a resource, or a fix. If it belongs here, it goes in."
            accent="#ffffff"
            primaryHref="https://github.com/dotsystemsdevs/vibeprompt/issues/new"
            primaryLabel="Suggest a change"
            secondaryHref="https://github.com/dotsystemsdevs/vibeprompt"
            secondaryLabel="Submit a PR"
            borderTop={false}
            className="mt-6"
          />
        </Reveal>
      </div>
    </div>
  );
}

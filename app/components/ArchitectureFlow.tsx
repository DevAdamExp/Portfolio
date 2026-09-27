import { FiArrowRight } from "react-icons/fi";
import type { FlowStep } from "@/content/types";
import { TechIcon } from "@/lib/tech";

/** One-line text flow of a system, e.g. "Caller → LiveKit → Voice agent". */
export function ArchitectureInline({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="meta flex flex-wrap items-center gap-x-1.5 gap-y-1">
      {steps.map((step, i) => (
        <li key={step.label} className="flex items-center gap-1.5">
          {i > 0 && <FiArrowRight aria-hidden className="size-3 opacity-70" />}
          {step.label}
        </li>
      ))}
    </ol>
  );
}

/** Numbered, vertical walkthrough of a system, used on project pages. */
export function ArchitectureSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <ol className="relative grid gap-6">
      {steps.length > 1 && <span aria-hidden className="absolute bottom-7 left-[1.25rem] top-7 w-px bg-line-strong" />}
      {steps.map((step, i) => (
        <li key={step.label} className="relative grid grid-cols-[2.5rem_1fr] gap-4">
          <span className="grid size-10 place-items-center rounded-lg border border-line-strong bg-surface">
            {step.tech ? (
              <TechIcon name={step.tech} className="size-[18px]" />
            ) : (
              <span className="font-mono text-xs text-subtle">{i + 1}</span>
            )}
          </span>
          <div className="min-w-0 pt-1.5">
            <p className="font-semibold leading-snug text-fg">{step.label}</p>
            {step.detail && <p className="mt-0.5 text-muted">{step.detail}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

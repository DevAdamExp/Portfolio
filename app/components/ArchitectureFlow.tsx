import type { FlowStep } from "@/content/types";
import { TechIcon } from "@/lib/tech";

function StepIcon({ step, index, size }: { step: FlowStep; index: number; size: "sm" | "md" }) {
  const box = size === "sm" ? "size-10 rounded-xl" : "size-11 rounded-xl";
  return (
    <div className={`grid shrink-0 place-items-center border border-line-strong bg-surface shadow-[var(--shadow-card)] ${box}`}>
      {step.tech ? (
        <TechIcon name={step.tech} className={size === "sm" ? "size-[18px]" : "size-5"} />
      ) : (
        <span className="font-mono text-xs text-subtle">{String(index + 1).padStart(2, "0")}</span>
      )}
    </div>
  );
}

/** Compact horizontal diagram used as the preview on project cards. */
export function ArchitecturePreview({ steps }: { steps: FlowStep[] }) {
  return (
    <ol aria-label="Architecture" className="flex w-full items-start justify-center">
      {steps.map((step, i) => (
        <li key={step.label} className="flex min-w-0 flex-1 items-start">
          <div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
            <StepIcon step={step} index={i} size="sm" />
            <span className="line-clamp-2 w-full hyphens-auto break-words px-0.5 text-[11px] leading-tight text-muted sm:text-xs">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <span aria-hidden className="mt-5 flex w-3 shrink-0 items-center sm:w-5">
              <span className="h-px flex-1 bg-gradient-to-r from-line-strong to-accent/60" />
              <span className="-ml-0.5 size-0 border-y-[3px] border-l-[4px] border-y-transparent border-l-accent/70" />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Full vertical diagram with details, used on project pages. */
export function ArchitectureSteps({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="relative">
      <span aria-hidden className="absolute bottom-6 left-[1.375rem] top-6 w-px bg-gradient-to-b from-accent/60 to-accent-2/40" />
      <ol className="relative grid gap-3">
        {steps.map((step, i) => (
          <li key={step.label} className="grid grid-cols-[2.75rem_1fr] items-center gap-4">
            <StepIcon step={step} index={i} size="md" />
            <div className="card flex min-w-0 flex-col justify-between gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
              <span className="font-medium text-fg">{step.label}</span>
              {step.detail && <span className="text-sm text-muted sm:text-right">{step.detail}</span>}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

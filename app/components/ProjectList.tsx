import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/content/types";
import { TechIcon } from "@/lib/tech";
import { ArchitectureInline } from "./ArchitectureFlow";

export default function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="divide-y divide-line border-b border-line">
      {items.map((project) => (
        <li key={project.slug} className="first:*:pt-0">
          <Link href={`/projects/${project.slug}`} className="group block py-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="flex items-center gap-1.5 font-semibold tracking-tight text-fg">
                <span className="group-hover:underline group-hover:decoration-line-strong group-hover:underline-offset-4">
                  {project.name}
                </span>
                <FiArrowUpRight
                  aria-hidden
                  className="size-4 text-subtle transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                />
              </h3>
              <p className="shrink-0 font-mono text-xs text-subtle">
                {project.kind}
                {project.status === "Live" && (
                  <>
                    {" · "}
                    <span className="text-accent">Live</span>
                  </>
                )}
              </p>
            </div>
            <p className="mt-1 text-pretty text-muted">{project.tagline}</p>

            {project.architecture && (
              <div className="mt-3">
                <ArchitectureInline steps={project.architecture} />
              </div>
            )}

            <ul aria-label="Built with" className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-[13px] text-muted">
              {project.stack.map((name) => (
                <li key={name} className="flex items-center gap-1.5">
                  <TechIcon name={name} className="size-3.5" />
                  {name}
                </li>
              ))}
            </ul>
          </Link>
        </li>
      ))}
    </ul>
  );
}

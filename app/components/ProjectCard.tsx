import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/content/types";
import { TechIcon } from "@/lib/tech";
import { ArchitecturePreview } from "./ArchitectureFlow";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="card card-hover group flex h-full flex-col overflow-hidden"
      aria-label={`${project.name}: ${project.tagline}`}
    >
      <div className="relative flex h-40 items-center overflow-hidden border-b border-line bg-surface-2 px-4 sm:h-44 sm:px-6">
        <div aria-hidden className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_80%)]" />
        <div
          aria-hidden
          className="absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-[var(--glow)] blur-3xl"
        />
        {project.architecture ? (
          <div className="relative w-full">
            <ArchitecturePreview steps={project.architecture} />
          </div>
        ) : (
          <p className="relative w-full text-center font-mono text-sm text-subtle">{project.name}</p>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="badge">{project.kind}</span>
          {project.status === "Live" ? (
            <span className="badge badge-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Live
            </span>
          ) : (
            <span className="badge">{project.status}</span>
          )}
        </div>

        <h3 className="mt-4 flex items-center gap-1.5 text-lg font-semibold tracking-tight text-fg">
          {project.name}
          <FiArrowUpRight
            aria-hidden
            className="size-4 text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </h3>
        <p className="mt-1 text-pretty text-muted">{project.tagline}</p>

        <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-5 text-xs text-muted">
          {project.stack.map((name) => (
            <li key={name} className="flex items-center gap-1.5">
              <TechIcon name={name} className="size-3.5" />
              {name}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/content/types";
import { TechIcon } from "@/lib/tech";
import { ArchitectureInline } from "./ArchitectureFlow";

/** Projects as simple bordered cards: kind, name, tagline, how it works in one line, and the stack. */
export default function ProjectCards({ items }: { items: Project[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
      {items.map((project) => (
        <li key={project.slug} className="reveal flex min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            aria-labelledby={`${project.slug}-name`}
            aria-describedby={`${project.slug}-tagline`}
            className="card group flex w-full flex-col p-6 md:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="meta">
                {project.kind}
                {project.status === "Live" && (
                  <>
                    {" · "}
                    <span className="text-live">Live</span>
                  </>
                )}
              </p>
              <FiArrowUpRight
                aria-hidden
                className="size-[18px] shrink-0 text-subtle transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>
            <h3 id={`${project.slug}-name`} className="item-title mt-4">
              {project.name}
            </h3>
            <p id={`${project.slug}-tagline`} className="mt-1.5 text-muted">
              {project.tagline}
            </p>
            {project.architecture && (
              <div className="mt-4">
                <ArchitectureInline steps={project.architecture} />
              </div>
            )}
            {/* Pushes the stack to the bottom so cards in a row line up. */}
            <div className="min-h-6 flex-1" aria-hidden />
            <ul
              aria-label="Built with"
              className="flex flex-wrap gap-x-4 gap-y-1.5 border-t border-line pt-5 text-[0.8125rem] text-muted"
            >
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

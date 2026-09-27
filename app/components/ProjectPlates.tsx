import Link from "next/link";
import { ViewTransition } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/content/types";
import { ArchitectureInline } from "./ArchitectureFlow";
import ProjectCover from "./art/ProjectCover";

/**
 * Projects as framed plates: the generative cover, then kind, name, tagline
 * and a one-line architecture flow. The cover morphs into the project page's
 * banner on navigation.
 */
export default function ProjectPlates({ items }: { items: Project[] }) {
  return (
    <ul className="grid gap-x-[var(--gap)] gap-y-14 sm:grid-cols-2">
      {items.map((project) => (
        <li key={project.slug} className="reveal min-w-0">
          <Link
            href={`/projects/${project.slug}`}
            aria-labelledby={`${project.slug}-name`}
            aria-describedby={`${project.slug}-tagline`}
            className="group block"
          >
            <ViewTransition name={`cover-${project.slug}`} share="vt-morph">
              <div className="cover-frame">
                <div className="cover-canvas">
                  <ProjectCover project={project} />
                </div>
              </div>
            </ViewTransition>
            <p className="meta mt-5">
              {project.kind}
              {project.status === "Live" && (
                <>
                  {" · "}
                  <span className="text-live">Live</span>
                </>
              )}
            </p>
            <h3 className="item-title mt-1.5 flex items-start justify-between gap-3">
              <span id={`${project.slug}-name`} className="grow-underline">
                {project.name}
              </span>
              <FiArrowUpRight
                aria-hidden
                className="mt-1 size-5 shrink-0 text-subtle transition-[transform,color] duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </h3>
            <p id={`${project.slug}-tagline`} className="mt-2 text-muted">
              {project.tagline}
            </p>
            {project.architecture && (
              <div className="mt-3">
                <ArchitectureInline steps={project.architecture} />
              </div>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

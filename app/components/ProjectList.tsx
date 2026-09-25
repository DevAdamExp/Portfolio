import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import type { Project } from "@/content/types";

export default function ProjectList({ items }: { items: Project[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {items.map((project) => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`} className="group block py-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="flex items-center gap-1 font-medium tracking-tight text-fg">
                {project.name}
                <FiArrowUpRight
                  aria-hidden
                  className="size-3.5 text-subtle transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
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
            <p className="mt-1 text-muted">{project.tagline}</p>
            <p className="mt-2 text-[13px] text-subtle">
              <span className="sr-only">Built with </span>
              {project.stack.join(" · ")}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

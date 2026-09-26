import type { Metadata } from "next";
import { projects } from "@/content/projects";
import ProjectCard from "../../components/ProjectCard";

export const metadata: Metadata = {
  title: "Projects",
  description: "Web platforms, AI products and voice agents I have designed and built.",
};

const groups = [
  {
    title: "Products & platforms",
    description: "Full-stack products and client platforms, built end to end.",
    items: projects.filter((p) => p.kind !== "AI agent"),
  },
  {
    title: "AI & voice agents",
    description: "Agents that talk to customers and act on business systems through tools.",
    items: projects.filter((p) => p.kind === "AI agent"),
  },
];

export default function ProjectsPage() {
  return (
    <>
      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid fade-mask absolute inset-0 -z-10" />
        <div className="container-page fade-in py-16 md:py-24">
          <p className="eyebrow">Projects</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-balance text-fg md:text-5xl">
            Systems I&apos;ve designed, built and shipped.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-pretty text-muted">
            Each project has a short write-up: the problem, how the system fits together, what I built and the stack
            behind it.
          </p>
        </div>
      </header>

      {groups.map((group) => (
        <section key={group.title} aria-label={group.title} className="border-b border-line py-16 last:border-b-0 md:py-20">
          <div className="container-page">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 className="text-xl font-semibold tracking-tight text-fg">{group.title}</h2>
              <p className="text-sm text-muted">{group.description}</p>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.items.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

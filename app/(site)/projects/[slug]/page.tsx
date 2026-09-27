import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { getProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { hostname } from "@/lib/format";
import { ArchitectureSteps } from "../../../components/ArchitectureFlow";
import ProjectCover from "../../../components/art/ProjectCover";
import TechList from "../../../components/TechList";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: `${project.tagline}. ${project.description}`,
    openGraph: project.image ? { images: [{ url: project.image.src, alt: project.image.alt }] } : undefined,
  };
}

function Block({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="reveal border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 id={`${id}-title`} className="item-title mb-5">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Neighbour({ project, direction }: { project: Project; direction: "prev" | "next" }) {
  const next = direction === "next";
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group flex items-center gap-5 border-t border-line pt-6 ${next ? "sm:flex-row-reverse sm:text-right" : ""}`}
    >
      <ViewTransition name={`cover-${project.slug}`} share="vt-morph">
        <div className="cover-frame w-28 shrink-0 p-1 sm:w-32">
          <div className="cover-canvas">
            <ProjectCover project={project} />
          </div>
        </div>
      </ViewTransition>
      <div className="min-w-0">
        <span className={`meta flex items-center gap-1.5 ${next ? "sm:justify-end" : ""}`}>
          {next ? (
            <>
              Next <FiArrowRight className="size-3.5" aria-hidden />
            </>
          ) : (
            <>
              <FiArrowLeft className="size-3.5" aria-hidden /> Previous
            </>
          )}
        </span>
        <span className="item-title mt-1 block">
          <span className="grow-underline">{project.name}</span>
        </span>
        <span className="mt-1 block text-small text-muted">{project.tagline}</span>
      </div>
    </Link>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  const facts = [
    { label: "Role", value: project.role },
    { label: "Type", value: project.kind },
    project.client && { label: "Client", value: project.client },
    project.year && { label: "Year", value: project.year },
    { label: "Status", value: project.status },
  ].filter((fact) => !!fact);

  const sections = [
    { id: "overview", title: "Overview" },
    { id: "problem", title: "The problem" },
    project.architecture && { id: "how-it-works", title: "How it works" },
    { id: "what-i-built", title: "What I built" },
    project.outcomes?.length && { id: "outcome", title: "Outcome" },
    { id: "stack", title: "Stack" },
  ].filter((section) => !!section);

  return (
    <article className="container-page pt-[clamp(2rem,1rem+2.5vw,3.5rem)]">
      <nav aria-label="Breadcrumb" className="meta flex items-center gap-2">
        <Link href="/projects" className="inline-flex items-center gap-1.5 transition-colors hover:text-fg">
          <FiArrowLeft className="size-3.5" aria-hidden />
          Work
        </Link>
        <span aria-hidden>/</span>
        <span aria-current="page" className="text-fg">
          {project.name}
        </span>
      </nav>

      <header className="grid-12 mt-8 gap-y-10">
        <div className="col-span-12 lg:col-span-8">
          <h1 className="display-page fade-in">{project.name}</h1>
          <p className="lead fade-in mt-5 max-w-[40rem] text-balance" style={{ "--i": 1 } as React.CSSProperties}>
            {project.tagline}
          </p>
          {(project.links?.live || project.links?.repo) && (
            <div className="fade-in mt-8 flex flex-wrap gap-3" style={{ "--i": 2 } as React.CSSProperties}>
              {project.links.live && (
                <a href={project.links.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                  Visit {hostname(project.links.live)}
                  <FiArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
              {project.links.repo && (
                <a href={project.links.repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
                  Source code
                  <FiArrowUpRight className="size-4" aria-hidden />
                </a>
              )}
            </div>
          )}
        </div>
        <dl className="fade-in col-span-12 grid grid-cols-2 gap-x-6 self-start sm:grid-cols-3 lg:col-span-4 lg:grid-cols-1" style={{ "--i": 2 } as React.CSSProperties}>
          {facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-0.5 border-t border-line py-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-4">
              <dt className="eyebrow">{fact.label}</dt>
              <dd className={`font-medium lg:text-right ${fact.value === "Live" ? "text-live" : "text-fg"}`}>
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      </header>

      {/* Words first, then the cover as a quiet band. */}
      <ViewTransition name={`cover-${project.slug}`} share="vt-morph">
        <div className="cover-frame mt-[clamp(2.5rem,1.5rem+3vw,4rem)]">
          <div className="cover-canvas md:aspect-[2/1]">
            <ProjectCover project={project} />
          </div>
        </div>
      </ViewTransition>

      <div className="section mt-[clamp(3.5rem,2rem+4vw,5.5rem)]">
        <aside className="section-rail hidden lg:block">
          <p className="eyebrow">On this page</p>
          <ul className="mt-4 grid gap-2 text-small">
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="text-muted transition-colors hover:text-accent">
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        <div className="section-body grid gap-14">
          <Block id="overview" title="Overview">
            <p className="lead measure">{project.description}</p>
          </Block>

          {project.image && (
            <figure className="reveal">
              <div className="cover-frame">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 800px, 100vw"
                  className="h-auto w-full"
                />
              </div>
              {project.links?.live && (
                <figcaption className="meta mt-3">{hostname(project.links.live)}</figcaption>
              )}
            </figure>
          )}

          <Block id="problem" title="The problem">
            <p className="measure text-muted">{project.problem}</p>
          </Block>

          {project.architecture && (
            <Block id="how-it-works" title="How it works">
              <ArchitectureSteps steps={project.architecture} />
            </Block>
          )}

          <Block id="what-i-built" title="What I built">
            <ul className="prose-list measure text-muted">
              {project.approach.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </Block>

          {project.outcomes && project.outcomes.length > 0 && (
            <Block id="outcome" title="Outcome">
              <ul className="prose-list measure text-muted">
                {project.outcomes.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Block>
          )}

          <Block id="stack" title="Stack">
            <TechList items={project.stack} label={`${project.name} stack`} />
          </Block>
        </div>
      </div>

      <nav aria-label="More projects" className="mt-[var(--space-section)] grid gap-8 sm:grid-cols-2 sm:gap-[var(--gap)]">
        {prev ? <Neighbour project={prev} direction="prev" /> : <span className="hidden sm:block" />}
        {next && <Neighbour project={next} direction="next" />}
      </nav>
    </article>
  );
}

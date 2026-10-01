import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { getProject, projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { hostname } from "@/lib/format";
import { ArchitectureSteps } from "../../../components/ArchitectureFlow";
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
    <section id={id} aria-labelledby={`${id}-title`} className="reveal">
      <h2 id={`${id}-title`} className="item-title mb-4">
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
      className={`card group flex flex-col p-6 ${next ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="meta flex items-center gap-1.5">
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
      <span className="item-title mt-2">{project.name}</span>
      <span className="mt-1 text-small text-muted">{project.tagline}</span>
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

  return (
    <article className="container-page pt-[clamp(2.5rem,1.5rem+3vw,4.5rem)]">
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

      <header className="mt-8 max-w-[46rem]">
        <h1 className="display-page fade-in">{project.name}</h1>
        <p className="lead fade-in mt-4 text-balance" style={{ "--i": 1 } as React.CSSProperties}>
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
      </header>

      <dl
        className="fade-in mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 sm:grid-cols-4"
        style={{ "--i": 3 } as React.CSSProperties}
      >
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="eyebrow">{fact.label}</dt>
            <dd className={`mt-1 font-medium ${fact.value === "Live" ? "text-live" : "text-fg"}`}>{fact.value}</dd>
          </div>
        ))}
      </dl>

      {project.gallery ? (
        <div className="mt-12 grid gap-5">
          <Image
            src={project.gallery[0].src}
            alt={project.gallery[0].alt}
            width={3840}
            height={2160}
            sizes="(min-width: 1248px) 1200px, 100vw"
            priority
            className="reveal aspect-video w-full rounded-[22px] border-[1.5px] border-ink object-cover shadow-[6px_6px_0_var(--ink)]"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {project.gallery.slice(1).map((shot) => (
              <Image
                key={shot.src}
                src={shot.src}
                alt={shot.alt}
                width={3840}
                height={2160}
                sizes="(min-width: 640px) 600px, 100vw"
                className="reveal aspect-video w-full rounded-[18px] border-[1.5px] border-ink object-cover"
              />
            ))}
          </div>
          {project.slug === "visa-crm" && <p className="meta">Screens from a demo tenant with fictional data. The real system is private.</p>}
        </div>
      ) : project.image && (
        <figure className="reveal mt-12 overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-surface shadow-[6px_6px_0_var(--ink)]">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1600}
            height={1000}
            sizes="(min-width: 1088px) 1024px, 100vw"
            priority
            className="aspect-[16/10] w-full object-cover object-top"
          />
        </figure>
      )}

      <div className="measure mt-16 grid gap-14">
        <Block id="overview" title="Overview">
          <p className="text-muted">{project.description}</p>
        </Block>

        <Block id="problem" title="The problem">
          <p className="text-muted">{project.problem}</p>
        </Block>

        {project.architecture && (
          <Block id="how-it-works" title="How it works">
            <ArchitectureSteps steps={project.architecture} />
          </Block>
        )}

        <Block id="what-i-built" title="What I built">
          <ul className="prose-list text-muted">
            {project.approach.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Block>

        {project.outcomes && project.outcomes.length > 0 && (
          <Block id="outcome" title="Outcome">
            <ul className="prose-list text-muted">
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

      <nav aria-label="More projects" className="mt-[var(--space-section)] grid gap-4 sm:grid-cols-2 sm:gap-5">
        {prev ? <Neighbour project={prev} direction="prev" /> : <span className="hidden sm:block" />}
        {next && <Neighbour project={next} direction="next" />}
      </nav>
    </article>
  );
}

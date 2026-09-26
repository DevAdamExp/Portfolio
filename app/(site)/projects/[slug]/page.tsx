import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiGithub } from "react-icons/fi";
import { getProject, projects } from "@/content/projects";
import { hostname } from "@/lib/format";
import { ArchitecturePreview, ArchitectureSteps } from "../../../components/ArchitectureFlow";
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

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="text-lg font-semibold tracking-tight text-fg">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
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
    <article>
      <header className="relative isolate overflow-hidden border-b border-line">
        <div aria-hidden className="bg-grid fade-mask absolute inset-0 -z-10" />
        <div
          aria-hidden
          className="absolute left-1/2 top-[-12rem] -z-10 h-[24rem] w-[48rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[var(--glow)] blur-3xl"
        />
        <div className="container-page py-12 md:py-16">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
            <FiArrowLeft className="size-3.5" aria-hidden />
            All projects
          </Link>

          <div className="fade-in mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap gap-2">
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
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg md:text-5xl">
                {project.name}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-pretty text-muted md:text-xl">{project.tagline}</p>

              {(project.links?.live || project.links?.repo) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {project.links.live && (
                    <a href={project.links.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                      Visit {hostname(project.links.live)}
                      <FiArrowUpRight className="size-4" aria-hidden />
                    </a>
                  )}
                  {project.links.repo && (
                    <a href={project.links.repo} target="_blank" rel="noreferrer" className="btn btn-secondary">
                      <FiGithub className="size-4" aria-hidden />
                      Source code
                    </a>
                  )}
                </div>
              )}
            </div>

            {project.architecture && (
              <div className="card hidden p-6 sm:block lg:col-span-5">
                <p className="mb-5 font-mono text-xs text-subtle">System overview</p>
                <ArchitecturePreview steps={project.architecture} />
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container-page py-12 md:py-16">
        {project.image && (
          <figure className="card mb-12 overflow-hidden p-1.5 md:mb-16">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={1600}
              height={1000}
              sizes="(min-width: 1152px) 1072px, 100vw"
              priority
              className="h-auto w-full rounded-[0.7rem]"
            />
          </figure>
        )}

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="grid gap-10 lg:col-span-8">
            <section>
              <h2 className="sr-only">Overview</h2>
              <p className="text-lg leading-relaxed text-pretty text-fg/90">{project.description}</p>
            </section>

            <Block title="The problem">
              <p className="text-pretty text-muted">{project.problem}</p>
            </Block>

            {project.architecture && (
              <Block title="Architecture">
                <ArchitectureSteps steps={project.architecture} />
              </Block>
            )}

            <Block title="What I built">
              <ul className="check-list text-muted">
                {project.approach.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Block>

            {project.outcomes && project.outcomes.length > 0 && (
              <Block title="Outcome">
                <ul className="check-list text-muted">
                  {project.outcomes.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Block>
            )}
          </div>

          <aside className="lg:col-span-4">
            <div className="card grid gap-6 p-6 lg:sticky lg:top-24">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-5 text-sm lg:grid-cols-1">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-subtle">{fact.label}</dt>
                    <dd className="mt-0.5 font-medium text-fg">{fact.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="border-t border-line pt-5">
                <p className="mb-3 text-sm text-subtle">Stack</p>
                <TechList items={project.stack} size="sm" />
              </div>
            </div>
          </aside>
        </div>

        <nav aria-label="More projects" className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
          {prev ? (
            <Link href={`/projects/${prev.slug}`} className="card card-hover group p-5">
              <span className="flex items-center gap-1.5 text-sm text-subtle">
                <FiArrowLeft className="size-3.5" aria-hidden /> Previous
              </span>
              <span className="mt-1 block font-semibold text-fg">{prev.name}</span>
              <span className="block text-sm text-muted">{prev.tagline}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {next && (
            <Link href={`/projects/${next.slug}`} className="card card-hover group p-5 sm:text-right">
              <span className="flex items-center gap-1.5 text-sm text-subtle sm:justify-end">
                Next <FiArrowRight className="size-3.5" aria-hidden />
              </span>
              <span className="mt-1 block font-semibold text-fg">{next.name}</span>
              <span className="block text-sm text-muted">{next.tagline}</span>
            </Link>
          )}
        </nav>
      </div>
    </article>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { getProject, projects } from "@/content/projects";
import { hostname } from "@/lib/format";
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
    <section className="mt-12">
      <h2 className="section-title !mb-3">{title}</h2>
      {children}
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
      <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
        <FiArrowLeft className="size-3.5" aria-hidden />
        Projects
      </Link>

      <header className="fade-in mt-8">
        <h1 className="text-2xl font-medium tracking-tight text-fg md:text-[1.75rem]">{project.name}</h1>
        <p className="mt-2 text-lg text-muted text-balance">{project.tagline}</p>

        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-line py-5 text-sm sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-subtle">{fact.label}</dt>
              <dd className="mt-0.5 text-fg">{fact.value}</dd>
            </div>
          ))}
        </dl>

        {(project.links?.live || project.links?.repo) && (
          <div className="mt-6 flex flex-wrap gap-3">
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

      {project.image && (
        <figure className="mt-10 overflow-hidden rounded-xl border border-line bg-surface">
          <Image
            src={project.image.src}
            alt={project.image.alt}
            width={1600}
            height={1000}
            sizes="(min-width: 768px) 672px, 100vw"
            priority
            className="h-auto w-full"
          />
        </figure>
      )}

      <Block title="Overview">
        <p className="text-muted">{project.description}</p>
      </Block>

      <Block title="The problem">
        <p className="text-muted">{project.problem}</p>
      </Block>

      <Block title="What I built">
        <ul className="prose-list text-muted">
          {project.approach.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </Block>

      {project.outcomes && project.outcomes.length > 0 && (
        <Block title="Outcome">
          <ul className="prose-list text-muted">
            {project.outcomes.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Block>
      )}

      <Block title="Stack">
        <TechList items={project.stack} />
      </Block>

      <nav aria-label="More projects" className="mt-16 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group">
            <span className="flex items-center gap-1 text-subtle">
              <FiArrowLeft className="size-3.5" aria-hidden /> Previous
            </span>
            <span className="mt-1 block text-fg group-hover:underline">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="group text-right">
            <span className="flex items-center justify-end gap-1 text-subtle">
              Next <FiArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-1 block text-fg group-hover:underline">{next.name}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

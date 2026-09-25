import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import CompanyLogo from "./CompanyLogo";

export default function ExperienceList() {
  return (
    <ol className="grid gap-12">
      {experience.map((job) => {
        const current = !job.end;
        const related = (job.projects ?? []).map(getProject).filter((p) => !!p);

        return (
          <li key={`${job.company}-${job.start}`} className="grid grid-cols-[40px_1fr] gap-x-4">
            <CompanyLogo name={job.company} logo={job.logo} />
            <div className="min-w-0">
              <div className="flex flex-col gap-x-4 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="font-medium tracking-tight text-fg">{job.role}</h3>
                  <p className="text-sm text-muted">
                    {job.companyUrl ? (
                      <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link text-muted">
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                    <span className="text-subtle">
                      {" · "}
                      {job.type}
                      {job.location && ` · ${job.location}`}
                    </span>
                    {current && (
                      <span className="ml-2 inline-flex items-center gap-1.5 align-middle text-xs text-accent">
                        <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                        Current
                      </span>
                    )}
                  </p>
                </div>
                <p className="mt-0.5 shrink-0 font-mono text-xs text-subtle sm:mt-0">
                  <time dateTime={job.start}>{formatPeriod(job.start, job.end)}</time>
                </p>
              </div>

              <p className="mt-3 text-muted">{job.summary}</p>
              <ul className="prose-list mt-3 text-[15px] text-muted">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <p className="mt-4 text-[13px] leading-relaxed text-subtle">
                <span className="sr-only">Technologies: </span>
                {job.stack.join(" · ")}
              </p>

              {related.length > 0 && (
                <p className="mt-2 text-[13px] text-subtle">
                  Projects:{" "}
                  {related.map((project, i) => (
                    <span key={project.slug}>
                      {i > 0 && ", "}
                      <Link href={`/projects/${project.slug}`} className="link text-muted">
                        {project.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

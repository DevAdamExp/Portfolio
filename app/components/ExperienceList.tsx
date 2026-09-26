import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import CompanyLogo from "./CompanyLogo";
import TechList from "./TechList";

export default function ExperienceList() {
  return (
    <ol className="grid gap-14">
      {experience.map((job) => {
        const current = !job.end;
        const related = (job.projects ?? []).map(getProject).filter((p) => !!p);

        return (
          <li key={`${job.company}-${job.start}`} className="grid gap-x-4 sm:grid-cols-[40px_1fr]">
            <div className="hidden sm:block">
              <CompanyLogo name={job.company} logo={job.logo} />
            </div>
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <div className="sm:hidden">
                  <CompanyLogo name={job.company} logo={job.logo} size={36} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold leading-snug tracking-tight text-fg">{job.role}</h3>
                    <p className="text-[15px] text-muted">
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
                        <span className="ml-2 inline-flex items-center gap-1.5 align-middle text-xs font-medium text-accent">
                          <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                          Current
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="mt-0.5 shrink-0 font-mono text-[13px] text-subtle sm:mt-0">
                    <time dateTime={job.start}>{formatPeriod(job.start, job.end)}</time>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-pretty text-fg">{job.summary}</p>
              <ul className="prose-list mt-3 text-muted">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-5">
                <TechList items={job.stack} size="sm" label={`${job.company} stack`} />
              </div>

              {related.length > 0 && (
                <p className="mt-3 text-sm text-subtle">
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

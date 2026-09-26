import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import CompanyLogo from "./CompanyLogo";
import TechList from "./TechList";

/** Work history as a timeline of cards, newest first. */
export default function ExperienceList() {
  return (
    <ol className="relative">
      {experience.map((job, i) => {
        const current = !job.end;
        const last = i === experience.length - 1;
        const related = (job.projects ?? []).map(getProject).filter((p) => !!p);

        return (
          <li
            key={`${job.company}-${job.start}`}
            className="relative pb-4 last:pb-0 sm:grid sm:grid-cols-[2.75rem_1fr] sm:gap-x-5 sm:pb-6"
          >
            {!last && (
              <span aria-hidden className="absolute bottom-0 left-[1.375rem] top-14 hidden w-px bg-line-strong sm:block" />
            )}
            <div className="hidden pt-1 sm:block">
              <CompanyLogo name={job.company} logo={job.logo} highlight={current} />
            </div>

            <article
              className={`card card-hover min-w-0 p-5 sm:p-6 ${current ? "border-accent/30 ring-1 ring-accent/10" : ""}`}
            >
              <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="sm:hidden">
                    <CompanyLogo name={job.company} logo={job.logo} highlight={current} size={40} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-fg">{job.role}</h3>
                    <p className="mt-0.5 text-sm text-muted">
                      {job.companyUrl ? (
                        <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link text-fg">
                          {job.company}
                        </a>
                      ) : (
                        <span className="text-fg">{job.company}</span>
                      )}
                      <span className="text-subtle">
                        {" · "}
                        {job.type}
                        {job.location && ` · ${job.location}`}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {current && (
                    <span className="badge badge-accent">
                      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                      Current
                    </span>
                  )}
                  <span className="badge font-mono">
                    <time dateTime={job.start}>{formatPeriod(job.start, job.end)}</time>
                  </span>
                </div>
              </header>

              <p className="mt-4 text-pretty text-fg/90">{job.summary}</p>

              <ul className="check-list mt-4 text-[15px] text-muted">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-5 border-t border-line pt-4">
                <TechList items={job.stack} size="sm" label={`${job.company} stack`} />
              </div>

              {related.length > 0 && (
                <p className="mt-3 text-[13px] text-subtle">
                  Projects:{" "}
                  {related.map((project, j) => (
                    <span key={project.slug}>
                      {j > 0 && ", "}
                      <Link href={`/projects/${project.slug}`} className="link text-muted">
                        {project.name}
                      </Link>
                    </span>
                  ))}
                </p>
              )}
            </article>
          </li>
        );
      })}
    </ol>
  );
}

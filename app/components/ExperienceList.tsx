import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import CompanyLogo from "./CompanyLogo";
import TechList from "./TechList";

/** Work history as a timeline: a hairline that draws itself as you scroll, with company marks as nodes. */
export default function ExperienceList() {
  return (
    <ol className="timeline relative grid gap-16 before:absolute before:bottom-3 before:left-5 before:top-3 before:hidden before:w-px before:bg-line-strong sm:before:block">
      {experience.map((job) => {
        const current = !job.end;
        const related = (job.projects ?? []).map(getProject).filter((p) => !!p);

        return (
          <li key={`${job.company}-${job.start}`} className="reveal relative grid gap-x-6 sm:grid-cols-[2.5rem_1fr]">
            <div className="relative hidden sm:block">
              <CompanyLogo name={job.company} logo={job.logo} />
              {current && (
                <span className="absolute -right-0.5 -top-0.5 rounded-full bg-bg p-[3px]" aria-hidden>
                  <span className="live-dot block" />
                </span>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-start gap-3">
                <div className="sm:hidden">
                  <CompanyLogo name={job.company} logo={job.logo} size={36} />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-x-6">
                  <div className="min-w-0">
                    <h3 className="item-title">{job.role}</h3>
                    <p className="mt-1 text-small text-muted">
                      {job.companyUrl ? (
                        <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link">
                          {job.company}
                        </a>
                      ) : (
                        <span className="font-medium text-fg">{job.company}</span>
                      )}
                      <span className="text-subtle">
                        {" · "}
                        {job.type}
                        {job.location && ` · ${job.location}`}
                      </span>
                      {current && (
                        <span className="ml-2.5 inline-flex items-center gap-2 align-middle text-xs font-medium text-live">
                          <span className="live-dot" aria-hidden />
                          Current
                        </span>
                      )}
                    </p>
                  </div>
                  <p className="meta shrink-0">
                    <time dateTime={job.start}>{formatPeriod(job.start, job.end)}</time>
                  </p>
                </div>
              </div>

              <p className="measure mt-5 text-fg">{job.summary}</p>
              <ul className="prose-list measure mt-4 text-muted">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-6">
                <TechList items={job.stack} size="sm" label={`${job.company} stack`} />
              </div>

              {related.length > 0 && (
                <p className="mt-4 text-small text-subtle">
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

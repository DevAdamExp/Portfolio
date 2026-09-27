import Link from "next/link";
import { experience } from "@/content/experience";
import { getProject } from "@/content/projects";
import { formatPeriod } from "@/lib/format";
import CompanyLogo from "./CompanyLogo";
import TechList from "./TechList";

/** Work history laid out like a CV: dates on the left, the role and what was delivered on the right. */
export default function ExperienceList() {
  return (
    <ol className="border-t border-line">
      {experience.map((job) => {
        const current = !job.end;
        const related = (job.projects ?? []).map(getProject).filter((p) => !!p);

        return (
          <li
            key={`${job.company}-${job.start}`}
            className="reveal grid gap-x-10 gap-y-3 border-b border-line py-9 md:grid-cols-[11rem_1fr]"
          >
            <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-3">
              <CompanyLogo name={job.company} logo={job.logo} size={36} />
              <p className="meta">
                <time dateTime={job.start}>{formatPeriod(job.start, job.end)}</time>
              </p>
            </div>

            <div className="min-w-0">
              <h3 className="item-title">{job.role}</h3>
              <p className="mt-1 text-small text-muted">
                {job.companyUrl ? (
                  <a href={job.companyUrl} target="_blank" rel="noreferrer" className="link font-medium text-fg">
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
                  <span className="ml-2.5 inline-flex items-center gap-1.5 align-middle text-xs font-medium text-live">
                    <span className="live-dot" aria-hidden />
                    Current
                  </span>
                )}
              </p>

              <p className="measure mt-4 text-fg">{job.summary}</p>
              <ul className="prose-list measure mt-3 text-muted">
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              <div className="mt-5">
                <TechList items={job.stack} size="sm" label={`${job.company} stack`} />
              </div>

              {related.length > 0 && (
                <p className="mt-4 text-small text-subtle">
                  Projects:{" "}
                  {related.map((project, i) => (
                    <span key={project.slug}>
                      {i > 0 && ", "}
                      <Link href={`/projects/${project.slug}`} className="link text-muted hover:text-accent">
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

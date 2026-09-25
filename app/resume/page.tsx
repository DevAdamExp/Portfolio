import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { education, languages } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";
import { formatPeriod, hostname } from "@/lib/format";
import PrintButton from "./PrintButton";
import "./resume.css";

export const metadata: Metadata = {
  title: "CV",
  description: `CV of ${profile.name}, ${profile.title}.`,
};

export default function ResumePage() {
  const jobs = experience.filter((job) => job.onCv !== false);
  const cvProjects = projects.filter((p) => p.onCv);
  const { github, linkedin, website } = profile.links;

  const contact = [
    { text: profile.location },
    { text: profile.email, href: `mailto:${profile.email}` },
    profile.phone && { text: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    github && { text: github.display ?? github.href, href: github.href },
    linkedin && { text: linkedin.display ?? linkedin.href, href: linkedin.href },
    website && { text: website.display ?? website.href, href: website.href },
  ].filter((item) => !!item);

  return (
    <div className="cv-screen">
      <div className="cv-toolbar">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          <FiArrowLeft className="size-3.5" aria-hidden />
          Portfolio
        </Link>
        <div className="flex gap-2">
          <PrintButton />
          <a href={profile.cv.pdf} download className="btn btn-primary">
            <FiDownload className="size-4" aria-hidden />
            Download PDF
          </a>
        </div>
      </div>

      <main className="cv-page">
        <header className="cv-header">
          <div>
            <h1 className="cv-name">{profile.name}</h1>
            <p className="cv-title">{profile.title}</p>
            <p className="cv-contact">
              {contact.map((item, i) => (
                <span key={item.text}>
                  {i > 0 && <span className="cv-sep"> · </span>}
                  {"href" in item && item.href ? <a href={item.href}>{item.text}</a> : item.text}
                </span>
              ))}
            </p>
          </div>
          {profile.cv.showPhoto && profile.photo && (
            <Image src={profile.photo.src} alt={profile.photo.alt} width={88} height={88} className="cv-photo" />
          )}
        </header>

        <section className="cv-section">
          <h2>Summary</h2>
          <p>{profile.cvSummary}</p>
        </section>

        <section className="cv-section">
          <h2>Experience</h2>
          {jobs.map((job) => (
            <article key={`${job.company}-${job.start}`} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {job.role}
                  <span className="cv-at"> — {job.company}</span>
                </h3>
                <p className="cv-date">{formatPeriod(job.start, job.end)}</p>
              </div>
              <ul>
                {job.highlights.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {cvProjects.length > 0 && (
          <section className="cv-section">
            <h2>Selected projects</h2>
            {cvProjects.map((project) => (
              <article key={project.slug} className="cv-entry cv-project">
                <div className="cv-entry-head">
                  <h3>
                    {project.name}
                    <span className="cv-at"> — {project.tagline}</span>
                  </h3>
                  {project.links?.live && (
                    <p className="cv-date">
                      <a href={project.links.live}>{hostname(project.links.live)}</a>
                    </p>
                  )}
                </div>
                <p className="cv-muted">{project.stack.join(", ")}</p>
              </article>
            ))}
          </section>
        )}

        <section className="cv-section">
          <h2>Skills</h2>
          <dl className="cv-skills">
            {skills.map((group) => (
              <div key={group.title}>
                <dt>{group.title}</dt>
                <dd>{group.skills.join(", ")}</dd>
              </div>
            ))}
            <div>
              <dt>Languages</dt>
              <dd>{languages.map((l) => `${l.name} (${l.level})`).join(", ")}</dd>
            </div>
          </dl>
        </section>

        <section className="cv-section">
          <h2>Education</h2>
          {education.map((item) => (
            <article key={item.institution} className="cv-entry">
              <div className="cv-entry-head">
                <h3>
                  {item.program}
                  <span className="cv-at"> — {item.institution}</span>
                </h3>
                <p className="cv-date">{formatPeriod(item.start, item.end)}</p>
              </div>
              {item.details && <p>{item.details}</p>}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

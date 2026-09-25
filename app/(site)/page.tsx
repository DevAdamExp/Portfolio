import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { principles } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import ExperienceList from "../components/ExperienceList";
import ProjectList from "../components/ProjectList";
import Section from "../components/Section";
import SkillsList from "../components/SkillsList";
import SocialLinks from "../components/SocialLinks";

export default function Home() {
  const current = experience.find((job) => !job.end);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section aria-label="Introduction">
        <div className="fade-in flex items-center gap-4">
          {profile.photo && (
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt}
              width={56}
              height={56}
              priority
              className="size-14 rounded-full border border-line object-cover"
            />
          )}
          <div>
            <h1 className="font-medium tracking-tight text-fg">{profile.name}</h1>
            <p className="text-sm text-muted">{profile.title}</p>
          </div>
        </div>

        <p
          className="fade-in mt-8 text-2xl font-medium leading-snug tracking-tight text-balance text-fg md:text-[1.75rem]"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {profile.headline}
        </p>

        <div className="fade-in mt-6 grid gap-4 text-muted" style={{ "--i": 2 } as React.CSSProperties}>
          {profile.bio.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {current && (
          <p className="fade-in mt-6 text-sm text-muted" style={{ "--i": 3 } as React.CSSProperties}>
            <span className="mr-2 inline-block size-1.5 -translate-y-px rounded-full bg-accent align-middle" aria-hidden />
            Currently {current.role} at <span className="text-fg">{current.company}</span>
            {profile.availability && <span className="text-subtle"> · {profile.availability}</span>}
          </p>
        )}

        <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={{ "--i": 4 } as React.CSSProperties}>
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            <FiMail className="size-4" aria-hidden />
            Get in touch
          </a>
          <a href={profile.cv.pdf} className="btn btn-secondary" download>
            <FiDownload className="size-4" aria-hidden />
            Download CV
          </a>
          <SocialLinks className="ml-1" />
        </div>
      </section>

      <Section id="experience" title="Experience">
        <ExperienceList />
      </Section>

      <Section id="projects" title="Selected projects">
        <ProjectList items={featured} />
        <Link href="/projects" className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg">
          All projects
          <FiArrowRight className="size-3.5" aria-hidden />
        </Link>
      </Section>

      <Section id="skills" title="Skills">
        <SkillsList />
      </Section>

      <Section id="approach" title="How I work">
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <li key={principle.title}>
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-medium tracking-tight text-fg">{principle.title}</h3>
              <p className="mt-1.5 text-[15px] text-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" title="Contact">
        <p className="max-w-[34rem] text-xl font-medium leading-snug tracking-tight text-balance text-fg">
          Building something with agents, voice or LLMs? I&apos;d like to hear about it.
        </p>
        <p className="mt-3 text-muted">
          The best way to reach me is email —{" "}
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>
          .
        </p>
      </Section>
    </>
  );
}

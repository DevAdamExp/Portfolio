import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { principles, principlesIntro } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { formatMonth } from "@/lib/format";
import CompanyLogo from "../components/CompanyLogo";
import ExperienceList from "../components/ExperienceList";
import ProjectList from "../components/ProjectList";
import Section from "../components/Section";
import SkillsList from "../components/SkillsList";
import SocialLinks from "../components/SocialLinks";
import TechList from "../components/TechList";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;

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
              width={64}
              height={64}
              priority
              className="size-16 rounded-full border border-line object-cover"
            />
          )}
          <div className="leading-snug">
            <h1 className="text-[17px] font-semibold tracking-tight text-fg">{profile.name}</h1>
            <p className="text-[15px] text-muted">{profile.title}</p>
            <p className="text-sm text-subtle">{profile.location}</p>
          </div>
        </div>

        <p
          className="fade-in mt-10 text-[1.75rem] font-semibold leading-[1.2] tracking-[-0.025em] text-balance text-fg md:text-[2.25rem]"
          style={stagger(1)}
        >
          {profile.headline}
        </p>

        <p className="fade-in mt-5 text-pretty text-muted md:text-lg md:leading-relaxed" style={stagger(2)}>
          {profile.intro}
        </p>

        {current && (
          <a
            href="#experience"
            className="fade-in group mt-8 flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-line-strong"
            style={stagger(3)}
          >
            <CompanyLogo name={current.company} logo={current.logo} />
            <div className="min-w-0 flex-1 leading-snug">
              <p className="font-medium text-fg">{current.role}</p>
              <p className="text-sm text-muted">
                {current.company} · since {formatMonth(current.start)}
                {profile.availability && <span className="text-subtle"> · {profile.availability}</span>}
              </p>
            </div>
            <span className="hidden shrink-0 items-center gap-1.5 text-xs font-medium text-accent sm:inline-flex">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden />
              Current
            </span>
          </a>
        )}

        <div className="fade-in mt-6" style={stagger(4)}>
          <p className="mb-2.5 text-sm text-subtle">Core stack</p>
          <TechList items={profile.coreStack} size="sm" label="Core stack" />
        </div>

        <div className="fade-in mt-8 flex flex-wrap items-center gap-3" style={stagger(5)}>
          <a href={`mailto:${profile.email}`} className="btn btn-primary">
            <FiMail className="size-4" aria-hidden />
            Get in touch
          </a>
          <a href={profile.cv.pdf} className="btn btn-secondary" download>
            <FiDownload className="size-4" aria-hidden />
            Download CV
          </a>
          <SocialLinks />
        </div>
      </section>

      <Section id="experience" title="Experience" description="Roles, scope and what I delivered, most recent first.">
        <ExperienceList />
      </Section>

      <Section
        id="projects"
        title="Selected projects"
        description="Each one links to a write-up of the problem, how the system works and what I built."
      >
        <ProjectList items={featured} />
        <Link
          href="/projects"
          className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-muted transition-colors hover:text-fg"
        >
          All projects
          <FiArrowRight className="size-4" aria-hidden />
        </Link>
      </Section>

      <Section id="skills" title="Skills" description="The tools I use in production, grouped by where they sit in the stack.">
        <SkillsList />
      </Section>

      <Section id="approach" title="How I work" description={principlesIntro}>
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
          {principles.map((principle, i) => (
            <li key={principle.title}>
              <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-semibold tracking-tight text-fg">{principle.title}</h3>
              <p className="mt-1.5 text-[15px] text-pretty text-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="contact" title="Contact">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="max-w-[32rem] text-xl font-semibold leading-snug tracking-tight text-balance text-fg md:text-2xl">
            Building something with agents, voice or LLMs? I&apos;d like to hear about it.
          </p>
          <p className="mt-3 text-pretty text-muted">
            Email is the best way to reach me. I&apos;m happy to talk through architecture, a tricky integration or an
            idea you&apos;re exploring.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <FiMail className="size-4" aria-hidden />
              {profile.email}
            </a>
            <a href={profile.cv.pdf} className="btn btn-secondary" download>
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}

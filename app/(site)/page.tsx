import Link from "next/link";
import { FiActivity, FiArrowRight, FiDownload, FiGitBranch, FiLayers, FiMail, FiSearch } from "react-icons/fi";
import { principles, principlesIntro } from "@/content/education";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import ExperienceList from "../components/ExperienceList";
import Hero from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import Section from "../components/Section";
import SkillsList from "../components/SkillsList";
import SocialLinks from "../components/SocialLinks";

const principleIcons = [FiSearch, FiLayers, FiGitBranch, FiActivity];

export default function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      <Section
        id="experience"
        eyebrow="Experience"
        title="Where I've worked"
        description="From frontend internships to owning agentic AI systems end to end — the scope I've held and what I delivered in each role."
        layout="split"
      >
        <ExperienceList />
      </Section>

      <Section
        id="projects"
        eyebrow="Selected work"
        title="Systems I've designed and shipped"
        description="Each card shows how the system fits together. Open one for the problem, the architecture and what I built."
        action={
          <Link href="/projects" className="btn btn-secondary shrink-0 self-start md:self-auto">
            All projects
            <FiArrowRight className="size-4" aria-hidden />
          </Link>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Section
        id="skills"
        eyebrow="Toolbox"
        title="Skills & technologies"
        description="The tools I use in production, grouped by where they sit in the stack."
      >
        <SkillsList />
      </Section>

      <Section id="approach" eyebrow="Approach" title="How I work" description={principlesIntro}>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle, i) => {
            const Icon = principleIcons[i % principleIcons.length];
            return (
              <li key={principle.title} className="card p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-surface-2 text-fg">
                    <Icon className="size-[18px]" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-semibold tracking-tight text-fg">{principle.title}</h3>
                <p className="mt-2 text-[15px] text-pretty text-muted">{principle.body}</p>
              </li>
            );
          })}
        </ol>
      </Section>

      <section id="contact" aria-labelledby="contact-title" className="border-t border-line py-20 md:py-28">
        <div className="container-page">
          <div className="card relative isolate overflow-hidden px-6 py-12 text-center sm:px-12 sm:py-16">
            <div aria-hidden className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]" />
            <div
              aria-hidden
              className="absolute left-1/2 top-0 -z-10 h-56 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glow)] blur-3xl"
            />
            <p className="eyebrow justify-center">Contact</p>
            <h2
              id="contact-title"
              className="mx-auto mt-3 max-w-2xl text-[1.75rem] font-semibold leading-tight tracking-tight text-balance text-fg md:text-4xl"
            >
              Building something with agents, voice or LLMs? <span className="text-gradient">Let&apos;s talk.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-muted">
              I&apos;m happy to talk through architecture, a tricky integration or an idea you&apos;re exploring. Email is the
              quickest way to reach me.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={`mailto:${profile.email}`} className="btn btn-primary">
                <FiMail className="size-4" aria-hidden />
                {profile.email}
              </a>
              <a href={profile.cv.pdf} className="btn btn-secondary" download>
                <FiDownload className="size-4" aria-hidden />
                Download CV
              </a>
            </div>
            <SocialLinks className="mt-6 justify-center" />
          </div>
        </div>
      </section>
    </>
  );
}

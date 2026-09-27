import Image from "next/image";
import Link from "next/link";
import { FiArrowDown, FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { principles, principlesIntro } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth } from "@/lib/format";
import GrooveArt from "../components/art/GrooveArt";
import ExperienceList from "../components/ExperienceList";
import ProjectPlates from "../components/ProjectPlates";
import Section from "../components/Section";
import SkillsList from "../components/SkillsList";
import SocialLinks from "../components/SocialLinks";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
const list = new Intl.ListFormat("en-GB", { type: "conjunction" });

/** "Statement — the clause after the dash" sets the clause in wine italic. */
function Headline({ text }: { text: string }) {
  const [lead, ...rest] = text.split(" — ");
  if (rest.length === 0) return <>{text}</>;
  return (
    <>
      {lead} — <em>{rest.join(" — ")}</em>
    </>
  );
}

export default function Home() {
  const current = experience.find((job) => !job.end);
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <section
        aria-label="Introduction"
        className="container-page grid-12 items-start gap-y-14 pt-[clamp(2.5rem,1rem+3.5vw,4.5rem)]"
      >
        <div className="col-span-12 lg:col-span-7">
          <div className="fade-in flex items-center gap-3.5">
            {profile.photo && (
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={52}
                height={52}
                priority
                className="size-[3.25rem] rounded-full border border-line object-cover"
              />
            )}
            <div className="leading-snug">
              <h1 className="font-semibold text-fg">{profile.name}</h1>
              <p className="text-small text-subtle">
                {profile.title} · {profile.location}
              </p>
            </div>
          </div>

          <p className="display-hero fade-in mt-9" style={stagger(1)}>
            <Headline text={profile.headline} />
          </p>

          <p className="lead fade-in mt-7 max-w-[34rem]" style={stagger(2)}>
            {profile.intro}
          </p>

          {current && (
            <p
              className="fade-in mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-small text-muted"
              style={stagger(3)}
            >
              <span className="live-dot" aria-hidden />
              <span className="eyebrow">Now</span>
              <span>
                {current.role} at{" "}
                {current.companyUrl ? (
                  <a href={current.companyUrl} target="_blank" rel="noreferrer" className="link text-fg">
                    {current.company}
                  </a>
                ) : (
                  <a href="#experience" className="link text-fg">
                    {current.company}
                  </a>
                )}
                <span className="text-subtle">
                  {" "}
                  · since {formatMonth(current.start)}
                  {profile.availability && ` · ${profile.availability}`}
                </span>
              </span>
            </p>
          )}

          <div className="fade-in mt-9 flex flex-wrap items-center gap-3" style={stagger(4)}>
            <a href={`mailto:${profile.email}`} className="btn btn-primary">
              <FiMail className="size-4" aria-hidden />
              Email me
            </a>
            <a href={profile.cv.pdf} className="btn btn-secondary" download>
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
            <SocialLinks email={false} className="ml-1" />
          </div>

          <a
            href="#work"
            className="fade-in group mt-8 inline-flex items-center gap-2 text-small text-muted transition-colors hover:text-fg"
            style={stagger(5)}
          >
            <span className="grow-underline">See the work</span>
            <FiArrowDown
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-y-0.5"
              aria-hidden
            />
          </a>
        </div>

        <div className="fade-in col-span-12 lg:col-span-5 lg:col-start-8" style={stagger(2)}>
          <GrooveArt />
        </div>
      </section>

      <div className="container-page">
        <Section id="work" title={site.sections.work.title} description={site.sections.work.description}>
          <ProjectPlates items={featured} />
          <Link
            href="/projects"
            className="group mt-12 inline-flex items-center gap-2 font-medium text-fg transition-colors hover:text-accent"
          >
            <span className="grow-underline">All projects</span>
            <FiArrowRight
              className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </Section>

        <Section
          id="experience"
          title={site.sections.experience.title}
          description={site.sections.experience.description}
        >
          <ExperienceList />
        </Section>

        <Section
          id="skills"
          title={site.sections.skills.title}
          description={`${site.sections.skills.description} Day to day: ${list.format(profile.coreStack)}.`}
        >
          <SkillsList />
        </Section>

        <Section id="approach" title={site.sections.approach.title} description={principlesIntro}>
          <ol className="grid gap-x-[var(--gap)] gap-y-12 md:grid-cols-2">
            {principles.map((principle, i) => (
              <li key={principle.title} className="reveal min-w-0 border-t border-line pt-6">
                <p className="font-serif text-[var(--step-3)] leading-none italic text-accent" aria-hidden>
                  {i + 1}.
                </p>
                <h3 className="mt-4 font-serif text-[1.375rem] font-medium leading-tight tracking-[-0.01em] text-fg">
                  {principle.title}
                </h3>
                <p className="mt-2.5 text-muted">{principle.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>
    </>
  );
}

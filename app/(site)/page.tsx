import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiDownload, FiMail } from "react-icons/fi";
import { principles, principlesIntro } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { formatMonth } from "@/lib/format";
import ExperienceList from "../components/ExperienceList";
import ProjectCards from "../components/ProjectCards";
import Section from "../components/Section";
import SkillsList from "../components/SkillsList";
import SocialLinks from "../components/SocialLinks";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
const list = new Intl.ListFormat("en-GB", { type: "conjunction" });

/** "Statement — the clause after the dash" sets the clause in a quieter colour. */
function Headline({ text }: { text: string }) {
  const [lead, ...rest] = text.split(" — ");
  if (rest.length === 0) return <>{text}</>;
  return (
    <>
      {lead} <span className="text-subtle">— {rest.join(" — ")}</span>
    </>
  );
}

export default function Home() {
  const current = experience.find((job) => !job.end);
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="container-page">
      <section aria-label="Introduction" className="pt-[clamp(3rem,2rem+4vw,6rem)]">
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
          <div className="leading-snug">
            <h1 className="font-semibold text-fg">{profile.name}</h1>
            <p className="text-small text-subtle">
              {profile.title} · {profile.location}
            </p>
          </div>
        </div>

        <p className="display-hero fade-in mt-10 max-w-[48rem]" style={stagger(1)}>
          <Headline text={profile.headline} />
        </p>

        <p className="lead fade-in mt-6 max-w-[40rem]" style={stagger(2)}>
          {profile.intro}
        </p>

        {current && (
          <p className="fade-in mt-6 text-small text-muted" style={stagger(3)}>
            <span className="live-dot mr-2.5 align-middle" aria-hidden />
            <span className="eyebrow mr-2">Now</span>
            {current.companyUrl ? (
              <a href={current.companyUrl} target="_blank" rel="noreferrer" className="link text-fg hover:text-accent">
                {current.company}
              </a>
            ) : (
              <a href="#experience" className="link text-fg hover:text-accent">
                {current.company}
              </a>
            )}
            <span className="text-subtle">
              {" "}
              · since {formatMonth(current.start)}
              {profile.availability && ` · ${profile.availability}`}
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
          <div className="ml-1 hidden sm:block">
            <SocialLinks email={false} />
          </div>
        </div>
      </section>

      <Section id="work" title={site.sections.work.title} description={site.sections.work.description}>
        <ProjectCards items={featured} />
        <Link
          href="/projects"
          className="group mt-8 inline-flex items-center gap-1.5 text-small font-medium text-muted transition-colors hover:text-fg"
        >
          All work
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
        description={`${site.sections.skills.description} ${site.dayToDay} ${list.format(profile.coreStack)}.`}
      >
        <SkillsList />
      </Section>

      <Section id="approach" title={site.sections.approach.title} description={principlesIntro}>
        <ol className="grid gap-4 md:grid-cols-2 md:gap-5">
          {principles.map((principle, i) => (
            <li key={principle.title} className="card reveal min-w-0 p-6 md:p-7">
              <p className="meta" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="item-title mt-3">{principle.title}</h3>
              <p className="mt-2 text-muted">{principle.body}</p>
            </li>
          ))}
        </ol>
      </Section>
    </div>
  );
}

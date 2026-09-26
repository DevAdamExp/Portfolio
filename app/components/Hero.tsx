import Image from "next/image";
import { FiArrowRight, FiDownload, FiMapPin } from "react-icons/fi";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import ProfileCard from "./ProfileCard";
import SocialLinks from "./SocialLinks";

function Headline() {
  const { headline, headlineAccent } = profile;
  const at = headlineAccent ? headline.indexOf(headlineAccent) : -1;
  if (!headlineAccent || at === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, at)}
      <span className="text-gradient">{headlineAccent}</span>
      {headline.slice(at + headlineAccent.length)}
    </>
  );
}

/** Numbers derived from content, so they stay true as content changes. */
function stats() {
  const first = [...experience].map((job) => job.start).sort()[0];
  const [year, month] = first.split("-").map(Number);
  const now = new Date();
  const years = Math.floor(((now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month)) / 12);

  return [
    { value: `${years}+`, label: "Years building production software" },
    { value: String(projects.length), label: "Projects delivered" },
    { value: String(projects.filter((p) => p.kind === "AI agent").length), label: "Voice & AI agents built" },
    { value: String(projects.filter((p) => p.status === "Live").length), label: "Platforms live today" },
  ];
}

export default function Hero() {
  const current = experience.find((job) => !job.end);

  return (
    <section aria-label="Introduction" className="relative isolate overflow-hidden">
      <div aria-hidden className="bg-grid fade-mask absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute left-1/2 top-[-14rem] -z-10 h-[28rem] w-[56rem] max-w-[140vw] -translate-x-1/2 rounded-full bg-[var(--glow)] blur-3xl"
      />

      <div className="container-page grid items-center gap-12 pb-16 pt-12 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pb-20 lg:pt-24">
        <div className="min-w-0 lg:col-span-7">
          <div className="fade-in flex items-center gap-3">
            {profile.photo && (
              <Image
                src={profile.photo.src}
                alt={profile.photo.alt}
                width={48}
                height={48}
                priority
                className="size-12 rounded-full border border-line-strong object-cover"
              />
            )}
            <div className="leading-tight">
              <p className="font-semibold text-fg">{profile.name}</p>
              <p className="mt-0.5 text-sm text-muted">{profile.title}</p>
            </div>
          </div>

          <h1
            className="fade-in mt-8 text-[2.5rem] font-semibold leading-[1.06] tracking-[-0.03em] text-balance text-fg sm:text-5xl lg:text-[3.5rem]"
            style={{ "--i": 1 } as React.CSSProperties}
          >
            <Headline />
          </h1>

          <p
            className="fade-in mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {profile.intro}
          </p>

          <ul
            className="fade-in mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"
            style={{ "--i": 3 } as React.CSSProperties}
          >
            <li className="flex items-center gap-2">
              <FiMapPin className="size-4 text-subtle" aria-hidden />
              {profile.location}
            </li>
            {current && (
              <li className="flex items-center gap-2">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inset-0 rounded-full bg-accent opacity-40 motion-safe:animate-ping" />
                  <span className="relative size-2 rounded-full bg-accent" />
                </span>
                <span>
                  {current.role} at <span className="font-medium text-fg">{current.company}</span>
                </span>
              </li>
            )}
          </ul>

          <div
            className="fade-in mt-8 flex flex-wrap items-center gap-3"
            style={{ "--i": 4 } as React.CSSProperties}
          >
            <a href="#projects" className="btn btn-primary">
              View my work
              <FiArrowRight className="size-4" aria-hidden />
            </a>
            <a href={profile.cv.pdf} className="btn btn-secondary" download>
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
            <SocialLinks />
          </div>
        </div>

        <div className="fade-in min-w-0 max-w-xl lg:col-span-5 lg:max-w-none" style={{ "--i": 3 } as React.CSSProperties}>
          <ProfileCard />
        </div>
      </div>

      <div className="container-page pb-16 lg:pb-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats().map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 bg-surface p-5 sm:p-6">
              <dt className="text-sm text-pretty text-muted">{stat.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

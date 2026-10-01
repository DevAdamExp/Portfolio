import Image from "next/image";
import Link from "next/link";
import {
  FiArrowDown,
  FiArrowRight,
  FiArrowUpRight,
  FiBarChart2,
  FiDownload,
  FiFileText,
  FiFolder,
  FiGitBranch,
  FiGithub,
  FiShield,
  FiStar,
  FiTool,
  FiUserCheck,
} from "react-icons/fi";
import { about, ending, habits, hero, journey, proof, proudOf, shippedWith, toolkit, work } from "@/content/about";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Project } from "@/content/types";
import { formatPeriod, hostname } from "@/lib/format";
import { MdFlight } from "react-icons/md";
import BoardingPass from "./components/BoardingPass";
import CountUp from "./components/CountUp";
import SiteHeader from "./components/SiteHeader";
import { TechIcon } from "@/lib/tech";

const v = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** "02 ────────── selected work" */
function SectionHead({ index, note }: { index: string; note: string }) {
  return (
    <div className="section-head mb-7 flex-wrap gap-y-1 sm:flex-nowrap">
      <span className="font-mono text-[13px] tracking-[0.12em]">{index}</span>
      <span className="rule" aria-hidden />
      <span className="hand w-full text-right text-[23px] leading-tight text-muted sm:w-auto sm:text-[26px]">{note}</span>
    </div>
  );
}

/** Splits a word into spans so each letter can rise in turn. */
function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <span className="letters" aria-hidden>
      {[...text].map((ch, i) => (
        <span key={i} style={v({ "--l": offset + i })}>
          {ch}
        </span>
      ))}
    </span>
  );
}

/** Card colours cycle through the palette; text colour follows the fill. */
const cardThemes = [
  { fill: "bg-cobalt text-white", tab: "bg-cobalt text-white", sub: "text-[#dde4ff]", pill: "border-white/50", button: "btn-light", tilt: "1.5deg" },
  { fill: "bg-marigold text-ink", tab: "bg-marigold text-ink", sub: "text-[#2a2a30]", pill: "border-ink", button: "btn-primary", tilt: "-1.5deg" },
];

function FeatureCard({ project, index }: { project: Project; index: number }) {
  const t = cardThemes[index % cardThemes.length];
  const flip = index % 2 === 1;
  return (
    <article className="reveal group">
      <span className={`tab ${t.tab} ${flip ? "md:ml-40" : ""}`}>
        Project {String(index + 1).padStart(2, "0")} · {project.kind === "Product" ? "Product" : "Client work"}
      </span>
      <div
        className={`grid items-center gap-10 rounded-[28px] p-7 sm:p-10 lg:p-14 xl:gap-14 ${t.fill} ${flip ? "md:rounded-tl-[28px] xl:grid-cols-[1.1fr_0.9fr]" : "rounded-tl-none xl:grid-cols-[0.9fr_1.1fr]"}`}
      >
        <div className={flip ? "xl:order-2" : ""}>
          <h3 className="font-display text-[clamp(2.5rem,1.8rem+2.8vw,4rem)] font-extrabold leading-none tracking-[-0.04em]">
            {project.name}
          </h3>
          <p className={`mt-4 text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-relaxed ${t.sub}`}>{project.description}</p>
          <dl className="mt-6 grid gap-x-4 gap-y-1 text-[16px] sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-y-3">
            <dt className={`pt-0.5 font-mono text-[12px] tracking-[0.1em] ${t.sub}`}>MY ROLE</dt>
            <dd className="mb-2 sm:mb-0">{project.role}</dd>
            {project.hardest && (
              <>
                <dt className={`pt-0.5 font-mono text-[12px] tracking-[0.1em] ${t.sub}`}>HARDEST PART</dt>
                <dd className="mb-2 sm:mb-0">{project.hardest}</dd>
              </>
            )}
            <dt className={`pt-0.5 font-mono text-[12px] tracking-[0.1em] ${t.sub}`}>STACK</dt>
            <dd className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((s) => (
                <span key={s} className={`rounded-full border px-2.5 py-0.5 font-mono text-[12px] ${t.pill}`}>
                  {s}
                </span>
              ))}
            </dd>
          </dl>
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links?.live && (
              <a href={project.links.live} target="_blank" rel="noreferrer" className={`btn ${t.button}`}>
                Visit {hostname(project.links.live)}
                <FiArrowUpRight className="nudge-xy size-4" aria-hidden />
              </a>
            )}
            <Link href={`/projects/${project.slug}`} className="btn border-current bg-transparent">
              How it works
              <FiArrowRight className="nudge-x size-4" aria-hidden />
            </Link>
          </div>
        </div>
        <div className={`relative ${flip ? "xl:order-1" : ""}`}>
          <span aria-hidden className="tape left-10 -top-3 z-10 -rotate-6" style={v({ "--tape": flip ? "#ffffff" : "var(--butter)" })} />
          {project.gallery ? (
            <div className="flex flex-col gap-3">
              <div className="browser" style={v({ "--tilt": t.tilt })}>
                <Image
                  src={project.gallery[0].src}
                  alt={project.gallery[0].alt}
                  width={3840}
                  height={2160}
                  sizes="(min-width: 1024px) 620px, 100vw"
                  className="aspect-video w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {project.gallery.slice(1, 3).map((shot) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={3840}
                    height={2160}
                    sizes="(min-width: 1024px) 300px, 50vw"
                    className="aspect-video w-full rounded-xl object-cover shadow-[0_18px_30px_-18px_rgb(0_0_0/0.5)] transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-1"
                  />
                ))}
              </div>
            </div>
          ) : (
            project.image && (
              <div className="browser" style={v({ "--tilt": t.tilt })}>
                <Image src={project.image.src} alt={project.image.alt} width={1600} height={900} sizes="(min-width: 1024px) 560px, 100vw" className="aspect-video w-full object-cover object-top" />
              </div>
            )
          )}
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project, index, tone }: { project: Project; index: number; tone: "white" | "mint" }) {
  const fill = tone === "mint" ? "bg-mint" : "bg-surface";
  return (
    <article className="reveal group">
      <span className={`tab border-[1.5px] border-b-0 border-ink ${fill}`}>
        Project {String(index + 1).padStart(2, "0")}
      </span>
      <div className={`lift rounded-[28px] rounded-tl-none border-[1.5px] border-ink p-6 sm:p-8 ${fill}`}>
        {project.image && (
          <div className="overflow-hidden rounded-[14px] border border-line">
            <Image
              src={project.image.src}
              alt={project.image.alt}
              width={project.gallery ? 3840 : 1600}
              height={project.gallery ? 2160 : 1000}
              sizes="(min-width: 768px) 560px, 100vw"
              className={`${project.gallery ? "aspect-video" : "aspect-[16/10]"} w-full object-cover object-top transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]`}
            />
          </div>
        )}
        <h3 className="mt-6 font-display text-[clamp(1.875rem,1.6rem+1vw,2.375rem)] font-extrabold leading-none tracking-[-0.035em]">
          {project.name}
        </h3>
        <p className="mt-3 text-[17px] text-muted">{project.description}</p>
        {project.hardest && (
          <p className="mt-4 rounded-xl bg-paper/80 px-4 py-3 text-[15px]">
            <span className="font-mono text-[12px] tracking-[0.1em]">HARDEST PART · </span>
            {project.hardest}
          </p>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-[12px] text-subtle">{project.client?.replace("Built at ", "").toUpperCase()}</span>
          {project.links?.live && (
            <a href={project.links.live} target="_blank" rel="noreferrer" className="link -my-2 inline-flex items-center gap-1 py-2 font-semibold">
              {hostname(project.links.live)}
              <FiArrowUpRight className="size-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const habitIcons = [FiGitBranch, FiTool, FiShield, FiBarChart2];
const habitTints = ["bg-sky", "bg-butter", "bg-marigold", "bg-mint"];
const stepIcons = [FiFileText, FiShield, FiUserCheck];
const stepStyles = [
  { box: "border border-[#3a3a44] bg-[#23232a]", icon: "bg-sky text-ink", label: "text-sky" },
  { box: "bg-marigold text-ink", icon: "bg-ink text-marigold", label: "" },
  { box: "bg-mint text-ink", icon: "bg-ink text-mint", label: "" },
];

export default function Home() {
  const featured = projects.filter((p) => p.featured);
  const crm = projects.find((p) => p.slug === "visa-crm");
  const more = projects.filter((p) => !p.featured && p.slug !== "visa-crm");
  const [nameFirst, ...nameRest] = profile.name.split(" ");
  const nameLast = nameRest.join(" ");

  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* ─── HERO ─────────────────────────────────────────────────────── */}
        <section className="container-page grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.32fr_0.68fr] lg:gap-20 lg:pb-20">
          <div>
            <p className="hand fade-in flex items-end gap-2 text-[30px] text-muted" style={v({ "--i": 0 })}>
              {hero.hello}
              <svg width="62" height="34" viewBox="0 0 70 40" fill="none" stroke="var(--cobalt)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 8c18-4 40 2 54 22" />
                <path d="M48 28l10 3 1-11" />
              </svg>
            </p>
            <h1 className="display-hero mt-2" aria-label={profile.name}>
              <Letters text={nameFirst} />
              <br />
              <Letters text={nameLast} offset={nameFirst.length} />
            </h1>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
              <div className="hand flex flex-col text-[24px] text-[#77777f]">
                {hero.oldTitles.map((title, i) => (
                  <span key={title} className="strike w-fit" style={v({ "--d": `${900 + i * 300}ms`, paddingLeft: i * 14 })}>
                    {title}
                  </span>
                ))}
              </div>
              <svg width="50" height="22" viewBox="0 0 56 24" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="fade-in" style={v({ "--i": 12 })}>
                <path d="M2 14c14-8 30-8 48-2" />
                <path d="M42 5l9 7-10 5" />
              </svg>
              <div className="pop" style={v({ "--d": "1600ms" })}>
                <p className="rounded-2xl border-[1.5px] border-ink bg-surface px-4 py-2.5 font-display text-[clamp(1.25rem,1.05rem+0.8vw,1.625rem)] font-bold leading-tight tracking-[-0.02em] shadow-[4px_4px_0_var(--shadow-ink)]">
                  {hero.role}
                </p>
                <p className="hand mt-2 pl-2 text-[22px] text-cobalt">{hero.roleLine}</p>
              </div>
            </div>

            <p className="lead fade-in mt-9 max-w-[38rem]" style={v({ "--i": 4 })}>
              {hero.promise}
            </p>

            <div className="fade-in mt-9 grid grid-cols-2 items-center gap-3 sm:flex sm:flex-wrap" style={v({ "--i": 5 })}>
              <a href="#work" className="btn btn-primary">
                See my work
                <FiArrowDown className="nudge-y shrink-0 size-[18px]" aria-hidden />
              </a>
              <a href={profile.cv.pdf} download className="btn btn-secondary">
                <FiDownload className="nudge-y shrink-0 size-[18px]" aria-hidden />
                Download CV
              </a>
              <a
                href="#relocate"
                className="group col-span-2 inline-flex items-center justify-center gap-2.5 rounded-full sm:ml-1 sm:justify-start border-[1.5px] border-dashed border-ink/50 bg-surface py-2 pl-3 pr-4 text-[14.5px] transition-colors hover:border-solid hover:border-ink"
              >
                <span className="font-mono text-[12px] tracking-[0.1em]">ISB</span>
                <MdFlight className="size-4 rotate-90 text-cobalt transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1" aria-hidden />
                <span className="font-mono text-[12px] tracking-[0.1em] text-cobalt">YOU</span>
                <span className="text-subtle">· ready to relocate</span>
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[17.5rem] px-3 pb-8 pt-6 sm:max-w-[22rem] lg:max-w-none">
            <span aria-hidden className="tape tape-in left-12 top-2 -rotate-[7deg]" style={v({ "--d": "1100ms" })} />
            <span aria-hidden className="tape tape-in right-8 top-0 rotate-[8deg]" style={v({ "--tape": "var(--sky)", "--d": "1250ms" })} />
            <figure className="polaroid settle" style={v({ "--tilt": "2deg", "--d": "250ms" })}>
              <Image
                src={profile.photo?.src ?? "/images/portrait.jpg"}
                alt={profile.photo?.alt ?? profile.name}
                width={880}
                height={1100}
                priority
                sizes="(min-width: 1024px) 360px, 80vw"
                className="aspect-[4/5] w-full object-cover object-[50%_30%]"
              />
              <figcaption>{hero.photoCaption}</figcaption>
            </figure>
            <p className="note-card pop absolute -left-4 bottom-[7.75rem] w-36 px-3.5 py-2.5 text-[20px] sm:-left-14 sm:bottom-28 sm:w-40 sm:px-4 sm:py-3 sm:text-[22px]" style={v({ "--d": "1900ms" })}>
              {hero.sticky}
            </p>
          </div>
        </section>

        {/* ─── PROOF ────────────────────────────────────────────────────── */}
        <section aria-label="At a glance" className="container-page pb-[var(--space-section)]">
          <div className="reveal grid grid-cols-2 overflow-hidden rounded-[22px] border-[1.5px] border-ink bg-surface md:grid-cols-4">
            {proof.map((p, i) => (
              <div
                key={p.label}
                className={`px-6 py-6 sm:px-7 ${p.highlight ? "bg-ink text-paper" : ""} ${i < 3 ? "md:border-r md:border-line" : ""} ${i % 2 === 0 ? "border-r border-line md:border-r" : ""} ${i < 2 ? "border-b border-line md:border-b-0" : ""}`}
              >
                <p className="count font-display text-[clamp(2.25rem,1.9rem+1.3vw,3rem)] font-extrabold leading-none tracking-[-0.04em]">
                  <CountUp value={p.value} suffix={p.suffix} />
                </p>
                <p className={`mt-2 text-[15px] ${p.highlight ? "text-band-muted" : "text-muted"}`}>{p.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-6">
            <span className="shrink-0 font-mono text-[12px] tracking-[0.12em] text-subtle">SHIPPED WITH</span>
            <div className="ticker flex-1" aria-label={`Shipped with ${shippedWith.join(", ")}`}>
              {[0, 1].map((copy) => (
                <ul key={copy} className="ticker-track" aria-hidden={copy === 1}>
                  {shippedWith.map((name) => (
                    <li key={name} className="flex items-center gap-10 whitespace-nowrap font-display text-[21px] font-bold text-muted">
                      {name}
                      <FiStar className="size-3.5 text-[#b0ada4]" aria-hidden />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* ─── 01 PROUD PROJECT ─────────────────────────────────────────── */}
        <section id="proud" className="container-page pb-[var(--space-section)]">
          <SectionHead index="01" note={proudOf.note} />
          <span className="tab bg-marigold">
            <FiStar className="size-3.5 fill-ink" aria-hidden />A project I’m proud of
          </span>
          <div className="keep-dark reveal grid gap-12 rounded-[28px] rounded-tl-none bg-ink p-7 text-paper sm:p-10 lg:p-16 xl:grid-cols-2 xl:gap-16">
            <div className="flex flex-col">
              <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-band-muted">{proudOf.meta}</p>
              <h2 className="mt-5 font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.75rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">
                {proudOf.title}
              </h2>
              <h3 className="mt-4 font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-semibold leading-snug tracking-[-0.015em] text-marigold">
                {proudOf.titleAccent}
              </h3>
              {proudOf.paragraphs.map((p) => (
                <p key={p} className="mt-6 text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-[1.7] text-[#d9d9df]">
                  {p}
                </p>
              ))}
              <div className="mt-auto flex flex-wrap items-center gap-4 pt-10">
                <Link href="/projects/visa-crm" className="btn btn-light">
                  Read the case study
                  <FiArrowRight className="nudge-x size-[18px]" aria-hidden />
                </Link>
                <span className="text-[15px] text-band-muted">Private build · walkthrough on request</span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative flex flex-col gap-3">
                {/* a dot runs down the decision flow */}
                <span aria-hidden className="pointer-events-none absolute left-[2.6rem] top-0 h-full w-0">
                  <span className="flow-dot absolute -left-[5px] size-2.5 rounded-full bg-marigold shadow-[0_0_0_4px_rgb(241_181_46/0.25)]" />
                </span>
                {proudOf.steps.map((step, i) => {
                  const Icon = stepIcons[i];
                  const s = stepStyles[i];
                  return (
                    <div key={step.title}>
                      <div className={`reveal-x grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-4 rounded-[18px] p-5 sm:p-6 ${s.box} ${i === 1 ? "-rotate-1" : ""}`}>
                        <span className={`grid size-11 place-items-center rounded-xl ${s.icon}`}>
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <div>
                          <p className={`font-mono text-[12px] uppercase tracking-[0.1em] ${s.label}`}>
                            {String(i + 1).padStart(2, "0")} · {step.title}
                          </p>
                          <p className="mt-1 text-[17px] font-semibold leading-snug">{step.body}</p>
                        </div>
                      </div>
                      {step.note && <p className="hand pl-14 pt-2 text-[21px] text-band-muted">↓ {step.note}</p>}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 grid gap-2 sm:grid-cols-3 sm:gap-2.5">
                {proudOf.facts.map((f) => (
                  <div key={f.label} className="flex items-baseline justify-between gap-4 rounded-2xl border border-[#3a3a44] px-4 py-3 sm:block sm:p-4">
                    <p className="shrink-0 font-display text-[clamp(1.25rem,1rem+0.8vw,1.75rem)] font-extrabold tracking-[-0.03em]">{f.value}</p>
                    <p className="text-right text-[13.5px] leading-snug text-band-muted sm:mt-1 sm:text-left">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {crm?.gallery && (
            <div className="mt-6">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                {crm.gallery.map((shot, i) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    width={3840}
                    height={2160}
                    sizes="(min-width: 640px) 400px, 100vw"
                    className={`reveal aspect-video w-full rounded-xl border-[1.5px] border-ink object-cover shadow-[4px_4px_0_var(--shadow-ink)] sm:rounded-2xl sm:shadow-[5px_5px_0_var(--shadow-ink)] ${i === 0 ? "col-span-2 sm:col-span-1" : ""} ${["-rotate-1", "rotate-[0.5deg]", "rotate-1"][i]}`}
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-[12px] tracking-[0.08em] text-subtle">SCREENS FROM A DEMO TENANT WITH FICTIONAL DATA<span className="hidden sm:inline"> · THE REAL SYSTEM IS PRIVATE</span></p>
            </div>
          )}
        </section>

        {/* ─── 02 SELECTED WORK ─────────────────────────────────────────── */}
        <section id="work" className="container-page pb-[var(--space-section)]">
          <SectionHead index="02" note={work.note} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-page">{work.title}</h2>
            <p className="max-w-[24rem] text-[17px] text-muted">{work.intro}</p>
          </div>

          <div className="mt-14 flex flex-col gap-10">
            {featured.slice(0, 2).map((project, i) => (
              <FeatureCard key={project.slug} project={project} index={i} />
            ))}
            <div className="grid gap-8 md:grid-cols-2">
              {featured.slice(2, 4).map((project, i) => (
                <SmallCard key={project.slug} project={project} index={i + 2} tone={i === 0 ? "white" : "mint"} />
              ))}
            </div>
          </div>

          <div className="mt-20 grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-14">
            <div>
              <h3 className="font-display text-[clamp(2rem,1.7rem+1vw,2.5rem)] font-bold tracking-[-0.03em]">{work.moreTitle}</h3>
              <p className="mt-3 text-[17px] text-muted">{work.moreIntro}</p>
              <p className="hand mt-5 -rotate-2 text-[24px] text-cobalt">{work.moreNote} →</p>
            </div>
            <ul className="border-t-[1.5px] border-ink">
              {more.map((project) => {
                const tag =
                  project.kind === "AI agent"
                    ? { text: "Voice AI", cls: "bg-sky" }
                    : project.status === "Private"
                      ? { text: "Under NDA", cls: "bg-blush" }
                      : { text: "Website", cls: "bg-butter" };
                return (
                  <li key={project.slug} className="reveal">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="group grid grid-cols-[1.75rem_minmax(0,1fr)] items-center gap-x-4 gap-y-2 border-b border-line py-5 transition-colors hover:bg-surface sm:grid-cols-[2rem_minmax(0,1fr)_7.5rem_1.5rem] sm:px-2"
                    >
                      <FiFolder className="row-span-2 size-6 self-start mt-0.5 sm:row-span-1 sm:mt-0 sm:self-center transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-rotate-12 group-hover:scale-110" aria-hidden />
                      <span>
                        <span className="block text-[19px] font-semibold">{project.name}</span>
                        <span className="block text-[15px] text-muted">{project.tagline}</span>
                      </span>
                      <span className={`col-start-2 justify-self-start rounded-md px-2.5 py-1 font-mono text-[12px] uppercase sm:col-start-auto tracking-[0.08em] ${tag.cls}`}>
                        {tag.text}
                      </span>
                      <FiArrowRight className="hidden size-[18px] text-subtle transition-transform duration-300 group-hover:translate-x-1 sm:block" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ─── 03 HOW I BUILD ───────────────────────────────────────────── */}
        <section id="how" className="container-page pb-[var(--space-section)]">
          <SectionHead index="03" note={habits.note} />
          <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-14">
            <h2 className="display-page">{habits.title}</h2>
            <p className="text-[18px] text-muted">{habits.intro}</p>
          </div>
          <div className="relative mt-14">
            <svg aria-hidden viewBox="0 0 100 10" preserveAspectRatio="none" className="ants absolute inset-x-[6%] top-[30px] hidden h-6 w-[88%] xl:block" fill="none" stroke="var(--edge)" strokeWidth="1.5" strokeDasharray="6 6" strokeLinecap="round">
              <path vectorEffect="non-scaling-stroke" d="M0 5 C 15 0, 20 10, 33 5 S 52 0, 66 5 S 85 10, 100 5" />
            </svg>
            <ol className="no-scrollbar relative -mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 xl:grid-cols-4">
              {habits.items.map((h, i) => {
                const Icon = habitIcons[i];
                const dark = "dark" in h && h.dark;
                return (
                  <li
                    key={h.title}
                    className={`reveal lift flex w-[84%] shrink-0 snap-start flex-col gap-3.5 rounded-[22px] border-[1.5px] border-ink p-6 sm:w-auto ${dark ? "keep-dark bg-ink text-paper" : "bg-surface"}`}
                    style={v({ animationDelay: `${i * 60}ms` })}
                  >
                    <span className={`grid size-[60px] place-items-center rounded-2xl border-[1.5px] ${dark ? "border-marigold" : "border-ink"} ${habitTints[i]} text-ink`}>
                      <Icon className="size-7" aria-hidden />
                    </span>
                    <p className={`font-mono text-[12px] tracking-[0.1em] ${dark ? "text-band-muted" : "text-subtle"}`}>{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-display text-[25px] font-bold leading-[1.15] tracking-[-0.02em]">{h.title}</h3>
                    <p className={`text-[16px] ${dark ? "text-[#d9d9df]" : "text-muted"}`}>{h.body}</p>
                    <p className={`mt-auto rounded-xl px-3.5 py-3 text-[14.5px] leading-normal ${dark ? "bg-[#23232a] text-[#d9d9df]" : "bg-paper"}`}>
                      <span className={`hand mr-1 text-[20px] ${dark ? "text-marigold" : "text-cobalt"}`}>in practice:</span>
                      {h.practice}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="hand mt-2 text-right text-[21px] text-subtle sm:hidden" aria-hidden>swipe for more →</p>
          </div>
        </section>

        {/* ─── 04 ABOUT ─────────────────────────────────────────────────── */}
        <section id="about" className="container-page pb-[var(--space-section)]">
          <SectionHead index="04" note={about.note} />
          <div className="grid items-center gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-22">
            <div className="relative mx-auto w-full max-w-[22rem] pt-5 lg:max-w-none">
              <span aria-hidden className="tape left-1/2 top-1 -ml-14 -rotate-3" style={v({ "--tape": "var(--blush)" })} />
              <figure className="polaroid reveal float" style={v({ "--tilt": "-3deg" })}>
                <Image
                  src="/images/outdoors.jpg"
                  alt="Muhammad looking out over a misty valley"
                  width={750}
                  height={1000}
                  sizes="(min-width: 1024px) 340px, 80vw"
                  className="aspect-[3/4] w-full object-cover"
                />
                <figcaption>{about.photoCaption}</figcaption>
              </figure>
            </div>
            <div>
              <h2 className="font-display text-[clamp(2.25rem,1.6rem+2.6vw,3.625rem)] font-bold leading-none tracking-[-0.04em]">
                {about.title}{" "}
                <span className="relative inline-block text-cobalt">
                  {about.titleAccent}
                  <svg aria-hidden className="scribble absolute -bottom-3 left-0 h-4 w-full" viewBox="0 0 300 16" preserveAspectRatio="none" fill="none" stroke="var(--marigold)" strokeWidth="5" strokeLinecap="round">
                    <path d="M4 11C60 4 120 3 180 7S270 12 296 6" />
                  </svg>
                </span>
              </h2>
              <div className="mt-8 flex max-w-[40rem] flex-col gap-5 text-[clamp(1.0625rem,1rem+0.3vw,1.1875rem)] leading-[1.7] text-muted">
                {about.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <div className="mt-8 max-w-[40rem] rounded-2xl border-[1.5px] border-ink bg-surface px-5 py-4">
                <p className="font-mono text-[12px] tracking-[0.1em] text-subtle">LOOKING FOR</p>
                <p className="mt-1 font-semibold">{about.lookingFor}</p>
              </div>
            </div>
          </div>
          <div className="reveal mt-12">
            <BoardingPass name={profile.name} />
          </div>
        </section>

        {/* ─── FIT ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="fit-title" className="container-page -mt-[calc(var(--space-section)/2)] pb-[var(--space-section)]">
          <h3 id="fit-title" className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-bold tracking-[-0.025em]">{about.fitTitle}</h3>
          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            {about.fit.map((f, i) => (
              <li key={f.need} className="reveal lift rounded-[22px] border-[1.5px] border-ink bg-surface p-6" style={v({ animationDelay: `${i * 60}ms` })}>
                <p className="hand text-[22px] text-cobalt">you: “{f.need.toLowerCase()}”</p>
                <p className="mt-3 text-[16.5px] leading-relaxed">{f.answer}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── 05 JOURNEY ───────────────────────────────────────────────── */}
        <section id="journey" className="container-page pb-[var(--space-section)]">
          <SectionHead index="05" note={journey.note} />
          <h2 className="display-page">{journey.title}</h2>
          <div className="relative mt-14">
            {/* Winding path on desktop, straight line on mobile */}
            <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="draw-down absolute inset-0 hidden h-full w-full md:block" fill="none" stroke="var(--ink)" strokeWidth="1.6" strokeDasharray="7 7" strokeLinecap="round">
              <path vectorEffect="non-scaling-stroke" d="M28 3 C 60 3, 72 9, 72 17 S 30 25, 28 32 S 70 41, 72 48 S 30 57, 28 63 S 70 73, 72 80 S 40 92, 28 97" />
            </svg>
            <span aria-hidden className="draw-down absolute bottom-0 left-[11px] top-0 border-l-2 border-dashed border-ink md:hidden" />
            <ol className="relative flex flex-col gap-8 md:gap-12">
              {experience.map((job, i) => {
                const right = i % 2 === 1;
                const current = !job.end;
                const first = i === experience.length - 1;
                return (
                  <li key={`${job.company}-${job.start}`} className="grid gap-4 pl-9 md:grid-cols-2 md:gap-18 md:pl-0">
                    <div
                      className={`reveal lift relative rounded-[22px] border-[1.5px] border-ink p-6 shadow-[6px_6px_0_var(--shadow-ink)] sm:p-7 ${first ? "bg-butter" : "bg-surface"} ${right ? "md:col-start-2" : ""}`}
                    >
                      <span aria-hidden className="absolute -left-[33px] top-8 size-3.5 rounded-full border-2 border-ink bg-paper md:hidden" />
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h3 className="font-display text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] font-extrabold tracking-[-0.025em]">{job.company}</h3>
                        {current ? (
                          <span className="rounded-md bg-mint px-2 py-0.5 font-mono text-[12px] tracking-[0.08em]">NOW</span>
                        ) : (
                          <span className="font-mono text-[12px] text-subtle">{formatPeriod(job.start, job.end).toUpperCase()}</span>
                        )}
                      </div>
                      <p className="mt-1 text-[16.5px] font-semibold">
                        {job.role}
                        {job.type === "Contract" && <span className="font-normal text-subtle"> · contract</span>}
                        {current && <span className="font-normal text-subtle"> · since {formatPeriod(job.start).replace(" – Present", "")}</span>}
                      </p>
                      <p className="mt-2.5 text-[16px] text-muted">{job.summary}</p>
                    </div>
                    {job.note && (
                      <p className={`hand hidden items-center self-center text-[25px] text-muted md:flex ${right ? "md:col-start-1 md:row-start-1 md:justify-end md:rotate-2" : "md:-rotate-2"}`}>
                        <span className="bg-paper px-3 py-1">{right ? `${job.note} →` : `← ${job.note}`}</span>
                      </p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ─── 06 TOOLKIT ───────────────────────────────────────────────── */}
        <section id="toolkit" className="container-page pb-[var(--space-section)]">
          <SectionHead index="06" note={toolkit.note} />
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="display-page">{toolkit.title}</h2>
            <div className="max-w-[26rem]">
              <p className="text-[17px] text-muted">{toolkit.intro}</p>
              <p className="mt-3 inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-subtle">
                <span className="size-2.5 rounded-full border-[1.5px] border-ink bg-marigold" aria-hidden />
                DAILY DRIVER
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {toolkit.layers.map((layer, li) => (
              <article
                key={layer.name}
                className="reveal lift rounded-[24px] border-[1.5px] border-ink bg-surface p-5 sm:p-7"
                style={v({ animationDelay: `${li * 60}ms` })}
              >
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <span className={`inline-block rounded-md border-[1.5px] border-ink px-2.5 py-1 font-mono text-[12px] uppercase tracking-[0.1em] ${layer.tint}`}>
                      {layer.name}
                    </span>
                    <p className="mt-3 text-[15.5px] text-muted">{layer.line}</p>
                  </div>
                  <span className="font-display text-[34px] font-extrabold leading-none tracking-[-0.04em] text-[#d6d2c8]" aria-hidden>
                    {String(li + 1).padStart(2, "0")}
                  </span>
                </header>
                <ul className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:grid-cols-4 sm:gap-2.5 lg:grid-cols-5">
                  {layer.tools.map((tool) => {
                    const daily = toolkit.daily.includes(tool);
                    return (
                      <li
                        key={tool}
                        className={`group relative flex flex-col items-center gap-1.5 rounded-xl border px-1.5 pb-2.5 pt-3 text-center sm:gap-2 sm:rounded-2xl sm:pb-3 sm:pt-4 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-spring)] hover:-translate-y-1 hover:border-ink hover:shadow-[3px_3px_0_var(--shadow-ink)] ${daily ? "border-ink bg-paper" : "border-line bg-surface"}`}
                      >
                        {daily && (
                          <span className="absolute right-2 top-2 size-2.5 rounded-full border-[1.5px] border-ink bg-marigold" aria-label="Daily driver" />
                        )}
                        <span className="grid size-9 place-items-center sm:size-11 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6">
                          <TechIcon name={tool} className="size-7 object-contain sm:size-9" />
                        </span>
                        <span className="text-[12.5px] font-medium leading-tight">{tool}</span>
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ─── THE END ──────────────────────────────────────────────────── */}
        <section id="contact" aria-labelledby="end-title" className="container-page pb-16">
          <div className="reveal grid items-end gap-12 rounded-[32px] border-[1.5px] border-ink bg-surface p-8 shadow-[8px_8px_0_var(--shadow-ink)] sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:p-18">
            <div>
              <h2 id="end-title" className="font-display text-[clamp(2.75rem,1.8rem+4vw,5.625rem)] font-extrabold leading-[0.92] tracking-[-0.05em]">
                {ending.title}
              </h2>
              <p className="mt-3 font-display text-[clamp(1.5rem,1.2rem+1.3vw,2.5rem)] font-medium tracking-[-0.02em] text-[#6b6b73]">{ending.subtitle}</p>
              <p className="hand mt-9 flex max-w-[34rem] -rotate-[1.5deg] items-end gap-3 text-[clamp(1.5rem,1.3rem+0.6vw,1.75rem)] text-cobalt">
                {ending.note}
                <svg width="76" height="34" viewBox="0 0 80 36" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="hidden shrink-0 sm:block">
                  <path d="M3 26c22 6 46 2 66-16" />
                  <path d="M58 8l12 1-3 12" />
                </svg>
              </p>
            </div>
            <div className="flex flex-col gap-5 lg:text-right">
              <div>
                <p className="text-[15px] text-subtle">Mail me</p>
                <a href={`mailto:${profile.email}`} className="link -my-2 inline-block py-2 font-display text-[clamp(1.1875rem,0.95rem+1.1vw,2rem)] font-bold tracking-[-0.02em]">
                  {profile.email}
                </a>
              </div>
              <div>
                <p className="text-[15px] text-subtle">Based in</p>
                <p className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-bold">{profile.location}</p>
              </div>
              <div>
                <p className="text-[15px] text-subtle">Open to</p>
                <p className="font-display text-[clamp(1.25rem,1.1rem+0.6vw,1.625rem)] font-bold">{ending.openTo}</p>
              </div>
              <div className="mt-2 flex flex-wrap gap-3 lg:justify-end">
                {profile.links.github && (
                  <a href={profile.links.github.href} aria-label="GitHub" className="grid size-[52px] place-items-center rounded-full bg-ink text-paper transition-transform duration-300 ease-[var(--ease-spring)] hover:-rotate-12">
                    <FiGithub className="size-[22px]" aria-hidden />
                  </a>
                )}
                <a href={profile.cv.pdf} download className="btn btn-highlight pl-2">
                  <span className="grid size-10 place-items-center rounded-full bg-ink text-paper">
                    <FiDownload className="nudge-y size-[18px]" aria-hidden />
                  </span>
                  Download CV
                </a>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-col gap-2 font-mono text-[12px] tracking-[0.08em] text-subtle sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} {profile.name.toUpperCase()}</span>
            <span>DESIGNED &amp; BUILT IN ISLAMABAD</span>
            <Link href="/resume" className="link -my-2.5 inline-block py-2.5">READ THE CV ONLINE</Link>
          </div>
        </section>
      </main>
    </>
  );
}

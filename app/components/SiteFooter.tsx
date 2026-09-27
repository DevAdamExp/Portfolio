import Link from "next/link";
import { FiArrowUpRight, FiDownload } from "react-icons/fi";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import Horizon from "./art/Horizon";
import MotionToggle from "./MotionToggle";
import SocialLinks from "./SocialLinks";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/resume", label: "CV" },
];

/** Every page ends with the velvet contact band, then a quiet footer. */
export default function SiteFooter() {
  const updated = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <footer className="mt-[var(--space-section)]">
      <section id="contact" aria-labelledby="contact-title" className="bg-band text-band-fg">
        <div className="container-page reveal pt-[var(--space-section)] pb-10">
          <p className="eyebrow text-band-muted">{site.contact.eyebrow}</p>
          <h2 id="contact-title" className="display-page mt-4 max-w-[18ch] text-band-fg">
            {site.contact.heading}
          </h2>
          <p className="mt-6 max-w-[36rem] text-lead leading-[1.55] text-band-muted">{site.contact.body}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-flex max-w-full items-center gap-2 font-serif text-step-2 italic text-band-fg underline decoration-band-muted/50 decoration-1 underline-offset-[0.2em] transition-colors hover:decoration-band-fg [overflow-wrap:anywhere]"
          >
            <span className="min-w-0">{profile.email}</span>
            <FiArrowUpRight className="size-5 shrink-0" aria-hidden />
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={profile.cv.pdf} className="btn btn-ghost" download>
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
            <SocialLinks tone="band" email={false} className="ml-1" />
          </div>
        </div>
        <Horizon />
      </section>

      <div className="container-page grid gap-8 py-12 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="font-serif text-[1.25rem] font-medium tracking-[-0.01em] text-fg">{profile.name}</p>
          <p className="mt-1 text-small text-subtle">
            {profile.title} · {profile.location}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2 text-small text-muted">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
          </nav>
          <SocialLinks className="-ml-2.5 sm:-mr-2.5 sm:ml-0" />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page meta flex flex-wrap gap-x-2 py-6">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span aria-hidden>·</span>
          <span>Last updated {updated}</span>
          <span className="motion-toggle" aria-hidden>
            ·
          </span>
          <span className="motion-toggle">
            Motion: <MotionToggle className="link" />
          </span>
        </p>
      </div>
    </footer>
  );
}

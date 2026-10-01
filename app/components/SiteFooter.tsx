import Link from "next/link";
import { FiDownload, FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";
import { site } from "@/content/site";
import SocialLinks from "./SocialLinks";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#how", label: "How I work" },
  { href: "/#journey", label: "Journey" },
  { href: "/resume", label: "CV" },
];

/** Every inner page ends with the ink contact card, then a quiet footer. */
export default function SiteFooter() {
  const updated = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <footer className="mt-[var(--space-section)]">
      <section id="contact" aria-labelledby="contact-title" className="container-page">
        <div className="keep-dark reveal rounded-3xl bg-band px-6 py-12 text-band-fg sm:px-12 sm:py-16">
          <p className="eyebrow text-band-muted">{site.contact.eyebrow}</p>
          <h2 id="contact-title" className="display-page mt-4 max-w-[20ch] text-band-fg">
            {site.contact.heading}
          </h2>
          <p className="mt-5 max-w-[36rem] text-lead leading-[1.6] text-band-muted">{site.contact.body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-light max-w-full">
              <FiMail className="size-4 shrink-0" aria-hidden />
              <span className="truncate">{profile.email}</span>
            </a>
            <a href={profile.cv.pdf} className="btn btn-highlight" download>
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
          </div>
        </div>
      </section>

      <div className="container-page flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold tracking-[-0.01em] text-fg">{profile.name}</p>
          <p className="mt-0.5 text-small text-subtle">
            {profile.title} · {profile.location}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <nav aria-label="Footer" className="-my-2.5 flex flex-wrap gap-x-5 text-small text-muted">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="-mx-1.5 px-1.5 py-2.5 transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
          </nav>
          <SocialLinks className="-ml-2.5 sm:ml-0" />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page meta py-6">
          © {new Date().getFullYear()} {profile.name} · Last updated {updated}
        </p>
      </div>
    </footer>
  );
}

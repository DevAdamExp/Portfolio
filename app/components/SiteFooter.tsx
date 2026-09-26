import Link from "next/link";
import { profile } from "@/content/profile";
import SocialLinks from "./SocialLinks";

const links = [
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/resume", label: "CV" },
];

export default function SiteFooter() {
  const updated = new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  return (
    <footer className="mt-28 border-t border-line">
      <div className="container-page grid gap-6 py-10 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <p className="font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-subtle">
            {profile.title} · {profile.location}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:items-end">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-fg">
                {link.label}
              </Link>
            ))}
          </nav>
          <SocialLinks className="-ml-2 sm:-mr-2 sm:ml-0" />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="container-page py-5 text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name} · Last updated {updated}
        </p>
      </div>
    </footer>
  );
}

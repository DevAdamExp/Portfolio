import Link from "next/link";
import { profile } from "@/content/profile";
import { navItems } from "./nav";
import SocialLinks from "./SocialLinks";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight text-fg">{profile.name}</p>
          <p className="mt-1 text-sm text-subtle">
            {profile.title} · {profile.location}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
          <Link href="/resume" className="transition-colors hover:text-fg">
            CV
          </Link>
        </nav>
        <SocialLinks className="-ml-2 md:ml-0" />
      </div>
      <div className="border-t border-line">
        <p className="container-page py-6 text-xs text-subtle">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js and TypeScript.
        </p>
      </div>
    </footer>
  );
}

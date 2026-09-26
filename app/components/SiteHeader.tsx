import Link from "next/link";
import { FiFileText } from "react-icons/fi";
import { profile } from "@/content/profile";
import { initials } from "@/lib/format";
import MobileNav from "./MobileNav";
import { navItems } from "./nav";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="grid size-8 place-items-center rounded-lg bg-fg font-mono text-xs font-semibold text-bg transition-transform duration-200 group-hover:-rotate-6">
            {initials(profile.name)}
          </span>
          <span className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-fg">{profile.name}</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-0.5 text-sm lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-muted transition-colors hover:bg-surface-hover hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link href="/resume" className="btn btn-secondary btn-sm hidden sm:inline-flex">
            <FiFileText className="size-3.5" aria-hidden />
            CV
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

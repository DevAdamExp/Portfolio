import Link from "next/link";
import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/projects", label: "Work" },
  { href: "/#experience", label: "Experience", className: "hidden sm:inline-flex" },
  { href: "/resume", label: "CV" },
  { href: "#contact", label: "Contact", className: "hidden md:inline-flex" },
];

export default function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link
          href="/"
          className="whitespace-nowrap font-serif text-[1.125rem] font-medium tracking-[-0.01em] text-fg sm:text-[1.3125rem]"
        >
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-[0.9375rem] sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`h-10 items-center rounded-full px-3 text-muted transition-colors hover:bg-surface-sunk hover:text-fg ${item.className ?? "inline-flex"}`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 h-5 w-px bg-line-strong" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

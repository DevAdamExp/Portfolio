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
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-md">
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-3">
          <Link href="/" className="min-w-0 truncate text-[0.9375rem] font-semibold tracking-[-0.01em] text-fg">
            {profile.name}
          </Link>
          <nav aria-label="Main" className="flex shrink-0 items-center gap-0.5 text-[0.9375rem] sm:gap-1">
            {nav.map((item) => {
              const className = `h-9 items-center rounded-lg px-2.5 text-muted transition-colors hover:bg-surface-sunk hover:text-fg sm:px-3 ${item.className ?? "inline-flex"}`;
              // In-page jumps are plain anchors, so they scroll without a router navigation.
              return item.href.startsWith("#") ? (
                <a key={item.href} href={item.href} className={className}>
                  {item.label}
                </a>
              ) : (
                <Link key={item.href} href={item.href} className={className}>
                  {item.label}
                </Link>
              );
            })}
            <span className="mx-1.5 hidden h-5 w-px bg-line-strong sm:block" aria-hidden />
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  );
}

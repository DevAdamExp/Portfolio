import Link from "next/link";
import { FiMail } from "react-icons/fi";
import { profile } from "@/content/profile";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#how", label: "How I build", className: "hidden lg:inline-flex" },
  { href: "/#journey", label: "Journey", className: "hidden md:inline-flex" },
  { href: "/resume", label: "CV" },
];

export default function SiteHeader() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      {/* Reading progress, driven by scroll where supported */}
      <div aria-hidden className="scroll-progress fixed inset-x-0 top-0 z-50 h-[3px] bg-cobalt" />
      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 -rotate-[5deg] place-items-center rounded-[11px] bg-ink font-display text-[15px] font-extrabold tracking-tight text-paper transition-transform duration-300 ease-[var(--ease-spring)] group-hover:rotate-[6deg]">
              MA
            </span>
            <span className="hidden min-w-0 flex-col leading-tight sm:flex">
              <span className="truncate font-display text-[17px] font-bold">{profile.name}</span>
              <span className="text-[13px] text-subtle">Full stack · Agentic AI</span>
            </span>
          </Link>
          <nav
            aria-label="Main"
            className="flex items-center gap-1 rounded-full border-[1.5px] border-ink bg-surface p-1 text-[15px] font-medium"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`h-9 items-center rounded-full px-3.5 transition-colors hover:bg-ink hover:text-paper sm:px-4 ${item.className ?? "inline-flex"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a href={`mailto:${profile.email}`} className="btn btn-sm btn-highlight hidden sm:inline-flex">
            <FiMail className="size-4" aria-hidden />
            Email me
          </a>
        </div>
      </header>
    </>
  );
}

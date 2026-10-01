import Link from "next/link";
import { profile } from "@/content/profile";
import Logo from "./Logo";
import SiteNav from "./SiteNav";

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
      <header className="site-header sticky top-0 z-50 border-b border-transparent bg-paper/85 backdrop-blur-md">
        <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
          <Link href="/" aria-label={`${profile.name}, home`} className="group flex min-w-0 items-center gap-3">
            <Logo blink className="size-10 shrink-0 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-rotate-6" />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-display text-[17px] font-bold tracking-[-0.01em]">{profile.name}</span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-subtle">
                <span className="live-dot !size-1.5" aria-hidden />
                Open to work
              </span>
            </span>
          </Link>
          <SiteNav email={profile.email} cv={profile.cv.pdf} />
        </div>
      </header>
    </>
  );
}

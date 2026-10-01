import Link from "next/link";
import { profile } from "@/content/profile";
import Wordmark from "./Logo";
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
          <Link href="/" aria-label={`${profile.name}, home`} className="group -my-1.5 flex items-center py-1.5">
            <Wordmark className="h-8 w-auto sm:h-9" />
          </Link>
          <SiteNav email={profile.email} cv={profile.cv.pdf} />
        </div>
      </header>
    </>
  );
}

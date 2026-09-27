import { ViewTransition } from "react";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:text-bg"
      >
        Skip to content
      </a>
      <SiteHeader />
      {/* Pages rise in on navigation; see "View transitions" in globals.css. */}
      <ViewTransition default="vt-page">
        <main id="main">{children}</main>
      </ViewTransition>
      <SiteFooter />
    </>
  );
}

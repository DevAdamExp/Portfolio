import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import GrooveArt from "./components/art/GrooveArt";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page grid-12 items-center gap-y-14 pt-[clamp(2.5rem,1rem+3.5vw,4.5rem)]">
        <div className="col-span-12 lg:col-span-6">
          <p className="eyebrow">404</p>
          <h1 className="display-page mt-4">{site.notFound.heading}</h1>
          <p className="lead mt-6 max-w-[30rem]">{site.notFound.body}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-primary">
              Home page
            </Link>
            <Link href="/projects" className="btn btn-secondary">
              Work
            </Link>
            <Link href="/resume" className="btn btn-secondary">
              CV
            </Link>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-8 sm:col-start-3 lg:col-span-5 lg:col-start-8">
          <GrooveArt still title={site.notFound.artTitle} caption={site.notFound.artCaption} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="container-page pt-[clamp(3rem,2rem+4vw,6rem)]">
        <p className="eyebrow">404</p>
        <h1 className="display-page mt-3">{site.notFound.heading}</h1>
        <p className="lead mt-5 max-w-[30rem]">{site.notFound.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
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
      </main>
      <SiteFooter />
    </>
  );
}

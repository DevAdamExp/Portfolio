import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="relative isolate overflow-hidden">
        <div aria-hidden className="bg-grid fade-mask absolute inset-0 -z-10" />
        <div className="container-page py-28 md:py-36">
          <p className="eyebrow">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-fg md:text-5xl">This page doesn&apos;t exist.</h1>
          <p className="mt-4 text-lg text-muted">It may have moved during a redesign.</p>
          <Link href="/" className="btn btn-primary mt-8">
            Go to the home page
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

import Link from "next/link";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="container-page py-24">
        <p className="font-mono text-xs text-subtle">404</p>
        <h1 className="mt-2 text-2xl font-medium tracking-tight text-fg">This page doesn&apos;t exist.</h1>
        <p className="mt-3 text-muted">
          It may have moved during a redesign.{" "}
          <Link href="/" className="link">
            Go to the home page
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </>
  );
}

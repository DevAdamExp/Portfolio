import Link from "next/link";
import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/#experience", label: "Experience", className: "hidden sm:block" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "CV" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="whitespace-nowrap text-[15px] font-medium tracking-tight text-fg">
          {profile.name}
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-2.5 py-1.5 text-muted transition-colors hover:text-fg ${item.className ?? ""}`}
            >
              {item.label}
            </Link>
          ))}
          <span className="mx-1 h-4 w-px bg-line-strong" aria-hidden />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

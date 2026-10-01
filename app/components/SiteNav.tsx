"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiDownload, FiMail, FiMenu, FiX } from "react-icons/fi";

const links = [
  { id: "work", label: "Work" },
  { id: "how", label: "How I work" },
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
];

/**
 * Desktop: a pill nav whose ink highlight slides to the section you're reading.
 * Mobile: a menu button that opens a full-width sheet.
 */
export default function SiteNav({ email, cv }: { email: string; cv: string }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const [active, setActive] = useState<string | null>(onHome ? null : pathname.startsWith("/projects") ? "work" : null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);

  // Track which section is in view (home page only).
  useEffect(() => {
    if (!onHome) return;
    const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
        else if (window.scrollY < 400) setActive(null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [onHome]);

  // Move the highlight under the active link (a direct style write, no re-render).
  useLayoutEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const el = active ? navRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`) : null;
    pill.style.opacity = el ? "1" : "0";
    if (el) {
      pill.style.width = `${el.offsetWidth}px`;
      pill.style.transform = `translateX(${el.offsetLeft}px)`;
    }
  }, [active]);

  // Close the sheet on Escape, and lock page scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav aria-label="Main" className="hidden lg:block">
        <div ref={navRef} className="relative flex items-center rounded-full border-[1.5px] border-ink bg-surface p-1 text-[15px] font-medium">
          <span
            ref={pillRef}
            aria-hidden
            className="absolute inset-y-1 left-0 w-0 rounded-full bg-ink opacity-0 transition-[transform,width,opacity] duration-500 ease-[var(--ease-out)]"
          />
          {links.map((l) => (
            <Link
              key={l.id}
              data-id={l.id}
              href={`/#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative z-10 inline-flex h-9 items-center whitespace-nowrap rounded-full px-4 transition-colors duration-300 ${
                active === l.id ? "text-paper" : "text-fg hover:bg-surface-sunk"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>

      <div className="flex items-center gap-2">
        <a href={cv} download className="btn btn-sm btn-secondary hidden lg:inline-flex">
          <FiDownload className="nudge-y size-4" aria-hidden />
          CV
        </a>
        <a href={`mailto:${email}`} className="btn btn-sm btn-highlight hidden sm:inline-flex">
          <FiMail className="size-4" aria-hidden />
          Email me
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid size-11 place-items-center rounded-full border-[1.5px] border-ink bg-surface lg:hidden"
        >
          {open ? <FiX className="size-5" aria-hidden /> : <FiMenu className="size-5" aria-hidden />}
        </button>
      </div>

      {/* Portalled to <body>: the header's backdrop blur would otherwise trap a fixed child inside it. */}
      {open && createPortal(
        <div id="mobile-menu" className="menu-sheet fixed inset-x-0 bottom-0 top-[var(--header-h)] z-[45] overflow-y-auto border-t border-line bg-paper px-[var(--gutter)] pb-10 pt-6 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.id} className="menu-item border-b border-line" style={{ animationDelay: `${60 + i * 50}ms` }}>
                <Link
                  href={`/#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-4 font-display text-[34px] font-extrabold tracking-[-0.035em]"
                >
                  {l.label}
                  <span className="font-mono text-[12px] font-medium tracking-[0.1em] text-subtle">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-8 grid gap-3" style={{ animationDelay: "280ms" }}>
            <a href={`mailto:${email}`} className="btn btn-highlight w-full">
              <FiMail className="size-4" aria-hidden />
              Email me
            </a>
            <a href={cv} download className="btn btn-secondary w-full">
              <FiDownload className="size-4" aria-hidden />
              Download CV
            </a>
          </div>
          <p className="hand mt-8 text-[24px] text-muted">open to long-term roles · remote or relocation</p>
        </div>,
        document.body,
      )}
    </>
  );
}

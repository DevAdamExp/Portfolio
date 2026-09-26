"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiFileText, FiMenu, FiX } from "react-icons/fi";
import { navItems } from "./nav";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="grid size-9 place-items-center rounded-lg text-muted transition-colors hover:bg-surface-hover hover:text-fg"
      >
        {open ? <FiX className="size-5" aria-hidden /> : <FiMenu className="size-5" aria-hidden />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-line bg-bg shadow-[0_16px_32px_-16px_rgb(0_0_0/0.25)]"
        >
          <ul className="container-page grid gap-1 py-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-[15px] text-fg transition-colors hover:bg-surface-hover"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-line pt-3">
              <Link href="/resume" onClick={() => setOpen(false)} className="btn btn-primary w-full">
                <FiFileText className="size-4" aria-hidden />
                View CV
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

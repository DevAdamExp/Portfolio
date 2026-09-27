"use client";

import type { MouseEvent } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

/**
 * Switches between the paper and velvet-night themes. Where the browser
 * supports view transitions, the new theme spreads out in a circle from the
 * button. Icons swap via CSS on data-theme, so server and client markup match.
 */
export default function ThemeToggle() {
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      apply();
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    root.style.setProperty("--theme-x", `${x}px`);
    root.style.setProperty("--theme-y", `${y}px`);
    root.style.setProperty("--theme-r", `${radius}px`);
    root.dataset.themeSwitching = "";
    document.startViewTransition(apply).finished.finally(() => {
      delete root.dataset.themeSwitching;
    });
  };

  return (
    <button type="button" onClick={toggle} aria-label="Toggle colour theme" className="icon-btn">
      <FiSun className="hidden size-[18px] dark:block" aria-hidden />
      <FiMoon className="size-[18px] dark:hidden" aria-hidden />
    </button>
  );
}
